// BUTTON CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Third party
import classNames from 'classnames';

export const CONTROL = 'slds-button';

const ButtonCore = Lib.merge({}, Base, {
	cssClasses: {
		'CONTROL': CONTROL,
		'NOT_SELECTED': Base.cssClasses.NAMESPACE + 'not-selected',
		'SELECTED': Base.cssClasses.NAMESPACE + 'is-selected'
		// TODO: add button property or check for button parent, inverse, size, etc.
	},
	
	themes: {
		'neutral': CONTROL + '--neutral',
		'brand': CONTROL + '--brand',
		'inverse': CONTROL + '--inverse'
	},
	
	sizes: {
		'small': CONTROL + '--small'
	},
	
	iconStyles: {
		'icon-bare': CONTROL + '--icon-bare',
		'icon-container': CONTROL + '--icon-container',
		'icon-border': CONTROL + '--icon-border',
		'icon-border-filled': CONTROL + '--icon-border-filled',
		'icon-small': CONTROL + '--icon-small'
	},
	
	iconPositions: {
		'left': CONTROL + '__icon--left',
		'right': CONTROL + '__icon--right'
	},
	
	_defaultProperties: {
		theme: null,
		size: null,
		iconStyle: null,
		iconPosition: 'left'
	},
	
	_getClassNames () {
		const selectedClasses = {};
		
		if (this.props.stateful) {
			selectedClasses[this.cssClasses.NOT_SELECTED] = !this.props.selected;
			selectedClasses[this.cssClasses.SELECTED] = this.props.selected;
		}

		return classNames(this.cssClasses.CONTROL,
			this.sizes[this.props.size],
			this.themes[this.props.theme],
			this.iconStyles[this.props.iconStyle],
			selectedClasses);
	},
	
	_getIconClassNames () {
		return classNames('slds-button__icon', !!this.props.text && this.iconPositions[this.props.iconPosition]);
	}
	
	// TODO: We usually manage state and throw our own events here, so this will probably need to be expanded for jQuery support
});

export default ButtonCore;
