// PICKLIST CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import DataTableCore, {CONTROL} from '../../core/data-table';

// Framework specific
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './data-table-template';

let DataTable = function DataTable (element, options) {
	this.options = Lib.extend({}, options);

	this.elements = {
		wrapper: $(element)
	};

	const $html = $('<div/>').append(template);
	this.template = $html.find('table');
	this.template.addClass(this._getClassNames(this.options.styles));
	// apply modular class options to table

	if (this.options.collection) {
		// API method
		this.rendered = false;
	} else {
		// declarative
		// this._initElements(this.elements.wrapper, this.elements);
		// this._buildCollection(this.options);
		this.rendered = true;
	}

	this._initializeState();
	this._initialize(this.options);
};

export function _renderHeader (item, classes) {
	const $th = $('<th/>', {
		class: 'col ' + classes
	}).append($('<span/>', {
		class: 'slds-truncate',
		// text: item.getText()
		text: item.displayName
	}));

	// if (item.sortable === true) { 				// works but does not show up
	// 	const $button = $('<button/>', {
	// 		class: 'slds-button slds-button--icon-bare slds-button--icon-border-small'
	// 	});

	// 	const $svg = $('<svg/>', {
	// 		'aria-hidden': true,
	// 		class: 'slds-button__icon slds-button__icon--small'
	// 	}).append($('<use/>', {
	// 		xlink: 'href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"'
	// 	}));

	// 	$button.append($svg);
	// 	$button.append($('<span/>', {
	// 		class: 'slds-assistive-text',
	// 		text: 'Sort'
	// 	}));

	// 	$th.append($button);
	// }

	return $th;
}

export function _renderItem (propertyName, item) {
	return $('<td/>', {
		'data-label': propertyName
	}).append($('<span/>', {
		class: 'slds-truncate',
		// text: item.getText()
		text: item.get(propertyName)
	}));
}

export const DataTableObject = {
	_onInitialized () {
		if (!this.rendered) {
			this._render();
		}

		this._bindUIEvents();

		// For tests, will consider publishing later
		this.trigger('rendered', this.elements.wrapper);
	},

	_bindUIEvents () {
		// this.elements.button.on('click', $.proxy(this._handleClicked, this));
		// this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
		// this.elements.wrapper.on('keydown', $.proxy(this._handleKeyDown, this));
		// this.elements.wrapper.on('keypress', $.proxy(this._handleKeyPressed, this));
	},

	_render () {
		const strings = this.getState('strings');
		const $el = this.template.clone();
		const $theadRow = $el.find('thead tr.slds-text-heading--label');
		const $tbody = $el.find('tbody');
		// const elements = this._initElements($el, this.elements);

		this.options.columns.forEach(item => {
			const styles = {
				sortable: item.sortable,
				hintParent: item.hintParent
			};
			const classes = this._getClassNames(styles);
			$theadRow.append(_renderHeader(item, classes));
		});

		// for each item in the collection
		this._collection.forEach(item => {
			const $row = $('<tr/>', { class: 'slds-hint-parent' });

			// for each column marked for render, create a cell for that value on this data node
			this.options.columns.forEach(column => {
				$row.append(_renderItem(column.propertyName, item));
			});

			$tbody.append($row);
		});

		// eslint hacks
		void(strings);

		this.elements.wrapper.append($el);
		this.rendered = true;
	},

	destroy () {
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	}
};

Lib.merge(DataTable.prototype, DataTableCore, Events, State, DataTableObject);
DataTable = Lib.runHelpers('jquery', CONTROL, DataTable);

export default DataTable;
