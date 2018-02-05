'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icon = require('../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _event = require('../../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/role-has-required-aria-props */

var displayName = 'Lookup-Menu-Item';
var propTypes = {
	data: _propTypes2.default.object,
	handleItemFocus: _propTypes2.default.func,
	href: _propTypes2.default.string,
	iconCategory: _propTypes2.default.string,
	id: _propTypes2.default.string,
	index: _propTypes2.default.number,
	isActive: _propTypes2.default.bool,
	isDisabled: _propTypes2.default.bool,
	listItemLabelRenderer: _propTypes2.default.func,
	onSelect: _propTypes2.default.func,
	searchTerm: _propTypes2.default.string,
	setFocus: _propTypes2.default.func
};

var Item = function (_React$Component) {
	_inherits(Item, _React$Component);

	function Item() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Item);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
			return _this.props.onSelect(_this.props.id, _this.props.data);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Item, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
				this.scrollFocus();
				this.props.setFocus(this.props.id);
			}
		}
	}, {
		key: 'getCustomLabel',
		value: function getCustomLabel() {
			var ListItemLabel = this.props.listItemLabelRenderer;
			return _react2.default.createElement(ListItemLabel, this.props);
		}
	}, {
		key: 'getIcon',
		value: function getIcon() {
			if (this.props.iconName && !this.props.listItemLabelRenderer) {
				return _react2.default.createElement(
					'span',
					{ className: 'slds-media__figure' },
					_react2.default.createElement(_icon2.default, {
						category: this.props.iconCategory,
						inverse: this.props.iconInverse,
						key: this.props.iconName,
						name: this.props.iconName,
						size: 'small'
					})
				);
			}
			return null;
		}
	}, {
		key: 'getLabel',
		value: function getLabel() {
			var label = void 0;
			if (this.props.children.data.subTitle) {
				label = _react2.default.createElement(
					'div',
					{ className: 'slds-media__body' },
					_react2.default.createElement(
						'div',
						{ className: 'slds-lookup__result-text' },
						this.props.children.label
					),
					_react2.default.createElement(
						'span',
						{ className: 'slds-lookup__result-meta slds-text-body--small' },
						this.props.children.data.subTitle
					)
				);
			} else {
				var labelClassName = (0, _classnames2.default)('slds-lookup__result-text', {
					'slds-m-left--x-small': !this.props.iconName
				});

				label = _react2.default.createElement(
					'div',
					{ className: 'slds-media__body' },
					_react2.default.createElement(
						'div',
						{ className: labelClassName },
						this.props.children.label
					)
				);
			}
			return label;
		}
	}, {
		key: 'scrollFocus',


		// Scroll menu item based on up/down mouse keys (assumes all items are the same height)
		value: function scrollFocus() {
			var height = this.itemRef.offsetHeight;
			if (height && this.props.handleItemFocus) {
				this.props.handleItemFocus(this.props.index, height);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var itemClassName = 'js-slds-lookup__item';
			var id = this.props.id;
			if (this.props.isActive) itemClassName += ' slds-theme--shade';

			return (
				// IMPORTANT: anchor id is used to set lookup's input's aria-activedescendant
				_react2.default.createElement(
					'li',
					{
						className: itemClassName,
						ref: function ref(li) {
							_this2.itemRef = li;
						}
					},
					_react2.default.createElement(
						'a',
						{
							'aria-disabled': this.props.isDisabled,
							className: 'slds-lookup__item-action slds-media slds-media--center',
							href: this.props.href,
							id: id,
							onClick: this.handleClick,
							onMouseDown: _event2.default.trapImmediate,
							ref: id,
							role: 'option',
							tabIndex: '-1'
						},
						this.getIcon(),
						this.props.listItemLabelRenderer ? this.getCustomLabel() : this.getLabel()
					)
				)
			);
		}
	}]);

	return Item;
}(_react2.default.Component);

Item.displayName = displayName;
Item.propTypes = propTypes;

exports.default = Item;