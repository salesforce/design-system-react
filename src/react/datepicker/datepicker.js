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

	displayName: CONTROL,

	propTypes: {
		dateRange: React.PropTypes.array,
		selection: React.PropTypes.any,
		inputLabel: React.PropTypes.string
	},

	render () {
		const calendarData = this._getCalendarData();
		const selectedDates = this.props.selection;
		const selDateFormatted = selectedDates.length ? this._formatDate(selectedDates[0]) : '';

		if (this.refs.popover) {
			this._setElements();
		}

		return (
			<div className="slds-form--stacked slds-datepicker-form" ref="container" onClick={this._triggerCalendar}>
				<DateInput
					ariaLabel={this.props.inputLabel}
					selectedDate={selDateFormatted}
					strings={this.state.strings}/>
				<div className={classNames('slds-dropdown slds-dropdown--left slds-datepicker', {'slds-hidden': !this.state.isOpen})} ref="popover" data-selection="single">
					<div className="slds-datepicker__filter slds-grid">
						<DateMonth
							monthName={this._getMonthName()}
							setViewingDate={this._setViewingDate}
							dateViewing={this.state.dateViewing}
							strings={this.state.strings}/>
						<DateYear
							getYearRange={this._getYearRangeData}
							setViewingDate={this._setViewingDate}
							dateViewing={this.state.dateViewing}/>
					</div>
					<Calendar
						calendarData={calendarData}
						selectDate={this._selectDate}
						multiSelect={this.props.multiSelect}/>
				</div>
			</div>
		);
	},

	_setElements () {
		this.elements.positionedElement = Lib.wrapElement(this.refs.popover);
		this.elements.positionableContainer = Lib.wrapElement(this.refs.container);
		this.elements.align = Lib.wrapElement(this.refs.container);
	},

	componentDidUpdate () {
		this._updatePosition();
	},

	_triggerCalendar (e) {
		e.nativeEvent.originator = this;
		if (!this.getState('isOpen')) this.open();
	},

	_selectDate (date) {
		const isRangeSelect = this.getProperty('multiSelect');
		const selectedItems = this.getProperty('selection');
		let insertIndex = 1;

		if (isRangeSelect) {
			if (selectedItems && selectedItems.length === 1 && selectedItems[0].date.getTime() > date.date.getTime()) {
				insertIndex = 0;
			}

			this.selectItem({ date: date.date }, insertIndex);
		} else {
			this.selectItem({ date: date.date });
		}
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
