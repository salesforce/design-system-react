/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// Implements the [Lookup design pattern](https://latest-204.lightningdesignsystem.com/components/lookups) in React.
// Based on SLDS v2.1.0-dev

import React from 'react';
import Icon from '../icon';
import { EventUtil } from '../../utilities';

const displayName = 'LookupDefaultHeader';
const propTypes = {};
const defaultProps = {};

class DefaultHeader extends React.Component {
	componentWillReceiveProps (nextProps) {
		if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
			this.props.setFocus('searchRecords');
		}
	}

	handleClick = () => {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	render () {
		let className = 'slds-media slds-listbox__option slds-listbox__option_entity';
		if (this.props.isActive) className += ' slds-has-focus';

		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			<li
				className="js-slds-lookup__item slds-listbox__item slds-p-vertical_xx-small"
				onMouseDown={EventUtil.trapImmediate}
				onClick={this.handleClick}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				{/* eslint-disable no-script-url */}
				<span id="searchRecords" href="javascript:void(0);" className={className}>
					{/* eslint-enable no-script-url */}
					<span className="slds-media__figure">
						<Icon name="search" category="utility" size="x-small" className="slds-icon-text-default" />
					</span>
					<span className="slds-media__body">
						<span className="slds-truncate">
							{this.props.searchTerm}
						</span>
					</span>
				</span>
			</li>
		);
	}
}

DefaultHeader.displayName = displayName;
DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

module.exports = DefaultHeader;
