// DATEPICKER CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import DatepickerCore, {CONTROL} from '../../core/datepicker';

// Traits
import Eventable from '../../traits/eventable';
import Multiselectable from '../../traits/multiselectable';
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
		dateRange: React.PropTypes.array,
		inputLabel: React.PropTypes.string,
		modalCalendar: React.PropTypes.bool,
		selection: React.PropTypes.any
	},

	componentWillMount () {
		Positionable.setElement(this, Positionable.attachPositionedElementToBody());
		
		Eventable.on(this, 'select', this._onSelect);
		Eventable.on(this, 'deselect', this._onDeselect);
	},

	render () {
		const selectedDates = this.props.selection;
		const selDateFormatted = selectedDates.length ? this._formatDate(selectedDates[0]) : '';

		return (
			<div className="slds-form--stacked slds-datepicker-form" ref={this._dateInputRendered} onClick={this._triggerCalendar}>
				<DateInput
					ariaLabel={this.props.inputLabel}
					selectedDate={selDateFormatted}
					strings={this.state.strings}/>
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
	},

	_onSelect (itemsToSelect, selection) {
		if (Lib.isFunction(this.props.onSelect)) {
			this.props.onSelect(itemsToSelect, selection._data);
		}
		
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	},

	_onDeselect (itemsToDeselect, selection) {
		if (Lib.isFunction(this.props.onDeselect)) {
			this.props.onDeselect(itemsToDeselect, selection._data);
		}
		
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(selection._data);
		}
	}
});

let Datepicker = Lib.merge({}, DatepickerCore, DatepickerObject);

Datepicker = Lib.runHelpers('react', CONTROL, Datepicker);
Datepicker = React.createClass(Datepicker);

export default Datepicker;
