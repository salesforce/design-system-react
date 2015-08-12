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
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, false);
		this.__setState({ disabled: false });
		if (Lib.isFunction(this.onEnabled)) this.onEnabled();
	},

	disable () {
		this.elements.wrapper.toggleClass(this.cssClasses.DISABLED, true);
		this.__setState({ disabled: true });
		if (Lib.isFunction(this.onDisabled)) this.onDisabled();
	}
};

export default Disableable;
