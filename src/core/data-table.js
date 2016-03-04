/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Data Table Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

// Traits
import Multiselectable from '../traits/multiselectable';

export const CONTROL = 'DataTable';

const DataTableCore = Lib.merge({}, Base, {
	CONTROL,
	
	cssClasses: {
		CONTROL: 'slds-table',
		NOHOVER: 'slds-no-row-hover',
		SORTABLE: 'slds-is-sortable',
		HINTPARENT: 'slds-hint-parent',
		CELLSHRINK: 'slds-cell-shrink',
		CELLWRAP: 'slds-cell-wrap',
		SCROLLABLEX: 'slds-scrollable--x',
		BORDERED: 'slds-table--bordered',
		STRIPED: 'slds-table--striped',
		STACKED: 'slds-max-medium-table--stacked',
		STACKEDHORIZONTAL: 'slds-max-medium-table--stacked-horizontalviewports'
	},

	_defaultProperties: {
		sortable: false,
		bordered: false,
		striped: false,
		stacked: false,
		stackedHorizontal: false,

		selectRows: true,
		multiSelect: true,

		collection: [],
		columns: [],
		sortDirection: 'desc',
		sortColumn: null
	},
	
	// ### Accessors
	// These may be supplied in the options hash / properties to override default behavior. All accessors take 'item' as their first properties, which is an object from the collection wrapped in an item adapter.
	accessors: {
		// Return the name of the property that contains the text.
		textProp () {
			return 'text';
		},

		// Return the text value to display.
		getText (item) {
			return item.get(item.textProp());
		},

		// Return true if the item is disabled.
		getDisabled (item) {
			return item.get('disabled') === true;
		},

		// Return either an object with key/value pairs to match or a match function. Use this to reduce the number of fields required for searching if a unique key is available.
		getKey (item) {
			return { id: item.get('id') };
		},

		getId (item) {
			return item.get('id');
		},

		compareTo (item, itemToCompare, field) {
			let itemCompA = item.get(field.sortColumn.propertyName);
			let itemCompB = itemToCompare.get(field.sortColumn.propertyName);
			let sortResult = 0;

			if (Lib.isString(itemCompA) && Lib.isString(itemCompB)) {
				itemCompA = itemCompA.toLowerCase();
				itemCompB = itemCompB.toLowerCase();
			}


			if (field.sortDirection === 'asc') {
				sortResult = itemCompA < itemCompB ? 1 : -1;
			} else {
				sortResult = itemCompA > itemCompB ? 1 : -1;
			}


			return sortResult;
		}
	},

	_generatePropertyPayload () {
		return {
			columns: this.getProperty('columns'),
			sortDirection: this.getProperty('sortDirection'),
			sortColumn: this.getProperty('sortColumn')
		};
	},

	_sortColumn (sortProp) {
		const columns = this.getProperty('columns');
		let dir = sortProp.sortDirection || 'asc';

		dir = dir === 'asc' ? 'desc' : 'asc';

		if (columns.length) {
			columns.forEach( function (column) {
				if (column.propertyName === sortProp.propertyName) {
					column.sortDirection = dir;
				} else {
					delete column.sortDirection;
				}
			});
		}

		if (Lib.isFunction(this._onSort)) {
			this.setProperties({
				sortDirection: dir,
				sortColumn: sortProp,
				columns: columns
			});

			this._onSort();
		}

		this.trigger('sort', {
			sortColumn: sortProp,
			sortDirection: dir,
			columns: columns
		});
	},

	_toggleDataItem (item) {
		Multiselectable.toggleItem(this, item, this.getProperty('selection'));
	},

	_toggleAllItems () {
		if (this.allCheckActivated) {
			this.allCheckActivated = false;
			Multiselectable.deselectAll(this, this.getProperty('selection'));
		} else {
			this.allCheckActivated = true;
			Multiselectable.selectItems(this, this.getProperty('collection'));
		}
	},

	_getClassNames: function (classFlags) {
		const classList = [this.cssClasses.CONTROL];
		
		for (const flagName in classFlags) {
			if (classFlags[flagName] === true) {
				classList.push(this.cssClasses[flagName.toUpperCase()]);
			}
		}

		return classNames(classList);
	}
});

export default DataTableCore;
