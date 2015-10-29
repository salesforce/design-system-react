// DATEPICKER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import DatepickerCore, {CONTROL} from '../../core/datepicker';

// Framework specific
import React from 'react';
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

	propTypes: {
		dateRange: React.PropTypes.array
	},

	getInitialState () {
		return {
			isOpen: false
		};
	},

	render () {
		const calendarData = this._getCalendarData();
		const selectedDates = this._getSelectedItems();
		const selDate = selectedDates[0] ? selectedDates[0].date : null;// TODO enable date range selection
		const selDateFormatted = selDate ? this._formatDate(selDate) : '';

		return (
			<div className="slds-form--stacked slds-float--left">
				<DateInput triggerCalendar={this._triggerCalendar} selectedDate={selDateFormatted}/>
				<div className={classNames('slds-dropdown slds-dropdown--left slds-datepicker', {'slds-hidden': !this.state.isOpen})} data-selection="single">
					<div className="slds-datepicker__filter slds-grid">
						<DateMonth monthName={this._getMonthName()} setViewingDate={this._setViewingDate} dateViewing={this.state.dateViewing}/>
						<DateYear getYearRange={this._getYearRangeData} setViewingDate={this._setViewingDate} dateViewing={this.state.dateViewing}/>
					</div>
					<Calendar calendarData={calendarData} selectDate={this._selectDate} />
				</div>
			</div>
		);
	},

	_triggerCalendar () {
		this.setState({
			isOpen: !this.state.isOpen
		});
	},

	_selectDate (date) {
		this._selectItem(this._getItemAdapter({ date: date.date }));
		this.props.onSelectDate(date.date);
	},

	_setViewingDate (date) {
		this.setState({
			dateViewing: date
		});
	}
});

let Datepicker = Lib.merge({}, DatepickerCore, DatepickerObject);

Datepicker = Lib.runHelpers('react', CONTROL, Datepicker);
Datepicker = React.createClass(Datepicker);

export default Datepicker;
