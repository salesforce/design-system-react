/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Lookup design pattern](https://latest-204.lightningdesignsystem.com/components/lookups) in React.
// Based on SLDS v2.1.0-dev

import React from 'react';
import Icon from '../icon';
import EventUtil from '../../utilities/event';

const displayName = 'LookupDefaultHeader';
const propTypes = {};
const defaultProps = {};

class DefaultHeader extends React.Component {
	// eslint-disable-next-line camelcase, react/sort-comp
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (
			nextProps.isActive !== this.props.isActive &&
			nextProps.isActive === true
		) {
			this.props.setFocus('searchRecords');
		}
	}

	handleClick = () => {
		if (this.props.onClose) {
			this.props.onClose();
		}
	};

	render() {
		let className = 'slds-lookup__item-action slds-lookup__item-action_label';
		if (this.props.isActive) className += ' slds-theme_shade';

		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<div
				className="js-slds-lookup__item"
				onMouseDown={EventUtil.trapImmediate}
				onClick={this.handleClick}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				<a
					id="searchRecords"
					href="#"
					onClick={(event) => event.preventDefault()}
					className={className}
				>
					<span className="lookup__item-action-label">
						<Icon
							name="search"
							category="utility"
							size="x-small"
							className="slds-icon-text-default"
						/>
						<span className="slds-truncate">{this.props.searchTerm}</span>
					</span>
				</a>
			</div>
		);
	}
}

DefaultHeader.displayName = displayName;
DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
