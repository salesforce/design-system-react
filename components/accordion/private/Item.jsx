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
	onTogglePanel: PropTypes.func.isRequired,
	summary: PropTypes.string.isRequired,
	title: PropTypes.string
};

const Item = ({ children, expanded, htmlId, summary, title, onTogglePanel }) => (<li className="slds-accordion__list-item">
	<section className={classNames('slds-accordion__section', { 'slds-is-open': expanded })}>
		<div className="slds-accordion__summary">
			<h3 className="slds-text-heading_small slds-accordion__summary-heading">
				<Button
					variant="base"
					className="slds-button_reset slds-accordion__summary-action"
					aria-controls={htmlId}
					aria-expanded={expanded}
					onClick={onTogglePanel}
				>
					<span
						className="slds-truncate"
						title={title || summary}
					>
						{summary}
					</span>
				</Button>
			</h3>
		</div>
		<div aria-hidden={!expanded} className="slds-accordion__content" id={htmlId}>
			{children}
		</div>
	</section>
</li>);

export default Item;

Item.propTypes = propTypes;
Item.displayName = ACCORDION_ITEM;
