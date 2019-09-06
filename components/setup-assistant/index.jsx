/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Setup Assistant design pattern](https://lightningdesignsystem.com/components/progress-ring/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

import {
	SETUP_ASSISTANT,
	SETUP_ASSISTANT_STEP,
} from '../../utilities/constants';

const propTypes = {
	/**
	 * Accepts SetupAssistantStep components only as children.
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to tag with `.slds-progress-bar`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * Dictates whether this setup assistant has card wrappings and styling
	 */
	isCard: PropTypes.bool,
	/**
	 * Function to handle opening / closing of steps when the step is expandable. Passes event object and step `index`, `isOpen`, and `step` props as data.
	 */
	onStepToggleIsOpen: PropTypes.func,
	/**
	 * Accepts a progress bar component, which will only be visible if `isCard` is enabled
	 */
	progressBar: PropTypes.node,
};

const defaultProps = {
	isCard: false,
};

/**
 * Setup Assistant provides Administrators with a centralized list of tasks for
 * onboarding organizations, clouds, or features within the Salesforce Platform.
 */
class SetupAssistant extends React.Component {
	constructor(props) {
		super(props);

		this.generatedId = shortid.generate();
	}

	componentDidMount() {
		checkProps(SETUP_ASSISTANT, this.props, componentDoc);
	}

	componentDidUpdate() {
		checkProps(SETUP_ASSISTANT, this.props, componentDoc);
	}

	/**
	 * ID as a string
	 * @returns {string} id
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const steps = (
			<ol
				id={this.getId()}
				className={classNames('slds-setup-assistant', this.props.className)}
			>
				{React.Children.map(this.props.children, (child, i) => {
					if (child.type.displayName !== SETUP_ASSISTANT_STEP) return null;
					return React.cloneElement(child, {
						index: i,
						onToggleIsOpen: this.props.onStepToggleIsOpen,
						stepNumber: i + 1,
						...child.props,
					});
				})}
			</ol>
		);

		return this.props.isCard ? (
			<section className="slds-card">
				<header className="slds-theme_shade slds-p-around_medium slds-m-bottom_small">
					{this.props.progressBar}
				</header>
				{steps}
			</section>
		) : (
			<React.Fragment>{steps}</React.Fragment>
		);
	}
}

SetupAssistant.displayName = SETUP_ASSISTANT;
SetupAssistant.propTypes = propTypes;
SetupAssistant.defaultProps = defaultProps;

export default SetupAssistant;
