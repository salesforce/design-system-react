// CHECKBOX CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

const CONTROL = 'checkbox';

const CheckboxCore = Lib.merge({}, Base, Disableable, {
	cssClasses: {
		CONTROL: Base.cssClasses.NAMESPACE + CONTROL,
		CONTROL_FAUX: Base.cssClasses.NAMESPACE + CONTROL + '--faux'
	},

	_defaultProperties: {
		checkedValue: null,
		labelText: '',
		value: '',
		name: ''
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
		this.trigger('checkedValueChanged', checkedValue);
	},

	check () {
		this.toggle(true);
	},

	uncheck () {
		this.toggle(false);
	}
});

export default CheckboxCore;
