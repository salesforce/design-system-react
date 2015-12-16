// OPENABLE

import * as Lib from '../lib/lib';

const Openable = {
	isOpen (controlContext) {
		return !!controlContext.getState('isOpen');
	},
	
	open (controlContext, e) {
		if (e) {
			e.originator = controlContext;
		}

		if (!Openable.isOpen(controlContext)) {
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
		if (Openable.isOpen(controlContext)) {
			if (Lib.isFunction(controlContext._onBeforeClose)) controlContext._onBeforeClose();
			
			Openable.removeEventListeners(controlContext);
			controlContext.setState({ isOpen: false });
			controlContext.trigger('closed');
			
			if (Lib.isFunction(controlContext._onClosed)) controlContext._onClosed();
		}
	},
	
	toggle (controlContext, e) {
		if (Openable.isOpen(controlContext)) {
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
		if (!Lib.isFunction(controlContext._openableCloseOnClickHandler)) {
			controlContext._openableCloseOnClickHandler = Openable.closeOnClick.bind(undefined, controlContext);
		}

		document.addEventListener('click', controlContext._openableCloseOnClickHandler, false);
	},
	
	removeEventListeners (controlContext) {
		if (controlContext._openableCloseOnClickHandler) document.removeEventListener('click', controlContext._openableCloseOnClickHandler, false);
	}
};

export default Openable;
