// # Data Table Control
// ### Core

// Bring in the [shared library functions](../lib/lib).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base).
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
		collection: [],
		selection: null,
		bordered: false,
		striped: false,
		stacked: false,
		stackedHorizontal: false
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
			return item.get();
		},

		getId (item) {
			return item.get('id');
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
