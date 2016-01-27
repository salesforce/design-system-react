/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
