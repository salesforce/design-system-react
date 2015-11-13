// MODAL CORE

import * as Lib from '../lib/lib';
import Base from './base';

export const CONTROL = 'modal';

const ModalCore = Lib.merge({}, Base, {
	CONTROL,

	// CSS classes used within this control
	cssClasses: {
		BACKDROP: 'slds-modal-backdrop',
		CONTROL: CONTROL,
		CLOSE: 'slds-modal__close',
		CONTENT: 'slds-modal__content',
		MODAL: 'slds-modal',
		OPEN: 'slds-fade-in-open',
		OPENBACKDROP: 'slds-modal-backdrop--open',
		PRIMARYBTN: 'slds-button--brand',
		MODALCONTAINER: 'slds-modal__container',
		HEAD: 'slds-modal__header',
		FOOT: 'slds-modal__footer'
	},

	// Set the defaults
	_defaultProperties: {
		isOpen: false,
		primaryBtnText: 'Save',
		secondaryBtnText: 'Cancel'
	},

	backgroundClicked: function (target) {
		return target.className.match && (Lib.hasClass(target, this.cssClasses.MODAL) || Lib.hasClass(target, this.cssClasses.MODALCONTAINER));
	}

});

export default ModalCore;
