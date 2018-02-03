'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * The Icon Settings component allows for the path to the icons to be specified.
 * This should be used at the root of the application.
 *
 * **Individual sprites**
 * If you are using webpack it is advised to use the sprite properties
 * {actionSprite, standardSprite...} to specify the individual sprite paths so that webpack can
 * easily re-write the paths.
 * ```
 * import actionSprite from '......';
 *
 * <IconSettings actionSprite={actionSprite} ......>
 * ```
 * **Root icon path**
 * Otherwise use the iconPath to specify the root path to where the icon files will be located in you application
 * such as `/assets/icons`.
 */
var IconSettings = function (_React$Component) {
	_inherits(IconSettings, _React$Component);

	function IconSettings() {
		_classCallCheck(this, IconSettings);

		return _possibleConstructorReturn(this, (IconSettings.__proto__ || Object.getPrototypeOf(IconSettings)).apply(this, arguments));
	}

	_createClass(IconSettings, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				iconPath: this.props.iconPath,
				actionSprite: this.props.actionSprite,
				customSprite: this.props.customSprite,
				doctypeSprite: this.props.doctypeSprite,
				standardSprite: this.props.standardSprite,
				utilitySprite: this.props.utilitySprite
			};
		}
	}, {
		key: 'render',
		value: function render() {
			return this.props.children;
		}
	}]);

	return IconSettings;
}(_react2.default.Component);

IconSettings.displayName = _constants.ICON_SETTINGS;

IconSettings.childContextTypes = {
	iconPath: _propTypes2.default.string,
	actionSprite: _propTypes2.default.string,
	customSprite: _propTypes2.default.string,
	doctypeSprite: _propTypes2.default.string,
	standardSprite: _propTypes2.default.string,
	utilitySprite: _propTypes2.default.string
};

IconSettings.propTypes = {
	/**
  * Path to the root icon folder
  * example: `/assets/icons`
  */
	iconPath: _propTypes2.default.string,
	/**
  * Path to the action sprite
  * example: '@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg';
  */
	actionSprite: _propTypes2.default.string,
	/**
  * Path to the custom sprite
  * example: '@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg';
  */
	customSprite: _propTypes2.default.string,
	/**
  * Path to the doctype sprite
  * example: '@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg';
  */
	doctypeSprite: _propTypes2.default.string,
	/**
  * Path to the standard sprite
  * example: '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';
  */
	standardSprite: _propTypes2.default.string,
	/**
  * Path to the utility sprite
  * example: '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
  */
	utilitySprite: _propTypes2.default.string
};

exports.default = IconSettings;