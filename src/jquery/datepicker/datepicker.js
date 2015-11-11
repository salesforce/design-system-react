// DATEPICKER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import DatepickerCore, {CONTROL} from '../../core/datepicker';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import Svg from '../svg';

// Children
import Picklist from '../picklist/picklist';
import Button from '../button/button';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './datepicker-template';

let Datepicker = function Datepicker () {
	const options = this._getOptions(arguments);

	this.template = $(template);
	this.$weekTemplate = $('<tr></tr>');
	this.$dayTemplate = $('<td role="gridcell" aria-disabled="true"><span class="slds-day"></span></td>');
	this._closeOnClick = $.proxy(this._closeOnClick, this);

	this._initialize(options);
};

Lib.extend(Datepicker.prototype, DatepickerCore, Events, State, Svg, DOM, {

	_onBeforeInitialize (options) {
		this.elements = {};

		if (options.wrapper) {
			this.appendTo(options.wrapper);
			delete options.wrapper;
		}

		this._initializeState();
	},

	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();

		this.elements.formElement = this.$el.find('.slds-form-element');
		this.elements.input = this.$el.find('.slds-input');
		this.elements.datepicker = this.$el.find('.slds-datepicker');
		this.elements.dropdown = this.$el.find('.slds-dropdown');
		this.elements.calendar = this.$el.find('.datepicker__month');
		this.elements.calendarDays = this.elements.calendar.find('tbody');
		this.elements.monthName = this.$el.find('.slds-datepicker__filter--month h2');
		this.elements.year = this.$el.find('.slds-datepicker__filter .slds-picklist');

		this.elements.popover = Lib.wrapElement(this.elements.datepicker);
		this.elements.container = Lib.wrapElement(this.$el);
		this.elements.align = Lib.wrapElement(this.elements.formElement);

		const $icon = this._renderIcon('utility.event', 'slds-input__icon slds-icon-text-default');
		this.elements.formElement.find('x-svg').replaceWith($icon);

		/* TODO: Needs internationalization */
		const $previousMonthButton = new Button({
			assistiveText: 'Previous Month',
			iconStyle: 'icon-container',
			icon: 'utility.left',
			iconSize: 'small'
		});
		this.elements.dropdown.find('x-previous-month-button').replaceWith($previousMonthButton.element);

		/* TODO: Needs internationalization */
		const $nextMonthButton = new Button({
			assistiveText: 'Next Month',
			iconStyle: 'icon-container',
			icon: 'utility.right',
			iconSize: 'small'
		});
		this.elements.dropdown.find('x-next-month-button').replaceWith($nextMonthButton.element);
	},

	_bindUIEvents () {
		this.element.on('click.slds-datepicker-form', $.proxy(this._triggerCalendar, this));

		this.element.on('click.slds-datepicker-form', '.slds-datepicker__filter--month .slds-button:eq(0)', $.proxy(this._backMonth, this));
		this.element.on('click.slds-datepicker-form', '.slds-datepicker__filter--month .slds-button:eq(1)', $.proxy(this._forwardMonth, this));

		this.element.on('click.slds-datepicker-form', '.slds-day', $.proxy(this._selectDate, this));
	},

	_render () {
		this._renderDateRange();

		return this.element;
	},

	_onRendered () {
		this._bindUIEvents();
	},
	
	_onExpandOrCollapse () {
		this.elements.datepicker.toggleClass('slds-hidden', !this.getState('isOpen'));
		this._updatePosition();
	},

	_triggerCalendar (e) {
		e.originalEvent.originator = this;
		if (!this.getState('isOpen')) this.open();
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

			this.elements.year.on('changed', $.proxy(this._updateYear, this));
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

Datepicker = Lib.runHelpers('jquery', CONTROL, Datepicker);

export default Datepicker;
