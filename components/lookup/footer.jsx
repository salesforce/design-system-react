/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// Implements the [Lookup design pattern](https://latest-204.lightningdesignsystem.com/components/lookups) in React.
// Based on SLDS v2.1.0-dev

import React from 'react';
import Icon from '../icon';
import { EventUtil } from '../../utilities';

const displayName = 'LookupDefaultFooter';
const propTypes = {};
const defaultProps = {};

class DefaultFooter extends React.Component {
	constructor (props) {
		super(props);
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
			this.props.setFocus('newItem');
		}
	}

	handleClick () {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	handleMouseDown (event) {
		EventUtil.trapImmediate(event);
	}

	render () {
		let className = 'slds-lookup__item-action slds-lookup__item-action--label';
		if (this.props.isActive) className += ' slds-theme--shade';

		return (
			<div className="js-slds-lookup__item" onClick={this.handleClick.bind(this)} onMouseDown={this.handleMouseDown.bind(this)}>
				<a id="newItem" href="javascript:void(0);" className={className}>
					<span className="lookup__item-action-label">
						<Icon name="add" category="utility" size="x-small" className="slds-icon-text-default" />
						<span className="slds-truncate">
							{this.props.newItemLabel ? this.props.newItemLabel : 'Add New Item' }
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

module.exports = DefaultFooter;
