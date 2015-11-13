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
		HEADER: 'slds-modal__header',
		MODAL: 'slds-modal',
		OPEN: 'slds-fade-in-open',
		OPENBACKDROP: 'slds-modal-backdrop--open',
		PRIMARYBTN: 'slds-button--brand'
	},

	headerTextSize: {
		'small': 'slds-text-heading--small',
		'medium': 'slds-text-heading--medium',
		'large': 'slds-text-heading--large'
	},

	// Set the defaults
	_defaultProperties: {
		isOpen: false,
		header: 'Modal Header',
		headerTextSize: 'medium',
		primaryButtonText: 'Save',
		secondaryButtonText: 'Cancel'
	}

});

export default ModalCore;
