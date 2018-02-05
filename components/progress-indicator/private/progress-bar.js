'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _airbnbPropTypes = require('airbnb-prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var propTypes = {
	/**
  * Assistive text for percentage
  */
	assistiveText: (0, _airbnbPropTypes.shape)({
		percentage: _propTypes2.default.string
	}),
	/**
  * Percentage of progress completion, with range of [0, 100]
  */
	value: _propTypes2.default.string.isRequired
};
/**
 * ProgressBar renders the blue/gray progress bar and dynamically updates its completion percentage
 */

var ProgressBar = function (_React$Component) {
	_inherits(ProgressBar, _React$Component);

	function ProgressBar() {
		_classCallCheck(this, ProgressBar);

		return _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
	}

	_createClass(ProgressBar, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{
					className: 'slds-progress-bar slds-progress-bar_x-small',
					'aria-valuemin': '0',
					'aria-valuemax': '100',
					'aria-valuenow': this.props.value,
					role: 'progressbar',
					tabIndex: 0
				},
				_react2.default.createElement(
					'span',
					{
						className: 'slds-progress-bar__value',
						style: { width: this.props.value + '%' }
					},
					_react2.default.createElement(
						'span',
						{ className: 'slds-assistive-text' },
						this.props.assistiveText.percentage || 'Progress: ' + this.props.value + '%'
					)
				)
			);
		}
	}]);

	return ProgressBar;
}(_react2.default.Component);

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = propTypes;

exports.default = ProgressBar;