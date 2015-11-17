// # Button Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import SelectableBoolean from '../traits/selectable-boolean';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

export const CONTROL = 'Button';

const ButtonCore = Lib.merge({}, Base, SelectableBoolean, Disableable, {
	CONTROL,
	
	// CSS classes used within this control.
	cssClasses: {
		'CONTROL': 'slds-button',
		'NOT_SELECTED': 'slds-not-selected'
	},
	
	// Themes or flavors that dictate style on the `<button>`.
	themes: {
		'neutral': 'slds-button--neutral',
		'brand': 'slds-button--brand',
		'inverse': 'slds-button--inverse'
	},
	
	// Sizes dictate height of the `<button>`.
	sizes: {
		'small': 'slds-button--small'
	},
	
	// `iconButtonStyles` are styles of buttons and the class is applied to the `<button>`, not the icon or SVG
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

	// Internal method to determine if button is disabled.
	_canSelect () {
		if (this.getProperty('disabled')) {
			// Component is disabled, do not allow a toggle to occur.
			return false;
		}

		return true;
	},

	// Public method that toogles selection state
	toggle () {
		this._toggleSelected();
	},

	// `_getClassNames` determines what CSS classes will be applied to `<button>`. Additional classes can be passed into it.
	_getClassNames (additionalClasses, isStateful) {
		const selectedClasses = {};
		
		if (isStateful) {
			selectedClasses[this.cssClasses.NOT_SELECTED] = !this.getProperty('selected');
			selectedClasses[this.cssClasses.SELECTED] = this.getProperty('selected');
		}

		return classNames(this.cssClasses.CONTROL,
			this.sizes[this.getProperty('size')],
			this.themes[this.getProperty('theme')],
			this.iconButtonStyles[this.getProperty('iconStyle')],
			selectedClasses, additionalClasses);
	}
});

export default ButtonCore;
