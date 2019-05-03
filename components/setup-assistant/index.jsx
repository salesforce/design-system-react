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
import ProgressBar from '~/components/progress-bar';
import { SETUP_ASSISTANT } from '../../utilities/constants';

const propTypes = {
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * CSS classes to be added to tag with `.slds-progress-bar`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),

	/**
	 * Label for the Progress Bar
	 */
	progressBarLabels: PropTypes.shape({
		cardTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		complete: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	}),

	showStepProgress: PropTypes.bool,

	isCard: PropTypes.bool,
};

const defaultProps = {
	showStepProgress: false,
	isCard: false,
	progressBarLabels: {
		label:
			'Complete all the steps below to finish setting up Einstein Visibility',
		complete: 'Complete',
	},
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

	/**
	 * Progress as number
	 * @returns {number} progress
	 */
	getProgress() {
		let progress = 0;
		let steps = 0;
		React.Children.forEach(this.props.children, (child) => {
			progress += child.props.progress;
			steps += 1;
		});
		return progress / steps;
	}

	render() {
		const steps = (
			<ol
				id={this.getId()}
				className={classNames('slds-setup-assistant', this.props.className)}
			>
				{React.Children.map(this.props.children, (child, i) =>
					React.cloneElement(child, {
						stepNo: i + 1,
						showStepProgress: this.props.showStepProgress,
					})
				)}
			</ol>
		);

		return this.props.isCard ? (
			<section className="slds-card">
				<header className="slds-theme_shade slds-p-around_medium slds-m-bottom_small">
					<ProgressBar
						value={this.getProgress()}
						labels={this.props.progressBarLabels}
					/>
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
