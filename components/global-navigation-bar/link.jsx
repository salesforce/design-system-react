/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # GlobalNavigationBar Link Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_LINK } from '../../utilities/constants';

function handleClick (event, href, onClick) {
	event.preventDefault();

	onClick(event, { href });
}

/**
 * Wraps a link in the proper markup to support use in the GlobalNavigationBar.
 */
const GlobalNavigationBarLink = (props) => {
	// Separate props we care about in order to pass others along passively to the `a` tag
	const {
		active,
		className,
		href,
		label,
		onClick,
		...other
	} = props;

	return (
		<li className={classNames('slds-context-bar__item', { 'slds-is-active': active })}>
			<a
				href={href}
				className={classNames('slds-context-bar__label-action', className)}
				onClick={isFunction(onClick) ? (event) => handleClick(event, href, onClick) : null}
				{...other}
			>
				<span className="slds-truncate">{label}</span>
			</a>
		</li>
	);
};

GlobalNavigationBarLink.displayName = GLOBAL_NAVIGATION_BAR_LINK;

// ### Prop Types
GlobalNavigationBarLink.propTypes = {
	/**
	 * Whether the item is active or not.
	 */
	active: PropTypes.bool,
	/**
	 * Class names to be added to the anchor element
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * The `href` attribute of the link. Please pass in bookmarkable URLs from your routing library. Use `GlobalNavigationBarButton` if a "real URL" is not desired. If the `onClick` callback is specified this URL will still be prevented from changing the browser's location.
	 */
	href: PropTypes.string,
	/**
	 * Text to show for link item.
	 */
	label: PropTypes.string,
	/**
	 * `function (event, href)` - fires when the link is clicked. If set, the browser location change to the `href` specified will be ignored, but the `href` will be included in an additional parameter passed to the callback.
	 */
	onClick: PropTypes.func
};

GlobalNavigationBarLink.defaultProps = {
	href: 'javascript:void(0);' // eslint-disable-line no-script-url
};

module.exports = GlobalNavigationBarLink;
