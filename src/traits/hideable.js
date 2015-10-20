// HIDEABLE

import * as Lib from '../lib/lib';

const Hideable = {
	cssClasses: {
		HIDE: 'slds-hide',
		HIDDEN: 'slds-hidden'
	},
	
	_defaultState: {
		isHidden: false
	},

	show () {
		this.setState({ isHidden: false });
		if (Lib.isFunction(this._onShow)) this._onShow();

		this.trigger('shown');
	},

	hide () {
		this.setState({ isHidden: true });
		if (Lib.isFunction(this._onHide)) this._onHide();

		this.trigger('hidden');
	}
};

export default Hideable;
