/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # App Launcher Link Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from 'classnames';

// ### Children
import Highlighter from '../utilities/highlighter';

// ## Constants
import { APP_LAUNCHER_LINK } from '../../utilities/constants';

/**
 * App Launcher Link component creates simple links to be used in "All Items" sections
 */
class AppLauncherLink extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = APP_LAUNCHER_LINK;

	// ### Prop Types
	static propTypes = {
		/**
		 * Contents of the link
		 */
		children: PropTypes.node,
		/**
		 * Classes to be applied to the link
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * The `href` attribute of the link. If the `onClick` callback is specified this URL will be prevented from changing the browser's location.
		 */
		href: PropTypes.string,
		/**
		 * Callback for when the link is clicked. Passes back event and data object with href prop. Prevents click from changing browser's location if set.
		 */
		onClick: PropTypes.func,
		/**
		 * Text used to highlight content in link
		 */
		search: PropTypes.string,
		/**
		 * The title for the link. If not provided it will attempt to use child content if that content is a string.
		 */
		title: PropTypes.string,
	};

	// ### Default Props
	static defaultProps = {
		href: '#',
	};

	render() {
		let { title } = this.props;

		if (!title && typeof this.props.children === 'string') {
			title = this.props.children;
		}

		return (
			<a
				href={this.props.href}
				className={classNames('slds-truncate', this.props.className)}
				onClick={(event) => {
					if (this.props.href === '#') {
						event.preventDefault();
					}
					if (this.props.onClick) {
						event.preventDefault();
						this.props.onClick(event, { href: this.props.href });
					}
				}}
				title={title}
			>
				<Highlighter search={this.props.search}>
					{this.props.children}
				</Highlighter>
			</a>
		);
	}
}

export default AppLauncherLink;
