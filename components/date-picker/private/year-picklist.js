define(['exports', 'react', 'create-react-class', 'prop-types', '../../menu-picklist'], function (exports, _react, _createReactClass, _propTypes, _menuPicklist) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _menuPicklist2 = _interopRequireDefault(_menuPicklist);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	var DatepickerYearSelector = (0, _createReactClass2.default)({
		displayName: 'SLDSDatepickerYearSelector',

		propTypes: {
			/**
    * HTML id for component
    */
			id: _propTypes2.default.string,
			/**
    * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
    */
			initialDateForCalendarRender: _propTypes2.default.instanceOf(Date).isRequired,
			/**
    * Displayed calendar has changed or re-rendered
    */
			onChangeMonth: _propTypes2.default.func.isRequired,
			/**
    * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
    */
			relativeYearFrom: _propTypes2.default.number,
			/**
    * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
    */
			relativeYearTo: _propTypes2.default.number,
			/**
    * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
    */
			yearPicklistButtonRef: _propTypes2.default.func
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
					id: this.props.id + '-year-picklist',
					menuPosition: 'relative',
					onSelect: this.handleSelect,
					options: this.getOptions(),
					placeholder: 'Year',
					value: this.props.initialDateForCalendarRender.getFullYear()
				})
			);
		}
	});

	exports.default = DatepickerYearSelector;
});