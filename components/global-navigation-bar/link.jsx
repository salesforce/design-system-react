/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # GlobalNavigationBar Link Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Constants
import { GLOBAL_NAVIGATION_BAR_LINK } from '../../utilities/constants';

/**
 * Wraps a link in the proper markup to support use in the GlobalNavigationBar.
 */
const GlobalNavigationBarLink = (props) => {
	// Separate props we care about in order to pass others along passively to the `a` tag
	const {
		active,
		activeBackgroundColor,
		assistiveText,
		className,
		dividerPosition,
		href,
		id,
		label,
		onBlur,
		onClick,
		onFocus,
		onKeyDown,
		onKeyPress,
		onKeyUp,
		onMouseEnter,
		onMouseLeave,
		tabIndex,
	} = props;

	const listItemstyle = active
		? {
				backgroundColor: activeBackgroundColor,
				borderBottomColor: activeBackgroundColor,
		  }
		: null;

	function handleOnClick(event) {
		if (isFunction(onClick) || href === '#') {
			event.preventDefault();
		}

		if (isFunction(onClick)) {
			onClick(event, { href });
		}
	}

	return (
		<li
			className={classNames('slds-context-bar__item', {
				'slds-is-active': active,
				[`slds-context-bar__item_divider-${dividerPosition}`]: dividerPosition,
			})}
			id={id}
			style={listItemstyle}
		>
			<a
				href={href}
				className={classNames('slds-context-bar__label-action', className)}
				onBlur={onBlur}
				onClick={handleOnClick}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				onKeyPress={onKeyPress}
				onKeyUp={onKeyUp}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				tabIndex={tabIndex}
				title={label}
			>
				{active ? (
					<span className="slds-assistive-text">
						{assistiveText.activeDescriptor}
					</span>
				) : null}
				<span className="slds-truncate" title={label}>
					{label}
				</span>
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
	 * Allows alignment of active item with active application background color. If application background is dark, text color may need to be `#fff`. This can be done with the style prop.
	 */
	activeBackgroundColor: PropTypes.string,
	/**
	 * **Assistive text for accessibility.**
	 * * `activeDescriptor`: The text that appears alongside a link that is currently active.
	 */
	assistiveText: PropTypes.shape({
		activeDescriptor: PropTypes.string,
	}),
	/**
	 * Class names to be added to the anchor element
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Determines position of separating bar.
	 */
	dividerPosition: PropTypes.oneOf(['left', 'right']),
	/**
	 * The `href` attribute of the link. Please pass in bookmarkable URLs from your routing library. Use `GlobalNavigationBarButton` if a "real URL" is not desired. If the `onClick` callback is specified this URL will still be prevented from changing the browser's location.
	 */
	href: PropTypes.string,
	/**
	 * The `id` attribute is applied to the `li` tag. _This was recently changed from being on the anchor tag._
	 */
	id: PropTypes.string,
	/**
	 * Text to show for link item.
	 */
	label: PropTypes.string,
	/**
	 * Triggered when focus is removed.
	 */
	onBlur: PropTypes.func,
	/**
	 * `function (event, href)` - fires when the link is clicked. If set, the browser location change to the `href` specified will be ignored, but the `href` will be included in an additional parameter passed to the callback.
	 */
	onClick: PropTypes.func,
	/**
	 * Triggered when component is focused.
	 */
	onFocus: PropTypes.func,
	/**
	 * Triggered when a key is pressed down
	 */
	onKeyDown: PropTypes.func,
	/**
	 * Triggered when a key is pressed and released
	 */
	onKeyPress: PropTypes.func,
	/**
	 * Triggered when a key is released
	 */
	onKeyUp: PropTypes.func,
	/**
	 * Triggered when a mouse arrow hovers
	 */
	onMouseEnter: PropTypes.func,
	/**
	 * Triggered when a mouse arrow no longer hovers
	 */
	onMouseLeave: PropTypes.func,
	/**
	 * Write "-1" if you don't want the user to tab to the button.
	 */
	tabIndex: PropTypes.string,
};

GlobalNavigationBarLink.defaultProps = {
	assistiveText: {
		activeDescriptor: 'Current page:',
	},
	href: '#',
};

export default GlobalNavigationBarLink;
