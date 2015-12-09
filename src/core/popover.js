// # Popover Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Hideable from '../traits/hideable';
import Positionable from '../traits/positionable';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

export const CONTROL = 'Popover';

const PopoverCore = Lib.merge({}, Base, Disableable, Hideable, {
	CONTROL,
	
	cssClasses: {
		CONTROL: 'slds-popover',
		TARGET: 'slds-popover-target'
	},

	triggers: {
		click: 'click',
		hover: ['mouseover', 'mouseout'],
		focus: ['focus', 'focusout'],
		manual: ''
	},

	_defaultProperties: {
		trigger: 'click',
		target: null, // The element who's events will trigger the popover
		container: null, // The element the popover will be contained within
		alignmentTarget: null, // The element the popover will be aligned with

		// positionable trait
		constrainPositionedToWindow: true,
		constrainWidthToTarget: false,
		positionedTargetVerticalAttachment: 'right',	// default for popover
		positionedOffset: 15,	// default for popover
		positionedTargetHorizontalAttachment: 'left', // center, left. default for popover
		positionedZIndex: '10001',
		supportedCSSTransformKey: Lib.getSupportedCSSTransformKey()
	},
	
	_defaultState: {
		isHidden: true
	},
	
	_getClassNames () {
		const positionClass = Positionable.cssClasses.NUBBIN[this.currentTargetAttachment];
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
