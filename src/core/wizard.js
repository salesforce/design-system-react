// WIZARD CORE

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import { customSelectable } from '../traits/selectable';
const Selectable = customSelectable('step');

// Styles
// require('../../less/wizard.less');

export const CONTROL = 'wizard';

const WizardCore = Lib.merge({}, Base, Selectable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	},

	// Set the defaults
	_defaultProperties: {
		collection: []
	},

/* Accessors: These may be supplied in the options hash to override default behavior

textProp ()
	Return the name of the property that contains the text

getText (item)
	Return the text value to display in the list
	item => object wrapped in an Item Adapter

getKey (item)
	Return either an object with key/value pairs to match or a match function
	Use this to reduce the number of fields required for searching if a unique key is available
	item => object wrapped in an Item Adapter

*/

	accessors: {
		textProp () {
			return 'text';
		},

		getText (item) {
			return item.get(item.textProp());
		},

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
