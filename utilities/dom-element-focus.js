import findTabbableElement from './tabbable';

let ancestor = null;
let focusLaterElement = null;

const handleScopedFocus = () => {
	if (!ancestor) {
		return;
	}
	// need to see how jQuery shims document.on('focusin') so we don't need the
	// setTimeout, firefox doesn't support focusin, if it did, we could focus
	// the element outside of a setTimeout. Side-effect of this implementation
	// is that the document.body gets focus, and then we focus our element right
	// after.
	setTimeout(() => {
		if (ancestor && !ancestor.contains(document.activeElement)) {
			const el = (findTabbableElement(ancestor)[0] || ancestor);
			el.focus();
		}
	}, 0);
};

const handleScopedBlur = () => {
	handleScopedFocus();
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
	window.addEventListener('blur', handleScopedBlur, false);
	document.addEventListener('focus', handleScopedFocus, true);
};

const storeActiveElement = () => {
	focusLaterElement = document.activeElement;
};

const teardownScopedFocus = () => {
	ancestor = null;
	window.removeEventListener('blur', handleScopedBlur);
	document.removeEventListener('focus', handleScopedFocus);
};

module.exports = {
	focusAncestor,
	hasOrAncestorHasFocus,
	returnFocusToStoredElement,
	setupScopedFocus,
	storeActiveElement,
	teardownScopedFocus
};
