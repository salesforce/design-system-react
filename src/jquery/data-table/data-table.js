// PICKLIST CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import DataTableCore, {CONTROL} from '../../core/data-table';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './data-table-template';

let DataTable = function DataTable () {
	const options = this._getOptions(arguments);
	
	const $html = $('<i />').append(template);
	this.template = $html.find('table');
	
	this._initialize(options);
};

export const DataTableObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
	},
	
	_bindUIEvents () {
		// this.elements.button.on('click', $.proxy(this._handleClicked, this));
		// this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
		// this.elements.wrapper.on('keydown', $.proxy(this._handleKeyDown, this));
		// this.elements.wrapper.on('keypress', $.proxy(this._handleKeyPressed, this));
	},
	
	_renderItem (propertyName, item) {
		return $('<td/>', {
			'data-label': propertyName
		}).append($('<span/>', {
			class: 'slds-truncate',
			text: item.get(propertyName)
		}));
	},
	
	_renderHeader (item, classes) {
		const $th = $('<th/>', {
			class: 'col ' + classes
		}).append($('<span/>', {
			class: 'slds-truncate',
			text: item.displayName
		}));
	
		return $th;
	},

	_render () {
		// Get the template
		const $el = this.element;
		$el.addClass(this._getClassNames(this.getProperty('styles')));
		
		const $theadRow = $el.find('thead tr.slds-text-heading--label');
		const $tbody = $el.find('tbody');

		this.getProperty('columns').forEach(item => {
			const styles = {
				sortable: item.sortable,
				hintParent: item.hintParent
			};
			const classes = this._getClassNames(styles);
			$theadRow.append(this._renderHeader(item, classes));
		});

		// For each item in the collection
		this._collection.forEach(item => {
			const $row = $('<tr/>', { class: 'slds-hint-parent' });

			// For each column marked for render, create a cell for that value on this data node
			this.getProperty('columns').forEach(column => {
				$row.append(this._renderItem(column.propertyName, item));
			});

			$tbody.append($row);
		});
		
		return this.element;
	},
	
	_onRendered () {
		this._bindUIEvents();
	}
};

Lib.merge(DataTable.prototype, DataTableCore, Events, DOM, State, DataTableObject);
DataTable = Lib.runHelpers('jquery', CONTROL, DataTable);

export default DataTable;
