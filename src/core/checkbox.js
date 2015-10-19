// CHECKBOX CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

// Styles
require('../../scss/components/forms/flavors/form-element/index.scss');
require('../../scss/components/forms/flavors/checkbox/index.scss');

export const CONTROL = 'checkbox';

const CheckboxCore = Lib.merge({}, Base, Disableable, {
	cssClasses: {
		CONTROL: Base.cssClasses.NAMESPACE + CONTROL,
		FAUX: Base.cssClasses.NAMESPACE + CONTROL + '--faux'
	},

	_defaultProperties: {
		checked: null,
		labelText: '',
		value: '',
		name: ''
	},

	isChecked () {
		return this.getProperty('checked');
	},

	toggle (_checked) {
		let checked;
		const origValue = this.getProperty('checked');

		if (this.getProperty('disabled')) {
			return;
		}

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

		if (origValue !== checked) {
			this.trigger('changed', checked);
			this.trigger('checkedValueChanged', checked );
		}
	},

	check () {
		this.toggle(true);
	},

	uncheck () {
		this.toggle(false);
	}
});

export default CheckboxCore;
