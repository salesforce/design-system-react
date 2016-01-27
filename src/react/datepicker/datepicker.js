/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// DATEPICKER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import DatepickerCore, {CONTROL} from '../../core/datepicker';

// Traits
import Openable from '../../traits/openable';
import Positionable from '../../traits/positionable';

// Framework specific
import React from 'react';
import ReactDOM from 'react-dom';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

// Children
import DateMonth from './datepicker-month';
import DateYear from './datepicker-year';
import Calendar from './datepicker-calendar';
import DateInput from './datepicker-input';

export const DatepickerObject = Lib.merge({}, DatepickerCore, {
	mixins: [State, Events, genericWillMount],

	displayName: CONTROL,

	propTypes: {
		inputLabel: React.PropTypes.string,
		modalCalendar: React.PropTypes.bool
	},

	componentWillMount () {
		Positionable.setElement(this, Positionable.attachPositionedElementToBody());
		
		this.setState({
			inputValue: this._formatSelectedDates(this.props.startDate, this.props.endDate)
		});
	},
	
	componentWillReceiveProps (nextProps) {
		this.setState({
			inputValue: this._formatSelectedDates(nextProps.startDate, nextProps.endDate)
		});
	},

	render () {
		return (
			<div className="slds-form--stacked slds-datepicker-form" ref={this._dateInputRendered} onClick={this._triggerCalendar}>
				<DateInput
					ariaLabel={this.props.inputLabel}
					selectedDate={this.state.inputValue}
					strings={this.state.strings}
					onChange={this._manualDateInput} />
					{this.props.modalCalendar ? null : this._renderCalendar()}
			</div>
		);
	},

	_renderCalendar () {
		const calendarData = this._getCalendarData();
		const isOpen = Openable.isOpen(this);

		return (
			<div className={classNames('slds-dropdown slds-dropdown--left slds-datepicker', {'slds-hidden': !isOpen})} data-selection="single">
				<div className="slds-datepicker__filter slds-grid">
					<DateMonth
						monthName={this._getMonthName()}
						jumpToPreviousMonth={this._jumpToPreviousMonth}
						jumpToNextMonth={this._jumpToNextMonth}
						strings={this.state.strings} />
					<DateYear
						getYearRange={this._getYearRangeData}
						setYear={this._jumpToYear} />
				</div>
				<Calendar
					calendarData={calendarData}
					selectDate={this._selectDate}
					multiSelect={this.props.multiSelect} />
			</div>
		);
	},

	_renderModalCalendar () {
		const calendar = this._renderCalendar();

		ReactDOM.render(calendar, Positionable.getElement(this));

		Positionable.setContainer(this, document.querySelector('body'));
		Positionable.position(this);
	},

	componentDidUpdate () {
		if (this.props.modalCalendar) {
			this._renderModalCalendar();
		}

		if (this.props.modalCalendar && Openable.isOpen(this)) {
			Positionable.show(this);
			Positionable.addEventListeners(this);
		} else if (this.props.modalCalendar && !Openable.isOpen(this)) {
			Positionable.hide(this);
			Positionable.removeEventListeners(this);
		}
	},

	_dateInputRendered (element) {
		Positionable.setTarget(this, element);
	},

	_triggerCalendar (e) {
		Openable.open(this, e.nativeEvent);
	},
	
	_manualDateInput (inputValue) {
		const validatedDates = this._getStartAndEndDatesFromString(inputValue);

		if (validatedDates && validatedDates.startDate) {
			this.setState({
				dateViewing: validatedDates.startDate
			});

			this._selectDates(validatedDates);
		} else {
			this._selectDates({
				startDate: undefined,
				endDate: undefined
			});
		}
	},

	_selectDate (dayData) {
		const date = dayData.date;
		let startDate;
		let endDate;

		if (!dayData.outside) {
			if (this.props.multiSelect) {
				startDate = this.props.startDate;
				endDate = this.props.endDate;
				
				if (!startDate || endDate) {
					startDate = date;
					endDate = undefined;
				} else if (this._roundDate(startDate).getTime() > date.getTime()) {
					endDate = startDate;
					startDate = date;
				} else {
					endDate = date;
				}
			} else {
				startDate = date;
			}
		
			this._selectDates({
				startDate,
				endDate
			});
		}
	},

	_selectDates (dates) {
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(dates.startDate, dates.endDate);
		}

		Lib.returnFocusToPopupTrigger(this);
	}
});

let Datepicker = Lib.merge({}, DatepickerCore, DatepickerObject);

Datepicker = Lib.runHelpers('react', CONTROL, Datepicker);
Datepicker = React.createClass(Datepicker);

export default Datepicker;
