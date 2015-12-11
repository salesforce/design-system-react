// DATEPICKER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import DatepickerCore, {CONTROL} from '../../core/datepicker';

// Traits
import Multiselectable from '../../traits/multiselectable';
import Openable from '../../traits/openable';
import Positionable from '../../traits/positionable';

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
		inputLabel: React.PropTypes.string,
		modalMenu: React.PropTypes.bool,
		selection: React.PropTypes.any
	},

	render () {
		const calendarData = this._getCalendarData();
		const selectedDates = this.props.selection;
		const selDateFormatted = selectedDates.length ? this._formatDate(selectedDates[0]) : '';
		const isOpen = Openable.isOpen(this);

		if (this.props.modalMenu && this.refs.dropdown) {
			Positionable.setElement(this, this.refs.dropdown);
			Positionable.setContainer(this, this.refs.container);
			Positionable.setTarget(this, this.refs.container);
		}
		
		return (
			<div className="slds-form--stacked slds-datepicker-form" ref="container" onClick={this._triggerCalendar}>
				<DateInput
					ariaLabel={this.props.inputLabel}
					selectedDate={selDateFormatted}
					strings={this.state.strings}/>
				<div className={classNames('slds-dropdown slds-dropdown--left slds-datepicker', {'slds-hidden': !isOpen})} ref="dropdown" data-selection="single">
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

	componentDidUpdate () {
		if (this.props.modalMenu && this.refs.dropdown) {
			Positionable.position(this);
		}
	},

	_triggerCalendar (e) {
		Openable.open(this, e.nativeEvent);
	},

	_selectDate (date) {
		const isRangeSelect = this.props.multiSelect;
		const selectedItems = this.props.selection;
		let insertIndex = 1;

		if (isRangeSelect) {
			if (selectedItems && selectedItems.length === 1 && selectedItems[0].date.getTime() > date.date.getTime()) {
				insertIndex = 0;
			}

			Multiselectable.selectItem(this, { date: date.date }, selectedItems, insertIndex);
		} else {
			Multiselectable.selectItem(this, { date: date.date }, selectedItems);
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
