// DATA-TABLE CORE

import * as Lib from '../lib/lib';
import Base from './base';
import classNames from 'classnames';

// Traits
import Multiselectable from '../traits/multiselectable';

// Styles
// require('../../scss/components/data-tables/flavors/base/index.scss');
// require('../../scss/components/data-tables/flavors/responsive-stacked/index.scss');
// require('../../scss/components/data-tables/flavors/responsive-stacked-horizontal/index.scss');

export const CONTROL = 'slds-table';

const DataTableCore = Lib.merge({}, Base, Multiselectable, {
	CONTROL,
	
	cssClasses: {
		CONTROL: CONTROL,
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

	accessors: { // TODO: use these
		textProp () {
			return 'text';
		},

		getText (item) {
			return item.get(item.textProp());
		},

		getType (item) {
			return item.get('_itemType');
		},

		getDisabled (item) {
			return item.get('disabled') === true;
		},

		getKey (item) {
			return { id: item.get('id') };
		},

		getId (item) {
			return item.get('id');
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
		const item = this._getItemAdapter(selRow);
		const selected = this._isItemSelected(item);

		if (selected) {
			this._deselectItem(item);
		} else {
			this._selectItem(item);
		}
	},

	_toggleAllItems () {
		if (this.allCheckActivated) {
			this.allCheckActivated = false;
			this.deselectAll();
		} else {
			this.allCheckActivated = true;
			this.selectItems(this.getProperty('collection'));
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
