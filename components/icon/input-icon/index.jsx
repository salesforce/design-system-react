/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// ### React
import React, { PropTypes } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import SLDSUtilityIcon from '../../utilities/utility-icon';
import Button from '../../button';

// ## Constants
import { ICON_INPUT } from '../../../utilities/constants';

/**
 * A wrapper for icons that will be rendered inside of an Input
 *
 * If the `onClick` function prop is provided, the `design-system-react/components/button` component is used.
 * If not, the icon will be an instance of `design-system-react/components/utilities/utility-icon`.
 * Checkout out the appropriate component to see what props can be passed along via the `{...props}` rest operator
 */
const InputIcon = (props) => {
	const {
		category,
		iconPosition,
		name,
		onClick,
		...rest
	} = props;

	return isFunction(onClick)
	? <Button
		className={classNames('slds-input__icon', { [`slds-input__icon--${iconPosition}`]: iconPosition })}
		iconCategory={category}
		iconName={name}
		onClick={onClick}
		variant="icon"
		{...rest}
	/>
	: <SLDSUtilityIcon
		aria-hidden
		category={category}
		className={classNames('slds-input__icon slds-icon-text-default', { [`slds-input__icon--${iconPosition}`]: iconPosition })}
		name={name}
		{...rest}
	/>;
};

InputIcon.displayName = ICON_INPUT;

InputIcon.propTypes = {
	/**
	 * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
	 */
	category: PropTypes.string,
	/**
	 * This is only needed if an input contains two icons, the Input component handles this prop for you.
	 */
	iconPosition: PropTypes.oneOf([
		'left',
		'right'
	]),
	/**
	 * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
	 */
	name: PropTypes.string,
	/**
	 * This event fires when the icon is clicked.
	 */
	onClick: PropTypes.func
};

InputIcon.defaultProps = {
	category: 'utility'
};

module.exports = InputIcon;
