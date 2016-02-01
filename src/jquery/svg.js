/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// SVG HELPER METHODS - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

// Framework specific
const $ = Lib.global.jQuery || Lib.global.$;

// Third party
import classNames from 'classnames';

export const SvgObject = {

	_getSVGPath (iconString) {
		// TODO: Evaluate best way to do this and clean this up more
		const iconPaths = Lib.getIconPaths();
		const icon = Lib.isString(iconString) && iconString.split('.');
		
		if (icon.length === 2) {
			const iconPath = iconPaths[icon[0]];
			
			if (iconPath) {
				return [iconPath, icon[1]].join('#');
			}
		}
	},

	_getIconClassNames (extraClasses) {
		let iconBaseClass;

		if (this.getProperty('view')) {
			iconBaseClass = this.cssClasses.STATEFUL_ICON;
		} else {
			iconBaseClass = this.cssClasses.ICON;
		}

		return classNames(iconBaseClass, extraClasses,
			!!this.getProperty('text') && this.childIconStyles[ this.getProperty('iconPosition') ]);
	},

	_renderIcon (iconString, extraClasses) {
		let $icon = undefined;
		const icon = iconString || this.getProperty('icon');

		if (icon) {
			$icon = $('<svg class="' + this._getIconClassNames(extraClasses) + '"><use xlink:href="' + this._getSVGPath(icon) + '"></use></svg>')
				.attr('aria-hidden', 'true');
		}

		return $icon || '';
	}
};

export default SvgObject;
