/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, useMemo } from 'react';
import find from 'lodash.find';
import { PROGRESS_INDICATOR } from '../../utilities/constants';

// Child components
import Step from './private/step';
import Progress from './private/progress';
import StepVertical from './private/step-vertical';

/**
 * Progress indicator orientation
 */
export type ProgressIndicatorOrientation = 'horizontal' | 'vertical';

/**
 * Progress indicator variant
 */
export type ProgressIndicatorVariant = 'base' | 'modal' | 'setup-assistant';

/**
 * Tooltip position
 */
export type TooltipPosition = 'absolute' | 'overflowBoundaryElement' | 'relative';

/**
 * Step object structure
 */
export interface ProgressStep {
	/** Unique identifier */
	id: string | number;
	/** Tooltip label */
	label: string;
	/** Optional assistive text override */
	assistiveText?: string;
}

/**
 * Assistive text for ProgressIndicator
 */
export interface ProgressIndicatorAssistiveText {
	/** Label for completed steps */
	completedStep?: string;
	/** Label for disabled steps */
	disabledStep?: string;
	/** Label for error steps */
	errorStep?: string;
	/** Label for progress percentage */
	percentage?: string;
	/** Label prefix for steps */
	step?: string;
}

/**
 * Step event data
 */
export interface StepEventData {
	isCompleted: boolean;
	isDisabled: boolean;
	isError: boolean;
	isSelected: boolean;
	step: ProgressStep;
}

/**
 * Props for the ProgressIndicator component
 */
export interface ProgressIndicatorProps {
	/** Assistive text for accessibility */
	assistiveText?: ProgressIndicatorAssistiveText;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Array of completed step objects */
	completedSteps?: ProgressStep[];
	/** Array of disabled step objects */
	disabledSteps?: ProgressStep[];
	/** Array of error step objects */
	errorSteps?: ProgressStep[];
	/** HTML id attribute */
	id?: string;
	/** Orientation (horizontal or vertical) */
	orientation?: ProgressIndicatorOrientation;
	/** Click handler for steps */
	onStepClick?: (event: React.MouseEvent | React.KeyboardEvent, data: StepEventData) => void;
	/** Focus handler for steps */
	onStepFocus?: (event: React.FocusEvent, data: StepEventData) => void;
	/** Currently selected step */
	selectedStep: ProgressStep;
	/** Array of all steps */
	steps: ProgressStep[];
	/** Steps with open tooltips (for development) */
	tooltipIsOpenSteps?: ProgressStep[];
	/** Tooltip position strategy */
	tooltipPosition?: TooltipPosition;
	/** Component variant */
	variant?: ProgressIndicatorVariant;
}

const defaultSteps: ProgressStep[] = [
	{ id: 0, label: 'tooltip label #1' },
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: 'tooltip label #3' },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
];

const defaultAssistiveText: ProgressIndicatorAssistiveText = {
	completedStep: 'Completed',
	disabledStep: 'Disabled',
	errorStep: 'Error',
	step: 'Step',
};

/**
 * Check if steps prop is valid
 */
function checkSteps(steps?: ProgressStep[]): boolean {
	if (!steps) return false;
	return Array.isArray(steps) && steps.every((step) => step.label !== undefined);
}

/**
 * Check if an item exists in an array of items
 */
function findStep(item: ProgressStep | undefined, items: ProgressStep | ProgressStep[] | undefined): boolean {
	if (!item || !items) return false;

	const itemsArray = !Array.isArray(items) ? [items] : items;

	return Boolean(find(itemsArray, (arrayItem) => {
		if (arrayItem === item) return true;
		if (arrayItem.id !== undefined && item.id !== undefined) {
			return arrayItem.id === item.id;
		}
		return JSON.stringify(arrayItem) === JSON.stringify(item);
	}));
}

/**
 * Progress Indicator communicates to the user the progress of a particular process.
 */
const ProgressIndicator = ({
	assistiveText: propAssistiveText,
	className,
	completedSteps = [],
	disabledSteps = [],
	errorSteps = [],
	id: propId,
	orientation: propOrientation = 'horizontal',
	onStepClick = () => {},
	onStepFocus = () => {},
	selectedStep,
	steps: propSteps,
	tooltipIsOpenSteps,
	tooltipPosition: propTooltipPosition,
	variant = 'base',
}: ProgressIndicatorProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const allSteps = checkSteps(propSteps) ? propSteps : defaultSteps;

	// Find current step index
	const currentStepIndex = useMemo(() => {
		let index = 0;
		for (let i = 0; i < allSteps.length; i += 1) {
			if (findStep(allSteps[i], selectedStep)) {
				index = i;
				break;
			}
		}
		return index;
	}, [allSteps, selectedStep]);

	// Calculate progress value
	const progressValue = currentStepIndex === 0
		? '0'
		: `${100 * (currentStepIndex / (allSteps.length - 1))}`;

	// Determine orientation
	const orientation = variant === 'setup-assistant' ? 'vertical' : propOrientation;

	// Determine tooltip position
	const tooltipPosition = propTooltipPosition || (variant === 'modal' ? 'absolute' : 'overflowBoundaryElement');

	// Select step component based on orientation
	const StepComponent = (
		orientation === 'vertical' ? StepVertical : Step
	) as React.ComponentType<
		React.ComponentProps<typeof Step> & React.ComponentProps<typeof StepVertical>
	>;

	return (
		<Progress
			assistiveText={assistiveText}
			id={id}
			orientation={orientation}
			value={progressValue}
			variant={variant}
			className={className}
		>
			{allSteps.map((step, i) => (
				<StepComponent
					key={`${id}-${step.id}`}
					assistiveText={assistiveText}
					id={id}
					index={i}
					isSelected={findStep(step, selectedStep)}
					isDisabled={findStep(step, disabledSteps)}
					isError={findStep(step, errorSteps)}
					isCompleted={findStep(step, completedSteps)}
					onClick={onStepClick}
					onFocus={onStepFocus}
					step={step}
					tooltipIsOpen={findStep(step, tooltipIsOpenSteps)}
					tooltipPosition={tooltipPosition}
					variant={variant}
				/>
			))}
		</Progress>
	);
};

ProgressIndicator.displayName = PROGRESS_INDICATOR;

export default ProgressIndicator;















