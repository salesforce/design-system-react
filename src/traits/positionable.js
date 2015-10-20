// SELECTABLE

import * as Lib from '../lib/lib';

// Third party
import classNames from 'classnames';

const Positionable = {
	_defaultProperties: {
		position: 'right', // 'top','right','left','bottom'
		autoFlip: true
	},

	positions: {
		left: 'slds-nubbin--right',
		top: 'slds-nubbin--bottom',
		bottom: 'slds-nubbin--top',
		right: 'slds-nubbin--left'
	},

	autoAdjustedPosition: null,

	getElementAlignment (el, container, align) {
		const offset = Lib.offsetFromParent(align, container);
		const popSize = {};
		const alignSize = {};
		const position = {};
		let popPosition = this.getProperty('position');
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

			this.autoAdjustedPosition = isOffscreen ? popPosition : null;
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

	getClassNames () {
		const positionClass = this.positions[this.autoAdjustedPosition || this.getProperty('position')] || this.positions.right;

		return classNames(this.cssClasses.CONTROL, this.cssClasses.TARGET, positionClass);
	}
};

export default Positionable;
