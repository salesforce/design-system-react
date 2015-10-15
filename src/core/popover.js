// PILLBOX CONTROL
import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';

export const CONTROL = 'popover';

const PopoverCore = Lib.merge({}, Base, Disableable, {

	cssClasses: {
		CONTROL: CONTROL
	},

	_defaultProperties: {
		isOpen: false,
		placement: 'auto'// 'auto','top','right','left','bottom'
	},

	// Used for positioning of popovers placed within the body absolutely positioned
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

		switch ( this.getProperty('placement') ) {
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

	_getNubbinClass () {
		const popPos = this.getProperty('position');
		let nubSuffix;

		switch (popPos) {
			case 'left':
				nubSuffix = 'right';
				break;
			case 'top':
				nubSuffix = 'bottom';
				break;
			case 'bottom':
				nubSuffix = 'top';
				break;
			case 'right':
			default:
				nubSuffix = 'left';
				break;
		}

		return 'slds-nubbin--' + nubSuffix;
	}

});

export default PopoverCore;
