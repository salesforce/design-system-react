'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = require('../../utilities/class-names');

var _classNames2 = _interopRequireDefault(_classNames);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Alert Container Component

var propTypes = {
	/**
  * CSS classes to be added to tag with `.slds-notify_alert`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
  */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * Alert components
  */
	children: _propTypes2.default.node
};

/**
 * A fixed container for alert banners.
 */

var AlertContainer = function (_React$Component) {
	_inherits(AlertContainer, _React$Component);

	function AlertContainer() {
		_classCallCheck(this, AlertContainer);

		return _possibleConstructorReturn(this, (AlertContainer.__proto__ || Object.getPrototypeOf(AlertContainer)).apply(this, arguments));
	}

	_createClass(AlertContainer, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{
					className: (0, _classNames2.default)('slds-notify-container', this.props.className)
				},
				this.props.children
			);
		}
	}]);

	return AlertContainer;
}(_react2.default.Component);

AlertContainer.displayName = _constants.ALERT_CONTAINER;
AlertContainer.propTypes = propTypes;

exports.default = AlertContainer;