// DISABLEABLE

import * as Lib from '../lib/lib';

const Openable = {
	cssClasses: {
		OPEN: 'open',
		SHOWING: 'showing'
	},
	
	_defaultState: {
		isOpen: false
	},

	open () {
		this.setState({ isOpen: true });
		if (Lib.isFunction(this._onExpandOrCollapse)) this._onExpandOrCollapse();

		this.trigger('opened');
	},

	close () {
		this.setState({ isOpen: false });
		if (Lib.isFunction(this._onExpandOrCollapse)) this._onExpandOrCollapse();

		this.trigger('closed');
	},
	
	_openToggleEvent (e) {
		if (e) {
			e.originator = this;
		}
		
		if (!this.getProperty('disabled')) {
			if (this.getState('isOpen')) {
				this.close();
			} else {
				this.open();
			}
		}
	},
	
	_closeOnClick (e) {
		if (!e || e.originator !== this) {
			this.close();
		}
	}
};

export default Openable;
