// WIZARD CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import { customSelectable } from '../traits/selectable';
const Selectable = customSelectable('step');

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
	
	_canSelect (step) {
		let canMove;
		
		// TO-DO: Add more conditions for which moving to the step is prohibited
		if (Lib.isFunction(this.canMoveToStep)) {
			canMove = this.canMoveToStep(step);
		} else {
			canMove = true;
		}
		
		return canMove;
	},
	
	nextStep () {
		let index = this._collection.indexOf(this.getStep());
		index++;
		
		this.setStepByIndex(index);
	},
	
	previousStep () {
		let index = this._collection.indexOf(this.getStep());
		index--;
		
		this.setStepByIndex(index);
	}
});

export default WizardCore;
