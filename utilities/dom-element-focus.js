import findTabbableElement from './tabbable';
import KEYS from './key-code';
import { canUseDOM } from './execution-environment';

let ancestor = null;
let focusLaterElement = null;

const handleScopedKeyDown = (event) => {
	if (!canUseDOM || !ancestor || event.keyCode !== KEYS.TAB) {
		return;
	}
	const tabbableElements = findTabbableElement(ancestor);
	const finalTabbable =
		tabbableElements[event.shiftKey ? 0 : tabbableElements.length - 1];
	const leavingFinalTabbable =
		finalTabbable === document.activeElement ||
		// handle immediate shift+tab after opening with mouse
		ancestor === document.activeElement;
	if (!leavingFinalTabbable) return;
	event.preventDefault();
	const target =
		tabbableElements[event.shiftKey ? tabbableElements.length - 1 : 0];
	target.focus();
};

// PUBLIC methods

const ElementFocus = {
	focusAncestor: () => {
		if (canUseDOM) {
			ancestor.focus();
		}
	},
	hasOrAncestorHasFocus: () =>
		canUseDOM &&
		(document.activeElement === ancestor ||
			ancestor.contains(document.activeElement)),
	returnFocusToStoredElement: () => {
		if (canUseDOM) {
			try {
				focusLaterElement.focus();
			} catch (e) {
				// eslint-disable-next-line no-console
				console.warn(
					`You tried to return focus to ${focusLaterElement} but it is not in the DOM anymore`
				);
			}
			focusLaterElement = null;
		}
	},
	setupScopedFocus: ({ ancestorElement }) => {
		ancestor = ancestorElement;
		window.addEventListener('keydown', handleScopedKeyDown, false);
	},
	storeActiveElement: () => {
		focusLaterElement = canUseDOM ? document.activeElement : null;
	},
	teardownScopedFocus: () => {
		ancestor = null;
		if (canUseDOM) {
			window.removeEventListener('keydown', handleScopedKeyDown);
		}
	},
};

export default ElementFocus;
