// POSITIONABLE

// This trait positions an element based on it's target element. This could be a tooltip, a popover, or a menu. Menus are absolutely positioned since they could exist in a modal. The elements target is the element that triggered the positionable element--for instance, a button or a text input.

import * as Lib from '../lib/lib';

const Positionable = {
	/* TODO: Implement scrolling parent "autoflip" via `constrainTargetToScrollingParent: true`. */
	/* TODO: The following properties/options may need to be an object in order to remove `positioned` prefix. */
	_defaultProperties: {
		constrainPositionedToWindow: true,
		constrainWidthToTarget: false,
		positionedTargetVerticalAttachment: 'right',	// default for popover
		positionedOffset: 15,	// default for popover
		positionedTargetHorizontalAttachment: 'left', // center, left. default for popover
		positionedZIndex: '10001',
		supportedCSSTransformKey: Lib.getSupportedCSSTransformKey()
	},

	// A nubbin is the small arrow on the side of tooltips and popovers and face the triggering target element.
	cssClasses: {
		NUBBIN: {
			left: 'slds-nubbin--right',
			top: 'slds-nubbin--bottom',
			bottom: 'slds-nubbin--top',
			right: 'slds-nubbin--left'
		}
	},

	// Positionable elements are attached to their target element.
	attatchmentOptions: {
		bottom: 'bottom',
		center: 'center',
		left: 'left',
		right: 'right',
		top: 'top'
	},

	// Based upon the positionable element's "x,y" document offset and options provided, this function returns the top and left offsets of the positionable element. It also returns the width of the target element.
	_getElementStyles (element, constrainedToElement, target, newTargetAttachment) {
		const offset = Lib.getElementOffset(target[0], constrainedToElement[0]);
		const targetDistance = this.getProperty('positionedOffset');
		const targetHorizontalAttachment = this.getProperty('positionedTargetHorizontalAttachment');
		const newStyle = {};
		let alignLatPos = 0;
		
		const elementSize = {
			width: element.outerWidth(),
			height: element.outerHeight()
		};
		
		const targetSize = {
			width: target.outerWidth(),
			height: target.outerHeight()
		};
		
		const currentTargetAttachment = newTargetAttachment || this.getProperty('positionedTargetVerticalAttachment');

		newStyle.width = this.getProperty('width') || targetSize.width;

		if (targetHorizontalAttachment === 'center') {
			alignLatPos = (elementSize.width / 2) - (targetSize.width / 2);
		} else if (targetHorizontalAttachment === 'left') {
			alignLatPos = 0;
		}

		switch (currentTargetAttachment) {
			case 'left':
				newStyle.left = offset.left - (elementSize.width + targetDistance);
				newStyle.top = offset.top - ((elementSize.height / 2) - (targetSize.height / 2));
				break;
			case 'top':
				newStyle.left = offset.left - alignLatPos;
				newStyle.top = offset.top - (elementSize.height + targetDistance);
				break;
			case 'bottom':
				newStyle.left = offset.left - alignLatPos;
				newStyle.top = offset.top + targetSize.height + targetDistance;
				break;
			case 'right':
			default:
				newStyle.left = offset.left + targetSize.width + targetDistance;
				newStyle.top = offset.top - ((elementSize.height / 2) - (targetSize.height / 2));
				break;
		}

		// currentTargetAttachment is used to set nubbin class names
		this.currentTargetAttachment = currentTargetAttachment;

		newStyle.left = Math.round(newStyle.left);
		newStyle.top = Math.round(newStyle.top);

		return newStyle;
	},
	
	// Apply latest position (due to render, scroll, or resize).
	_setElementStyles (style) {
		if (style) {
			const element = this.elements.positionedElement[0];
			let transformation = 'translateX(' + style.left + 'px) translateY(' + style.top + 'px)';
			
			element.style.top = 0;
			element.style.left = 0;
			element.style.position = 'absolute';
			element.style.zIndex = this.getProperty('positionedZIndex');

			if (this.getProperty('supportedCSSTransformKey') !== 'msTransform') {
				// The Z transform will trigger GPU usage (faster, les artifacts), but IE9 doesn't support 3d transforms and will choke. Observations say that a dropdown inside a modal will still oscillate when scrolling.
				transformation += ' translateZ(0)';
			}

			element.style[this.getProperty('supportedCSSTransformKey')] = transformation;

			if (this.getProperty('constrainWidthToTarget')) {
				element.style.width = style.width + 'px';
			}

			/* TODO: If we're going to call this here we need to check if it exists first. But maybe we shouldn't? */
			if (this._getClassNames) element.className = this._getClassNames();
		}
	},
	
	_updatePosition () {
		this._setElementStyles(
			this._getElementStyles(
				this.elements.positionedElement,
				this.elements.container,
				this.elements.align
				)
			);
		
		if (this.getProperty('constrainPositionedToWindow')) {
			const isOffscreen = this.elements.positionedElement.isOffscreen(true);
			let targetAttachment;

			if (isOffscreen === 'top') {
				targetAttachment = 'bottom';
			} else if (isOffscreen === 'bottom') {
				targetAttachment = 'top';
			}

			this._setElementStyles(
				this._getElementStyles(
					this.elements.positionedElement,
					this.elements.container,
					this.elements.align,
					targetAttachment
				)
			);
		}
	}
};

export default Positionable;
