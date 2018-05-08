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
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * HTML id for accordion component. _Tested with snapshot testing._
	 */
	id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/**
	 * The panel content for the Accordion component. Accordion panels should be added as <AccordionPanel />. Event handler for the accordion panels should be added to `<AccordionPanel />`. Optional `panelContentActions` component may be passed as prop. _Tested with Mocha framework and snapshot testing._
	 *
	 * Example:
	 * ```
	 * <SLDSAccordion>
	 *   <SLDSAccordionpanel />
	 *   <SLDSAccordionpanel />
	 *   <SLDSAccordionpanel />
	 * </SLDSAccordion>
	 * ```
	 */
	children: PropTypes.node.isRequired,
};

/**
 * An accordion allows a user to toggle the display of sections of content.
 * The accordion component wraps accordion panels that can be selected and expanded. It accepts children to define the content displayed within.
 */
class Accordion extends Component {
	componentWillMount () {
		this.generatedId = shortid.generate();
	}

	render () {
		return (
			<ul
				name={this.props.id || this.generatedId}
				className={classNames('slds-accordion', this.props.className)}
			>
				{this.props.children}
			</ul>
		);
	}
}

Accordion.displayName = ACCORDION;
Accordion.propTypes = propTypes;

export default Accordion;
