/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// MODAL CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ModalCore, {CONTROL} from '../../core/modal';

// Traits
import Openable from '../../traits/openable';

// Framework Specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './modal-template';

// Provides the default renderers for the header, and the footer.
import DefaultRenderers from './modal-default-renderers';

let Modal = function Modal () {
	const options = this._getOptions(arguments);

	this.template = $(template);

	this.toggle = Openable.toggle.bind(undefined, this);
	this.open = Openable.open.bind(undefined, this);
	this.close = Openable.close.bind(undefined, this);

	this._initialize(options);
};

Lib.merge(Modal.prototype, ModalCore, Events, DOM, State, {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();

		this._initElements();
	},

	_setDefaultProperties () {
		this.setProperties(DefaultRenderers);
	},

	_initElements () {
		this.elements.modal = this.element.find('.' + this.cssClasses.MODAL);
		this.elements.header = this.element.find('.' + this.cssClasses.HEADER);
		this.elements.backdrop = this.element.find('.' + this.cssClasses.BACKDROP);
	},

	_bindUIEvents () {
		this.element.on('click', this._clickOutClose.bind(this));
	},

	_render () {
		const $content = this.elements.wrapper.contents().detach();
		const $headerText = this.elements.header.find('h2');
		$headerText.addClass(this.headerTextSize[this.getProperty('headerTextSize')]);
		$headerText.text(this.getProperty('headerText'));

		this.element.find('.' + this.cssClasses.HEAD).append(this._props.renderHeader({
			headerTitle: this._props.headerText,
			headerTextSize: this._props.headerTextSize,
			headerTagline: this._props.headerTagline,
			closeClicked: this.close
		}));

		this.element.find('.' + this.cssClasses.FOOT).append(this._props.renderFooter({
			primaryText: this._props.primaryButtonText,
			secondaryText: this._props.secondaryButtonText,
			primaryClicked: this._onPrimaryClicked.bind(this),
			secondaryClicked: this._onSecondaryClicked.bind(this)
		}));

		this.element.find('.' + this.cssClasses.CONTENT).append($content);

		return this.element;
	},

	_onRendered () {
		this._bindUIEvents();
	},

	_onPrimaryClicked () {
		this.element.trigger('primary');
	},

	_onSecondaryClicked () {
		this.element.trigger('secondary');
	},
	
	_onOpened () {
		this.elements.modal.addClass(this.cssClasses.OPEN);
		this.elements.backdrop.addClass(this.cssClasses.OPENBACKDROP);
	},
	
	_onClosed () {
		this.elements.modal.removeClass(this.cssClasses.OPEN);
		this.elements.backdrop.removeClass(this.cssClasses.OPENBACKDROP);
		this.element.trigger('close');
	},

	_clickOutClose (e) {
		if (this.backgroundClicked(e.target)) {
			Openable.close(this);
		}
	}
});

Modal = Lib.runHelpers('jquery', CONTROL, Modal, {});

export default Modal;
