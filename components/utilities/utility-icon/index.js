define(['module', 'react', './svg', '../../../icons/utility', '../../../icons/action', '../../../icons/custom', '../../../icons/doctype', '../../../icons/standard'], function (module, _react, _svg, _utility, _action, _custom, _doctype, _standard) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _svg2 = _interopRequireDefault(_svg);

	var SLDS_ICONS_UTILITY = _interopRequireWildcard(_utility);

	var SLDS_ICONS_ACTION = _interopRequireWildcard(_action);

	var SLDS_ICONS_CUSTOM = _interopRequireWildcard(_custom);

	var SLDS_ICONS_DOCTYPE = _interopRequireWildcard(_doctype);

	var SLDS_ICONS_STANDARD = _interopRequireWildcard(_standard);

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj;
		} else {
			var newObj = {};

			if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
				}
			}

			newObj.default = obj;
			return newObj;
		}
	}

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	var UtilityIcon = function UtilityIcon(_ref) {
		var _ref$name = _ref.name;
		var name = _ref$name === undefined ? '' : _ref$name;
		var _ref$category = _ref.category;
		var category = _ref$category === undefined ? 'utility' : _ref$category;
		var icon = _ref.icon;

		var rest = _objectWithoutProperties(_ref, ['name', 'category', 'icon']);

		var data = void 0;

		if (icon) {
			data = icon;
		} else {
			switch (category) {
				case 'action':
					data = SLDS_ICONS_ACTION[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_ACTION.viewBox;
					break;
				case 'custom':
					data = SLDS_ICONS_CUSTOM[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_CUSTOM.viewBox;
					break;
				case 'doctype':
					data = SLDS_ICONS_DOCTYPE[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_DOCTYPE.viewBox;
					break;
				case 'standard':
					data = SLDS_ICONS_STANDARD[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_STANDARD.viewBox;
					break;
				case 'utility':
				default:
					data = SLDS_ICONS_UTILITY[name.toLowerCase()];
					data.viewBox = SLDS_ICONS_UTILITY.viewBox;
					break;
			}
		}

		return _react2.default.createElement(_svg2.default, _extends({ data: data, name: name }, rest));
	};

	UtilityIcon.displayName = 'UtilityIcon';

	UtilityIcon.propTypes = {
		category: _react2.default.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
		/**
    * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
    */
		icon: _react2.default.PropTypes.object,
		/**
    * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
    */
		name: _react2.default.PropTypes.string
	};

	module.exports = UtilityIcon;
});