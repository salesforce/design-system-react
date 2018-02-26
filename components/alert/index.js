'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _classNames = require('../../utilities/class-names');

var _classNames2 = _interopRequireDefault(_classNames);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _constants = require('../../utilities/constants');

var _domElementFocus = require('../../utilities/dom-element-focus');

var _domElementFocus2 = _interopRequireDefault(_domElementFocus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Alert Component

// Implements the [Alert design pattern](https://lightningdesignsystem.com/components/alert/) in React.

var propTypes = {
	/**
  * **Assistive text for accessibility**
  * This object is merged with the default props object on every render.
  * * `closeButton`: This is a visually hidden label for the close button.
  * _Tested with snapshot testing._
  */
	assistiveText: _propTypes2.default.shape({
		closeButton: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])
	}),
	/**
  * CSS classes to be added to tag with `.slds-notify_alert`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
  * _Tested with snapshot testing._
  */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * Allows user to click a close button. Banners should be dismissible only if they communicate future impact to the system,
  * _Tested with snapshot testing._
  */
	dismissible: _propTypes2.default.bool,
	/**
  * Icon of type `~/components/icon`. This icon will be cloned and additional props appended. The default icons are:
  * * info variant: `utility:info`
  * * error variant: `utility:error`
  * * offline variant: `utility:offline`
  * * warning variant: `utility:warning`
  *
  * _Tested with snapshot testing._
  */
	icon: _propTypes2.default.node,
	/**
  * **Text labels for internationalization**
  * This object is merged with the default props object on every render.
  * * `heading`: text within heading tag
  * * `headingLink`: Text of link that triggers `onClickHeadingLink`. Inline links should pass a keyed array of React components into `labels.heading`.
  *
  * _Tested with snapshot testing._
  */
	labels: _propTypes2.default.shape({
		heading: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
		headingLink: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])
	}),
	/**
  * Triggered by link. _Tested with Mocha testing._
  */
	onClickHeadingLink: _propTypes2.default.func,
	/**
  * Triggered by close button. This is a controlled component. _Tested with Mocha testing._
  */
	onRequestClose: _propTypes2.default.func,
	/**
  * The type of alert. _Tested with snapshot testing._
  */
	variant: _propTypes2.default.oneOf(['error', 'info', 'offline', 'warning']).isRequired
};

var defaultProps = {
	assistiveText: {
		closeButton: 'Close'
	},
	labels: {},
	variant: 'info'
};

/**
 * Alert banners communicate a state that affects the entire system, not just a feature or page. It persists over a session and appears without the user initiating the action. View [banner guidelines](https://www.lightningdesignsystem.com/guidelines/messaging/components/banners/).
 */

var Alert = function (_React$Component) {
	_inherits(Alert, _React$Component);

	function Alert(props) {
		_classCallCheck(this, Alert);

		var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

		_this.saveButtonRef = function (component) {
			_this.closeButton = component;
			if (_this.state.isInitialRender) {
				_domElementFocus2.default.storeActiveElement();
				if (_this.closeButton) {
					_this.closeButton.focus();
				}
				_this.setState({ isInitialRender: false });
			}
		};

		_this.state = {
			isInitialRender: true
		};
		return _this;
	}

	_createClass(Alert, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
			(0, _checkProps2.default)(_constants.ALERT, this.props);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_domElementFocus2.default.returnFocusToStoredElement();
		}
	}, {
		key: 'render',
		value: function render() {
			// Merge objects of strings with their default object
			var assistiveText = (0, _lodash2.default)({}, defaultProps.assistiveText, this.props.assistiveText);
			var labels = (0, _lodash2.default)({}, defaultProps.labels, this.props.labels);

			// BACKWARD COMPATIBILITY WITH NOTIFICATION
			var heading = labels.heading || this.props.content; // eslint-disable-line react/prop-types
			var onRequestClose = this.props.onRequestClose || this.props.onDismiss; // eslint-disable-line react/prop-types

			var assistiveTextVariant = {
				info: 'info',
				warning: 'warning',
				error: 'error',
				offline: 'offline'
			};

			var defaultIcons = {
				info: _react2.default.createElement(_icon2.default, { category: 'utility', name: 'info' }),
				offline: _react2.default.createElement(_icon2.default, { category: 'utility', name: 'offline' }),
				warning: _react2.default.createElement(_icon2.default, { category: 'utility', name: 'warning' }),
				error: _react2.default.createElement(_icon2.default, { category: 'utility', name: 'error' })
			};

			var icon = this.props.icon ? this.props.icon : defaultIcons[this.props.variant];

			// BACKWARD COMPATIBILITY WITH NOTIFICATION
			if (this.props.iconName && this.props.iconCategory) {
				// eslint-disable-line react/prop-types
				icon = _react2.default.createElement(_icon2.default, { category: this.props.iconCategory, name: this.props.iconName });
			}

			var clonedIcon = _react2.default.cloneElement(icon, {
				containerClassName: 'slds-m-right--x-small',
				inverse: true,
				size: 'x-small'
			});

			/* eslint-disable no-script-url */
			return _react2.default.createElement(
				'div',
				{
					className: (0, _classNames2.default)('slds-notify slds-notify_alert slds-theme_alert-texture', {
						'slds-theme_info': this.props.variant === 'info',
						'slds-theme_warning': this.props.variant === 'warning',
						'slds-theme_error': this.props.variant === 'error',
						'slds-theme_offline': this.props.variant === 'offline'
					}, this.props.className),
					role: 'alert'
				},
				_react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					assistiveTextVariant[this.props.variant]
				),
				clonedIcon,
				_react2.default.createElement(
					'h2',
					null,
					heading,
					' ',
					labels.headingLink ? _react2.default.createElement(
						'a',
						{
							onClick: this.props.onClickHeadingLink,
							href: 'javascript:void(0);'
						},
						labels.headingLink
					) : null
				),
				this.props.dismissible ? _react2.default.createElement(_button2.default, {
					assistiveText: assistiveText.closeButton,
					buttonRef: this.saveButtonRef,
					className: 'slds-notify__close',
					iconCategory: 'utility',
					iconName: 'close',
					iconSize: 'medium',
					inverse: true,
					onClick: onRequestClose,
					title: assistiveText.closeButton,
					variant: 'icon'
				}) : null
			);
		}
	}]);

	return Alert;
}(_react2.default.Component);

Alert.defaultProps = defaultProps;
Alert.displayName = _constants.ALERT;
Alert.propTypes = propTypes;

exports.default = Alert;