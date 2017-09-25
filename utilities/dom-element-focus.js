import findTabbableElement from './tabbable';
import KEYS from './key-code';

let ancestor = null;
let focusLaterElement = null;

const handleScopedKeyDown = (event) => {
	if (!ancestor || event.keyCode !== KEYS.TAB) {
		return;
	}
	const tabbableElements = findTabbableElement(ancestor);
	const finalTabbable = tabbableElements[event.shiftKey ? 0 : tabbableElements.length - 1];
	const leavingFinalTabbable = (
		finalTabbable === document.activeElement ||
		// handle immediate shift+tab after opening with mouse
		ancestor === document.activeElement
	);
	if (!leavingFinalTabbable) return;
	event.preventDefault();
	const target = tabbableElements[event.shiftKey ? tabbableElements.length - 1 : 0];
	target.focus();
};

// PUBLIC methods

const focusAncestor = () => {
	ancestor.focus();
};

const hasOrAncestorHasFocus = () =>
	document.activeElement === ancestor
	|| ancestor.contains(document.activeElement);

const returnFocusToStoredElement = () => {
	try {
		focusLaterElement.focus();
	}	catch (e) {
		console.warn(`You tried to return focus to ${focusLaterElement} but it is not in the DOM anymore`); // eslint-disable-line no-console
	}
	focusLaterElement = null;
};

const setupScopedFocus = ({ ancestorElement }) => {
	ancestor = ancestorElement;
	window.addEventListener('keydown', handleScopedKeyDown, false);
};

const storeActiveElement = () => {
	focusLaterElement = document.activeElement;
};

const teardownScopedFocus = () => {
	ancestor = null;
	window.removeEventListener('keydown', handleScopedKeyDown);
};

module.exports = {
	focusAncestor,
	hasOrAncestorHasFocus,
	returnFocusToStoredElement,
	setupScopedFocus,
	storeActiveElement,
	teardownScopedFocus
};
