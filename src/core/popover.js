// POPOVER CONTROL
import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Positionable from '../traits/positionable';
import Disableable from '../traits/disableable';
import Hideable from '../traits/hideable';

// Third party
import classNames from 'classnames';

// Styles
// require('../../scss/components/popovers/flavors/base/index.scss');

export const CONTROL = 'slds-popover';

const PopoverCore = Lib.merge({}, Base, Positionable, Disableable, Hideable, {
	cssClasses: {
		CONTROL: CONTROL,
		TARGET: 'slds-popover-target'
	},

	triggers: {
		click: 'click',
		hover: ['mouseover', 'mouseout'],
		focus: ['focus', 'focusout'],
		manual: ''
	},

	_defaultProperties: {
		id: Lib.uniqueId(CONTROL + '-'),
		trigger: 'click',
		target: null, // The element who's events will trigger the popover
		container: null, // The element the popover will be contained within
		align: null // The element the popover will be aligned with
	},
	
	_defaultState: {
		isHidden: true
	},
	
	_getClassNames () {
		const positionClass = this.positions[this.currentPosition];
		const hiddenClass = this.getState('isHidden') && this.cssClasses.HIDDEN;

		return classNames(this.cssClasses.CONTROL, this.cssClasses.TARGET, positionClass, hiddenClass);
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
