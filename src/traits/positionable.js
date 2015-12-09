// POSITIONABLE

// Traits are collections of methods and object literals (of typically strings) grouped for convenience and to decrease duplicate code. They should be imported in control Facades. They should not contain default properties and not be merged into control objects. Default properties should be listed in the control core. Traits are imported into a control facade, and therefore `this` is often passed into trait methods to allow access to the calling instance object. Anything added to the control object by the trait should be owned by the trait and be considered state.

// This trait positions an element based on it's target element. This could be a tooltip, a popover, or a menu. Menus are absolutely positioned since they could exist in a modal. The elements target is the element that triggered the positionable element--for instance, a button or a text input.

import * as Lib from '../lib/lib';

const Positionable = {
	/* TODO: Implement scrolling parent "autoflip" via `constrainTargetToScrollingParent: true`. */

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

	_handleWindowEvents (controlContext) {
		Positionable.position(controlContext);
	},

	// Based upon the positionable element's "x,y" document offset and options provided, this function returns the top and left offsets of the positionable element. It also returns the width of the target element.
	_getElementStyles (controlContext, newTargetAttachment) {
		const element = controlContext.elements._positionable_element;
		const constrainedToElement = controlContext.elements._positionable_container;
		const target = controlContext.elements._positionable_target;
		// element is [0] for jQuery compatibility
		const offset = Lib.getElementOffset(target[0], constrainedToElement[0]);
		const offsetAddedByOptions = controlContext.getProperty('positionedOffset');
		const targetHorizontalAttachment = controlContext.getProperty('positionedTargetHorizontalAttachment');
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
		
		const currentTargetAttachment = newTargetAttachment || controlContext.getProperty('positionedTargetVerticalAttachment');

		newStyle.width = controlContext.getProperty('width') || targetSize.width;

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
		controlContext.currentTargetAttachment = currentTargetAttachment;

		newStyle.left = Math.round(newStyle.left);
		newStyle.top = Math.round(newStyle.top);

		return newStyle;
	},
	
	// Apply latest position (due to render, scroll, or resize).
	_setElementStyles (controlContext, style) {
		if (style) {
			const element = controlContext.elements._positionable_element[0];
			let transformation = 'translateX(' + style.left + 'px) translateY(' + style.top + 'px)';
			
			element.style.top = 0;
			element.style.left = 0;
			element.style.position = 'absolute';
			element.style.zIndex = controlContext.getProperty('positionedZIndex');

			if (controlContext.getProperty('supportedCSSTransformKey') !== 'msTransform') {
				// The Z transform will trigger GPU usage (faster, les artifacts), but IE9 doesn't support 3d transforms and will choke. Observations say that a dropdown inside a modal will still oscillate when scrolling.
				transformation += ' translateZ(0)';
			}

			element.style[controlContext.getProperty('supportedCSSTransformKey')] = transformation;

			if (controlContext.getProperty('constrainWidthToTarget')) {
				element.style.width = style.width + 'px';
			}

			/* TODO: If we're going to call this here we need to check if it exists first. But maybe we shouldn't? */
			if (controlContext._getClassNames) element.className = controlContext._getClassNames();
		}
	},

	// PUBLIC METHODS FOR CONTROLS
	attachPositionedElementToBody () {
		const element = document.createElement('div');
		document.querySelector('body').appendChild(element);
		return Lib.wrapElement(element);
	},

	addEventListeners (controlContext) {
		if (!controlContext._positionable_resize_event_handler) {
			controlContext._positionable_resize_event_handler = Positionable._handleWindowEvents.bind(this, controlContext);
			window.addEventListener('resize', controlContext._positionable_resize_event_handler);
		}

		if (!controlContext._positionable_scroll_event_handler) {
			controlContext._positionable_scroll_event_handler = Positionable._handleWindowEvents.bind(this, controlContext);
			window.addEventListener('scroll', controlContext._positionable_scroll_event_handler);
		}
	},

	hide (controlContext) {
		controlContext.elements._positionable_element.addClass('slds-hidden');
	},

	// `removePositionableEventListeners` should be removed at the end of the control's lifecycle.
	removeEventListeners (controlContext) {
		if (controlContext._positionable_resize_event_handler) {
			window.removeEventListener('resize', controlContext._positionable_resize_event_handler);
		}

		if (controlContext._positionable_scroll_event_handler) {
			window.removeEventListener('scroll', controlContext._positionable_scroll_event_handler);
		}
	},

	position (controlContext) {
		// multiselectable._selectItems.call(this, this._getDataAdapter(items), index);
		Positionable._setElementStyles(controlContext,
			Positionable._getElementStyles(controlContext)
		);
		
		if (controlContext.getProperty('constrainPositionedToWindow')) {
			const isOffscreen = controlContext.elements._positionable_element.isOffscreen(true);
			let targetAttachment;

			if (isOffscreen === 'top') {
				targetAttachment = 'bottom';
			} else if (isOffscreen === 'bottom') {
				targetAttachment = 'top';
			}

			Positionable._setElementStyles(controlContext,
				Positionable._getElementStyles(controlContext, targetAttachment)
			);
		}
	},

	show (controlContext) {
		controlContext.elements._positionable_element.removeClass('slds-hidden');
	},

	// ACCESSORS
	getElement (controlContext) {
		return controlContext.elements._positionable_element.element;
	},

	getContainer (controlContext) {
		return controlContext.elements._positionable_container.element;
	},

	setContainer (controlContext, element) {
		controlContext.elements._positionable_container = Lib.wrapElement(element);
		return controlContext.elements._positionable_container;
	},

	setElement (controlContext, element) {
		controlContext.elements._positionable_element = Lib.wrapElement(element);
		return controlContext.elements._positionable_element;
	},
	
	setTarget (controlContext, element) {
		controlContext.elements._positionable_target = Lib.wrapElement(element);
		return controlContext.elements._positionable_target;
	}

};

export default Positionable;
