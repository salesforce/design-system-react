/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.3.2

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../../button';

import { ACCORDION_SECTION } from '../../../utilities/constants';

const propTypes = {
	children: PropTypes.node,
	expanded: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	itemContentActions: PropTypes.node,
	onToggleSection: PropTypes.func.isRequired,
	summary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	title: PropTypes.string
};

const Section = ({ children, expanded, id, itemContentActions, summary, title, onToggleSection }) => (
	<li className="slds-accordion__list-item">
		<section className={classNames('slds-accordion__section', { 'slds-is-open': expanded })}>
			<div className="slds-accordion__summary">
				<h3 className="slds-text-heading_small slds-accordion__summary-heading">
					<Button
						aria-controls={id}
						aria-expanded={expanded}
						className="slds-button_reset slds-accordion__summary-action"
						iconClassName="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left"
						iconName="switch"
						onClick={onToggleSection}
						variant="base"
					>
						<span className="slds-truncate" title={title || summary}>
							{summary}
						</span>
					</Button>
				</h3>
				{itemContentActions}
			</div>
			<div aria-hidden={!expanded} className="slds-accordion__content" id={id}>
				{children}
			</div>
		</section>
	</li>
);

export default Section;

Section.propTypes = propTypes;
Section.displayName = ACCORDION_SECTION;
