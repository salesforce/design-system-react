// DATEPICKER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import DatepickerCore, {CONTROL} from '../../core/datepicker';

// Traits
import Multiselectable from '../../traits/multiselectable';
import Openable from '../../traits/openable';

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

		this.elements.positionableElement = Lib.wrapElement(this.elements.datepicker);
		this.elements.positionableContainer = Lib.wrapElement(this.$el);
		this.elements.positionableTarget = Lib.wrapElement(this.elements.formElement);

		const $icon = this._renderIcon('utility.event', 'slds-input__icon slds-icon-text-default');
		$icon.replaceAll(this.elements.formElement.find('x-input-icon')[0]);

		const selDate = this.getProperty('dateSelected');
		if (selDate) {
			if (this.getProperty('multiSelect')) {
				this.selectDates([
					{ date: this._roundDate(selDate[0]) },
					{ date: this._roundDate(selDate[1]) }
				]);
			} else {
				this.selectDate({date: this._roundDate(selDate)});
			}
		}
	},

	_bindUIEvents () {
		this.element.on('click.slds-form-element', '.slds-input', this._triggerCalendar.bind(this));
		this.element.on('keyup.slds-form-element', '.slds-input', this._activateManualInput.bind(this));
		this.element.on('click.slds-datepicker', this._cancelEventProp);

		this.element.on('click.slds-datepicker-form', '.slds-datepicker__filter--month .slds-button:eq(0)', this._backMonth.bind(this));
		this.element.on('click.slds-datepicker-form', '.slds-datepicker__filter--month .slds-button:eq(1)', this._forwardMonth.bind(this));

		this.element.on('click.slds-datepicker-form', '.slds-day', this._selectDate.bind(this));
	},

	_render () {
		const strings = this.getState('strings');
		this.elements.input.attr('placeholder', strings.DATE_FORMAT);
		if (this.getProperty('inputLabel')) {
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

		this._renderDateRange();

		return this.element;
	},

	_onRendered () {
		this._bindUIEvents();
	},
	
	_onOpened () {
		this.elements.datepicker.toggleClass('slds-hidden', false);
		this._updatePosition();
	},
	
	_onClosed () {
		this.elements.datepicker.toggleClass('slds-hidden', true);
		this._updatePosition();
	},

	_triggerCalendar (e) {
		Openable.open(this, e.originalEvent);
	},

	_cancelEventProp (e) {
		e.stopPropagation();
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

			this.elements.year.on('changed', this._updateYear.bind(this));
		}
	},

	_updateYear (e, data) {
		const curViewDate = this.getState('dateViewing');

		e.stopPropagation();
		this.setState({ 'dateViewing': new Date(curViewDate.setYear(data.value))} );
		this._renderDateRange();
	},

	_backMonth (e) {
		const curMonth = this.getState('dateViewing');

		e.stopPropagation();
		this.setState({ 'dateViewing': new Date(curMonth.setMonth(curMonth.getMonth() - 1))} );
		this._renderDateRange();
	},

	_forwardMonth (e) {
		const curMonth = this.getState('dateViewing');

		e.stopPropagation();
		this.setState({ 'dateViewing': new Date(curMonth.setMonth(curMonth.getMonth() + 1))} );
		this._renderDateRange();
	},

	_activateManualInput () {
		this.element.off('focusout.slds-form-element', '.slds-input');
		this.element.on('focusout.slds-form-element', '.slds-input', this._manualDateInput.bind(this));
	},

	_manualDateInput () {
		const inputValue = this.elements.input.val();
		const validatedDates = this._validateDateInput(inputValue);

		if (validatedDates) {
			this.selectDates(validatedDates);
		}

		this.element.off('focusout.slds-form-element', '.slds-input');
	},

	_selectDate (e) {
		const isRangeSelect = this.getProperty('multiSelect');
		const dayData = $(e.currentTarget).data();
		let insertIndex = 1;
		let selectedDates;

		e.stopPropagation();

		if (!dayData.outside) {
			if (isRangeSelect) {
				selectedDates = this.getProperty('selection');

				if (selectedDates && selectedDates.length > 1) {
					this.setProperties({ selection: [] });
				} else if (selectedDates && selectedDates.length === 1 && selectedDates[0].date.getTime() > dayData.date.getTime()) {
					insertIndex = 0;
				}

				this.selectDate({ date: dayData.date }, insertIndex);
			} else {
				this.selectDate({ date: dayData.date });
			}
		}
	},

	selectDate (item, index) {
		Multiselectable.selectItem(this, item, this.getProperty('selection'), index);
	},
	
	selectDates (items, index) {
		Multiselectable.selectItems(this, items, null, index);
	},
	
	_onSelect (selection) {
		this.setProperties({ selection: selection._data });
		
		this.elements.input.val(this._formatDate());
		this._renderDateRange();
	},
	
	_onDeselect (selection) {
		this.setProperties({ selection: selection._data });
	}
});

Datepicker = Lib.runHelpers('jquery', CONTROL, Datepicker);

export default Datepicker;
