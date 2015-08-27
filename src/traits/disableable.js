// DISABLEABLE

import * as Lib from '../core/lib';

const Disableable = {
	cssClasses: {
		DISABLED: 'disabled'
	},
	
	_defaultProperties: {
		disabled: false
	},

	enable () {
		this.setProperties({ disabled: false });
		if (Lib.isFunction(this._onEnabled)) this._onEnabled();

		this.trigger('enabled');
	},

	disable () {
		this.setProperties({ disabled: true });
		if (Lib.isFunction(this._onDisabled)) this._onDisabled();

		this.trigger('disabled');
	}
};

export default Disableable;
