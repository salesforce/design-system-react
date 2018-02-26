'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _event = require('../../utilities/event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Lookup design pattern](https://latest-204.lightningdesignsystem.com/components/lookups) in React.
// Based on SLDS v2.1.0-dev

var displayName = 'LookupDefaultHeader';
var propTypes = {};
var defaultProps = {};

var DefaultHeader = function (_React$Component) {
	_inherits(DefaultHeader, _React$Component);

	function DefaultHeader() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, DefaultHeader);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DefaultHeader.__proto__ || Object.getPrototypeOf(DefaultHeader)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
			if (_this.props.onClose) {
				_this.props.onClose();
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(DefaultHeader, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
				this.props.setFocus('searchRecords');
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var className = 'slds-lookup__item-action slds-lookup__item-action--label';
			if (this.props.isActive) className += ' slds-theme--shade';

			return (
				/* eslint-disable jsx-a11y/no-static-element-interactions */
				_react2.default.createElement(
					'div',
					{
						className: 'js-slds-lookup__item',
						onMouseDown: _event2.default.trapImmediate,
						onClick: this.handleClick
					},
					_react2.default.createElement(
						'a',
						{ id: 'searchRecords', href: 'javascript:void(0);', className: className },
						_react2.default.createElement(
							'span',
							{ className: 'lookup__item-action-label' },
							_react2.default.createElement(_icon2.default, {
								name: 'search',
								category: 'utility',
								size: 'x-small',
								className: 'slds-icon-text-default'
							}),
							_react2.default.createElement(
								'span',
								{ className: 'slds-truncate' },
								this.props.searchTerm
							)
						)
					)
				)
			);
		}
	}]);

	return DefaultHeader;
}(_react2.default.Component);

DefaultHeader.displayName = displayName;
DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

exports.default = DefaultHeader;