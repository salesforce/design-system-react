'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _constants = require('../../utilities/constants');

var _item = require('./private/item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Navigation represents a list of links that either take the user to another page or parts of the page the user is in.
 */


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
var Navigation = (0, _createReactClass2.default)({
	displayName: _constants.NAVIGATION,

	propTypes: {
		/**
   * HTML id for component. _Tested with snapshot testing._
   */
		id: _propTypes2.default.string,
		/**
   * CSS class names to be added to the container element. _Tested with snapshot testing._
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Array of categories. The required shape is: `{id: string, label: string, items: array}`. The required shape of an item is `{id: string, label: string, url: string}`. All item ids are expected to be unique. _Tested with snapshot testing._
   */
		categories: _propTypes2.default.array,
		/**
   * The ID of the item that is currently selected. Defaults to the ID of the first item. _Tested with Mocha framework._
   */
		selectedId: _propTypes2.default.string,
		/**
   * Triggered when the selection changes. It receives an event and an item object in the shape: `event, {item: [object] }`. _Tested with Mocha framework._
   */
		onSelect: _propTypes2.default.func,
		/**
   * Determines component style. _Tested with snapshot testing._
   */
		variant: _propTypes2.default.oneOf(['default', 'shade'])
	},

	getDefaultProps: function getDefaultProps() {
		return {
			variant: 'default'
		};
	},
	componentWillMount: function componentWillMount() {
		this.generatedId = _shortid2.default.generate();
	},
	getId: function getId() {
		return this.props.id || this.generatedId;
	},
	getVariant: function getVariant() {
		return this.props.variant === 'shade' ? 'shade' : 'default';
	},
	getSelectedId: function getSelectedId() {
		var categories = this.props.categories;
		var selectedId = void 0;
		if (this.props.selectedId) {
			selectedId = this.props.selectedId;
		} else if (categories.length > 0 && categories[0].items && categories[0].items.length > 0) {
			selectedId = categories[0].items[0].id;
		}
		return selectedId;
	},
	render: function render() {
		var _this = this;

		var rootId = this.getId();
		var variant = this.getVariant();
		return _react2.default.createElement(
			'div',
			{
				id: rootId,
				className: (0, _classnames2.default)('slds-grid', 'slds-grid--vertical', 'slds-navigation-list--vertical', {
					'slds-navigation-list--vertical-inverse': variant === 'shade'
				}, this.props.className)
			},
			this.props.categories.map(function (category) {
				var categoryId = rootId + '-' + category.id;
				var selectedId = _this.getSelectedId();
				return [_react2.default.createElement(
					'h2',
					{
						id: categoryId,
						key: categoryId + '-header',
						className: 'slds-text-title--caps slds-p-around--medium'
					},
					category.label
				), _react2.default.createElement(
					'ul',
					{ key: categoryId },
					category.items.map(function (item) {
						return _react2.default.createElement(_item2.default, {
							key: item.id,
							item: item,
							isSelected: item.id === selectedId,
							categoryId: categoryId,
							onSelect: _this.props.onSelect
						});
					})
				)];
			})
		);
	}
});

// Child components


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Navigation design pattern](https://lightningdesignsystem.com/components/navigation/) in React.
// Based on SLDS v2.2.1

exports.default = Navigation;