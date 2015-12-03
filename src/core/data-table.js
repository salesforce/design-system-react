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

const DataTableCore = Lib.merge({}, Base, Multiselectable, {
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

	_selectDataItem (selRow) {
		this.multiselectable.toggleItem.call(this, selRow, this.getProperty('selection'));
	},

	_toggleAllItems () {
		if (this.allCheckActivated) {
			this.allCheckActivated = false;
			this.multiselectable.deselectAll.call(this, this.getProperty('selection'));
		} else {
			this.allCheckActivated = true;
			this.multiselectable.selectItems.call(this, this.getProperty('collection'), this.getProperty('selection'));
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
