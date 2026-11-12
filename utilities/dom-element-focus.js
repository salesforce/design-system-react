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
	focusAncestor: ({ isPortal }) => {
		if (canUseDOM) {
			// When a portal is used (that is attaching a separate React mount, such as with Popover) programatic focusing within that portal may cause the window to scroll down to the DOM insertion point at the end of `body`. The following prevents the scrolling from occuring.
			if (isPortal) {
				const offset = window.pageYOffset;
				ancestor.focus({ preventScroll: true });
				window.scrollTo(window.pageXOffset, offset);
			} else {
				ancestor.focus();
			}
		}
	},
	hasOrAncestorHasFocus: () =>
		canUseDOM &&
		(document.activeElement === ancestor ||
			ancestor.contains(document.activeElement)),
	returnFocusToStoredElement: () => {
		if (canUseDOM) {
			// Only attempt to focus if element exists and is still in the DOM
			// This prevents warnings in environments like Storybook where elements
			// may be unmounted before focus can be restored
			if (
				focusLaterElement &&
				typeof focusLaterElement.focus === 'function' &&
				document.body.contains(focusLaterElement)
			) {
				try {
					focusLaterElement.focus();
				} catch (e) {
					// Silently ignore - element may have been removed from DOM
				}
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
