/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Datepicker Component --- jQuery Facade

// Implements the [Datepicker design pattern](https://www.lightningdesignsystem.com/components/datepickers) in jQuery. Provides a text input form element with a calendar. You can select a single date or date range from a popup or inline calendar.

// [![Datepicker component example screenshot](/assets/demo-site/images/component-examples/datepicker.png "See a live example of the Datepicker component in action")](/jquery/datepicker)

// > See a [live example](/jquery/datepicker) of the Datepicker component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                    from '../../lib/lib';

// Use the [shared core](../../core/datepicker.html), which contains logic that is
// the same in every facade.
import DatepickerCore, { CONTROL } from '../../core/datepicker';

// ### Traits

// #### Openable
// * [../../traits/openable](../../traits/openable.html)
import Openable                    from '../../traits/openable';

// #### Positionable
// * [../../traits/positionable](../../traits/positionable.html)
import Positionable                from '../../traits/positionable';

// ### jQuery
// jQuery is an external dependency of the project.
import $ from 'jquery';

// ### Mixins

// These are mixins that appear in every Façade, bringing consistency between
// how each framework deals with instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                         from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                      from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                       from '../state';

// #### Svg
// [../svg](../svg.html)
import Svg                         from '../svg';

// ### Children

// #### Picklist
// [../picklist/picklist](../picklist/picklist.html)
import Picklist                    from '../picklist/picklist';

// #### Button
// [../button/button](../button/button.html)
import Button                      from '../button/button';

// #### Datepicker Template
// [./datepicker-template](./datepicker-template.html)
import template                    from './datepicker-template';

// ## Datepicker Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let Datepicker = function Datepicker () {
	const options = this._getOptions(arguments);

	this.template = $(template);
	this.$weekTemplate = $('<tr></tr>');
	this.$dayTemplate = $('<td role="gridcell" aria-disabled="true"><span class="slds-day"></span></td>');

	this._initialize(options);
};

Lib.extend(Datepicker.prototype, DatepickerCore, Events, State, Svg, DOM, {

	// ### On Before Initialize
	_onBeforeInitialize (options) {
		this.elements = {};

		if (options.wrapper) {
			this.appendTo(options.wrapper);
			delete options.wrapper;
		}

		this._initializeState();
	},

	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();

		this.elements.formElement = this.$el.find('.slds-form-element');
		this.elements.input = this.$el.find('.slds-input');
		this.elements.dropdown = this.$el.find('.slds-dropdown');

		if (this.getProperty('modalCalendar')) {
			Positionable.setElement(this, Positionable.attachPositionedElementToBody());
			Positionable.setContainer(this, document.querySelector('body'));
			Positionable.setTarget(this, this.elements.formElement);

			this.elements.dropdown = $(Positionable.getElement(this)).append(this.elements.dropdown).find('.slds-dropdown');
		}

		this.elements.calendar = this.elements.dropdown.find('.datepicker__month');
		this.elements.calendarDays = this.elements.calendar.find('tbody');
		this.elements.monthName = this.elements.dropdown.find('.slds-datepicker__filter--month h2');
		this.elements.year = this.elements.dropdown.find('.slds-datepicker__filter .slds-picklist');

		const $icon = this._renderIcon('utility.event', 'slds-input__icon slds-icon-text-default');
		$icon.replaceAll(this.elements.formElement.find('x-input-icon')[0]);
	},

	// ### Bind Ui Events
	_bindUIEvents () {
		this.elements.input.on('click.slds-form-element', this._triggerCalendar.bind(this));
		this.elements.input.on('change.slds-form-element', this._manualDateInput.bind(this));

		this.elements.dropdown.on('click.slds-datepicker', this._cancelEventProp);
		this.elements.dropdown.on('click.slds-datepicker-form', '.slds-datepicker__filter--month .slds-button:eq(0)', this._backMonth.bind(this));
		this.elements.dropdown.on('click.slds-datepicker-form', '.slds-datepicker__filter--month .slds-button:eq(1)', this._forwardMonth.bind(this));
		this.elements.dropdown.on('click.slds-datepicker-form', '.slds-day', this._selectDate.bind(this));
	},

	// ### Render
	_render () {
		const strings = this.getState('strings');

		this.elements.input.attr('placeholder', strings.DATE_FORMAT);

		if (this.getProperty('inputLabel')) {
			this.elements.input.attr('placeholder', this.getProperty('inputLabel'));
			this.elements.input.attr('aria-label', this.getProperty('inputLabel'));
		}

		const $previousMonthButton = new Button({
			assistiveText: strings.PREVIOUS_MONTH,
			iconStyle: 'icon-container',
			icon: 'utility.left',
			iconSize: 'small'
		});
		$previousMonthButton.replaceAll(this.elements.dropdown.find('x-previous-month-button')[0]);

		const $nextMonthButton = new Button({
			assistiveText: strings.NEXT_MONTH,
			iconStyle: 'icon-container',
			icon: 'utility.right',
			iconSize: 'small'
		});
		$nextMonthButton.replaceAll(this.elements.dropdown.find('x-next-month-button')[0]);

		return this.element;
	},

	// ### On Rendered
	_onRendered () {
		this._bindUIEvents();
	},

	// ### On Opened
	_onOpened () {
		this.setState({
			dateViewing: this.getProperty('startDate') || new Date()
		});

		this._renderDateRange();

		this.elements.dropdown.removeClass('slds-hidden');
		if (this.getProperty('modalCalendar')) {
			Positionable.position(this);
			Positionable.show(this);
		}
	},

	// ### On Closed
	_onClosed () {
		this.elements.dropdown.addClass('slds-hidden');
		if (this.getProperty('modalCalendar')) {
			Positionable.hide(this);
		}
	},

	// ### Trigger Calendar
	_triggerCalendar (e) {
		Openable.open(this, e.originalEvent);
	},

	// ### Cancel Event Prop
	_cancelEventProp (e) {
		e.stopPropagation();
	},

	// ### Render Date Range
	_renderDateRange () {
		this._renderCalender();
		this._renderMonth();
		this._renderYearPicklist();
	},

	// ### Render Calender
	_renderCalender () {
		const self = this;
		const calenderData = this._getCalendarData();
		const multiSelect = this.getProperty('multiSelect');

		self.elements.calendarDays.empty();

		calenderData.forEach( function (week) {
			const $weekMarkup = self.$weekTemplate.clone();

			week.forEach( function (day) {
				const $dayMarkup = self.$dayTemplate.clone();
				const $daySpan = $dayMarkup.find('.slds-day');
				let specialClasses = '';

				if (day.outside) {
					specialClasses += 'slds-disabled-text ';
				}

				if (day.today) {
					specialClasses += 'slds-is-today ';
				}

				if (day.selected) {
					specialClasses += 'slds-is-selected ';

					if (multiSelect) {
						specialClasses += 'slds-is-selected-multi';
					}
				}

				if (specialClasses) {
					$dayMarkup.addClass(specialClasses);
				}

				$daySpan.html(day.day);
				$daySpan.data(day);

				$weekMarkup.append($dayMarkup);
			});

			self.elements.calendarDays.append($weekMarkup);
		});
	},

	// ### Render Month
	_renderMonth () {
		const monthName = this._getMonthName();

		this.elements.monthName.html(monthName);
	},

	// ### Render Year Picklist
	_renderYearPicklist () {
		const yearRange = this._getYearRangeData();

		if (this.yearPicklist) {
			this.yearPicklist.setSelection(yearRange.selection);
		} else {
			this.yearPicklist = new Picklist(this.elements.year, yearRange);

			this.elements.year.on('changed', this._updateYear.bind(this));
		}
	},

	// ### Update Year
	_updateYear (e, data) {
		e.stopPropagation();

		if (data && data.value && this._jumpToYear(data.value)) {
			this._renderDateRange();
		}
	},

	// ### Back Month
	_backMonth (e) {
		e.stopPropagation();

		if (this._jumpToPreviousMonth()) {
			this._renderDateRange();
		}
	},

	// ### Forward Month
	_forwardMonth (e) {
		e.stopPropagation();

		if (this._jumpToNextMonth()) {
			this._renderDateRange();
		}
	},

	// ### Manual Date Input
	_manualDateInput () {
		const inputValue = this.elements.input.val() || '';
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
	_selectDate (e) {
		const dayData = $(e.currentTarget).data();
		const date = dayData.date;
		let startDate;
		let endDate;

		e.stopPropagation();

		if (!dayData.outside) {
			if (this.getProperty('multiSelect')) {
				startDate = this.getProperty('startDate');
				endDate = this.getProperty('endDate');

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
		this.setProperties(dates);

		this.elements.input.val(this._formatSelectedDates(this.getProperty('startDate'), this.getProperty('endDate')));
		this._renderDateRange();

		this.trigger('changed', dates.startDate, dates.endDate);

		Lib.returnFocusToPopupTrigger(this);
	}
});


// ### Run the helpers

// `Helpers` are a feature of Façades that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// For example, in jQuery facade uses this mechanism to optionally create
// jQuery plug-in versions of each component. Nothing in the component itself
// should ever depend on the presence of helpers, as they are completely
// optional.

Datepicker = Lib.runHelpers('jquery', CONTROL, Datepicker);

export default Datepicker;
