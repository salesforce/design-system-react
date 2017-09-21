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
		key: PropTypes.string.isRequired,
		summary: PropTypes.string.isRequired,
		title: PropTypes.string,
		details: PropTypes.node
	})).isRequired
};

export default class Accordion extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			expandedItem: undefined
		};

		this.toggleItem = this.toggleItem.bind(this);
	}

	toggleItem (key) {
		if (this.state.expandedItem === key) {
			this.setState({ expandedItem: undefined });
		} else {
			this.setState({ expandedItem: key });
		}
	}

	render () {
		const items = this.props.items.map((item) =>
			<Item
				key={item.key}
				htmlId={`${this.props.id}_${item.key}`}
				summary={item.summary}
				expanded={this.state.expandedItem === item.key}
				onClick={() => this.toggleItem(item.key)}
			>
				{item.details}
			</Item>);
		return (<ul className={classNames('slds-accordion', this.props.className)}>
			{items}
		</ul>);
	}
}

Accordion.displayName = ACCORDION;
Accordion.propTypes = propTypes;
