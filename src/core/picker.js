/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Picker Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

export const CONTROL = 'Picker';

const PickerCore = Lib.merge({}, Base, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-picker'
	},

	_defaultState: {
		popupCss: {
			visibility: 'hidden'
		}
	},

	_getPositionAbove (element) {
		const position = element.offset();

		position.top = position.top - this.elements.popup.outerHeight(true);
		return position;
	},

	_getPositionBelow (element) {
		const position = element.offset();

		position.top = position.top + element.outerHeight(true);
		return position;
	},

	_getCenteredPosition () {
		// TODO: Implement this to support modals
	},

	_setPosition (position, popupCss) {
		popupCss.top = position.top + 'px';
		popupCss.left = position.left + 'px';

		this.setState({ popupCss });
		if (Lib.isFunction(this._onPopupCssUpdated)) this._onPopupCssUpdated();
	},

	_positionAt (element) {
		const popupCss = getState('popupCss');

		popupCss.visibility = 'hidden';
		this.setState({ popupCss });

		const positionBelow = this._getPositionBelow(element);
		this._setPosition(positionBelow, popupCss);

		if (this.elements.popup.isOffscreen()) {
			this._setPosition(this._getPositionAbove(element), popupCss);

			if (this.elements.popup.isOffscreen()) {
				this._setPosition(positionBelow, popupCss);
			}
		}

		popupCss.visibility = 'visible';
		this.setState({ popupCss });

		if (Lib.isFunction(this._onPopupCssUpdated)) this._onPopupCssUpdated();
	}
});

export default PickerCore;
