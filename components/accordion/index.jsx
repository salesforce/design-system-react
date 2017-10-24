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

const propTypes = {
	/**
	 * CSS class names to be added to the accordion component. _Tested with snapshot testing._
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * HTML id for accordion component. _Tested with snapshot testing._
	 */
	id: PropTypes.string,
	/**
	 * The panel content for the Accordion component. Event handler for the accordion panels should be added here. Optional `panelContentActions` component may be passed as prop. _Tested with Mocha framework._
	 */
	children: PropTypes.node.isRequired
};

/**
 * An accordion allows a user to toggle the display of sections of content.
 * The accordion component wraps accordion panels that can be selected and expanded.
 */
class Accordion extends Component {
	componentWillMount () {
		this.generatedId = shortid.generate();
	}
	/**
	 * Get the accordion's HTML id. Generate a new one if no id present.
	 */
	getId = () => this.props.id || this.generatedId;

	render () {
		return (
			<ul name={this.getId()} className={classNames('slds-accordion', this.props.className)}>
				{this.props.children}
			</ul>
		);
	}
}

export default Accordion;

Accordion.displayName = ACCORDION;
Accordion.propTypes = propTypes;
