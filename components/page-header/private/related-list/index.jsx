/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const displayName = 'PageHeaderRelatedList';
const propTypes = {
	/**
	 * Icon node passed by PageHeader
	 */
	icon: PropTypes.node,
	/**
	 * Title node passed by PageHeader
	 */
	title: PropTypes.node,
	/**
	 * Info node passed by PageHeader
	 */
	info: PropTypes.node,
	/**
	 * Content to appear on the right hand side of the page header
	 */
	contentRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/**
	 * Nav content which appears in the upper right hand corner.
	 */
	navRight: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
const defaultProps = {};

class RelatedList extends Component {
	render () {
		return (
			<div>
				<div className="slds-grid">
					<div className="slds-col slds-has-flexi-truncate">
						{this.props.label}
						{this.props.title}
					</div>
					<div className="slds-col slds-no-flex slds-grid slds-align-top">
						{this.props.navRight}
					</div>
				</div>
				<div className="slds-grid">
					<div className="slds-col slds-align-bottom">{this.props.info}</div>
					<div className="slds-col slds-no-flex slds-grid slds-align-bottom">
						{this.props.contentRight}
					</div>
				</div>
			</div>
		);
	}
}

RelatedList.displayName = displayName;
RelatedList.propTypes = propTypes;
RelatedList.defaultProps = defaultProps;

export default RelatedList;
