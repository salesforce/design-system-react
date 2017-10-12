/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.3.2
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

import { ACCORDION } from '../../utilities/constants';

import Item from './private/Item';

const propTypes = {
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string
	]),
	id: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.shape({
		details: PropTypes.node,
		isOpen: PropTypes.bool.isRequired,
		id: PropTypes.string,
		itemContentRight: PropTypes.node,
		summary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
		title: PropTypes.string
	})).isRequired,
	onTogglePanel: PropTypes.func.isRequired
};

class Accordion extends Component {
	constructor (props) {
		super(props);
		this.generatedId = shortid.generate();
	}
	render () {
		const { className, id, items, onTogglePanel } = this.props;
		return (
			<ul className={classNames('slds-accordion', className)}>
				{items.map((item, i) => (
					<Item
						onTogglePanel={() => onTogglePanel(i)}
						key={item.id || this.generatedId}
						htmlId={id && item.id ? `${id}_${item.id}` : this.generatedId}
						summary={item.summary}
						itemContentRight={item.itemContentRight}
						expanded={item.isOpen}
					>
						{item.details}
					</Item>
				))}
			</ul>
		);
	}
}

export default Accordion;

Accordion.displayName = ACCORDION;
Accordion.propTypes = propTypes;
