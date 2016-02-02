/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// COMBOBOX CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import ComboboxCore, {CONTROL} from '../../core/combobox';

// Traits
import Multiselectable from '../../traits/multiselectable';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';
import Svg from '../svg';
import { PicklistObject } from '../picklist/picklist';

const $ = Lib.global.jQuery || Lib.global.$;

// Template imports
import template from './combobox-template';

let Combobox = function Combobox () {
	const options = this._getOptions(arguments);

	this.template = $(template);
	this._initialize(options);
};

export const ComboboxObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = this.template.clone();
		this._initElements();
	},

	_initElements () {
		this.elements.button = this.element.find('.' + this.cssClasses.TOGGLE);
		this.elements.input = this.element.find('.' + this.cssClasses.INPUT);
		this.elements.dropdown = this.element.find('.' + this.cssClasses.MENU);
		this.elements.dropdownMenu = this.element.find('.' + this.cssClasses.LIST);

		/* TODO: icon is not perfectly centered */
		const $icon = this._renderIcon('utility.down');
		$icon.replaceAll(this.elements.button.find('x-button-svg')[0]);
	},

	_bindUIEvents () {
		this.elements.button.on('click', this._handleClicked.bind(this));
		this.elements.dropdownMenu.on('click', 'a', this._handleMenuItemSelected.bind(this));
		this.elements.input.on('change', this._handleChanged.bind(this));
		// TODO: Find the right element for these keypress triggers
		this.elements.dropdown.on('keydown', this._handleKeyDown.bind(this));
		this.elements.dropdown.on('keypress', this._handleKeyPressed.bind(this));
	},

	_render () {
		const selection = this._getSelection();

		if (this.getProperty('disabled')) {
			this.elements.input.attr('disabled', 'disabled');
			this.elements.button.attr('disabled', 'disabled');
		}

		// Show the current selection if there is one
		this.elements.input.val(selection.getText());

		this._renderMenu(this.elements);

		return this.element;
	},

	_onChanged () {
		const item = this._getSelection();

		if (this.rendered) {
			this.elements.input.val(item.getText());

			this._addCheckmark(this.elements);
		}
	},

	enable () {
		this.setProperties({
			disabled: false
		});

		if (this.rendered) {
			this.elements.input.removeAttr('disabled');
			this.elements.button.removeAttr('disabled');
		}
	},

	disable () {
		this.setProperties({
			disabled: true
		});

		if (this.rendered) {
			this.elements.input.attr('disabled', 'disabled');
			this.elements.button.attr('disabled', 'disabled');
		}
	},
	_onEnabledOrDisabled () {
		if (this.rendered) {
			const disabled = !!this.getProperty('disabled');

			this.elements.input.prop('disabled', disabled);
			this.elements.button.prop('disabled', disabled);
		}
	},

	_resetWidth (width) {
		if (this.rendered) {
			this.elements.dropdownMenu.width(width);
		}
	},

	_handleChanged () {
		const value = {};

		// TODO: Not SLDS related, I've realized this model won't work perfectly with all data accessor types - might want to consider this
		value[this.accessors.textProp()] = this.elements.input.val();

		Multiselectable.selectItem(this, value);
	}
};

Lib.merge(Combobox.prototype, ComboboxCore, Events, DOM, State, Svg, PicklistObject, ComboboxObject);


Combobox = Lib.runHelpers('jquery', CONTROL, Combobox);

export default Combobox;
