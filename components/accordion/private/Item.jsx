/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design pattern](https://www.lightningdesignsystem.com/components/accordion/) in React.
// Based on SLDS v2.3.2

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../../button';

import { ACCORDION_ITEM } from '../../../utilities/constants';

const propTypes = {
	children: PropTypes.node,
	expanded: PropTypes.bool.isRequired,
	htmlId: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	summary: PropTypes.string.isRequired,
	title: PropTypes.string
};

const Item = (props) => (<li className="slds-accordion__list-item">
	<section className={classNames('slds-accordion__section', { 'slds-is-open': props.expanded })}>
		<div className="slds-accordion__summary">
			<h3 className="slds-text-heading_small slds-accordion__summary-heading">
				<Button
					variant="base"
					iconName="switch"
					iconClassName="slds-accordion__summary-action-icon"
					className="slds-button_reset slds-accordion__summary-action"
					aria-controls={props.htmlId}
					aria-expanded={props.expanded}
					onClick={props.onClick}
				>
					<span
						className="slds-truncate"
						title={props.title ? props.title : props.summary}
					>
						{props.summary}
					</span>
				</Button>
			</h3>
		</div>
		<div aria-hidden={!props.expanded} className="slds-accordion__content" id={props.htmlId}>
			{props.children}
		</div>
	</section>
</li>);

export default Item;

Item.propTypes = propTypes;
Item.displayName = ACCORDION_ITEM;
