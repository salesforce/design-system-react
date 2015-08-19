// DISABLEABLE

import * as Lib from '../core/lib';

const Disableable = {
	cssClasses: {
		DISABLED: 'disabled'
	},

	_initializeDisableable (options) {
		const disabled = !!(options && options.disabled);
		this.setStore({ disabled });

		if (disabled) {
			if (Lib.isFunction(this._onDisabled)) this._onDisabled();
		} else {
			if (Lib.isFunction(this._onEnabled)) this._onEnabled();
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
