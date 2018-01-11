'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pill = require('../../utilities/pill');

var _pill2 = _interopRequireDefault(_pill);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _airbnbPropTypes = require('airbnb-prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	/*
  * The option object within the selection prop that should have focus.
  */
	activeOption: _propTypes2.default.object,
	/*
  * The index of the option object within the selection prop that should have focus.
  */
	activeOptionIndex: _propTypes2.default.number,
	/**
  * **Assistive text for accessibility**
  * This object is merged with the default props object on every render.
  * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
  * * `removePill`: Aids in keyboard interaction with Pills.
  */
	assistiveText: (0, _airbnbPropTypes.shape)({
		label: _propTypes2.default.string,
		removePill: _propTypes2.default.string
	}),
	/*
  * Callback called when pill is clicked, delete is pressed, or backspace is pressed.
  */
	events: (0, _airbnbPropTypes.shape)({
		onClickPill: _propTypes2.default.func.isRequired,
		onRequestFocus: _propTypes2.default.func.isRequired,
		onRequestFocusOnNextPill: _propTypes2.default.func.isRequired,
		onRequestFocusOnPreviousPill: _propTypes2.default.func.isRequired,
		onRequestRemove: _propTypes2.default.func.isRequired
	}),
	/**
  * HTML id for Combobox
  */
	id: _propTypes2.default.string,
	/**
  * Adds inline (inside of input) styling
  */
	isInline: _propTypes2.default.bool,
	/*
  * Pill Label
  */
	labels: (0, _airbnbPropTypes.shape)({
		label: _propTypes2.default.string,
		remove: _propTypes2.default.string,
		title: _propTypes2.default.string
	}),
	/**
  * Changes styles of the input. Currently `entity` is not supported.
  */
	renderAtSelectionLength: _propTypes2.default.number,
	/**
  * Accepts an array of item objects.
  */
	selection: _propTypes2.default.array,
	/**
  * Requests that the active option set focus on render
  */
	listboxHasFocus: _propTypes2.default.bool,
	/**
  * Changes styles of the input. Currently `entity` is not supported.
  */
	variant: _propTypes2.default.oneOf(['base', 'inline-listbox', 'readonly'])
};

var defaultProps = {
	renderAtSelectionLength: 1
};

var SelectedListBox = function SelectedListBox(props) {
	return props.selection.length >= props.renderAtSelectionLength ? _react2.default.createElement(
		'div',
		{ // eslint-disable-line jsx-a11y/role-supports-aria-props
			id: props.id + '-selected-listbox',
			role: 'listbox',
			'aria-orientation': 'horizontal'
		},
		_react2.default.createElement(
			'ul',
			{
				className: (0, _classnames2.default)('slds-listbox', {
					'slds-listbox--inline': props.isInline,
					'slds-listbox_horizontal': !props.isInline,
					'slds-p-top_xxx-small': !props.isInline
				}),
				role: 'group',
				'aria-label': props.assistiveText.selectedListboxLabel
			},
			props.selection.map(function (option, renderIndex) {
				var setActiveBasedOnstateFromParent = renderIndex === props.activeOptionIndex && (0, _lodash2.default)(option, props.activeOption);
				var listboxRenderedForFirstTime = props.activeOptionIndex === -1 && renderIndex === 0 || props.variant === 'readonly' && props.selection.length !== 1 && renderIndex === 0;
				var active = setActiveBasedOnstateFromParent || listboxRenderedForFirstTime;
				var icon = option.icon ? _react2.default.cloneElement(option.icon, {
					containerClassName: 'slds-pill__icon_container'
				}) : null;

				return _react2.default.createElement(
					'li',
					{
						role: 'presentation',
						className: 'slds-listbox__item',
						key: props.id + '-list-item-' + option.id
					},
					_react2.default.createElement(_pill2.default, {
						active: active,
						assistiveText: {
							remove: props.assistiveText.removePill
						},
						events: {
							onBlur: props.events.onBlurPill,
							onClick: function onClick(event, data) {
								props.events.onClickPill(event, _extends({}, data, {
									index: renderIndex
								}));
							},
							onRequestFocusOnNextPill: props.events.onRequestFocusOnNextPill,
							onRequestFocusOnPreviousPill: props.events.onRequestFocusOnPreviousPill,
							onRequestRemove: function onRequestRemove(event, data) {
								props.events.onRequestRemove(event, _extends({}, data, {
									index: renderIndex
								}));
							},
							onRequestFocus: props.events.onRequestFocus
						},
						eventData: { option: option },
						icon: icon,
						labels: {
							label: option.label,
							removeTitle: props.labels.removePillTitle
						},
						requestFocus: props.listboxHasFocus,
						tabIndex: active ? 0 : -1
					})
				);
			})
		)
	) : null;
};

SelectedListBox.displayName = 'SelectedListBox';
SelectedListBox.propTypes = propTypes;
SelectedListBox.defaultProps = defaultProps;

exports.default = SelectedListBox;