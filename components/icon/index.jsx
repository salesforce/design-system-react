/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Icon Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from 'classnames';

// ## Children
import SLDSUtilityIcon from '../utilities/utility-icon';

// ## Constants
import { ICON } from '../../utilities/constants';

/**
 * The Icon component is the Lightning Design System Icon component and should be used for naked icons. For icons that are buttons, use the <a href='#/button'>SLDSButton component</a> component with <code>variant='icon'</code>.
 */
const Icon = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: ICON,

	// ### Prop Types
	propTypes: {
		/**
		 * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
		 * Naked icons must have assistive text, however, if you also have visible descriptive text with the icon,
		 * declare this prop as <code>assistiveText=''</code>.
		 */
		assistiveText: PropTypes.string,
		/**
		 * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
		 */
		category: PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']).isRequired,
		/**
		 * CSS classes that are applied to the SVG
		 */
		className: PropTypes.string,
		/**
		 * An SVG object to use instead of name / category
		 */
		icon: PropTypes.object,
		/**
		 * If true, icon color is white. If false, icon color is the default text color.
		 */
		inverse: PropTypes.bool,
		/**
		 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
		 */
		name: PropTypes.string,
		/**
		 * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
		 */
		size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
		/**
		 * Title attribute for the icon container
		 */
		title: PropTypes.string
	},

	getDefaultProps () {
		return {
			category: 'standard',
			inverse: true,
			size: 'medium'
		};
	},

	getContainerClassName () {
		const name = this.props.name ? this.props.name.replace(/_/g, '-') : '';
		const renderName = (this.props.category === 'action');

		return classNames({
			'slds-icon__container': (this.props.category !== 'utility'),
			[`slds-icon-${this.props.category}-${name}`]: renderName
		});
	},

	getClassName () {
		const name = this.props.name ? this.props.name.replace(/_/g, '-') : '';
		const customName = this.props.name ? this.props.name.replace('custom', 'custom-') : null;

		return classNames(this.props.className, 'slds-icon', {
			[`slds-icon--${this.props.size}`]: this.props.size !== 'medium',
			[`slds-icon-${customName}`]: this.props.category === 'custom',
			[`slds-icon-${this.props.category}-${name}`]: this.props.category === 'standard',
			'slds-icon-text-default': !this.props.inverse
		});
	},

	render () {
		let label = null;

		if (this.props.assistiveText) {
			label = <span className="slds-assistive-text">{this.props.assistiveText}</span>;
		}
		return (
			<span
				className={this.getContainerClassName()}
				title={this.props.title}
			>
				{label}
				<SLDSUtilityIcon
					aria-hidden="true"
					category={this.props.category}
					className={this.getClassName()}
					icon={this.props.icon}
					name={this.props.name}
				/>
			</span>
		);
	}
});

module.exports = Icon;
