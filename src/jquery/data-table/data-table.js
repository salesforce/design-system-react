// PICKLIST CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import DataTableCore, {CONTROL} from '../../core/data-table';

// Traits
import Multiselectable from '../../traits/multiselectable';

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

	this.sortTemplate = '<button class="slds-button slds-button--icon-bare"><svg aria-hidden="true" class="slds-button__icon slds-button__icon--small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/examples/symbols.svg#arrowdown"></use></svg> <span class="slds-assistive-text" >Sort</span></button>';
	this.selectCheckbox = '<label class="slds-checkbox" ><input type="checkbox" ><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text" >select</span></label>';
	
	this._initialize(options);
};

export const DataTableObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();

		this.elements.theadRow = this.element.find('thead tr.slds-text-heading--label');
		this.elements.tbody = this.element.find('tbody');
	},
	
	_bindUIEvents () {
		this.element.on('click.slds-table', '.slds-is-sortable', this._toggleSort.bind(this));

		if (this.getProperty('selectRows')) {
			this.element.on('click.slds-table', 'tbody > tr', this._toggleItem.bind(this));
			this.element.on('click.slds-table', 'thead .slds-checkbox', this._toggleAllItems.bind(this));
		}
	},
	
	_renderItem (propertyName, item) {
		const $row = $('<td/>', {
			'data-label': propertyName
		});

		if (propertyName === 'select') {
			$row.addClass('slds-row-select');
			$row.append($(this.selectCheckbox));
		} else {
			$row.append($('<span/>', {
				class: 'slds-truncate',
				text: item.get(propertyName)
			}));
		}

		return $row;
	},
	
	_renderHeader (item, classes) {
		const $th = $('<th/>', {
			class: 'col ' + classes
		});
		let $sort;
		let $selCheck;

		if (item.propertyName === 'select') {
			$selCheck = $(this.selectCheckbox);
			$selCheck.find('input').prop('checked', this.allCheckActivated);
			$th.append($selCheck);
		} else {
			$th.append($('<span/>', {
				class: 'slds-truncate',
				text: item.displayName
			}));
		}

		if (item.sortDirection) {
			$sort = $(this.sortTemplate);


			$sort.find('use')
				.attr({'xlink:href': '/examples/symbols.svg#' + (item.sortDirection === 'desc' ? 'arrowdown' : 'arrowup')});

			$th.append($sort);
		}

		$th.data({
			item: item
		});
	
		return $th;
	},

	_render () {
		this._renderCollection();
		this.element.addClass(this._getClassNames(this.getProperty('styles')));
		
		return this.element;
	},

	_renderCollection (sorted) {
		const self = this;
		const columns = this.getProperty('columns');
		const isRowSelect = this.getProperty('selectRows');
		const collectionForSort = sorted || this._collection;
		const selection = this._getDataAdapter(this.getProperty('selection'));

		if (isRowSelect && !(columns[0].propertyName === 'select')) {
			columns.splice(0, 0, {
				propertyName: 'select',
				displayName: '',
				sortable: false,
				hintParent: false
			});
		}

		this.elements.theadRow.empty();
		columns.forEach(item => {
			const styles = {
				sortable: item.sortable,
				hintParent: item.hintParent,
				sortDirection: item.sortDirection
			};
			self.elements.theadRow.append(this._renderHeader(item, this._getClassNames(styles) ));
		});

		// For each item in the collection
		this.elements.tbody.empty();

		collectionForSort.forEach(item => {
			const $row = $('<tr/>', { class: 'slds-hint-parent' });

			// For each column marked for render, create a cell for that value on this data node
			columns.forEach(column => {
				$row.append(this._renderItem(column.propertyName, item));
			});

			if (isRowSelect) {
				self._renderSelection($row, item, selection);
			}

			$row.data({
				item: item._item
			});

			self.elements.tbody.append($row);
		});
	},

	_renderSelection ($item, item, selection) {
		const selected = Multiselectable.isItemSelected(item, selection);

		$item.find('.slds-checkbox input').prop('checked', selected);
	},

	_toggleSort (ev) {
		const colData = $(ev.currentTarget).data('item');

		this._sortColumn(colData);
	},

	_toggleItem (ev) {
		const rowData = $(ev.currentTarget).data('item');

		this._toggleDataItem(rowData);
	},

	_onSort () {
		const sortedCollection = [];
		const sortProps = {
			sortDirection: this._props.sortDirection,
			sortColumn: this._props.sortColumn
		};

		this._collection.forEach(item => {
			let insertIndex = null;

			if (sortedCollection.length) {
				sortedCollection.forEach( (sortItem, index) => {
					let relation;

					if (!insertIndex && insertIndex !== 0) {
						relation = item.compareTo(sortItem, sortProps);

						if (relation > 0) {
							insertIndex = index;
						} else if (relation === 0 || relation < 0 && index === sortedCollection.length - 1 ) {
							insertIndex = index + 1;
						}
					}
				});
				if (!insertIndex && insertIndex !== 0) insertIndex = sortedCollection.length - 1;

				sortedCollection.splice(insertIndex, 0, item);
			} else {
				sortedCollection.push(item);
			}
		});

		this._renderCollection(sortedCollection);
	},

	selectRow (item, index) {
		Multiselectable.selectItem(this, item, this.getProperty('selection'), index);
	},
	
	selectRows (items, index) {
		Multiselectable.selectItems(this, items, this.getProperty('selection'), index);
	},

	_onSelect (selection) {
		this.setProperties({ selection: selection._data });
		this._renderCollection();
	},
	
	_onDeselect (selection) {
		this.setProperties({ selection: selection._data });
		this._renderCollection();
	},
	
	_onRendered () {
		this._bindUIEvents();
	}
};

Lib.merge(DataTable.prototype, DataTableCore, Events, DOM, State, DataTableObject);
DataTable = Lib.runHelpers('jquery', CONTROL, DataTable);

export default DataTable;
