// # Wizard Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Traits
import { customSelectable } from '../traits/selectable';
const Selectable = customSelectable('step');

export const CONTROL = 'Wizard';

const WizardCore = Lib.merge({}, Base, Selectable, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-wizard'
	},

	// Set the defaults
	_defaultProperties: {
		collection: []
	},

	// ### Accessors
	// These may be supplied in the options hash / properties to override default behavior. All accessors take 'item' as their first properties, which is an object from the collection wrapped in an item adapter.
	accessors: {
		// Return the name of the property that contains the text.
		textProp () {
			return 'text';
		},

		// Return the text value to display in the list.
		getText (item) {
			return item.get(item.textProp());
		},

		// Return either an object with key/value pairs to match or a match function. Use this to reduce the number of fields required for searching if a unique key is available.
		getKey (item) {
			return item.get();
		}
	},

	_canSelect (step, select) {
		// TODO: Add more conditions for which moving to the step is prohibited
		if (Lib.isFunction(this.canMoveToStep)) {
			Promise.resolve(this.canMoveToStep(step)).then(canSelect => {
				if (canSelect !== false) {
					select();
				}
			}, error => {
				Lib.log(error);
			});
		} else {
			select();
		}
	},

	getIndex () {
		return this._collection.indexOf(this._getSelection()) + 1;
	},

	setStepByIndex (index) {
		Selectable.setStepByIndex.call(this, index - 1);
	},

	nextStep () {
		let index = this.getIndex();
		index++;

		this.setStepByIndex(index);
	},

	previousStep () {
		let index = this.getIndex();
		index--;

		this.setStepByIndex(index);
	},

	_onFinished () {
		this.trigger('finished');
	}
});

export default WizardCore;
