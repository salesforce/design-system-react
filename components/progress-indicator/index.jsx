/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Progress Indicator design pattern](https://lightningdesignsystem.com/components/progress-indicator/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import PropTypes from 'prop-types';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import { PROGRESS_INDICATOR } from '../../utilities/constants';

// Child components
import Step from './private/step';
import Progress from './private/progress';

/**
 * Progress Indicator is a component that communicates to the user the progress of a particular process.
 */
const ProgressIndicator = React.createClass({
	displayName: PROGRESS_INDICATOR,
	propTypes: {
		/**
		 * HTML id for component.
		 */
		id: PropTypes.string,
		/**
		 * Determines the behaviors of step buttons
		 * It is an array of JSON objects in the following form:
		 *  [{
		 *      description: <PropTypes.string>,
		 *		isDisabled: <PropTypes.bool>
		 *  }],
		 * `description` represents the tooltip content
		 * `isDisabled` determines if the step will be disabled (still clickable/focusable, 
		 *				just disables cursor change and removes onClick & onFocus callbacks)
		 */
		steps: PropTypes.array.isRequired,
		/**
		 * Determines if there is an error occured in the current step
		 */
		hasError: PropTypes.bool,
		/**
		 * Tracks the index of current step, ranging from 0 (inclusive) to steps.length (exclusive)
		 * i.e. range: [0, steps.length)
		 */
		currentStep: PropTypes.number.isRequired,
		/**
		 * CSS class names to be added to the container element.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Determines component style
		 */
		variant: PropTypes.oneOf(['basic', 'modal']),
		/**
		 * Triggered when click on individual steps. By default, it receives an event and returns all info passed to that step.
		 * users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the
		 * callback result.
		 *
		 * eg. const handleStepClick = function(event, data) { console.log(data); };
		 *     <ProgressIndicator onStepClick={handleStepClick} />
		 */
		onStepClick: PropTypes.func,
		/**
		 * Triggered when focus on individual steps. By default, it receives an event and returns all info passed to that step.
		 * users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the
		 * callback result.
		 *
		 * eg. const handleStepFocus = function(event, data) { console.log(data); };
		 *     <ProgressIndicator onStepFocus={handleStepFocus} />
		 */
		onStepFocus: PropTypes.func
	},
	/**
	 * Get the progress indicator's HTML id. Generate a new one if no ID present.
	 */
	getId () {
		return this.props.id || this.generatedId;
	},
	/**
	 * Get the progress indicator's variant (either 'modal' or 'basic')
	 */
	getVariant () {
		return this.props.variant === 'modal' ? 'modal' : 'basic';
	},
	/**
	 * Get the default props
	 * By default, all booleans are undefined; current step index is 2; total number of steps is 5.
	 * Users do not need to pass total number of steps. This value is determined by <steps.length> if
	 * a customized array of steps is passed in
	 */
	getDefaultProps () {
		const numOfSteps = 5;
		const allSteps = [];

		// prepare default steps data
		for (let i = 0; i < numOfSteps; ++i) {
			allSteps.push({ id: i, description: ('tooltip description #' + (i + 1)), isDisabled: undefined });
		}

		return {
			steps: allSteps,
			currentStep: 2,
			// click/focus callbacks by default do nothing
			onStepClick: () => {},
			onStepFocus: () => {}
		};
	},

	componentWillMount () {
		this.generatedId = shortid.generate();
	},

	render () {
		// calculate the completion percentage of progress bar as follows:
		// percentage of progress = 100 * (current step index) / (total number of steps - 1)
		const progressBarVal = this.props.currentStep === 0 ? '0' : (100 * (this.props.currentStep / (this.props.steps.length - 1))) + '';
		// check if this.props.steps contain 'id'
		for (let i = 0; i < this.props.steps.length; ++i) {
			if (this.props.steps[i].id === undefined) {
				this.props.steps[i].id = i;
			}
		}

		return (
			<Progress
					id={this.getId()}
					value={progressBarVal}
					variant={this.getVariant()}
					className={this.props.className}
			>
				{
					this.props.steps.map((step, i) =>
						(<Step
							key={this.getId() + '-child-' + step.id}
							id={i}
							currentStep={this.props.currentStep}
							hasError={this.props.hasError}
							description={step.description}
							onStepClick={this.props.onStepClick}
							onStepFocus={this.props.onStepFocus}
							isDisabled={step.isDisabled}
						>
						Step {i}</Step>)
					)
				}
			</Progress>
		);
	}
});

export default ProgressIndicator;
