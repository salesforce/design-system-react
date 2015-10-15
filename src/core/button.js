// BUTTON CORE

import * as Lib from '../lib/lib';
import Base from './base';

export const CONTROL = 'button';

const ButtonCore = Lib.merge({}, Base, {
	cssClasses: {
		'BASE': Base.cssClasses.NAMESPACE + CONTROL,
		'NOT_SELECTED': Base.cssClasses.NAMESPACE + 'not-selected',
		'SELECTED': Base.cssClasses.NAMESPACE + 'is-selected',
		'small': Base.cssClasses.NAMESPACE + CONTROL + '--small',
		'neutral': Base.cssClasses.NAMESPACE + CONTROL + '--neutral',
		'brand': Base.cssClasses.NAMESPACE + CONTROL + '--brand',
		'inverse': Base.cssClasses.NAMESPACE + CONTROL + '--inverse',
		'icon-bare': Base.cssClasses.NAMESPACE + CONTROL + '--icon-bare',
		'icon-container': Base.cssClasses.NAMESPACE + CONTROL + '--icon-container',
		'icon-border': Base.cssClasses.NAMESPACE + CONTROL + '--icon-border',
		'icon-border-filled': Base.cssClasses.NAMESPACE + CONTROL + '--icon-border-filled',
		'icon-small': Base.cssClasses.NAMESPACE + CONTROL + '--icon-small',

		// TODO: add button property or check for button parent, inverse, size, etc.
		'BUTTON_LEFT': 'slds-button__icon--left',
		'BUTTON_RIGHT': 'slds-button__icon--right'
	}
	
	// TODO: We usually manage state and throw our own events here, so this will probably need to be expanded for jQuery support
});

export default ButtonCore;
