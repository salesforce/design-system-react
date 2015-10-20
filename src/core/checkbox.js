// CHECKBOX CORE

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


	// TODO: consider moving the `check` and `uncheck` logic into their respective methods and calling them from here instead of the other way around (as it is now).
	// This will keep logic in-context and make code more readable (even if we may have some duplicate code)
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

		// TODO: it could be useful to also have an _onBeforeToggled fire off here
		// Radios could utilize this to set all checked to false, and then onToggled
		// could just set the one we want to be true to true.

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
