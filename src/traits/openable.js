// OPENABLE

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
		const _open = Lib.bind(function _open () {
			this.setState({ isOpen: true });
			if (Lib.isFunction(this._onExpandOrCollapse)) this._onExpandOrCollapse();
	
			document.addEventListener('click', this._closeOnClick, false);
			this.trigger('opened');
		}, this);
		
		if (!Lib.isFunction(this._canOpen)) {
			_open();
		} else {
			this._canOpen(_open);
		}
	},

	close () {
		this.setState({ isOpen: false });
		if (Lib.isFunction(this._onExpandOrCollapse)) this._onExpandOrCollapse();

		// TODO: Once we have a destroy event we might want to remove this there as well
		document.removeEventListener('click', this._closeOnClick, false);
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
