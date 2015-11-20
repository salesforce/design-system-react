// # Button Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

// [Disableable](../traits/disableable.html) and [SelectableBoolean](../traits/selectable-boolean.html) are traits. Traits extend the functionality of a control with common methods and properties related to a specific behavior. Not only do traits have the potential to speed up development, they also bring consistency to the API.
import Disableable from '../traits/disableable';
import SelectableBoolean from '../traits/selectable-boolean';

// Export the canonical name of this control. The name specified here will be used to generate the React display name and the jQuery plugin name, among other things.
export const CONTROL = 'Button';

// Facades **extends objects** by merging them together, rather than via the prototype chain or imititation of object-oriented inheritance. The important thing to remember is that _some methods will be available to the control which are not declared in this file_. These are not magic methods, they're not black box methods, but you do need to trace the depencies of the control to see where they are coming from. This particular control extends the `Base`, the `SelectableBoolean` trait, and the `Disableable` trait. Adding an empty object as the first item of the merge ensures that all of these methods don't get added to `Base`, while the methods for this specific control must be the last thing added here so that they have the potential to override anything added fist as needed.
const ButtonCore = Lib.merge({}, Base, SelectableBoolean, Disableable, {
	// Add the canonical class name as a property of the control, for future reference.
	CONTROL,
	
	// Save a list of any CSS classes used within this control which will need to be used later to find specific elements or perform other operations. It's not neccessary to list every single class here as many are used only by the template or render function.
	cssClasses: {
		'CONTROL': 'slds-button',
		'NOT_SELECTED': 'slds-not-selected'
	},
	
	// [Themes (or variants)](https://www.lightningdesignsystem.com/components/buttons) that dictate the general style of and are applied to the `<button>`.
	themes: {
		'neutral': 'slds-button--neutral',
		'brand': 'slds-button--brand',
		'inverse': 'slds-button--inverse'
	},
	
	// Sizes dictate height of the `<button>`.
	sizes: {
		'small': 'slds-button--small'
	},
	
	// `iconButtonStyles` are styles of buttons and the class is applied to the `<button>`, not the icon or SVG.
	iconButtonStyles: {
		'icon-bare': 'slds-button--icon-bare',
		'icon-border': 'slds-button--icon-border',
		'icon-border-filled': 'slds-button--icon-border-filled',
		'icon-container': 'slds-button--icon-container',
		'icon-inverse': 'slds-button--icon-inverse',
		'icon-more': 'slds-button--icon-more',
		'icon-small': 'slds-button--icon-small',
		'picklist-label': 'slds-picklist__label'
	},

	_defaultProperties: {
		iconPosition: 'left',
		iconSize: null,
		iconStyle: null,
		selected: false,
		size: null,
		theme: null,
		truncate: false,
		views: [],
		children: []
	},

	// `_canSelect` informs the trait, [SelectableBoolean](../traits/selectable-boolean.html), whether the button can be selected.
	_canSelect () {
		if (this.getProperty('disabled')) {
			// Component is disabled, do not allow a toggle to occur.
			return false;
		}

		return true;
	},

	// Public method that toggles selection state (selected | not-selected) of a button. This is often caused by a user clicking the button.
	toggle () {
		this._toggleSelected();
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
	}
});

export default ButtonCore;
