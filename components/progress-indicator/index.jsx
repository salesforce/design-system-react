/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Progress Indicator design pattern](https://lightningdesignsystem.com/components/progress-indicator/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import PropTypes from 'prop-types';
import { shape } from 'airbnb-prop-types';

import assign from 'lodash.assign';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import { PROGRESS_INDICATOR } from '../../utilities/constants';

// ### find
import find from 'lodash.find';

// Child components
import Step from './private/step';
import Progress from './private/progress';

const displayName = PROGRESS_INDICATOR;

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `percentage`: Label for Progress Bar. The default is `Progress: [this.props.value]%`
	 */
	assistiveText: shape({
		percentage: PropTypes.string
	}),
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * Stores all completed steps. It is an array of step objects.
	 */
	completedSteps: PropTypes.array,
	/**
	 * Stores all disabled steps. It is an array of step objects. Steps are still clickable/focusable,
	 * this only disables cursor change and removes onClick and onFocus event callbacks.
	 */
	disabledSteps: PropTypes.array,
	/**
	 * Stores all error steps. It is an array of step objects and usually there is only one error step, the current step.
	 */
	errorSteps: PropTypes.array,
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * Triggered when an individual step is clicked. By default, it receives an event and returns step state and the step object clicked: `{ isCompleted, isDisabled, isError, isSelected, step }`. Users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the callback result.
	 * ```
	 * const handleStepClick = function(event, data) { console.log(data); };
	 *     <ProgressIndicator onStepClick={handleStepClick} />
	 * ```
	 */
	onStepClick: PropTypes.func,
	/**
	 * Triggered when an individual step is focused. By default, it receives an event and returns step state and the step object clicked: `{ isCompleted, isDisabled, isError, isSelected, step }`. Users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the callback result.
	 * ```
	 * const handleStepFocus = function(event, data) { console.log(data); };
	 *     <ProgressIndicator onStepFocus={handleStepFocus} />
	 * ```
	 */
	onStepFocus: PropTypes.func,
	/**
	 * Represents the currently selected or active step. It is a step object.
	 */
	selectedStep: PropTypes.object.isRequired,
	/**
	 * It is an array of step objects in the following form:
	 * ```
	 *  [{
	 *		id: <PropTypes.number> or <PropTypes.string>, has to be unique
	 *		label: <PropTypes.string>, representing the tooltip content
	 *		assistiveText: <PropTypes.string>, The default is `[Step props.index + 1]: [status]`. Status is if the step has been completed or in an error state.
	 *  }],
	 *  ```
	 */
	steps: PropTypes.array.isRequired,
	/**
	 * Stores all steps with opened tooltips. This property is mainly for development purposes. The tooltip should only show on hover for the user.
	 */
	tooltipIsOpenSteps: PropTypes.array,
	/**
	 * Determines component style.
	 */
	variant: PropTypes.oneOf(['base', 'modal'])
};

const defaultSteps = [
	{ id: 0, label: ('tooltip label #1') },
	{ id: 1, label: ('tooltip label #2') },
	{ id: 2, label: ('tooltip label #3') },
	{ id: 3, label: ('tooltip label #4') },
	{ id: 4, label: ('tooltip label #5') }
];

const defaultProps = {
	assistiveText: {},
	errorSteps: [],
	completedSteps: [],
	disabledSteps: [],
	selectedStep: defaultSteps[0],
	variant: 'base',
	// click/focus callbacks by default do nothing
	onStepClick: () => {},
	onStepFocus: () => {}
};

/**
 * Check if the passed steps are valid
 */
function checkSteps (steps) {
	if (steps === undefined) return false;
	for (let i = 0; i < steps.length; ++i) {
		if (steps[i].label === undefined) return false;
	}
	return true;
}

/**
 * Check if an item is from an array of items when 'items' is an array;
 * Check if an item is equal to the other item after being stringified when 'items' is a JSON object
 */
function findStep (item, items) {
	if (Array.isArray(items)) {
		return !!find(items, item);
	}
	return (JSON.stringify(item) === JSON.stringify(items));
}

/**
 * Progress Indicator is a component that communicates to the user the progress of a particular process.
 */
class ProgressIndicator extends React.Component {


	componentWillMount () {
		this.generatedId = shortid.generate();
	}

	componentWillUnmount () {
		this.isUnmounting = true;
	}

	/**
	 * Get the progress indicator's HTML id. Generate a new one if no ID present.
	 */
	getId () {
		return this.props.id || this.generatedId;
	}

	getSteps () {
		// check if passed steps are valid
		return (checkSteps(this.props.steps) ? this.props.steps : defaultSteps);
	}

	render () {
		// Merge objects of strings with their default object
		const assistiveText = this.props ? assign({}, defaultProps.assistiveText, this.props.assistiveText) : defaultProps.assistiveText;

		/** 1. preparing data */
		const allSteps = this.getSteps();

		let currentStep = 0;
		// find index for the current step
		for (let i = 0; i < allSteps.length; ++i) {
			// assign step an id if it does not have one
			if (allSteps[i].id === undefined) {
				allSteps[i].id = i;
			}
			if (findStep(allSteps[i], this.props.selectedStep)) {
				currentStep = i;
			}
		}

		/** 2. return DOM */
		return (
			<Progress
				assistiveText={assistiveText}
				id={this.getId()}
				value={currentStep === 0 ? '0' : `${(100 * (currentStep / (allSteps.length - 1)))}`}
				variant={this.props.variant}
				className={this.props.className}
			>
				{
					allSteps.map((step, i) =>
						(<Step
							key={`${this.getId()}-${step.id}`}
							id={this.getId()}
							index={i}
							isSelected={findStep(step, this.props.selectedStep)}
							isDisabled={findStep(step, this.props.disabledSteps)}
							isError={findStep(step, this.props.errorSteps)}
							isCompleted={findStep(step, this.props.completedSteps)}
							onClick={this.props.onStepClick}
							onFocus={this.props.onStepFocus}
							step={step}
							tooltipIsOpen={findStep(step, this.props.tooltipIsOpenSteps)}
						/>)
					)
				}
			</Progress>
		);
	}
}

ProgressIndicator.displayName = displayName;
ProgressIndicator.propTypes = propTypes;
ProgressIndicator.defaultProps = defaultProps;

export default ProgressIndicator;
