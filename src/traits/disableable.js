// DISABLEABLE

import * as Lib from '../core/lib';

const Disableable = {
	cssClasses: {
		DISABLED: 'slds-disabled'
	},

	_initializer (options) {
		const disabled = !!(options && options.disabled);
		this.setProperties({ disabled });

		if (disabled) {
			if (Lib.isFunction(this._onDisabled)) this._onDisabled();
		} else {
			if (Lib.isFunction(this._onEnabled)) this._onEnabled();
		}
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
