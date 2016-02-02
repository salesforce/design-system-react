/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// MODAL CORE

import * as Lib from '../lib/lib';
import Base from './base';

export const CONTROL = 'modal';

const ModalCore = Lib.merge({}, Base, {
	CONTROL,

	// CSS classes used within this control
	cssClasses: {
		BACKDROP: 'slds-backdrop',
		CONTROL: CONTROL,
		CLOSE: 'slds-modal__close',
		CONTENT: 'slds-modal__content',
		HEADER: 'slds-modal__header',
		MODAL: 'slds-modal',
		OPEN: 'slds-fade-in-open',
		OPENBACKDROP: 'slds-backdrop--open',
		PRIMARYBTN: 'slds-button--brand',
		MODALCONTAINER: 'slds-modal__container',
		HEAD: 'slds-modal__header',
		FOOT: 'slds-modal__footer'
	},

	headerTextSize: {
		'small': 'slds-text-heading--small',
		'medium': 'slds-text-heading--medium',
		'large': 'slds-text-heading--large'
	},

	// Set the defaults
	_defaultProperties: {
		header: 'Modal Header',
		headerTextSize: 'medium',
		isOpen: false,
		primaryButtonText: 'Save',
		secondaryButtonText: 'Cancel'
	},

	backgroundClicked: function (target) {
		return target.className.match && (Lib.hasClass(target, this.cssClasses.MODAL) || Lib.hasClass(target, this.cssClasses.MODALCONTAINER));
	}

});

export default ModalCore;
