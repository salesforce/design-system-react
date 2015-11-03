// DATEPICKER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import DatepickerCore, {CONTROL} from '../../core/datepicker';

// Framework Specific
import Events from '../events';
import State from '../state';

// Children
import Picklist from '../picklist/picklist';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './datepicker-template';

let Datepicker = function Datepicker (element, options) {
	this.options = Lib.extend({
		open: []
	}, options);

	this.elements = {
		wrapper: $(element)
	};

	const $html = $('<i />').append(template);
	this.template = $html.find('.' + this.cssClasses.WRAPPER);

	this.$weekTemplate = $('<tr></tr>');
	this.$dayTemplate = $('<td role="gridcell" aria-disabled="true"><span class="slds-day"></span></td>');

	this._initializeState();
	this._initialize(this.options);
};

Lib.extend(Datepicker.prototype, DatepickerCore, Events, State, {
	_onInitialized () {
		this._render();

		this.elements.wrapper.on('click.slds-datepicker-form', '.slds-input', $.proxy(this._toggleDatepicker, this));

		this.elements.wrapper.on('click.slds-datepicker-form', '.slds-datepicker__filter--month .slds-button:eq(0)', $.proxy(this._backMonth, this));
		this.elements.wrapper.on('click.slds-datepicker-form', '.slds-datepicker__filter--month .slds-button:eq(1)', $.proxy(this._forwardMonth, this));

		this.elements.wrapper.on('click.slds-datepicker-form', '.slds-day', $.proxy(this._selectDate, this));

		this.trigger('initialized');
	},

	_render () {
		const $el = this.template.clone();

		this.elements.form = $el;
		this.elements.formElement = $el.find('.slds-form-element');
		this.elements.input = $el.find('.slds-input');
		this.elements.datepicker = $el.find('.slds-datepicker');
		this.elements.calendar = $el.find('.datepicker__month');
		this.elements.calendarDays = this.elements.calendar.find('tbody');
		this.elements.monthName = $el.find('.slds-datepicker__filter--month h2');
		this.elements.year = $el.find('.slds-datepicker__filter .slds-picklist');

		this.elements.popover = Lib.wrapElement(this.elements.datepicker);
		this.elements.container = Lib.wrapElement(this.elements.form);
		this.elements.align = Lib.wrapElement(this.elements.formElement);

		// Prep for append
		this.elements.wrapper.empty();
		this.elements.wrapper.append($el);

		this._renderDateRange();
	},

	_toggleDatepicker () {
		if( this.elements.datepicker.hasClass('slds-hidden') ){
			this.elements.datepicker.removeClass('slds-hidden');
			this._updatePosition();
		} else {
			this.elements.datepicker.addClass('slds-hidden');
		}
	},

	_renderDateRange () {
		this._renderCalender();
		this._renderMonth();
		this._renderYearPicklist();
	},

	_renderCalender () {
		const self = this;
		const calenderData = this._getCalendarData();
		const isRangeSelect = this.getProperty('multiSelect');

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

					if ( isRangeSelect ) {
						specialClasses += 'slds-is-selected-multi';
					}
				}

				if( specialClasses ) {
					$dayMarkup.addClass(specialClasses);
				}

				$daySpan.html(day.day);
				$daySpan.data(day);

				$weekMarkup.append($dayMarkup);
			});

			self.elements.calendarDays.append($weekMarkup);
		});
	},

	_renderMonth () {
		const monthName = this._getMonthName();

		this.elements.monthName.html(monthName);
	},

	_renderYearPicklist () {
		const yearRange = this._getYearRangeData();

		if ( this.yearPicklist ) {
			this.yearPicklist.setSelection(yearRange.selected);
		} else {
			this.yearPicklist = new Picklist(this.elements.year, {
				collection: yearRange.all,
				selection: yearRange.selected
			});

			this.elements.year.on('changed', $.proxy(this._updateYear,this));
		}
	},

	_updateYear (event, data) {
		const curViewDate = this.getState('dateViewing');

		this.setState({ 'dateViewing': new Date(curViewDate.setYear(data.value))} );
		this._renderDateRange();
	},

	_backMonth () {
		const curMonth = this.getState('dateViewing');

		this.setState({ 'dateViewing': new Date(curMonth.setMonth(curMonth.getMonth() - 1))} );
		this._renderDateRange();
	},

	_forwardMonth () {
		const curMonth = this.getState('dateViewing');

		this.setState({ 'dateViewing': new Date(curMonth.setMonth(curMonth.getMonth() + 1))} );
		this._renderDateRange();
	},

	_selectDate (ev) {
		const isRangeSelect = this.getProperty('multiSelect');
		const dayData = $(ev.currentTarget).data();
		let insertIndex = 1;
		let selectedDates;

		if (!dayData.outside) {
			if (isRangeSelect) {
				selectedDates = this.getSelectedItems();

				if (selectedDates.length > 1) {
					this.deselectAll();
				}

				if (selectedDates.length === 1 && selectedDates[0].date.getTime() > dayData.date.getTime()) {
					insertIndex = 0;
				}

				this._selectItem(this._getItemAdapter({ date: dayData.date }), insertIndex);
			} else {
				this._selectItem(this._getItemAdapter({ date: dayData.date }));
			}
		}
	},

	_onSelected () {
		this.elements.input.val(this._formatDate());
		this._renderDateRange();
	}

});

// LEGACY METHODS

const legacyMethods = {
	getDate: function () {
		const selectedDates = this.getSelectedItems();

		return selectedDates[0] ? selectedDates[0].date : null;
	},

	getFormattedDate: function () {
		return this._formatDate();
	},

	setDate: function (date) {
		this.setState({ 'selectedDate': date });
		this._renderDateRange();

		return date;
	}
};

Datepicker = Lib.runHelpers('jquery', CONTROL, Datepicker, {
	legacyMethods
});

export default Datepicker;
