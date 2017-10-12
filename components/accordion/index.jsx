/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.4.3

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

import { ACCORDION } from '../../utilities/constants';

import Item from './private/Item';

const propTypes = {
	/**
* Custom CSS classes added to `slds-accordion` node.
*/
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	id: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.shape({
		details: PropTypes.node,
		id: PropTypes.string,
		isOpen: PropTypes.bool.isRequired,
		itemContentRight: PropTypes.node,
		summary: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
		title: PropTypes.string
	})).isRequired,
	onToggleSection: PropTypes.func.isRequired
};
/**
 * An accordion allows a user to toggle the display of sections of content.
 * The accordion component wraps accordion items that can be selected and expanded.
 */
class Accordion extends Component {
	constructor (props) {
		super(props);
		// should this be lifecycle method? why htmlId & key?
		this.generatedId = shortid.generate();
	}
	render () {
		const { className, id, items, onToggleSection } = this.props;
		return (
			<ul className={classNames('slds-accordion', className)}>
				{items.map((item, i) => (
					<Item
						onToggleSection={() => onToggleSection(i)}
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
