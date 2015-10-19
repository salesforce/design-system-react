// DATA-TABLE CORE

import * as Lib from '../lib/lib';
import Base from './base';
import classNames from 'classnames';

// Traits
import Selectable from '../traits/selectable';

// Styles
require('../../scss/components/data-tables/flavors/base/index.scss');
require('../../scss/components/data-tables/flavors/responsive-stacked/index.scss');
require('../../scss/components/data-tables/flavors/responsive-stacked-horizontal/index.scss');

export const CONTROL = 'table';

const DataTableCore = Lib.merge({}, Base, Selectable, {
	cssClasses: {
		CONTROL: Base.cssClasses.NAMESPACE + CONTROL,
		NOHOVER: Base.cssClasses.NAMESPACE + 'no-row-hover',
		SELECTED: Base.cssClasses.NAMESPACE + 'is-selected',
		SORTABLE: Base.cssClasses.NAMESPACE + 'is-sortable',
		HINTPARENT: Base.cssClasses.NAMESPACE + 'hint-parent',
		CELLSHRINK: Base.cssClasses.NAMESPACE + 'cell-shrink',
		CELLWRAP: Base.cssClasses.NAMESPACE + 'cell-wrap',
		SCROLLABLEX: Base.cssClasses.NAMESPACE + 'scrollable--x',
		BORDERED: Base.cssClasses.NAMESPACE + CONTROL + '--bordered',
		STRIPED: Base.cssClasses.NAMESPACE + CONTROL + '--striped',
		STACKED: Base.cssClasses.NAMESPACE + 'max-medium-table--stacked',
		STACKEDHORIZONTAL: Base.cssClasses.NAMESPACE + 'max-medium-table--stacked-horizontalviewports'
	},

	_defaultProperties: {
		sortable: false,
		collection: [],
		selection: null,
		bordered: false,
		striped: false,
		stacked: false,
		stackedHorizontal: false
	},

	/* Accessors: These may be supplied in the options hash to override default behavior

	 textProp ()
	 Return the name of the property that contains the text

	 getText (item)
	 Return the text value to display in the list
	 item => object wrapped in an Item Adapter

	 getType (item)
	 Return the type of the current item - can be 'header', 'divider', or nothing
	 item => object wrapped in an Item Adapter

	 getDisabled (item)
	 Return true if the item is disabled
	 item => object wrapped in an Item Adapter

	 getKey (item)
	 Return either an object with key/value pairs to match or a match function
	 Use this to reduce the number of fields required for searching if a unique key is available
	 item => object wrapped in an Item Adapter

	 */

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
			return item.get();
		}
	},

	_canSelect (newSelection, select) { // TODO: feature.selection
		void(newSelection, select);
		// const item = this._getItemAdapter(newSelection);

		// if (!item.getType() && !item.getDisabled()) {
		// 	select();
		// }
	},

	_onInitialized () {},

	_getClassNames: function (classFlags) {
		const classList = [this.cssClasses.CONTROL]; // This line complains about using `let`. It's being manipulated at another block level, so I don't know how it's running, but it appears to be okay. Advise on how to pass eslint and use `let`
		for (const flagName in classFlags) {
			if (classFlags[flagName] === true) {
				classList.push(this.cssClasses[flagName.toUpperCase()]);
			}
		}

		return classNames(...classList);
	}
});

export default DataTableCore;
