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

import Step from './private/step';

import { SETUP_ASSISTANT } from '../../utilities/constants';

const propTypes = {
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
	 * Accepts a progress bar component, which will only be visible if `isCard` is enabled
	 */
	progressBar: PropTypes.node,
	/**
	 * Required. Accepts an array of step objects with the following form:
	 * ```
	 *  [{
	 *    action: <PropTypes.node>, accepts a node to display the step's available action(s). Typically a Button, Button of variant "link," or Checkbox of variant "toggle"
	 *    description: <PropTypes.node> or <PropTypes.string>, the descriptive content for the step
	 *    estimatedTime: <PropTypes.node> or <PropTypes.string>, estimated time for completing the step
	 *    heading: <PropTypes.node> or <PropTypes.string>, the step's heading content
	 *    progress: <PropTypes.number>, the step's current progress percentage
	 *  }],
	 *  ```
	 */
	steps: PropTypes.array.isRequired
};

const defaultProps = {
	isCard: false
};

/**
 * Setup Assistant provides Administrators with a centralized list of tasks for
 * onboarding organizations, clouds, or features within the Salesforce Platform.
 */
class SetupAssistant extends React.Component {
	componentWillMount() {
		this.generatedId = shortid.generate();
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
				{this.props.steps.map((step, i) => (
					<Step
						assistiveText={this.props.assistiveText}
						stepNumber={i + 1}
						{...step}
					/>
				))}
			</ol>
		);

		/*
		{this.props.steps.map(this.props.steps, (child, i) =>
			React.cloneElement(child, {
				stepNumber: i + 1,
			})
		)}
		*/

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
