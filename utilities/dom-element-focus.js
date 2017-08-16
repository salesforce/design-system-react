define(['module', './tabbable'], function (module, _tabbable) {
	'use strict';

	var _tabbable2 = _interopRequireDefault(_tabbable);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var ancestor = null;
	var focusLaterElement = null;

	var handleScopedFocus = function handleScopedFocus() {
		if (!ancestor) {
			return;
		}
		// need to see how jQuery shims document.on('focusin') so we don't need the
		// setTimeout, firefox doesn't support focusin, if it did, we could focus
		// the element outside of a setTimeout. Side-effect of this implementation
		// is that the document.body gets focus, and then we focus our element right
		// after.
		setTimeout(function () {
			if (ancestor && !ancestor.contains(document.activeElement)) {
				var el = (0, _tabbable2.default)(ancestor)[0] || ancestor;
				el.focus();
			}
		}, 0);
	};

	var handleScopedBlur = function handleScopedBlur() {
		handleScopedFocus();
	};

	// PUBLIC methods

	var focusAncestor = function focusAncestor() {
		ancestor.focus();
	};

	var hasOrAncestorHasFocus = function hasOrAncestorHasFocus() {
		return document.activeElement === ancestor || ancestor.contains(document.activeElement);
	};

	var returnFocusToStoredElement = function returnFocusToStoredElement() {
		try {
			focusLaterElement.focus();
		} catch (e) {
			console.warn('You tried to return focus to ' + focusLaterElement + ' but it is not in the DOM anymore'); // eslint-disable-line no-console
		}
		focusLaterElement = null;
	};

	var setupScopedFocus = function setupScopedFocus(_ref) {
		var ancestorElement = _ref.ancestorElement;

		ancestor = ancestorElement;
		window.addEventListener('blur', handleScopedBlur, false);
		document.addEventListener('focus', handleScopedFocus, true);
	};

	var storeActiveElement = function storeActiveElement() {
		focusLaterElement = document.activeElement;
	};

	var teardownScopedFocus = function teardownScopedFocus() {
		ancestor = null;
		window.removeEventListener('blur', handleScopedBlur);
		document.removeEventListener('focus', handleScopedFocus);
	};

	module.exports = {
		focusAncestor: focusAncestor,
		hasOrAncestorHasFocus: hasOrAncestorHasFocus,
		returnFocusToStoredElement: returnFocusToStoredElement,
		setupScopedFocus: setupScopedFocus,
		storeActiveElement: storeActiveElement,
		teardownScopedFocus: teardownScopedFocus
	};
});