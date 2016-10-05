/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';

import Svg from './svg';

import * as SLDS_ICONS_UTILITY from '../../../icons/utility';
import * as SLDS_ICONS_ACTION from '../../../icons/action';
import * as SLDS_ICONS_CUSTOM from '../../../icons/custom';
import * as SLDS_ICONS_DOCTYPE from '../../../icons/doctype';
import * as SLDS_ICONS_STANDARD from '../../../icons/standard';

const UtilityIcon = ({ name = '', category = 'utility', icon, ...rest }) => {
	let data;

	if (icon) {
		data = icon;
	} else {
		switch (category) {
			case 'action':
				data = SLDS_ICONS_ACTION[name.toLowerCase()];
				data.viewBox = SLDS_ICONS_ACTION.viewBox;
				break;
			case 'custom':
				data = SLDS_ICONS_CUSTOM[name.toLowerCase()];
				data.viewBox = SLDS_ICONS_CUSTOM.viewBox;
				break;
			case 'doctype':
				data = SLDS_ICONS_DOCTYPE[name.toLowerCase()];
				data.viewBox = SLDS_ICONS_DOCTYPE.viewBox;
				break;
			case 'standard':
				data = SLDS_ICONS_STANDARD[name.toLowerCase()];
				data.viewBox = SLDS_ICONS_STANDARD.viewBox;
				break;
			case 'utility':
			default:
				data = SLDS_ICONS_UTILITY[name.toLowerCase()];
				data.viewBox = SLDS_ICONS_UTILITY.viewBox;
				break;
		}
	}

	return <Svg data={data} name={name} {...rest} />;
};

UtilityIcon.displayName = 'UtilityIcon';

UtilityIcon.propTypes = {
	category: React.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
	/**
   * An SVG object to use instead of name / category, look in `design-system-react/icons` for examples
   */
	icon: React.PropTypes.object,
	/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
	name: React.PropTypes.string
};

module.exports = UtilityIcon;
