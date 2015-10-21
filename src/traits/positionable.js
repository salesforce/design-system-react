// SELECTABLE

import * as Lib from '../lib/lib';

// Third party
import classNames from 'classnames';

const Positionable = {
	_defaultProperties: {
		position: 'right',
		autoFlip: true
	},

	positions: {
		left: 'slds-nubbin--right',
		top: 'slds-nubbin--bottom',
		bottom: 'slds-nubbin--top',
		right: 'slds-nubbin--left'
	},

	getElementAlignment (el, container, align, newPosition) {
		const offset = Lib.offsetFromParent(align, container);
		const position = {};
		
		const popSize = {
			width: Lib.outerWidth(el),
			height: Lib.outerHeight(el)
		};
		
		const alignSize = {
			width: Lib.outerWidth(align),
			height: Lib.outerHeight(align)
		};
		
		const currentPosition = newPosition || this.getProperty('position');

		switch (currentPosition) {
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

		this.currentPosition = currentPosition;

		return position;
	},

	getClassNames () {
		const positionClass = this.positions[this.currentPosition];

		return classNames(this.cssClasses.CONTROL, this.cssClasses.TARGET, positionClass);
	}
};

export default Positionable;
