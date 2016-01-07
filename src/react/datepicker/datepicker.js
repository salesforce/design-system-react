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
			inputValue: this._formatSelectedDates()
		});
	},
	
	componentWillReceiveProps (nextProps) {
		if (nextProps.startDate || nextProps.endDate) {
			this.setState({
				inputValue: this._formatSelectedDates(nextProps.startDate, nextProps.endDate)
			});
		}
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
						setViewingDate={this._jumpToDate}
						dateViewing={this.state.dateViewing}
						strings={this.state.strings}/>
					<DateYear
						getYearRange={this._getYearRangeData}
						setViewingDate={this._jumpToDate}
						dateViewing={this.state.dateViewing}/>
				</div>
				<Calendar
					calendarData={calendarData}
					selectDate={this._selectDate}
					multiSelect={this.props.multiSelect}/>
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
		this.setState({
			inputValue
		});
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
	}
});

let Datepicker = Lib.merge({}, DatepickerCore, DatepickerObject);

Datepicker = Lib.runHelpers('react', CONTROL, Datepicker);
Datepicker = React.createClass(Datepicker);

export default Datepicker;
