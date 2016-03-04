/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Popover Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Traits
import Positionable from '../traits/positionable';
import Openable from '../traits/openable';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

export const CONTROL = 'Popover';

const PopoverCore = Lib.merge({}, Base, {
	CONTROL,
	
	cssClasses: {
		CONTROL: 'slds-popover',
		TARGET: 'slds-popover-target',
		HIDDEN: 'slds-hidden'
	},

	triggers: {
		click: 'click',
		hover: ['mouseover', 'mouseout'],
		focus: ['focus', 'focusout'],
		manual: ''
	},

	_defaultProperties: {
		trigger: 'click',
		target: null, // The element who's events will trigger the popover
		container: null, // The element the popover will be contained within
		alignmentTarget: null, // The element the popover will be aligned with

		// positionable trait
		constrainPositionedToWindow: true,
		constrainWidthToTarget: false,
		modal: false,
		positionedTargetVerticalAttachment: 'right',	// default for popover
		positionedOffset: 15,	// default for popover
		positionedTargetHorizontalAttachment: 'left', // center, left. default for popover
		positionedZIndex: '10001',
		supportedCSSTransformKey: Lib.getSupportedCSSTransformKey()
	},
	
	_getClassNames () {
		const positionClass = Positionable.cssClasses.NUBBIN[this.currentTargetAttachment];
		const hiddenClass = !Openable.isOpen(this) && this.cssClasses.HIDDEN;

		return classNames(this.cssClasses.CONTROL, this.cssClasses.TARGET, positionClass, hiddenClass);
	}
});

export default PopoverCore;
