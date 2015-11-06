// SELECTABLE BOOLEAN
// For select/deselect selection such as buttons, not for controls with "items"
// Similar to checkable trait

import * as Lib from '../lib/lib';
import Base from '../core/base';

const SelectableBoolean = {
	cssClasses: {
		SELECTED: 'slds-is-selected'
	},
	
	_defaultProperties: {
		selected: null
	},
	
	isSelected () {
		return !!this.getProperty('selected');
	},

	_setSelected (selected) {
		if (Lib.isFunction(this._canSelect) && !this._canSelect(selected)) {
			return false;
		}

		if (selected === this.isSelected()) {
			return false;
		}

		this.setProperties({ selected });

		if (Lib.isFunction(this._onToggled)) this._onToggled(selected);

		this.trigger('changed', selected);

		return true;
	},

	_toggleSelected () {
		if (this.isSelected()) {
			this.deselect();
		} else {
			this.select();
		}
	},

	select () {
		if (this._setSelected(true)) {
			this.trigger('selected');
		}
	},

	deselect () {
		if (this._setSelected(false)) {
			this.trigger('deselected');
		}
	}

};

export default SelectableBoolean;
