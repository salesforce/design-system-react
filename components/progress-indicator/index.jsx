/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Progress Indicator design pattern](https://lightningdesignsystem.com/components/progress-indicator/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import PropTypes from 'prop-types';

import find from 'lodash.find';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import { PROGRESS_INDICATOR } from '../../utilities/constants';

// Child components
import Step from './private/step';
import Progress from './private/progress';
import StepVertical from './private/step-vertical';

const displayName = PROGRESS_INDICATOR;

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `completedStep`: Label for a completed step. The default is `Completed Step`
	 * * `disabledStep`: Label for disabled step. The default is `Disabled Step`
	 * * `errorStep`: Label for a step with an error. The default is `Error Step`
	 * * `percentage`: Label for Progress Bar. The default is `Progress: [this.props.value]%`. You will need to calculate the percentage yourself if changing this string.
	 * * `step`: Label for a step. It will be typically followed by the number of the step such as "Step 1".
	 */
	assistiveText: PropTypes.shape({
		completedStep: PropTypes.string,
		disabledStep: PropTypes.string,
		percentage: PropTypes.string,
		step: PropTypes.string,
	}),
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
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
	 * Stores all error steps. It is an array of step objects and usually there is only one error step, the current step. If an error occurs a second error icon should be placed to the left of related confirmation buttons (e.g. Cancel, Save) and an Error Popover should appear indicating there are errors. These additional items are NOT part of this component. This note was included for visibility purposes. Please refer to [SLDS website](https://www.lightningdesignsystem.com/components/progress-indicator/) for full details **
	 */
	errorSteps: PropTypes.array,
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * Determines the orientation of the progress indicator
	 */
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
	/**
	 * Triggered when an individual step is clicked. By default, it receives an event and returns step state and the step object clicked: `{ isCompleted, isDisabled, isError, isSelected, step }`. Users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the callback result.
	 * ```
	 * const handleStepClick = function(event, data) { console.log(data); };
	 *   <ProgressIndicator onStepClick={handleStepClick} />
	 * ```
	 */
	onStepClick: PropTypes.func,
	/**
	 * Triggered when an individual step is focused. By default, it receives an event and returns step state and the step object clicked: `{ isCompleted, isDisabled, isError, isSelected, step }`. Users are able to pass a callback handleClick function in forms of: <function name>(event, data) where data is the callback result.
	 * ```
	 * const handleStepFocus = function(event, data) { console.log(data); };
	 *   <ProgressIndicator onStepFocus={handleStepFocus} />
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
	 *    id: <PropTypes.number> or <PropTypes.string>, has to be unique
	 *    label: <PropTypes.string>, representing the tooltip content
	 *    assistiveText: <PropTypes.string>, The default is `[Step props.index + 1]: [status]`. Status is if the step has been completed or in an error state.
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
	variant: PropTypes.oneOf(['base', 'modal', 'setup-assistant']),
	/**
	 * Please select one of the following:
	 * * `absolute` - (default if `variant` is `modal`) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
	 * * `overflowBoundaryElement` - (default if `variant` is `base`) The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
	 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
	 */
	tooltipPosition: PropTypes.oneOf([
		'absolute',
		'overflowBoundaryElement',
		'relative',
	]),
};

const defaultSteps = [
	{ id: 0, label: 'tooltip label #1' },
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: 'tooltip label #3' },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
];

const defaultProps = {
	assistiveText: {
		completedStep: 'Completed',
		disabledStep: 'Disabled',
		errorStep: 'Error',
		step: 'Step',
	},
	errorSteps: [],
	completedSteps: [],
	disabledSteps: [],
	orientation: 'horizontal',
	selectedStep: defaultSteps[0],
	variant: 'base',
	// click/focus callbacks by default do nothing
	onStepClick: () => {},
	onStepFocus: () => {},
};

/**
 * Check if `steps` prop is valid
 */
function checkSteps(steps) {
	const isStepsDefined = steps !== undefined;
	const isLabelDefined = (step) => step.label !== undefined;
	const stepLabelsDefined = Array.isArray(steps) && steps.every(isLabelDefined);

	return isStepsDefined && stepLabelsDefined;
}

/**
 * Check if an item is from an array of items.
 * If items argument is not an array, it will be treated as an object comparison between item & items.
 */
function findStep(item, items) {
	if (!item || !items) return false;

	const itemsArray = !Array.isArray(items) ? [items] : items;

	return !!find(itemsArray, (arrayItem) => {
		if (arrayItem === item) {
			return true;
		}
		if (arrayItem.id !== undefined && item.id !== undefined) {
			return arrayItem.id === item.id;
		}
		return JSON.stringify(arrayItem) === JSON.stringify(item);
	});
}

/**
 * Progress Indicator is a component that communicates to the user the progress of a particular process.
 */
class ProgressIndicator extends React.Component {
	constructor(props) {
		super(props);

		this.generatedId = shortid.generate();
	}

	componentWillUnmount() {
		this.isUnmounting = true;
	}

	/**
	 * Get the progress indicator's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	getSteps() {
		// check if passed steps are valid
		return checkSteps(this.props.steps) ? this.props.steps : defaultSteps;
	}

	render() {
		// Merge objects of strings with their default object
		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};

		const {
			selectedStep,
			disabledSteps,
			errorSteps,
			completedSteps,
		} = this.props;
		/** 1. preparing data */
		const allSteps = this.getSteps();

		let currentStep = 0;
		// find index for the current step
		// eslint-disable-next-line fp/no-loops
		for (let i = 0; i < allSteps.length; i += 1) {
			// assign step an id if it does not have one
			if (allSteps[i].id === undefined) {
				allSteps[i].id = i;
			}
			if (findStep(allSteps[i], this.props.selectedStep)) {
				currentStep = i;
			}
		}

		const orientation =
			this.props.variant === 'setup-assistant'
				? 'vertical'
				: this.props.orientation;
		// Set default tooltipPosition
		const tooltipPosition =
			this.props.tooltipPosition ||
			(this.props.variant === 'modal' ? 'absolute' : 'overflowBoundaryElement');
		const StepComponent = orientation === 'vertical' ? StepVertical : Step;
		/** 2. return DOM */
		return (
			<Progress
				assistiveText={assistiveText}
				id={this.getId()}
				orientation={orientation}
				value={
					currentStep === 0
						? '0'
						: `${100 * (currentStep / (allSteps.length - 1))}`
				}
				variant={this.props.variant}
				className={this.props.className}
			>
				{allSteps.map((step, i) => (
					<StepComponent
						assistiveText={assistiveText}
						key={`${this.getId()}-${step.id}`}
						id={this.getId()}
						index={i}
						isSelected={findStep(step, selectedStep)}
						isDisabled={findStep(step, disabledSteps)}
						isError={findStep(step, errorSteps)}
						isCompleted={findStep(step, completedSteps)}
						onClick={this.props.onStepClick}
						onFocus={this.props.onStepFocus}
						step={step}
						tooltipIsOpen={findStep(step, this.props.tooltipIsOpenSteps)}
						tooltipPosition={tooltipPosition}
						variant={this.props.variant}
					/>
				))}
			</Progress>
		);
	}
}

ProgressIndicator.displayName = displayName;
ProgressIndicator.propTypes = propTypes;
ProgressIndicator.defaultProps = defaultProps;

export default ProgressIndicator;
