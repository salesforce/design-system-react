// DISABLEABLE

import Lib from '../core/lib';

var Disableable = {
	cssClasses: {
		DISABLED: 'disabled'
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