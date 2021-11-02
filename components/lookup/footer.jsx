/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Lookup design pattern](https://latest-204.lightningdesignsystem.com/components/lookups) in React.
// Based on SLDS v2.1.0-dev

import React from 'react';
import Icon from '../icon';
import EventUtil from '../../utilities/event';

const displayName = 'LookupDefaultFooter';
const propTypes = {};
const defaultProps = {};

class DefaultFooter extends React.Component {
	// eslint-disable-next-line react/sort-comp, camelcase
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (
			nextProps.isActive !== this.props.isActive &&
			nextProps.isActive === true
		) {
			this.props.setFocus('newItem');
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
				onClick={this.handleClick}
				onMouseDown={EventUtil.trapImmediate}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				<a
					id="newItem"
					href="#"
					onClick={(event) => event.preventDefault()}
					className={className}
				>
					<span className="lookup__item-action-label">
						<Icon
							name="add"
							category="utility"
							size="x-small"
							className="slds-icon-text-default"
						/>
						<span className="slds-truncate">
							{this.props.newItemLabel
								? this.props.newItemLabel
								: 'Add New Item'}
						</span>
					</span>
				</a>
			</div>
		);
	}
}

DefaultFooter.displayName = displayName;
DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
