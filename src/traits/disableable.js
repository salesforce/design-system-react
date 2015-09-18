// DISABLEABLE

import * as Lib from '../lib/lib';

const Disableable = {
	cssClasses: {
		DISABLED: 'disabled'
	},
	
	_defaultProperties: {
		disabled: false
	},

	enable () {
		this.setProperties({ disabled: false });
		if (Lib.isFunction(this._onEnabledOrDisabled)) this._onEnabledOrDisabled();

		this.trigger('enabled');
	},

	disable () {
		this.setProperties({ disabled: true });
		if (Lib.isFunction(this._onEnabledOrDisabled)) this._onEnabledOrDisabled();

		this.trigger('disabled');
	}
};

export default Disableable;
