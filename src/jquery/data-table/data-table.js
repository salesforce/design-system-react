/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # DataTable Component --- jQuery Facade

// Implements the [Data Table design pattern](https://www.lightningdesignsystem.com/components/data-tables) in jQuery.

// [![DataTable component example screenshot](/assets/demo-site/images/component-examples/data-table.png "See a live example of the DataTable component in action")](/jquery/data-table)

// > See a [live example](/jquery/data-table) of the DataTable component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                   from '../../lib/lib';

// Use the [shared core](../../core/data-table.html), which contains logic that is
// the same in every facade.
import DataTableCore, { CONTROL } from '../../core/data-table';

// ### Traits

// #### Eventable
// * [../../traits/eventable](../../traits/eventable.html)
import Eventable                  from '../../traits/eventable';

// #### Multiselectable
// * [../../traits/multiselectable](../../traits/multiselectable.html)
import Multiselectable            from '../../traits/multiselectable';


// ### jQuery
// jQuery is an external dependency of the project.
const $ = Lib.global.jQuery || Lib.global.$;

// ### Mixins

// These are mixins that appear in every Façade, bringing consistency between
// how each framework deals with instantiation, events, and state.

// #### DOM
// [../dom](../dom.html)
import DOM                        from '../dom';

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                     from '../events';

// #### State
// [../mixins/state](../mixins/state.html)
import State                      from '../state';

// ### Children

// #### DataTable Template
// [./data-table-template](./data-table-template.html)
import template                   from './data-table-template';

// ## DataTable Constructor
// Constructors are functions that are called by the `new` keyword and is the
// function that an options object is passed into.
let DataTable = function DataTable () {
	const options = this._getOptions(arguments);

	const $html = $('<i />').append(template);
	this.template = $html.find('table');

	this.sortTemplate = '<button class="slds-button slds-button--icon-bare"><svg aria-hidden="true" class="slds-button__icon slds-button__icon--small"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/examples/symbols.svg#arrowdown"></use></svg> <span class="slds-assistive-text" >Sort</span></button>';
	this.selectCheckbox = '<label class="slds-checkbox" ><input type="checkbox" ><span class="slds-checkbox--faux"></span><span class="slds-form-element__label slds-assistive-text" >select</span></label>';

	this._initialize(options);
};

// ## DataTable Object
// ***Private Methods***: Although not truly private methods, methods–that
// should only function as private–follow the convention of being prefixed
// with `_` (an underscore).
export const DataTableObject = {
	// ### Initializer
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();

		this.elements.theadRow = this.element.find('thead tr.slds-text-heading--label');
		this.elements.tbody = this.element.find('tbody');

		Eventable.on(this, 'select', this._onSelect, this);
		Eventable.on(this, 'deselect', this._onDeselect, this);
	},

	// ### Bind Ui Events
	_bindUIEvents () {
		this.element.on('click.slds-table', '.slds-is-sortable', this._toggleSort.bind(this));

		if (this.getProperty('selectRows')) {
			this.element.on('click.slds-table', 'tbody > tr', this._toggleItem.bind(this));
			this.element.on('click.slds-table', 'thead .slds-checkbox', this._toggleAllItems.bind(this));
		}
	},

	// ### Render Item
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

	// ### Render Header
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

	// ### Render
	_render () {
		this._renderCollection();
		this.element.addClass(this._getClassNames(this.getProperty('styles')));

		return this.element;
	},

	// ### Render Collection
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

			// For each column marked for render, create a cell for that value
			// on this data node
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

	// ### Render Selection
	_renderSelection ($item, item, selection) {
		const selected = Multiselectable.isItemSelected(item, selection);

		$item.find('.slds-checkbox input').prop('checked', selected);
	},

	// ### Toggle Sort
	_toggleSort (ev) {
		const colData = $(ev.currentTarget).data('item');

		this._sortColumn(colData);
	},

	// ### Toggle Item
	_toggleItem (ev) {
		const rowData = $(ev.currentTarget).data('item');

		this._toggleDataItem(rowData);
	},

	// ### On Sort
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

	// ### Select Row
	selectRow (item, index) {
		Multiselectable.selectItem(this, item, this.getProperty('selection'), index);
	},

	// ### Select Rows
	selectRows (items, index) {
		Multiselectable.selectItems(this, items, this.getProperty('selection'), index);
	},

	// ### On Select
	_onSelect (itemsToSelect, selection) {
		this.setProperties({ selection: selection._data });
		this._renderCollection();

		this.trigger('selected', itemsToSelect, selection._data);
		this.trigger('changed', itemsToSelect, selection._data);
	},

	// ### On Deselect
	_onDeselect (itemsToDeselect, selection) {
		this.setProperties({ selection: selection._data });
		this._renderCollection();

		this.trigger('deselected', itemsToDeselect, selection._data);
		this.trigger('changed', itemsToDeselect, selection._data);
	},

	// ### On Rendered
	_onRendered () {
		this._bindUIEvents();
	}
};

// Façades **extends objects** by merging them together, rather than via the
// prototype chain or imitation of object-oriented inheritance. The important
// thing to remember is that _some methods will be available to the component
// which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, DataTable extends its [core](../../core/datatable.html),
// which in turn extends the base component.

Lib.merge(
	DataTable.prototype,
	DataTableCore,
	Events,
	DOM,
	State,
	DataTableObject
);

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

DataTable = Lib.runHelpers('jquery', CONTROL, DataTable);

export default DataTable;
