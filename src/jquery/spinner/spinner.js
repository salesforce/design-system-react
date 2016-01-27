/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// LOADER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import SpinnerCore, {CONTROL} from '../../core/spinner';

// Framework specific
import DOM from '../dom';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

let Spinner = function Spinner () {
	const options = this._getOptions(arguments);
	
	this._initialize(options);
};

// Prototype extension object
const SpinnerObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = $('<div />', {
			class: this.sizes[this.getProperty('size')]
		});
	},
	
	_render () {
		const strings = this.getState('strings');
		
		this.element
			.append(
			$('<img />', {
				src: this.fileNames[this.getProperty('theme')],
				alt: strings.LOADING
			})
		);
		
		return this.element;
	}
};

// Merging into prototype
Lib.merge(Spinner.prototype, SpinnerCore, DOM, State, SpinnerObject);

// Framework setup
Spinner = Lib.runHelpers('jquery', CONTROL, Spinner);

// Exporting
export default Spinner;
