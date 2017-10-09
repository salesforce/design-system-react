/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design pattern](https://www.lightningdesignsystem.com/components/accordion/) in React.
// Based on SLDS v2.3.2

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropdown from '../../menu-dropdown';

import Button from '../../button';

import { ACCORDION_ITEM } from '../../../utilities/constants';

const propTypes = {
	children: PropTypes.node,
	dropdownOptions: PropTypes.array,
	expanded: PropTypes.bool.isRequired,
	htmlId: PropTypes.string,
	onTogglePanel: PropTypes.func.isRequired,
	summary: PropTypes.string.isRequired,
	title: PropTypes.string
};

const Item = ({ children, dropdownOptions, expanded, htmlId, summary, title, onTogglePanel }) => (<li className="slds-accordion__list-item">
	<section className={classNames('slds-accordion__section', { 'slds-is-open': expanded })}>
		<div className="slds-accordion__summary">
			<h3 className="slds-text-heading_small slds-accordion__summary-heading">
				<Button
					aria-controls={htmlId}
					aria-expanded={expanded}
					className="slds-button_reset slds-accordion__summary-action"
					iconClassName="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left"
					iconName="switch"
					onClick={onTogglePanel}
					variant="base"
				>
					<span
						className="slds-truncate"
						title={title || summary}
					>
						{summary}
					</span>
				</Button>
			</h3>
			{/* If statement here for options to render Dropdown */}
			<Dropdown
				id="ButtonGroupExampleDropdown"
				assistiveText="More Options"
				buttonVariant="icon"
				buttonClassName="slds-shrink-none"
				iconName="down"
				iconVariant="border-filled"
				onSelect={function (item) { console.log(item.label, 'selected'); }}
				openOn="click"
				options={dropdownOptions}
				iconSize="x-small"
			/>
		</div>
		<div aria-hidden={!expanded} className="slds-accordion__content" id={htmlId}>
			{children}
		</div>
	</section>
</li>);

export default Item;

Item.propTypes = propTypes;
Item.displayName = ACCORDION_ITEM;
