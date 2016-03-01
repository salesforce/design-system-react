/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Datepicker Component --- SLDS for React

// Implements the [Datepicker design pattern](https://www.lightningdesignsystem.com/components/datepickers) in React. Provides a text input form element with a calendar. You can select a single date or date range from a popup or inline calendar.

// [![Datepicker component example screenshot](/assets/demo-site/images/component-examples/datepicker.png "Datepicker component example screenshot")](/react/datepicker)

// > See a [live example](/react/datepicker) of the Datepicker component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                    from '../../lib/lib';

// Use the [shared core](../../core/datepicker.html), which contains logic
// that is shared across SLDS for JavaScript.
import DatepickerCore, { CONTROL } from '../../core/datepicker';

// ### Traits

// #### Openable
// * [../../traits/openable](../../traits/openable.html)
import Openable                    from '../../traits/openable';

// #### Positionable
// * [../../traits/positionable](../../traits/positionable.html)
import Positionable                from '../../traits/positionable';

// ### React and ReactDOM
// React and ReactDOM are external dependencies of the project.
import React                       from 'react';
import ReactDOM                    from 'react-dom';

// #### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// SLDS for React uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames                  from 'classnames';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                      from '../mixins/events';

// #### Generic Will Mount
// [../mixins/generic-will-mount](../mixins/generic-will-mount.html)
import genericWillMount            from '../mixins/generic-will-mount';

// #### State
// [../mixins/state](../mixins/state.html)
import State                       from '../mixins/state';

// ### Children

// Split out rendering logic for the child compoments, just to make things
// easier to read.

// #### Month
// * [./datepicker-month](./datepicker-month.html)
import DateMonth                   from './datepicker-month';

// #### Year
// * [./datepicker-year](./datepicker-year.html)
import DateYear                    from './datepicker-year';

// #### Calendar
// * [./datepicker-calendar](./datepicker-calendar.html)
import Calendar                    from './datepicker-calendar';

// #### Input
// * [./datepicker-input](./datepicker-input.html)
import DateInput                   from './datepicker-input';

// ## Date Picker Object
export const DatepickerObject = Lib.merge({}, DatepickerCore, {
	// ### Mixins

	// SLDS for React specifically is also extended via React's standard
	// mixin model. These three mixins hook into native React Wycliffe events
	// and expose functionality needed for a cross-framework core. For
	// example, some places in the core or traits a `setState` method is used.
	//
	// In React this is built in to the framework, while SLDS for jQuery
	// simply borrow the idea for its own use.
	//
	// Similarly, a `setProperties` method is available but in React it is
	// actually a `noop` because React expects a one-way data flow, while in
	// other Frameworks it typically does something very similar to
	// `setState`.
	mixins: [State, Events, genericWillMount],

	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		inputLabel    : React.PropTypes.string,
		modalCalendar : React.PropTypes.bool
	},

	// ### Component Will Mount
	componentWillMount () {
		Positionable.setElement(this, Positionable.attachPositionedElementToBody());

		this.setState({
			inputValue: this._formatSelectedDates(this.props.startDate, this.props.endDate)
		});
	},

	// ### Component Will Receive Props
	componentWillReceiveProps (nextProps) {
		this.setState({
			inputValue: this._formatSelectedDates(nextProps.startDate, nextProps.endDate)
		});
	},

	// ### Render
	render () {
		return (
			<div className="slds-form--stacked slds-datepicker-form" ref={this._dateInputRendered} onClick={this._triggerCalendar}>
				<DateInput
					ariaLabel    = {this.props.inputLabel}
					selectedDate = {this.state.inputValue}
					strings      = {this.state.strings}
					onChange     = {this._manualDateInput}
				/>
					{this.props.modalCalendar ? null : this._renderCalendar()}
			</div>
		);
	},

	// ### Render Calendar
	_renderCalendar () {
		const calendarData = this._getCalendarData();
		const isOpen = Openable.isOpen(this);

		return (
			<div className={classNames('slds-dropdown slds-dropdown--left slds-datepicker', {'slds-hidden': !isOpen})} data-selection="single">
				<div className="slds-datepicker__filter slds-grid">
					<DateMonth
						monthName           = {this._getMonthName()}
						jumpToPreviousMonth = {this._jumpToPreviousMonth}
						jumpToNextMonth     = {this._jumpToNextMonth}
						strings             = {this.state.strings}
					/>
					<DateYear
						getYearRange        = {this._getYearRangeData}
						setYear             = {this._jumpToYear}
					/>
				</div>
				<Calendar
					calendarData        = {calendarData}
					selectDate          = {this._selectDate}
					multiSelect         = {this.props.multiSelect}
				/>
			</div>
		);
	},

	// ### Render Modal Calendar
	_renderModalCalendar () {
		const calendar = this._renderCalendar();

		ReactDOM.render(calendar, Positionable.getElement(this));

		Positionable.setContainer(this, document.querySelector('body'));
		Positionable.position(this);
	},

	// ### Component Did Update
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

	// ### Date Input Rendered
	_dateInputRendered (element) {
		Positionable.setTarget(this, element);
	},

	// ### Trigger Calendar
	_triggerCalendar (e) {
		Openable.open(this, e.nativeEvent);
	},

	// ### Manual Date Input
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

	// ### Select Date
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

	// ### Select Dates
	_selectDates (dates) {
		if (Lib.isFunction(this.props.onChange)) {
			this.props.onChange(dates.startDate, dates.endDate);
		}

		Lib.returnFocusToPopupTrigger(this);
	}
});

// ## Datepicker

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Datepicker extends its [core](../../core/datepicker.html),
// which in turn extends the base component.

let Datepicker = Lib.merge(
	{},
	DatepickerCore,
	DatepickerObject
);

// ### Run the helpers

// `Helpers` are a feature of SLDS for React that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// Nothing in the component itself should ever depend on the presence
// of helpers, as they are completely optional.
Datepicker = Lib.runHelpers('react', CONTROL, Datepicker);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Datepicker = React.createClass(Datepicker);

export default Datepicker;
