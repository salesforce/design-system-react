// POPOVER CONTROL
import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Positionable from '../traits/positionable';
import Disableable from '../traits/disableable';
import Hideable from '../traits/hideable';

// Styles
require('../../scss/components/popovers/flavors/base/index.scss');

export const CONTROL = 'slds-popover';

const PopoverCore = Lib.merge({}, Base, Positionable, Disableable, Hideable, {
	cssClasses: {
		CONTROL: CONTROL,
		TARGET: 'slds-popover-target'
	},

	_defaultProperties: {
		trigger: 'click', // click, hover, focus, manual
		target: null, // The element who's events will trigger the popover
		container: null, // The element the popover will be contained within
		align: null // The element the popover will be aligned with
	},
	
	_defaultState: {
		isHidden: true
	},
	
	toggle () {
		if (this.getState('isHidden')) {
			this.show();
		} else {
			this.hide();
		}
	}
});

export default PopoverCore;
