/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// POSITIONABLE

// Traits are collections of methods and object literals (of typically strings) grouped for convenience and to decrease duplicate code. They should be imported in control Facades. They should not contain default properties and not be merged into control objects. Default properties should be listed in the control core. Traits are imported into a control facade, and therefore `this` is often passed into trait methods to allow access to the calling instance object. Anything added to the control object by the trait should be owned by the trait and be considered state.

// This trait positions an element based on it's target element. This could be a tooltip, a popover, or a menu. Menus are absolutely positioned since they could exist in a modal. The elements target is the element that triggered the positionable element--for instance, a button or a text input.

import * as Lib from '../lib/lib';

// These are private function redefined below the public export object.
let setElementStyles = () => {};
let handleWindowEvents = () => {};
let constrainToWindow = () => {};

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

	// PUBLIC METHODS FOR CONTROLS
	attachPositionedElementToBody (options) {
		const element = document.createElement('div');

		if (options && typeof options.classes !== 'undefined') {
			element.className = element.className + options.classes;
		}
		
		if (options && Array.isArray(options.attributes)) {
			options.attributes.forEach(function (attribute) {
				element.setAttribute(attribute[0], attribute[1]);
			});
		}

		document.querySelector('body').appendChild(element);
		return Lib.wrapElement(element);
	},

	addEventListeners (controlContext) {
		if (!controlContext._positionableResizeEventHandler) {
			controlContext._positionableResizeEventHandler = handleWindowEvents.bind(this, controlContext);
			window.addEventListener('resize', controlContext._positionableResizeEventHandler);
		}

		if (!controlContext._positionable_scroll_event_handler) {
			controlContext._positionableScrollEventHandler = handleWindowEvents.bind(this, controlContext);
			window.addEventListener('scroll', controlContext._positionableScrollEventHandler);

			controlContext._positionableScrollingParent = Lib.getScrollingAncestor(Positionable.getTarget(controlContext));
			if (controlContext._positionableScrollingParent !== document.documentElement) {
				controlContext._positionableScrollingParent.addEventListener('scroll', controlContext._positionableScrollEventHandler);
			}
		}
	},

	hide (controlContext) {
		Lib.wrapElement(Positionable.getElement(controlContext)).addClass('slds-hidden');
	},

	position (controlContext) {
		/* sometimes position is called before the positioned element is initialized */
		if (Positionable.getElement(controlContext)) {
			setElementStyles(controlContext);
		
			if (controlContext.getProperty('constrainPositionedToWindow')) {
				// This also sets the element style. `setElementStyles` is intentionally ran twice, so that there is not a noticable visual delay. */
				constrainToWindow(controlContext);
			}
		}
	},

	// `removePositionableEventListeners` should be removed at the end of the control's lifecycle.
	removeEventListeners (controlContext) {
		if (controlContext._positionableResizeEventHandler) {
			window.removeEventListener('resize', controlContext._positionableResizeEventHandler);
		}

		if (controlContext._positionableScrollEventHandler) {
			if (controlContext._positionableScrollingParent) {
				controlContext._positionableScrollingParent.removeEventListener('scroll', controlContext._positionableScrollEventHandler);
			}
			window.removeEventListener('scroll', controlContext._positionableScrollEventHandler);
		}
	},

	show (controlContext) {
		Lib.wrapElement(Positionable.getElement(controlContext)).removeClass('slds-hidden');
	},

	// ACCESSORS
	getElement (controlContext) {
		// This is the same as `.element` and is present for jQuery element compatibility.
		return controlContext._positionableElement[0];
	},

	getContainer (controlContext) {
		// This is the same as `.element` and is present for jQuery element compatibility.
		return controlContext._positionableContainer[0];
	},

	getTarget (controlContext) {
		// This is the same as `.element` and is present for jQuery element compatibility.
		return controlContext._positionableTarget[0];
	},

	setContainer (controlContext, element) {
		controlContext._positionableContainer = Lib.wrapElement(element);
		return element;
	},

	setElement (controlContext, element) {
		controlContext._positionableElement = Lib.wrapElement(element);
		return element;
	},
	
	setTarget (controlContext, element) {
		controlContext._positionableTarget = Lib.wrapElement(element);
		return element;
	}

};

// PRIVATE FUNCTIONS

handleWindowEvents = (controlContext) => {
	Positionable.position(controlContext);
};

// Based upon the positionable element's "x,y" document offset and options provided, this function returns the top and left offsets of the positionable element. It also returns the width of the target element.
const getElementStyles = (controlContext, newTargetAttachment) => {
	const wrappedElement = Lib.wrapElement(Positionable.getElement(controlContext));
	const container = Positionable.getContainer(controlContext);

	const target = Positionable.getTarget(controlContext);
	const wrappedTarget = Lib.wrapElement(Positionable.getTarget(controlContext));

	const offset = Lib.getElementOffset(target, container);
	const offsetAddedByOptions = controlContext.getProperty('positionedOffset');
	const targetHorizontalAttachment = controlContext.getProperty('positionedTargetHorizontalAttachment');
	const newStyle = {};
	let targetHorizontalPosition = 0;
	
	let elementHeight = wrappedElement.outerHeight();

	if (elementHeight === 0 && Positionable.getElement(controlContext).firstChild) {
		elementHeight = Lib.wrapElement(Positionable.getElement(controlContext).firstChild).outerHeight();
	}

	const elementSize = {
		width: wrappedElement.outerWidth(),
		height: elementHeight
	};
	
	const targetSize = {
		width: wrappedTarget.outerWidth(),
		height: wrappedTarget.outerHeight()
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
};

// Apply latest position (due to render, scroll, or resize).
setElementStyles = (controlContext, targetAttachment) => {
	const style = getElementStyles(controlContext, targetAttachment);

	if (style) {
		const element = Positionable.getElement(controlContext);
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
};

constrainToWindow = (controlContext) => {
	let targetAttachment = false;
	let elementToMeasure;

	/* Positioned element's height is typically zero, since it often contains positioned elements such as dropdowns and menus. */
	if (Lib.wrapElement(Positionable.getElement(controlContext)).outerHeight() === 0
			&& Positionable.getElement(controlContext).firstChild) {
		elementToMeasure = Positionable.getElement(controlContext).firstChild;
	}	else {
		elementToMeasure = Positionable.getElement(controlContext);
	}

	const isOffscreen = Lib.wrapElement(elementToMeasure).isOffscreen();

	if (controlContext.getProperty('modalMenu')) {
		const isVisible = Lib.isVisible(Positionable.getTarget(controlContext));

		if (isVisible) {
			Positionable.show(controlContext);
		} else {
			Positionable.hide(controlContext);
		}
	}

	if (isOffscreen && isOffscreen.top === true) {
		targetAttachment = 'bottom';
	} else if (isOffscreen && isOffscreen.bottom === true) {
		targetAttachment = 'top';
	}

	setElementStyles(controlContext, targetAttachment);
};

export default Positionable;
