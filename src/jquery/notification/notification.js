/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// NOTIFICATION CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import NotificationCore, {CONTROL} from '../../core/notification';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

// children
import Button from '../button/button';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './template';

// Constructor
let Notification = function Notification () {
	const options = this._getOptions(arguments);
	
	this.template = $(template);
	
	this._initialize(options);
};

export const NotificationObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
	},
	
	// TODO: Internationalize
	// TODO: The patterns here are a little different than the rest of our controls
	_render () {
		const strings = this.getState('strings');
		const classNames = this._getClassNames();

		// Load template
		const $el = this.element;

		// Update theme
		$el.addClass(classNames);

		// Replace notification text
		// TODO: Should this also use the contents of the original? It's different in jQuery becasue in React 'Children' is actually just another prop
		$el.find('.notify-text').text(this.getProperty('text'));

		const $closeButton = new Button({
			assistiveText: strings.CLOSE,
			iconStyle: 'icon-inverse',
			icon: 'action.close'
		});
		$closeButton.element.addClass('slds-notify__close');
		$closeButton.replaceAll($el.find('x-close-button')[0]);

		// Events
		$closeButton.on('click', this.hide.bind(this));
	},
	
	show: function () {
		this.element.removeClass(this.cssClasses.HIDDEN);
		this.trigger('shown');
	},

	hide: function () {
		this.element.addClass(this.cssClasses.HIDDEN);
		this.trigger('hidden');
	}
};

Lib.merge(Notification.prototype, NotificationCore, Events, DOM, State, NotificationObject);
Notification = Lib.runHelpers('jquery', CONTROL, Notification);

export default Notification;
