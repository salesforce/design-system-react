/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design pattern](https://www.lightningdesignsystem.com/components/accordion/) in React.
// Based on SLDS v2.3.2
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ACCORDION } from '../../utilities/constants';

import Item from './private/Item';

const propTypes = {
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({
		details: PropTypes.node,
		isOpen: PropTypes.bool.isRequired,
		key: PropTypes.string.isRequired,
		summary: PropTypes.string.isRequired,
		title: PropTypes.string
	})).isRequired,
	onTogglePanel: PropTypes.func.isRequired,
	dropdownOptions: PropTypes.array
};

const Accordion = ({ className, dropdownOptions, id, items, onTogglePanel }) =>
	(<ul className={classNames('slds-accordion', className)}>
		{items.map((item, i) =>
			(<Item
				onTogglePanel={() => onTogglePanel(i)}
				key={item.key}
				htmlId={`${id}_${item.key}`}
				summary={item.summary}
				expanded={item.isOpen}
				dropdownOptions={dropdownOptions}
			>
				{item.details}
			</Item>)
		)}
	</ul>);

export default Accordion;

Accordion.displayName = ACCORDION;
Accordion.propTypes = propTypes;
