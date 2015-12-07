// OPENABLE

import * as Lib from '../lib/lib';

const Openable = {
	open (e) {
		if (e) {
			e.originator = this;
		}
		
		if (!this.getState('isOpen')) {
			if (!Lib.isFunction(this._openable_closeOnClick)) {
				this._openable_closeOnClick = Openable.closeOnClick.bind(this);
			}
			
			const _open = () => {
				if (Lib.isFunction(this._onBeforeOpen)) this._onBeforeOpen();
				
				document.addEventListener('click', this._openable_closeOnClick, false);
				this.setState({ isOpen: true });
				this.trigger('opened');
				
				if (Lib.isFunction(this._onOpened)) this._onOpened();
			};
			
			if (!Lib.isFunction(this._canOpen)) {
				_open();
			} else {
				this._canOpen(_open);
			}
		}
	},

	close () {
		if (this.getState('isOpen')) {
			if (Lib.isFunction(this._onBeforeClose)) this._onBeforeClose();
			
			if (Lib.isFunction(this._openable_closeOnClick)) document.removeEventListener('click', this._openable_closeOnClick, false);
			this.setState({ isOpen: false });
			this.trigger('closed');
			
			if (Lib.isFunction(this._onClosed)) this._onClosed();
		}
	},
	
	toggle (e) {
		if (this.getState('isOpen')) {
			Openable.close.call(this);
		} else {
			Openable.open.call(this, e);
		}
	},
	
	closeOnClick (e) {
		if (!e || e.originator !== this) {
			Openable.close.call(this);
		}
	},
	
	/* TODO: We need a new way to automatically do this now that we don't have this lifecycle event to hook into */
	_onDestroy () {
		document.removeEventListener('click', this._openable_closeOnClick, false);
	}
};

export default Openable;
