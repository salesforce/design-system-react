/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.3.2

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../../button';

import { ACCORDION_PANEL } from '../../../utilities/constants';

const propTypes = {
	/**
	 * The panel content for the Accordion component. Event handler for the accordion panels should be added here `<Panel onTogglePanel.../>`. Optional `panelContentActions` component may be passed as prop. _Tested with Mocha framework.
	 */
	children: PropTypes.node,
	/**
	 * Indicates whether item is expanded or not, which should be handled by `onTogglePanel`. _Tested with Mocha framework.
	 */
	expanded: PropTypes.bool.isRequired,
	/**
	 * ID of the item belonging to this panel
	 */
	id: PropTypes.string.isRequired,
	panelContentActions: PropTypes.node,
	/**
	 * Callback that will run whenever a panel is toggled. Function should toggle state to handle `expanded` prop. _Tested with Mocha framework.
	 */
	onTogglePanel: PropTypes.func.isRequired,
	/**
	 * Summary header of the item belonging to this panel. _Tested with Mocha framework.
	 */
	summary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	/**
	 * HTML title attribute.
	 */
	title: PropTypes.string
};

const Panel = ({ children, expanded, id, panelContentActions, summary, title, onTogglePanel }) => (
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
						onClick={onTogglePanel}
						variant="base"
					>
						<span className="slds-truncate" title={title || summary}>
							{summary}
						</span>
					</Button>
				</h3>
				{panelContentActions}
			</div>
			<div aria-hidden={!expanded} className="slds-accordion__content" id={id}>
				{children}
			</div>
		</section>
	</li>
);

export default Panel;

Panel.propTypes = propTypes;
Panel.displayName = ACCORDION_PANEL;
