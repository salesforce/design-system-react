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

	_defaultProperties: {
		checkedValue: null,
		inline: false,
		addon: false,
		highlight: false,
		text: '',			// TODO: should this be "label" ?
		value: ''
	},

	isChecked () {
		return this.getProperty('checkedValue') === this.getProperty('value');
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

		const checkedValue = checked ? this.getProperty('value') : null;
		this.setProperties({ checkedValue });

		if (Lib.isFunction(this._onToggled)) this._onToggled();

		if (checked) {
			this.trigger('checked');
		} else {
			this.trigger('unchecked');
		}
		
		this.trigger('changed', checked);
		this.trigger('changedCheckedValue', checkedValue);
	},
	
	check () {
		this.toggle(true);
	},
	
	uncheck () {
		this.toggle(false);
	}
});

export default CheckboxCore;
