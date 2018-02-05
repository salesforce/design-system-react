define(['exports', './tabbable', './key-code', './execution-environment'], function (exports, _tabbable, _keyCode, _executionEnvironment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _tabbable2 = _interopRequireDefault(_tabbable);

	var _keyCode2 = _interopRequireDefault(_keyCode);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var ancestor = null;
	var focusLaterElement = null;

	var handleScopedKeyDown = function handleScopedKeyDown(event) {
		if (!_executionEnvironment.canUseDOM || !ancestor || event.keyCode !== _keyCode2.default.TAB) {
			return;
		}
		var tabbableElements = (0, _tabbable2.default)(ancestor);
		var finalTabbable = tabbableElements[event.shiftKey ? 0 : tabbableElements.length - 1];
		var leavingFinalTabbable = finalTabbable === document.activeElement ||
		// handle immediate shift+tab after opening with mouse
		ancestor === document.activeElement;
		if (!leavingFinalTabbable) return;
		event.preventDefault();
		var target = tabbableElements[event.shiftKey ? tabbableElements.length - 1 : 0];
		target.focus();
	};

	// PUBLIC methods

	var ElementFocus = {
		focusAncestor: function focusAncestor() {
			if (_executionEnvironment.canUseDOM) {
				ancestor.focus();
			}
		},
		hasOrAncestorHasFocus: function hasOrAncestorHasFocus() {
			return _executionEnvironment.canUseDOM && (document.activeElement === ancestor || ancestor.contains(document.activeElement));
		},
		returnFocusToStoredElement: function returnFocusToStoredElement() {
			if (_executionEnvironment.canUseDOM) {
				try {
					focusLaterElement.focus();
				} catch (e) {
					// eslint-disable-next-line no-console
					console.warn('You tried to return focus to ' + focusLaterElement + ' but it is not in the DOM anymore');
				}
				focusLaterElement = null;
			}
		},
		setupScopedFocus: function setupScopedFocus(_ref) {
			var ancestorElement = _ref.ancestorElement;

			ancestor = ancestorElement;
			window.addEventListener('keydown', handleScopedKeyDown, false);
		},
		storeActiveElement: function storeActiveElement() {
			focusLaterElement = _executionEnvironment.canUseDOM ? document.activeElement : null;
		},
		teardownScopedFocus: function teardownScopedFocus() {
			ancestor = null;
			if (_executionEnvironment.canUseDOM) {
				window.removeEventListener('keydown', handleScopedKeyDown);
			}
		}
	};

	exports.default = ElementFocus;
});