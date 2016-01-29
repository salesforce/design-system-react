/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// POPOVER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import PopoverCore, {CONTROL} from '../../core/popover';

// Traits
import Positionable from '../../traits/positionable';
import Openable from '../../traits/openable';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './popover-template';

let Popover = function Popover () {
	const options = this._getOptions(arguments);
	this.template = $(template);
	
	this.toggle = Openable.toggle.bind(undefined, this);
	this.open = Openable.open.bind(undefined, this);
	this.close = Openable.close.bind(undefined, this);
	
	this._initialize(options);
};

export const PopoverMethods = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		Positionable.setElement(this, this.element);
	},
	
	_onRendered () {
		this._setElements();
		this._setTrigger();
		
		// TODO: This is probably not the best way to do this or the best place for it to be
		this.appendTo($(Positionable.getContainer(this)));
	},

	_setElements () {
		const triggerElement = this.getProperty('target');
		const align = this.getProperty('align');

		this.elements.triggerElement = Lib.wrapElement(triggerElement || this.elements.wrapper);
		Positionable.setContainer(this, this.getProperty('container') || document.querySelector('body'));
		Positionable.setTarget(this, align || this.elements.triggerElement);
	},

	_setTrigger () {
		const trigger = this.getProperty('trigger');

		if (trigger === 'click') {
			this.elements.triggerElement.on( 'click', $.proxy(this.toggle, this));
		} else if (trigger === 'hover') {
			this.elements.triggerElement.on( 'mouseover', $.proxy(this.open, this));
			this.elements.triggerElement.on( 'mouseout', $.proxy(this.close, this));
		} else if (trigger === 'focus') {
			this.elements.triggerElement.on( 'focus', $.proxy(this.open, this));
			this.elements.triggerElement.on( 'focusout', $.proxy(this.close, this));
		}
	},
	
	_onOpened () {
		Positionable.position(this);
		Positionable.show(this);
	},
	
	_onClosed () {
		Positionable.position(this);
	}
};

Lib.merge(Popover.prototype, PopoverCore, Events, DOM, State, PopoverMethods, {
	_render () {
		const body = this.element.find('.slds-popover__body');

		if (this.getProperty('content')) {
			body.append(this.getProperty('content'));
		}
		
		return this.element;
	}
});

Popover = Lib.runHelpers('jquery', CONTROL, Popover, {});

export default Popover;
