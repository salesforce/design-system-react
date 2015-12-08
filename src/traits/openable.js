// OPENABLE

import * as Lib from '../lib/lib';

const Openable = {
	open (controlContext, e) {
		if (e) {
			e.originator = controlContext;
		}

		if (!controlContext.getState('isOpen')) {
			const _open = () => {
				if (Lib.isFunction(controlContext._onBeforeOpen)) controlContext._onBeforeOpen();
				
				if (e) Openable.addEventListeners(controlContext);
				controlContext.setState({ isOpen: true });
				controlContext.trigger('opened');
				
				if (Lib.isFunction(controlContext._onOpened)) controlContext._onOpened();
			};
			
			if (!Lib.isFunction(controlContext._canOpen)) {
				_open();
			} else {
				controlContext._canOpen(_open);
			}
		}
	},

	close (controlContext) {
		if (controlContext.getState('isOpen')) {
			if (Lib.isFunction(controlContext._onBeforeClose)) controlContext._onBeforeClose();
			
			Openable.removeEventListeners(controlContext);
			controlContext.setState({ isOpen: false });
			controlContext.trigger('closed');
			
			if (Lib.isFunction(controlContext._onClosed)) controlContext._onClosed();
		}
	},
	
	toggle (controlContext, e) {
		if (controlContext.getState('isOpen')) {
			Openable.close(controlContext);
		} else {
			Openable.open(controlContext, e);
		}
	},
	
	closeOnClick (controlContext, e) {
		if (!e || e.originator !== controlContext) {
			Openable.close(controlContext);
		}
	},
	
	addEventListeners (controlContext) {
		if (!Lib.isFunction(controlContext._openable_closeOnClickHandler)) {
			controlContext._openable_closeOnClickHandler = Openable.closeOnClick.bind(undefined, controlContext);
		}

		document.addEventListener('click', controlContext._openable_closeOnClickHandler, false);
	},
	
	removeEventListeners (controlContext) {
		if (controlContext._openable_closeOnClickHandler) document.removeEventListener('click', controlContext._openable_closeOnClickHandler, false);
	}
};

export default Openable;
