var findTabbable = require('./tabbable');
var dialogElement = null;
var focusLaterElement = null;
var needToFocus = false;

function handleFocus () {
	needToFocus = false;
	if (!dialogElement) {
		return;
	}
	// need to see how jQuery shims document.on('focusin') so we don't need the
	// setTimeout, firefox doesn't support focusin, if it did, we could focus
	// the element outside of a setTimeout. Side-effect of this implementation
	// is that the document.body gets focus, and then we focus our element right
	// after, seems fine.
	setTimeout(() => {
		if (!dialogElement.contains(document.activeElement)) {
			const el = (findTabbable(dialogElement)[0] || dialogElement);
			el.focus();
		}
	}, 0);
}

function handleBlur () {
	handleFocus();
}

exports.markForFocusLater = function () {
	focusLaterElement = document.activeElement;
};

exports.returnFocus = function () {
	try {
		focusLaterElement.focus();
	}	catch (e) {
		console.warn(`You tried to return focus to ${focusLaterElement} but it is not in the DOM anymore`);
	}
	focusLaterElement = null;
};

exports.setupScopedFocus = function (element) {
	dialogElement = element;
	window.addEventListener('blur', handleBlur, false);
	document.addEventListener('focus', handleFocus, true);
};

exports.teardownScopedFocus = function () {
	dialogElement = null;
	window.removeEventListener('blur', handleBlur);
	document.removeEventListener('focus', handleFocus);
};
