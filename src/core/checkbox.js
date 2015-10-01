// CHECKBOX CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

export const CONTROL = 'checkbox';

const CheckboxCore = Lib.merge({}, Base, Disableable, {
	cssClasses: {
		CONTROL: CONTROL + '-custom',
		CHECKED: 'checked',
		BLOCK: CONTROL,
		INLINE: CONTROL + '-inline',
		LABEL: CONTROL + '-label',
		ADDON: 'input-group-addon',
		HIGHLIGHT: 'highlight'
	},

	// Set the defaults
	_defaultProperties: {
		checked: false,
		inline: false,
		addon: false,
		highlight: false,
		text: ''			// TODO: should this be "label" ?
	},
	
	isChecked () {
		return !!this.getProperty('checked');
	},
	
	toggle (_checked) {
		let checked;
		
		if (!Lib.isBoolean(_checked)) {
			checked = !this.isChecked();
		} else if (_checked !== this.isChecked()) {
			checked = _checked;
		} else {
			return;
		}
		
		this.setProperties({ checked });
		if (Lib.isFunction(this._onToggled)) this._onToggled();

		if (checked) {
			this.trigger('checked');
		} else {
			this.trigger('unchecked');
		}
		
		this.trigger('changed', checked);
	},
	
	check () {
		this.toggle(true);
	},
	
	uncheck () {
		this.toggle(false);
	}
});

export default CheckboxCore;
