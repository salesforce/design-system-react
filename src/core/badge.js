/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Badge Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
import classNames from 'classnames';

export const CONTROL = 'Badge';

const BadgeCore = Lib.merge({}, Base, {
	CONTROL,

	cssClasses: {
		CONTROL: 'slds-badge'
	},

	themes: {
		'default': 'slds-theme--default',
		'shade': 'slds-theme--shade',
		'inverse': 'slds-theme--inverse',
		'alt-inverse': 'slds-theme--alt-inverse',
		'info': 'slds-theme--info',
		'success': 'slds-theme--success',
		'warning': 'slds-theme--warning',
		'error': 'slds-theme--error',
		'offline': 'slds-theme--offline',
		'shade-alert-texture': 'slds-theme--shade slds-theme--alert-texture'
	},

	_defaultProperties: {
		text: 'label',
		theme: null
	},

	_getClassNames: function () {
		return classNames(this.cssClasses.CONTROL, this.themes[this.getProperty('theme')]);
	}
});

export default BadgeCore;
