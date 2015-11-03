// POSITIONABLE

import * as Lib from '../lib/lib';

const Positionable = {
	_defaultProperties: {
		position: 'right',
		autoFlip: true,
		targetDistance: 15,
		targetLateralAlign: 'center'// center, left
	},

	positions: {
		left: 'slds-nubbin--right',
		top: 'slds-nubbin--bottom',
		bottom: 'slds-nubbin--top',
		right: 'slds-nubbin--left'
	},

	_getElementAlignment (el, container, align, newPosition) {
		const offset = Lib.offsetFromParent(align[0], container[0]);
		const targetDistance = this.getProperty('targetDistance');
		const targetLateralAlign = this.getProperty('targetLateralAlign');
		const position = {};
		let alignLatPos = 0;
		
		const popSize = {
			width: el.outerWidth(),
			height: el.outerHeight()
		};
		
		const alignSize = {
			width: align.outerWidth(),
			height: align.outerHeight()
		};
		
		const currentPosition = newPosition || this.getProperty('position');

		if (targetLateralAlign === 'center') {
			alignLatPos = (popSize.width / 2) - (alignSize.width / 2);
		} else if (targetLateralAlign === 'left') {
			alignLatPos = 0;
		}

		switch (currentPosition) {
			case 'left':
				position.left = offset.left - (popSize.width + targetDistance);
				position.top = offset.top - ((popSize.height / 2) - (alignSize.height / 2));
				break;
			case 'top':
				position.left = offset.left - alignLatPos;
				position.top = offset.top - (popSize.height + targetDistance);
				break;
			case 'bottom':
				position.left = offset.left - alignLatPos;
				position.top = offset.top + alignSize.height + targetDistance;
				break;
			case 'right':
			default:
				position.left = offset.left + alignSize.width + targetDistance;
				position.top = offset.top - ((popSize.height / 2) - (alignSize.height / 2));
				break;
		}

		this.currentPosition = currentPosition;

		return position;
	},
	
	_setPositionStyles (style) {
		if (style) {
			const popover = this.elements.popover[0];
			
			popover.style.top = style.top + 'px';
			popover.style.left = style.left + 'px';
			// TODO: If we're going to call this here we need to check if it exists first. But maybe we shouldn't?
			if (this._getClassNames) popover.className = this._getClassNames();
		}
	},
	
	_updatePosition () {
		this._setPositionStyles(this._getElementAlignment(this.elements.popover, this.elements.container, this.elements.align));
		
		const isOffscreen = this.elements.popover.isOffscreen(true);
		if (isOffscreen === 'top') {
			this._setPositionStyles(this._getElementAlignment(this.elements.popover, this.elements.container, this.elements.align, 'bottom'));
		} else if (isOffscreen === 'bottom') {
			this._setPositionStyles(this._getElementAlignment(this.elements.popover, this.elements.container, this.elements.align, 'top'));
		}
	}
};

export default Positionable;
