// # Button View Private Control
// ### Core

// Helps implement the Button [design pattern](https://www.lightningdesignsystem.com/components/buttons).

// Buttons are made of one or more `ButtonViews`. Stateful buttons have three views, but most buttons only have one. `ButtonViews` should only be used within a button.

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

export const CONTROL = 'ButtonView';

const ButtonViewCore = Lib.merge({}, Base, {
	CONTROL,
	
	cssClasses: {
		ASSISTIVE_TEXT: 'slds-assistive-text',
		ICON: 'slds-button__icon',
		ICON_ONLY: 'slds-icon',
		STATEFUL_ICON: 'slds-button__icon--stateful',
		TRUNCATE: 'slds-truncate'
	},
	
	buttonStatefulViewStyles: {
		notSelected: 'slds-text-not-selected',
		selected: 'slds-text-selected',
		selectedHover: 'slds-text-selected-focus'
	},
	
	iconPositions: {
		'left': 'slds-button__icon--left',
		'right': 'slds-button__icon--right'
	},

	moreIcon: 'utility.down',

	buttonIconSizes: {
		'x-small': 'slds-button__icon--x-small',
		'small': 'slds-button__icon--small',
		'large': 'slds-button__icon--large'
	},

		// `getIconClassNames` is a part of button/button-view because icons within buttons
		// have a completely different set of classes than icons on their own
	_getIconClassNames (additionalClasses) {
		let iconBaseClass;
		let buttonIconSizeClass;

		if ( this.getProperty('view') ) {
			iconBaseClass = this.cssClasses.STATEFUL_ICON;
		} else {
			iconBaseClass = this.cssClasses.ICON;
		}

		// Most icons within buttons use button icon styling, but a few use the standard icon style
		if (this.getProperty('iconStyle') === 'icon-only') {
			iconBaseClass = this.cssClasses.ICON_ONLY;
		}

		if (this.getProperty('iconSize')) {
			buttonIconSizeClass = this.buttonIconSizes[this.getProperty('iconSize')];
		}

		const iconPositionClass = !!this.getProperty('text') && this.getProperty('iconStyle') !== 'icon-only'
				&& this.iconPositions[this.getProperty('iconPosition')];

		return classNames(iconBaseClass,
			iconPositionClass,
			buttonIconSizeClass,
			additionalClasses);
	}
});

export default ButtonViewCore;
