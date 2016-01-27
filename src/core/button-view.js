/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Button View Private Control
// ### Core

// Helps implement the Button [design pattern](https://www.lightningdesignsystem.com/components/buttons).

// Buttons are made of one or more `ButtonViews`. Stateful buttons have three views, but buttons generally only have one view. `ButtonViews` is a "private control" and should only be used within a button.

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
		BUTTON_ICON: 'slds-button__icon',
		BUTTON_ICON_HINT: 'slds-button__icon--hint',
		ICON: 'slds-icon',
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

	// The moreIcon is used by buttons within dropdowns.
	moreIcon: 'utility.down',

	buttonIconSizes: {
		'x-small': 'slds-button__icon--x-small',
		'small': 'slds-button__icon--small',
		'large': 'slds-button__icon--large'
	},

	// Button Views set the base icon style, the position in relation to text, and its size. The default position is left.
	_getIconClassNames (additionalClasses) {
		let iconBaseClass;
		let buttonIconSizeClass;
		let buttonIconHintClass;
		let iconPositionClass;

		// Set the base class. This is based on whether the icon should be styled like [an icon is within a stateful button](https://www.lightningdesignsystem.com/components/buttons#stateful), like [an icon is outside of a button](https://www.lightningdesignsystem.com/components/icons), or a [standard icon within a button](https://www.lightningdesignsystem.com/components/buttons#icon).
		if ( this.getProperty('view') ) {
			iconBaseClass = this.cssClasses.STATEFUL_ICON;
		} else if (this.getProperty('iconStyle') === 'icon-only') {
			iconBaseClass = this.cssClasses.ICON;
		} else {
			iconBaseClass = this.cssClasses.BUTTON_ICON;
		}

		if (
				this.getProperty('iconStyle') === 'icon-bare-hint' ||
				this.getProperty('iconStyle') === 'icon-border-hint' ||
				this.getProperty('iconStyle') === 'icon-border-filled-hint' ||
				this.getProperty('iconStyle') === 'icon-container-hint' ||
				this.getProperty('iconStyle') === 'icon-inverse-hint' ||
				this.getProperty('iconStyle') === 'icon-more-hint' ||
				this.getProperty('iconStyle') === 'icon-small-hint'
		) {
			buttonIconHintClass = this.cssClasses.BUTTON_ICON_HINT;
		}


		// Set the position class. By default, the position of an icon is left of the text. If there is no visible text and only an icon is visibly present, then use the default position set in button core.
		if (Boolean(this.getProperty('text')) && this.getProperty('iconStyle') !== 'icon-only') {
			iconPositionClass = this.iconPositions[this.getProperty('iconPosition')];
		}

		if (this.getProperty('iconSize')) {
			buttonIconSizeClass = this.buttonIconSizes[this.getProperty('iconSize')];
		}

		// If falsey or object key/value is falsey, no classes are added for its respective property.
		return classNames(
			iconBaseClass,
			iconPositionClass,
			buttonIconSizeClass,
			buttonIconHintClass,
			additionalClasses);
	}
});

export default ButtonViewCore;
