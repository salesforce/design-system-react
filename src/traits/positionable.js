// POSITIONABLE

// This trait positions an element based on it's target element. This could be a tooltip, a popover, or a menu. Menus are absolutely positioned since they could exist in a modal. The elements target is the element that triggered the positionable element--for instance, a button or a text input.

import * as Lib from '../lib/lib';

const positionable = {
	/* TODO: Implement scrolling parent "autoflip" via `constrainTargetToScrollingParent: true`. */
	/* TODO: The following properties/options may need to be an object in order to remove `positioned` prefix. */

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

	_attachPositionedElementToBody () {
		const element = document.createElement('div');
		document.querySelector('body').appendChild(element);
		return Lib.wrapElement(element);
	},

	// `addPositionableEventListeners` should be added at the beginning of the control's lifecycle in order to reposition based on browser events. The `stateKey` is an key into the state object to determine if the event handle should run the calculations to reposition the positionable element.
	addPositionableEventListeners (stateKey, controlContext) {
		// return stateKey;
		window.addEventListener('resize', () => {
			this._handleResizeForPositionable(stateKey, controlContext);
		});
		window.addEventListener('scroll', () => {
			this._handleScrollForPositionable(stateKey, controlContext);
		});
	},

	// `removePositionableEventListeners` should be removed at the end of the control's lifecycle.
	removePositionableEventListeners (stateKey, controlContext) {
		// return stateKey;
		window.removeEventListener('resize', () => {
			this._handleResizeForPositionable(stateKey, controlContext);
		});
		window.removeEventListener('scroll', () => {
			this._handleScrollForPositionable(stateKey, controlContext);
		});
	},

	_handleResizeForPositionable (stateKey, controlContext) {
		if (controlContext.getState(stateKey)) {
			controlContext.positionable._updatePosition.call(controlContext,
				controlContext.elements.positionableElement,
				controlContext.elements.positionableContainer,
				controlContext.elements.positionableTarget);
		}
	},

	_handleScrollForPositionable (stateKey, controlContext) {
		if (controlContext.getState(stateKey)) {
			controlContext.positionable._updatePosition.call(controlContext,
				controlContext.elements.positionableElement,
				controlContext.elements.positionableContainer,
				controlContext.elements.positionableTarget);
		}
	},

	// Based upon the positionable element's "x,y" document offset and options provided, this function returns the top and left offsets of the positionable element. It also returns the width of the target element.
	_getElementStyles (element, constrainedToElement, target, newTargetAttachment) {
		const offset = Lib.getElementOffset(target[0], constrainedToElement[0]);
		const offsetAddedByOptions = this.getProperty('positionedOffset');
		const targetHorizontalAttachment = this.getProperty('positionedTargetHorizontalAttachment');
		const newStyle = {};
		let targetHorizontalPosition = 0;
		
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
			targetHorizontalPosition = (elementSize.width / 2) - (targetSize.width / 2);
		} else if (targetHorizontalAttachment === 'left') {
			targetHorizontalPosition = 0;
		}

		switch (currentTargetAttachment) {
			case 'left':
				newStyle.left = offset.left - (elementSize.width + offsetAddedByOptions);
				newStyle.top = offset.top - ((elementSize.height / 2) - (targetSize.height / 2));
				break;
			case 'top':
				newStyle.left = offset.left - targetHorizontalPosition;
				newStyle.top = offset.top - (elementSize.height + offsetAddedByOptions);
				break;
			case 'bottom':
				newStyle.left = offset.left - targetHorizontalPosition;
				newStyle.top = offset.top + targetSize.height + offsetAddedByOptions;
				break;
			case 'right':
			default:
				newStyle.left = offset.left + targetSize.width + offsetAddedByOptions;
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
			const element = this.elements.positionableElement[0];
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
	
	_updatePosition (positionableElement, positionableContainer, positionableTarget) {
		// multiselectable._selectItems.call(this, this._getDataAdapter(items), index);
		positionable._setElementStyles.call(
			this,
			this.positionable._getElementStyles.call(
				this,
				positionableElement,
				positionableContainer,
				positionableTarget
			)
		);
		
		if (this.getProperty('constrainPositionedToWindow')) {
			const isOffscreen = positionableElement.isOffscreen(true);
			let targetAttachment;

			if (isOffscreen === 'top') {
				targetAttachment = 'bottom';
			} else if (isOffscreen === 'bottom') {
				targetAttachment = 'top';
			}

			positionable._setElementStyles.call(
				this,
				this.positionable._getElementStyles.call(
					this,
					positionableElement,
					positionableContainer,
					positionableTarget,
					targetAttachment
				)
			);
		}
	}
};

export default {
	positionable,
	key: 'positionable'
};
