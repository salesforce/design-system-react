define(['module', 'react', '../../menu-picklist'], function (module, _react, _menuPicklist) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _menuPicklist2 = _interopRequireDefault(_menuPicklist);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	var DatepickerYearSelector = _react2.default.createClass({
		displayName: 'SLDSDatepickerYearSelector',

		propTypes: {
			/**
    * HTML id for component
    */
			id: _react.PropTypes.string,
			/**
      * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
      */
			initialDateForCalendarRender: _react.PropTypes.instanceOf(Date).isRequired,
			/**
    * Displayed calendar has changed or re-rendered
    */
			onChangeMonth: _react.PropTypes.func.isRequired,
			/**
    * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
    */
			relativeYearFrom: _react.PropTypes.number,
			/**
    * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
    */
			relativeYearTo: _react.PropTypes.number,
			/**
    * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
    */
			yearPicklistButtonRef: _react.PropTypes.func
		},

		getOptions: function getOptions() {
			var now = new Date();
			var fromYear = now.getFullYear() + this.props.relativeYearFrom;
			var toYear = now.getFullYear() + this.props.relativeYearTo;
			var opts = [];

			for (var year = fromYear; year < toYear; year++) {
				opts.push({ label: '' + year, value: year });
			}
			return opts;
		},
		handleSelect: function handleSelect(selectedValue) {
			if (selectedValue) {
				this.props.onChangeMonth(new Date(this.props.initialDateForCalendarRender.setFullYear(parseInt(selectedValue.value, 10))));
			}
		},
		render: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'slds-form-element' },
				_react2.default.createElement(_menuPicklist2.default, {
					buttonRef: this.props.yearPicklistButtonRef,
					checkmark: false,
					className: 'slds-picklist--fluid slds-shrink-none',
					initialFocus: true,
					isInline: true,
					id: this.props.id + '-year-picklist',
					onSelect: this.handleSelect,
					options: this.getOptions(),
					placeholder: 'Year',
					value: this.props.initialDateForCalendarRender.getFullYear()
				})
			);
		}
	});

	module.exports = DatepickerYearSelector;
});