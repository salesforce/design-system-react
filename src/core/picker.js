// PICKER CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

export const CONTROL = 'picker';

const PickerCore = Lib.merge({}, Base, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	},
	
	_getPositionAbove (element) {
		const position = element.offset();
		
		position.top = position.top - this.elements.wrapper.outerHeight(true);
		return position;
	},

	_getPositionBelow (element) {
		const position = element.offset();
		
		position.top = position.top + element.outerHeight(true);
		return position;
	},
	
	_getCenteredPosition () {
		// TO-DO: Implement this to support modals
	}
});

export default PickerCore;
