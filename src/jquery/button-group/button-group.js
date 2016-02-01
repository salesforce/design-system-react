/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// BUTTON GROUP CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import Base from '../../core/base';

// Framework specific
import DOM from '../dom';
import Events from '../events';
import State from '../state';

// Children
import Button from '../button/button';
import ButtonCore from '../../core/button';

const $ = Lib.global.jQuery || Lib.global.$;

// Constructor
let ButtonGroup = function ButtonGroup () {
	const options = this._getOptions(arguments);

	this.childOptions = {
		icon: options.icon,
		iconPosition: options.iconPosition,
		iconStyle: options.iconStyle,
		text: options.text,
		theme: options.theme
	};
	
	this._initialize(options);
};

export const ButtonGroupObject = {
	_defaultProperties: ButtonCore._defaultProperties,
	
	_initializer () {
		this.element = this.$el = this.elements.control = $('<div>');
	},

	// TODO: Support dropdowns also
	_renderButtons () {
		const buttonOptions = this.getProperty('buttons');
		let children;
		
		children = [].concat(this.getProperty('children'));
		
		if (Lib.isArray(buttonOptions)) {
			children = children.concat(buttonOptions.map((child) => {
				return new Button(Lib.extend({}, this.childOptions, child));
			}));
		}
		
		this.setProperties({
			children,
			buttons: null
		});
		
		return children.map((button) => {
			return button.element;
		});
	},

	_render () {
		this.element
			.addClass('slds-button-group')
			.append(this._renderButtons());
		
		return this.element;
	}
};

const CONTROL = 'slds-button-group';

Lib.merge(ButtonGroup.prototype, Base, Events, DOM, State, ButtonGroupObject);
ButtonGroup = Lib.runHelpers('jquery', CONTROL, ButtonGroup);

export default ButtonGroup;
