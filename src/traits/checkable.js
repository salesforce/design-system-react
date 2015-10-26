// CHECKABLE
// Similar to selectable-boolean trait

import * as Lib from '../lib/lib';

const Checkable = {
	_defaultProperties: {
		checked: false
	},

	checked () {
		return !!this.getProperty('checked');
	},

	_setChecked (checked) {
		if (Lib.isFunction(this._canCheck) && !this._canCheck(checked)) {
			return false;
		}

		if (checked === this.checked()) {
			return false;
		}

		this.setProperties({ checked });

		if (Lib.isFunction(this._onToggled)) this._onToggled(checked);

		this.trigger('changed', checked);

		return true;
	},

	_toggleChecked () {
		if (this.checked()) {
			this.uncheck();
		} else {
			this.check();
		}
	},

	check () {
		if (this._setChecked(true)) {
			this.trigger('checked');
		}
	},

	uncheck () {
		if (this._setChecked(false)) {
			this.trigger('unchecked');
		}
	}
};

export default Checkable;
