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
		position: 'auto' // 'auto','top','right','left','bottom'
	},
	
	positions: {
		left: 'slds-nubbin--right',
		top: 'slds-nubbin--bottom',
		bottom: 'slds-nubbin--top',
		right: 'slds-nubbin--left',
		auto: 'slds-nubbin--left'
	},

	// Used for positioning of popovers placed within the body absolutely positioned
	// TODO: There's some stuff for this in Lib you can use, and also take a look at the Picker code
	_getElementPagePosition (el) {
		const rect = el.getBoundingClientRect();
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	},

	// Used for positioning of popovers placed within their target
	_getElementRelativePosition (popEl, target) {
		const popSize = {};
		const targetSize = {};
		const position = {};

		popSize.width = popEl.offsetWidth;
		popSize.height = popEl.offsetHeight;
		targetSize.width = target.offsetWidth;
		targetSize.height = target.offsetHeight;

		switch ( this.getProperty('position') ) {
			case 'left':
				position.left = -(popSize.width + 15);
				position.top = -((popSize.height / 2) - (targetSize.height / 2));
				break;
			case 'top':
				position.left = -((popSize.width / 2) - (targetSize.width / 2));
				position.top = -(popSize.height + 15);
				break;
			case 'bottom':
				position.left = -((popSize.width / 2) - (targetSize.width / 2));
				position.top = targetSize.height + 15;
				break;
			case 'right':
			default:
				position.left = targetSize.width + 15;
				position.top = -((popSize.height / 2) - (targetSize.height / 2));
				break;
		}

		return position;
	},
	
	_getClassNames: function () {
		const positionClass = this.positions[this.getProperty('position')] || this.positions.right;
		
		return classNames(this.cssClasses.CONTROL, this.cssClasses.TARGET, positionClass);
	}
});

export default PopoverCore;
