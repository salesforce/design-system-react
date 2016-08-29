define(['module', 'react', 'lodash.isdate', '../menu-dropdown', './dropdown-trigger', '../../utilities/constants'], function (module, _react, _lodash, _menuDropdown, _dropdownTrigger, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

	var _dropdownTrigger2 = _interopRequireDefault(_dropdownTrigger);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
 *  Component description.
 */


	// ### isDate
	var Timepicker = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.TIME_PICKER,

		// ### Prop Types
		propTypes: {
			constrainToScrollParent: _react.PropTypes.bool,
			/**
    * Disables the input and prevents editing the contents.
    */
			disabled: _react.PropTypes.bool,
			/**
    * Time formatting function
    */
			formatter: _react.PropTypes.func,
			inheritTargetWidth: _react.PropTypes.bool,
			/**
    * This label appears above the input.
    */
			label: _react.PropTypes.string,
			/**
    * Custom element that overrides the default Menu Item component.
    */
			listItemRenderer: _react.PropTypes.func,
			/**
    * Renders menu within an absolutely positioned container at an elevated z-index.
    */
			modal: _react.PropTypes.bool,
			/**
    * Receives the props `(dateValue, stringValue)`
    */
			onDateChange: _react.PropTypes.func,
			/**
    * Parsing date string into Date
    */
			parser: _react.PropTypes.func,
			/**
    * Text that will appear in an empty input.
    */
			placeholder: _react.PropTypes.string,
			/**
    * If true, adds asterisk next to input label to indicate it is a required field.
    */
			required: _react.PropTypes.bool,
			stepInMinutes: _react.PropTypes.number,
			strValue: _react.PropTypes.string,
			/**
    * Date
    */
			value: _react.PropTypes.instanceOf(Date)
		},

		getDefaultProps: function getDefaultProps() {
			return {
				formatter: function formatter(date) {
					if (date) {
						return date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
					}

					return null;
				},

				modal: false,
				parser: function parser(timeStr) {
					var date = new Date();
					var dateStr = date.toLocaleString(navigator.language, { year: 'numeric', month: 'numeric', day: 'numeric' });
					return new Date(dateStr + ' ' + timeStr);
				},

				placeholder: 'Pick Time',
				value: null,
				stepInMinutes: 30
			};
		},
		getInitialState: function getInitialState() {
			return {
				value: this.props.value,
				strValue: this.props.strValue,
				options: this.getOptions()
			};
		},
		getOptions: function getOptions() {
			var baseDate = new Date();
			var options = [];

			baseDate.setHours(0);
			baseDate.setMinutes(0);
			baseDate.setSeconds(0);
			baseDate.setMilliseconds(0);

			var curDate = new Date(baseDate);

			while (baseDate.getDate() === curDate.getDate()) {
				var formatted = this.props.formatter(curDate);

				options.push({
					label: formatted,
					value: new Date(curDate)
				});

				curDate.setMinutes(curDate.getMinutes() + this.props.stepInMinutes);
			}

			return options;
		},
		parseDate: function parseDate(strValue) {
			var newDate = this.props.parser(strValue);

			if ((0, _lodash2.default)(newDate)) {
				if (!isNaN(newDate.getTime())) {
					return newDate;
				}
			}

			return new Date();
		},
		render: function render() {
			return _react2.default.createElement(
				_menuDropdown2.default,
				{
					checkmark: false,
					constrainToScrollParent: this.props.constrainToScrollParent,
					disabled: this.props.disabled,
					inheritTargetWidth: this.props.inheritTargetWidth,
					label: this.props.label,
					listItemRenderer: this.props.listItemRenderer
					// inline style override
					, menuStyle: {
						maxHeight: '20em',
						overflowX: 'hidden',
						minWidth: '100%'
					},
					modal: this.props.modal,
					onSelect: this.handleSelect,
					options: this.state.options
				},
				_react2.default.createElement(_dropdownTrigger2.default, {
					onChange: this.handleInputChange,
					iconCategory: 'utility',
					iconName: 'clock',
					iconPosition: 'right',
					placeholder: this.props.placeholder,
					required: this.props.required,
					type: 'text',
					value: this.state.strValue
				})
			);
		},
		handleChange: function handleChange(date, strValue) {
			this.setState({
				value: date,
				strValue: strValue
			});

			if (this.props.onDateChange) {
				this.props.onDateChange(date, strValue);
			}
		},
		handleSelect: function handleSelect(val) {
			if (val && val.value) {
				this.handleChange(val.value, val.label);
			}
		},
		handleInputChange: function handleInputChange(event) {
			var strValue = event.target.value;

			this.setState({
				strValue: strValue
			});

			if (this.props.onDateChange) {
				var parsedDate = this.props.parser(strValue);
				this.props.onDateChange(parsedDate, strValue);
			}
		}
	});

	// ## Constants


	// ### Dropdown
	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	// # Timepicker Component

	// ## Dependencies

	// ### React


	module.exports = Timepicker;
});