// DISABLEABLE

import * as Lib from '../core/lib';

const Disableable = {
	cssClasses: {
		DISABLED: 'disabled'
	},

	__initializeDisableable (options) {
		if (options && options.disabled === true) {
			this.disable();
		} else if (options && options.disabled === false) {
			this.enable();
		}
	},

	enable () {
		this.setStore({ disabled: false });
		if (Lib.isFunction(this._onEnabled)) this._onEnabled();
		
		this.trigger('enabled');
	},

	disable () {
		this.setStore({ disabled: true });
		if (Lib.isFunction(this._onDisabled)) this._onDisabled();
		
		this.trigger('disabled');
	}
};

export default Disableable;
