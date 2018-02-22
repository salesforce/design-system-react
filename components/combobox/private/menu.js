'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	/*
  * Active descendant in menu
  */
	activeOption: _propTypes2.default.object,
	/*
  * Index of active descendant in menu
  */
	activeOptionIndex: _propTypes2.default.number,
	/**
  * CSS classes to be added to container `div` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
  */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * CSS classes to be added to tag with `.slds-dropdown`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
  */
	classNameMenu: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/*
  * Id used for assistive technology
  */
	inputId: _propTypes2.default.string,
	/**
  * Determines the height of the menu based on SLDS CSS classes.
  */
	itemVisibleLength: _propTypes2.default.oneOf([5, 7, 10]),
	/**
  * **Text labels for internationalization**
  * This object is merged with the default props object on every render.
  * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
  */
	labels: _propTypes2.default.shape({
		noOptionsFound: _propTypes2.default.string.isRequired
	}),
	/**
  * Accepts a custom menu item rendering function that becomes a custom component and is passed in the following props:
  * * `assistiveText`: Object, `assistiveText` prop that is passed into Combobox
  * * `option`: Object, option data for item being rendered that is passed into Combobox
  * * `selected`: Boolean, allows rendering of `assistiveText.optionSelectedInMenu` in Readonly Combobox
  *
  * _Tested with snapshot testing._
  */
	menuItem: _propTypes2.default.func,
	/*
  * Menu options
  */
	options: _propTypes2.default.array,
	/*
  * Callback to remove active descendent
  */
	resetActiveOption: _propTypes2.default.func,
	/*
  * Callback when option is selected with keyboard or mouse
  */
	onSelect: _propTypes2.default.func,
	/*
  * Selected options
  */
	selection: _propTypes2.default.array,
	/**
  * Changes styles of the menu option
  */
	variant: _propTypes2.default.oneOf(['icon-title-subtitle', 'checkbox']),
	isSelected: _propTypes2.default.func,
	assistiveText: _propTypes2.default.object
}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/interactive-supports-focus */

var defaultProps = {};

var Menu = function Menu(props) {
	var menuOptions = props.options.map(function (optionData, index) {
		var active = index === props.activeOptionIndex && (0, _lodash2.default)(optionData, props.activeOption);
		var selected = props.isSelected({
			selection: props.selection,
			option: optionData
		});
		var MenuItem = props.menuItem;

		return _react2.default.createElement(
			'li',
			{
				className: 'slds-listbox__item',
				key: 'menu-option-' + optionData.id,
				role: 'presentation'
			},
			{
				'icon-title-subtitle': _react2.default.createElement(
					'span',
					{ // eslint-disable-line jsx-a11y/no-static-element-interactions
						'aria-selected': active,
						id: props.inputId + '-listbox-option-' + optionData.id,
						className: (0, _classnames2.default)('slds-media slds-listbox__option', 'slds-listbox__option_entity slds-listbox__option_has-meta', { 'slds-has-focus': active }),
						onClick: function onClick(event) {
							props.onSelect(event, { option: optionData });
						},
						role: 'option'
					},
					optionData.icon && !props.menuItem ? _react2.default.createElement(
						'span',
						{ className: 'slds-media__figure' },
						optionData.icon
					) : null,
					props.menuItem ? _react2.default.createElement(MenuItem, {
						assistiveText: props.assistiveText,
						selected: selected,
						option: optionData
					}) : _react2.default.createElement(
						'span',
						{ className: 'slds-media__body' },
						_react2.default.createElement(
							'span',
							{ className: 'slds-listbox__option-text slds-listbox__option-text_entity' },
							optionData.label
						),
						_react2.default.createElement(
							'span',
							{ className: 'slds-listbox__option-meta slds-listbox__option-meta_entity' },
							optionData.subTitle
						)
					)
				),
				checkbox: _react2.default.createElement(
					'span',
					{ // eslint-disable-line jsx-a11y/no-static-element-interactions
						'aria-selected': selected,
						id: props.inputId + '-listbox-option-' + optionData.id,
						className: (0, _classnames2.default)('slds-media slds-listbox__option', ' slds-listbox__option_plain slds-media_small slds-media_center', {
							'slds-has-focus': active,
							'slds-is-selected': selected
						}),
						onClick: function onClick(event) {
							props.onSelect(event, {
								selection: props.selection,
								option: optionData
							});
						},
						role: 'option'
					},
					_react2.default.createElement(
						'span',
						{ className: 'slds-media__figure' },
						_react2.default.createElement(_icon2.default, {
							className: 'slds-listbox__icon-selected',
							category: 'utility',
							name: 'check',
							size: 'x-small'
						})
					),
					_react2.default.createElement(
						'span',
						{ className: 'slds-media__body' },
						props.menuItem ? _react2.default.createElement(MenuItem, {
							assistiveText: props.assistiveText,
							selected: selected,
							option: optionData
						}) : _react2.default.createElement(
							'span',
							{ className: 'slds-truncate', title: optionData.label },
							selected ? _react2.default.createElement(
								'span',
								{ className: 'slds-assistive-text' },
								props.assistiveText.optionSelectedInMenu
							) : null,
							' ',
							optionData.label
						)
					)
				)
			}[props.variant]
		);
	});

	return _react2.default.createElement(
		'ul',
		{
			className: (0, _classnames2.default)('slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid', {
				'slds-dropdown_length-with-icon-5': props.itemVisibleLength === 5,
				'slds-dropdown_length-with-icon-7': props.itemVisibleLength === 7,
				'slds-dropdown_length-with-icon-10': props.itemVisibleLength === 10
			}, props.classNameMenu),
			role: 'presentation'
		},
		menuOptions.length ? menuOptions : _react2.default.createElement(
			'li',
			{
				className: 'slds-listbox__item slds-listbox__status',
				role: 'status',
				'aria-live': 'polite'
			},
			_react2.default.createElement(
				'span',
				{ className: 'slds-m-left--x-large slds-p-vertical--medium' },
				props.labels.noOptionsFound
			)
		)
	);
};

Menu.displayName = 'Menu';
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

exports.default = Menu;