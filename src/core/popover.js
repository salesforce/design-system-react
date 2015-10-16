// PILLBOX CONTROL
import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Hideable from '../traits/hideable';

// Third party
import classNames from 'classnames';

export const CONTROL = 'slds-popover';

const PopoverCore = Lib.merge({}, Base, Disableable, Hideable, {
	cssClasses: {
		CONTROL: CONTROL,
		TARGET: 'slds-popover-target'
	},

	_defaultProperties: {
		isOpen: false,
		position: 'right', // 'top','right','left','bottom'
		autoFlip: true,
		trigger: 'click', // click, hover, focus, manual
		target: null, // The element who's events will trigger the popover
		container: null, // The element the popover will be contained within
		align: null // The element the popover will be aligned with
	},
	
	positions: {
		left: 'slds-nubbin--right',
		top: 'slds-nubbin--bottom',
		bottom: 'slds-nubbin--top',
		right: 'slds-nubbin--left'
	},

	_getElementAllignment (el, container, align) {
		const offset = Lib.offsetFromParent(align, container);
		const popSize = {};
		const alignSize = {};
		const position = {};
		let popPosition = this.adjustedPosition || this.getProperty('position');
		let isOffscreen;

		popSize.width = Lib.outerWidth(el);
		popSize.height = Lib.outerHeight(el);
		alignSize.width = Lib.outerWidth(align);
		alignSize.height = Lib.outerHeight(align);

		if (this.getProperty('autoFlip')) {// This means autoFlip will not work on scroll only when popover is triggered
			isOffscreen = Lib.isOffscreen(el, true);

			if (isOffscreen) {
				popPosition = isOffscreen === 'top' ? 'bottom' : 'top';
			}
		}

		switch ( popPosition ) {
			case 'left':
				position.left = offset.left - (popSize.width + 15);
				position.top = offset.top - ((popSize.height / 2) - (alignSize.height / 2));
				break;
			case 'top':
				position.left = offset.left - ((popSize.width / 2) - (alignSize.width / 2));
				position.top = offset.top - (popSize.height + 15);
				break;
			case 'bottom':
				position.left = offset.left - ((popSize.width / 2) - (alignSize.width / 2));
				position.top = offset.top + alignSize.height + 15;
				break;
			case 'right':
			default:
				position.left = offset.left + alignSize.width + 15;
				position.top = offset.top - ((popSize.height / 2) - (alignSize.height / 2));
				break;
		}

		return position;
	},
	
	_getClassNames: function () {
		const positionClass = this.positions[this.adjustedPosition || this.getProperty('position')] || this.positions.right;
		
		return classNames(this.cssClasses.CONTROL, this.cssClasses.TARGET, positionClass);
	}
});

export default PopoverCore;
