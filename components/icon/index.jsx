/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Icon Component

// Based on SLDS v2.1.0-rc.4

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from '../../utilities/class-names';

// ## Children
import UtilityIcon from '../utilities/utility-icon';

// ## Constants
import { ICON } from '../../utilities/constants';

/**
 * The Icon component is the Lightning Design System Icon component and should be used for naked icons. For icons that are buttons, use the <a href='/components/buttons/'>Button component</a> component with <code>variant='icon'</code>.
 */
const Icon = ({
	assistiveText,
	category,
	className,
	icon,
	inverse,
	name,
	path,
	size,
	style,
	title }) => {
	const kababCaseName = name ? name.replace(/_/g, '-') : '';
	
	return (
		<span
			className={classNames({
				'slds-icon_container': category !== 'utility',
				'slds-icon_container--circle': category === 'action',
				[`slds-icon-${category}-${kababCaseName}`]:
					category !== 'utility'
					&& category !== 'doctype'
			})}
			title={title}
		>
			<UtilityIcon
				aria-hidden="true"
				category={category}
				className={classNames(className, 'slds-icon', {
					[`slds-icon--${size}`]: size !== 'medium',
					// if category is `utility` and `inverse` is false (default), icon will be dark // return true
					// if category is `utility` and `inverse` is true, icon will be light // return false
					// if category is NOT `utility` and `inverse` is false (default), icon will be light // return false
					// if category is NOT `utility` and `inverse` is true, icon will be dark // return true
					'slds-icon-text-default': category === 'utility' ? !inverse : inverse
				})}
				icon={icon}
				name={name}
				path={path}
				style={style}
			/>
			{
				assistiveText
				? <span className="slds-assistive-text">{assistiveText}</span>
				: ''
			}
		</span>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Icon.displayName = ICON;

	// ### Prop Types
Icon.propTypes = {
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
	 * CSS classes that are applied to the SVG.
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Icon color variants
	 */
	colorVariant: PropTypes.oneOf(['base', 'default', 'error', 'warning']),
	/**
	 * A custom SVG object to use instead of the supplied SLDS icons, look in `design-system-react/icons` for examples and syntax.
	 */
	icon: PropTypes.object,
	/**
	 * Setting `inverse` to true will switch the color of the icon: light to dark, dark to light.
	 */
	inverse: PropTypes.bool,
	/**
	 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
	 */
	name: PropTypes.string,
	/**
   * Path to SLDS icon folder
   */
	path: PropTypes.string,
	/**
	 * Size of the icon. Visit [lightningdesignsystem.com/components/icons/#flavor-sizes](https://www.lightningdesignsystem.com/components/icons/#flavor-sizes)
	 */
	size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
	 * Custom styles to be passed to the SVG. Could be used to change icon or background color.
	 */
	style: PropTypes.object,
	/**
	 * Title attribute for the icon container
	 */
	title: PropTypes.string
};

Icon.defaultProps = {
	category: 'standard',
	size: 'medium'
};

module.exports = Icon;
