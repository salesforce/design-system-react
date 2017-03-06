define(['exports', 'react', 'classnames', '../button', '../popover', 'shortid', '../../utilities/constants'], function (exports, _react, _classnames, _button, _popover, _shortid, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _button2 = _interopRequireDefault(_button);

	var _popover2 = _interopRequireDefault(_popover);

	var _shortid2 = _interopRequireDefault(_shortid);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * A Filter is a popover with custom trigger. It is used by Panel Filtering
  */


	// ### shortid
	// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
	// shortid is a short, non-sequential, url-friendly, unique id generator
	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	/* eslint-disable no-script-url */

	// # Filter

	// Implements part of the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
	// Based on SLDS v2.2.0-rc.1

	// ## Dependencies

	// ### React
	var Filter = _react2.default.createClass({
		displayName: _constants.FILTER,

		propTypes: {
			/**
    * Aligns the popover with the respective side of the trigger. That is `left` will place the `Popover` to the left of the Filter.
    */
			align: _react.PropTypes.oneOf(['left', 'right']),
			/**
    * Assistive text for removing a filter. The default is `Remove Filter: ${this.props.property} ${this.props.predicate}`.
    */
			assistiveTextRemoveFilter: _react.PropTypes.string,
			/**
    * Assistive text for changing a filter.
    */
			assistiveTextEditFilter: _react.PropTypes.string,
			/**
    * Assistive text for Popover heading.
    */
			assistiveTextEditFilterHeading: _react.PropTypes.string,
			/**
    * Contents of popover. That is the dropdowns and inputs that set the filter criteria. Dropdowns, Picklists and other menus must use `isInline` to work properly within a Popover.
    */
			children: _react.PropTypes.node,
			/**
    * Applies error state styling. Per filter error messages are outside this components.
    */
			isError: _react.PropTypes.bool,
			/**
    * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. An `id` will be generated if none is supplied.
    */
			id: _react.PropTypes.string,
			/**
    * If true, the filter will not display an editing popover when clicked.
    */
			isLocked: _react.PropTypes.bool,
			/**
    * Applies new filter styling.
    */
			isNew: _react.PropTypes.bool,
			/**
    * If true, the filter will not include a remove button.
    */
			isPermanent: _react.PropTypes.bool,
			/**
    * Will be triggered when Done within the Popover is clicked. This is the place to update the filter props displayed. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
    */
			onChange: _react.PropTypes.func,
			/**
    * Will be triggered when "Remove Filter" button is clicked. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
    */
			onRemove: _react.PropTypes.func,
			/**
    * The criteria you are filtering for. For instance, if "Hair Color is PURPLE" is your filter, "is PURPLE" is your filter predicate.
    */
			predicate: _react.PropTypes.node,
			/**
    * The property you are filtering. For instance, if "Hair Color is PURPLE" is your filter, "Hair Color" is your filter property.
    */
			property: _react.PropTypes.node
		},

		getDefaultProps: function getDefaultProps() {
			return {
				align: 'left',
				assistiveTextEditFilter: 'Edit filter:',
				assistiveTextEditFilterHeading: 'Choose filter criteria',
				predicate: 'New Filter'
			};
		},
		getInitialState: function getInitialState() {
			return {
				popoverIsOpen: false
			};
		},
		componentWillMount: function componentWillMount() {
			this.generatedId = _shortid2.default.generate();
		},
		getId: function getId() {
			return this.props.id || this.generatedId;
		},
		handleFilterClick: function handleFilterClick() {
			this.setState({ popoverIsOpen: true });
		},
		handleClose: function handleClose() {
			this.setState({ popoverIsOpen: false });
		},
		handleChange: function handleChange(event) {
			this.setState({ popoverIsOpen: false });

			if (this.props.onChange) {
				this.props.onChange(event, { id: this.getId() });
			}
		},
		handleRemove: function handleRemove(event) {
			if (this.props.onRemove) {
				this.props.onRemove(event, { id: this.getId() });
			}
		},
		render: function render() {
			var popoverBody = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h4',
					{ className: 'slds-assistive-text', id: this.getId() + '-popover-heading' },
					this.props.assistiveTextEditFilterHeading
				),
				this.props.children,
				_react2.default.createElement(
					'div',
					{ className: 'slds-m-top--small slds-text-align--right' },
					_react2.default.createElement(_button2.default, {
						className: 'slds-col--bump-left',
						label: 'Done',
						onClick: this.handleChange
					})
				)
			);

			/* TODO: Button wrapper for property and predictate should be transitioned to `Button` component. `Button` needs to take custom children first though. */

			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-filters__item', 'slds-grid', 'slds-grid--vertical-align-center', {
						'slds-is-locked': this.props.isLocked,
						'slds-is-new': this.props.isNew,
						'slds-has-error': this.props.isError
					})
				},
				!this.props.isLocked && this.props.children ? _react2.default.createElement(
					_popover2.default,
					{
						ariaLabelledby: this.getId() + '-popover-heading',
						align: this.props.align,
						body: popoverBody // this is wrapped props.children essentially
						, heading: '',
						id: this.getId(),
						isOpen: this.state.popoverIsOpen

						// MAGIC NUMBERS - REMOVE/REDESIGN WHEN DESIGN FOR RIGHT-ALIGNED FILTERS ARE ADDED TO SLDS
						, offset: this.props.align === 'right' ? '0px -35px' : undefined,
						onClose: this.handleClose,
						onRequestClose: this.handleClose,
						triggerClassName: 'slds-grow'
					},
					_react2.default.createElement(
						'button',
						{
							className: 'slds-button--reset slds-grow slds-has-blur-focus',
							onClick: this.handleFilterClick,
							'aria-describedby': this.props.isError ? this.getId() + '-error' : undefined
						},
						_react2.default.createElement(
							'span',
							{ className: 'slds-assistive-text' },
							this.props.assistiveTextEditFilter
						),
						this.props.property ? _react2.default.createElement(
							'p',
							{ className: 'slds-text-body--small' },
							this.props.property
						) : null,
						_react2.default.createElement(
							'p',
							null,
							this.props.predicate
						)
					)
				) : _react2.default.createElement(
					'button',
					{
						'aria-describedby': this.props.isError ? this.getId() + '-error' : undefined,
						className: 'slds-button--reset slds-grow slds-has-blur-focus',
						disabled: true
					},
					_react2.default.createElement(
						'p',
						{ className: 'slds-text-body--small' },
						this.props.property
					),
					_react2.default.createElement(
						'p',
						null,
						this.props.predicate
					)
				),
				// Close button
				!this.props.isPermanent && !this.props.isLocked ? _react2.default.createElement(_button2.default, {
					assistiveText: this.props.assistiveTextRemoveFilter || 'Remove Filter: ' + this.props.property + ' ' + this.props.predicate,
					hint: true,
					iconCategory: 'utility',
					iconName: 'close',
					iconSize: 'small',
					iconVariant: 'bare',
					onClick: this.handleRemove,
					title: this.props.assistiveTextRemoveFilter || 'Remove Filter: ' + this.props.property + ' ' + this.props.predicate,
					variant: 'icon'
				}) : null
			);
		}
	});

	// ## Constants


	// ### classNames
	exports.default = Filter;
});