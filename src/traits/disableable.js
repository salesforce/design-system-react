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
		const property = { disabled: false };

		this.setProperties(property);
		if (Lib.isFunction(this._onEnabledOrDisabled)) this._onEnabledOrDisabled(property);

		this.trigger('enabled');
		this.trigger('disabledValueChanged', property);
	},

	disable () {
		const property = { disabled: true };

		this.setProperties(property);
		if (Lib.isFunction(this._onEnabledOrDisabled)) this._onEnabledOrDisabled(property);

		this.trigger('disabled');
		this.trigger('disabledValueChanged', property);
	}
};

export default Disableable;
