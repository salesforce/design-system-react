/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// SVG COMPONENT - REACT FACADE

import React from 'react';
import IconUtility from '../icon-utility';
import isIcon from '../mixins/custom-prop-types/icon.js';
import sunsetProperty from 'slds-for-js-core/lib/warning/sunset-property';

export const CONTROL = 'Svg';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (props) {
		/* eslint-disable max-len */
		// End-of-life properties
		sunsetProperty(CONTROL, props.icon, 'icon', 'Icons should now be specified with distinct name and category properties.');
		/* eslint-enable max-len */
	};
}

export const SvgDefinition = {
	displayName: CONTROL,

	propTypes: {
		/**
		 * End of Life. Please use category and name instead.
		 */
		icon: isIcon,
		/**
		 * Category of the icon.
		 */
		category: React.PropTypes.oneOf([
			'action',
			'custom',
			'doctype',
			'standard',
			'utility'
		]),
		/**
		 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
		 */
		name: React.PropTypes.string
	},

	render () {
		checkProps(this.props);

		const {
			icon,
			...props
		} = this.props;

		if (icon) {
			const [
				category,
				name
			] = icon.split('.');

			props.category = category;
			props.name = name;
		}

		if (props.name) {
			return <IconUtility {...props} />;
		}

		return false;
	}
};

const Svg = React.createClass(SvgDefinition);

export default Svg;
