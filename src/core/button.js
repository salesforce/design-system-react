/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Button Component --- Core
//
// Implements the [Button design pattern](https://www.lightningdesignsystem.com/components/buttons) in React.

// Buttons are used within many other components in this library. There are many variations, as well as stateful buttons.


// ![Button component example screenshot](/assets/demo-site/images/component-examples/button.png "Button component example screenshot")

// ## Button Façades
// * [jQuery Button component](/jquery/button)
// * [React Button component](/react/button)

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

// Export the canonical name of this control. The name specified here will be used to generate the React display name and the jQuery plugin name, among other things.
export const CONTROL = 'Button';

// Facades **extends objects** by merging them together, rather than via the prototype chain or imititation of object-oriented inheritance. The important thing to remember is that _some methods will be available to the control which are not declared in this file_. These are not magic methods, they're not black box methods, but you do need to trace the depencies of the control to see where they are coming from. Adding an empty object as the first item of the merge ensures that all of these methods don't get added to `Base`, while the methods for this specific control must be the last thing added here so that they have the potential to override anything added fist as needed.
const ButtonCore = Lib.merge({}, Base, {
	// Add the canonical class name as a property of the control, for future reference.
	CONTROL,

	// Save a list of any CSS classes used within this control which will need to be used later to find specific elements or perform other operations. It's not neccessary to list every single class here as many are used only by the template or render function.
	cssClasses: {
		CONTROL                   : 'slds-button',
		NOT_SELECTED              : 'slds-not-selected',
		SELECTED                  : 'slds-is-selected'
	},

	// [Themes (or variants)](https://www.lightningdesignsystem.com/components/buttons) that dictate the general style of and are applied to the `<button>`.
	themes: {
		'neutral'                 : 'slds-button--neutral',
		'brand'                   : 'slds-button--brand',
		'destructive'             : 'slds-button--destructive',
		'inverse'                 : 'slds-button--inverse'
	},

	// Sizes dictate height of the `<button>`.
	sizes: {
		'small': 'slds-button--small'
	},

	// `iconButtonStyles` are styles of buttons and the class is applied to the `<button>`, not the icon or SVG.
	iconButtonStyles: {
		'icon-bare'               : 'slds-button--icon-bare',
		'icon-bare-hint'          : 'slds-button--icon-bare',
		'icon-border'             : 'slds-button--icon-border',
		'icon-border-hint'        : 'slds-button--icon-border',
		'icon-border-filled'      : 'slds-button--icon-border-filled',
		'icon-border-filled-hint' : 'slds-button--icon-border-filled',
		'icon-container'          : 'slds-button--icon-container',
		'icon-container-hint'     : 'slds-button--icon-container',
		'icon-inverse'            : 'slds-button--icon-inverse',
		'icon-inverse-hint'       : 'slds-button--icon-inverse',
		'icon-more'               : 'slds-button--icon-more',
		'icon-more-hint'          : 'slds-button--icon-more',
		'icon-small'              : 'slds-button--icon-small',
		'icon-small-hint'         : 'slds-button--icon-small',
		'picklist-label'          : 'slds-picklist__label'
	},

	_defaultProperties: {
		iconPosition              : 'left',
		iconSize                  : null,
		iconStyle                 : null,
		selected                  : null,
		size                      : null,
		theme                     : null,
		truncate                  : false,
		views                     : [],
		children                  : []
	},

	// `_canSelect` informs the trait, [SelectableBoolean](../traits/selectable-boolean.html), whether the button can be selected. Disabled controls cannot be selected.
	_canSelect () {
		return !this.getProperty('disabled');
	},

	// Public method that toggles selection state (selected | not-selected) of a button. This is often caused by a user clicking the button.
	toggle () {
		if (this.isSelected()) {
			this.deselect();
		} else {
			this.select();
		}
	},

	// `_getClassNames` determines what CSS classes will be applied to `<button>`. Additional classes can be added to the button based on properties.
	_getClassNames (additionalClasses, isStateful) {
		const selectedClasses = {};

		if (isStateful) {
			selectedClasses[this.cssClasses.NOT_SELECTED] = !this.getProperty('selected');
			selectedClasses[this.cssClasses.SELECTED] = this.getProperty('selected');
		}

		// If falsey or object key/value is falsey, no classes are added for its respective property.
		return classNames(
			this.cssClasses.CONTROL,
			this.sizes[this.getProperty('size')],
			this.themes[this.getProperty('theme')],
			this.iconButtonStyles[this.getProperty('iconStyle')],
			selectedClasses,
			additionalClasses);
	},

	// "Selectable-Boolean" methods
	isSelected () {
		return !!this.getProperty('selected');
	},

	_setSelected (selected) {
		if (Lib.isFunction(this._canSelect) && !this._canSelect(selected)) {
			return false;
		}

		if (selected === this.isSelected()) {
			return false;
		}

		this.setProperties({ selected });

		if (Lib.isFunction(this._onToggled)) this._onToggled(selected);

		this.trigger('changed', selected);

		return true;
	},

	select () {
		if (this._setSelected(true)) {
			this.trigger('selected');
		}
	},

	deselect () {
		if (this._setSelected(false)) {
			this.trigger('deselected');
		}
	}
});

export default ButtonCore;
