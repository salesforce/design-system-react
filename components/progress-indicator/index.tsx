/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useEffect, useId, useMemo, type ReactNode } from 'react';
import find from 'lodash.find';
import { PROGRESS_INDICATOR } from '../../utilities/constants';
import componentDoc from './component.json';

// Child components
import Step from './private/step';
import Progress from './private/progress';
import StepVertical from './private/step-vertical';
import Path from './private/path';

// This component's `checkProps` which issues warnings to developers about properties when in development mode
import checkProps from './check-props';

/**
 * Progress indicator orientation
 */
export type ProgressIndicatorOrientation = 'horizontal' | 'vertical';

/**
 * Progress indicator type
 */
export type ProgressIndicatorType = 'base' | 'path';

/**
 * Progress indicator variant
 */
export type ProgressIndicatorVariant =
	'base' | 'modal' | 'setup-assistant' | 'shade';

/**
 * Tooltip position
 */
export type TooltipPosition =
	'absolute' | 'overflowBoundaryElement' | 'relative';

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
	/** Action shown next to the step label. Only used by the `setup-assistant` variant. */
	setupAssistantAction?: ReactNode;
	/** Estimated time shown next to the step label. Only used by the `setup-assistant` variant. */
	setupAssistantEstimatedTime?: ReactNode;
	/** @deprecated Use `setupAssistantAction` instead. */
	onRenderSetupAssistantAction?: ReactNode;
}

/**
 * Assistive text for ProgressIndicator
 */
export interface ProgressIndicatorAssistiveText {
	/** `type="path"` only: read before a completed stage's name. Defaults to `Stage Complete` */
	completedStage?: string;
	/** Label for completed steps */
	completedStep?: string;
	/** `type="path"` only: read before the current stage's name. Defaults to `Current Stage:` */
	currentStage?: string;
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
 * Text labels for ProgressIndicator
 */
export interface ProgressIndicatorLabels {
	/** `type="path"` only: text before the current stage's name, which shows when the path collapses on narrow screens. Include any spacing between it and the name. Defaults to `Stage: ` */
	stageNameBefore?: React.ReactNode;
	/** `type="path"` only: text after the current stage's name. Include any spacing between it and the name. */
	stageNameAfter?: React.ReactNode;
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
	/** Array of disabled step objects. `type="base"` only. */
	disabledSteps?: ProgressStep[];
	/** Array of error step objects. `type="base"` only. */
	errorSteps?: ProgressStep[];
	/** HTML id attribute */
	id?: string;
	/** **Text labels for internationalization** */
	labels?: ProgressIndicatorLabels;
	/** Orientation (horizontal or vertical). `type="base"` only. */
	orientation?: ProgressIndicatorOrientation;
	/** Click handler for steps */
	onStepClick?: (
		event: React.MouseEvent | React.KeyboardEvent,
		data: StepEventData
	) => void;
	/** Focus handler for steps */
	onStepFocus?: (event: React.FocusEvent, data: StepEventData) => void;
	/** Currently selected step */
	selectedStep: ProgressStep;
	/** Array of all steps */
	steps: ProgressStep[];
	/** Steps with open tooltips (for development). `type="base"` only. */
	tooltipIsOpenSteps?: ProgressStep[];
	/** Tooltip position strategy. `type="base"` only. */
	tooltipPosition?: TooltipPosition;
	/**
	 * Visual pattern, like `type` on `lightning-progress-indicator`:
	 * * `base` - (default) Step markers on a progress bar, with each step's label in a tooltip.
	 * * `path` - SLDS Path, with each step's label shown in its stage. Use the arrow keys to move between stages. Completion comes from `completedSteps`; error, disabled, and tooltip props aren't supported.
	 */
	type?: ProgressIndicatorType;
	/**
	 * Component variant. `type="base"` only.
	 * * `base` - (default) For white backgrounds.
	 * * `shade` - For shaded backgrounds. Adds a light gray border to the step markers, like `variant="shade"` on `lightning-progress-indicator`.
	 * * `modal` - The `shade` styling, with tooltips positioned for a modal footer.
	 * * `setup-assistant` - Vertical steps with a bordered list, for Setup Assistant.
	 */
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
	completedStage: 'Stage Complete',
	completedStep: 'Completed',
	currentStage: 'Current Stage:',
	disabledStep: 'Disabled',
	errorStep: 'Error',
	step: 'Step',
};

const defaultLabels: ProgressIndicatorLabels = {
	stageNameBefore: 'Stage: ',
};

/**
 * Check if steps prop is valid
 */
function checkSteps(steps?: ProgressStep[]): boolean {
	if (!steps) return false;
	return (
		Array.isArray(steps) && steps.every((step) => step.label !== undefined)
	);
}

/**
 * Check if an item exists in an array of items
 */
function findStep(
	item: ProgressStep | undefined,
	items: ProgressStep | ProgressStep[] | undefined
): boolean {
	if (!item || !items) return false;

	const itemsArray = !Array.isArray(items) ? [items] : items;

	return Boolean(
		find(itemsArray, (arrayItem) => {
			if (arrayItem === item) return true;
			if (arrayItem.id !== undefined && item.id !== undefined) {
				return arrayItem.id === item.id;
			}
			return JSON.stringify(arrayItem) === JSON.stringify(item);
		})
	);
}

/**
 * Progress Indicator communicates to the user the progress of a particular process.
 */
const ProgressIndicator = ({
	assistiveText: propAssistiveText,
	className,
	completedSteps = [],
	disabledSteps: propDisabledSteps,
	errorSteps: propErrorSteps,
	id: propId,
	labels: propLabels,
	orientation: propOrientation = 'horizontal',
	onStepClick = () => {},
	onStepFocus = () => {},
	selectedStep,
	steps: propSteps,
	tooltipIsOpenSteps,
	tooltipPosition: propTooltipPosition,
	type = 'base',
	variant = 'base',
}: ProgressIndicatorProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const allSteps = checkSteps(propSteps) ? propSteps : defaultSteps;

	// Check props in development. Pass whether each step array has items, not the array itself, so that
	// an empty array doesn't count as passed and a new array on each render doesn't re-run the check.
	const hasDisabledSteps = Boolean(propDisabledSteps?.length);
	const hasErrorSteps = Boolean(propErrorSteps?.length);
	const hasTooltipIsOpenSteps = Boolean(tooltipIsOpenSteps?.length);
	const hasDeprecatedSetupAssistantAction = Boolean(
		propSteps?.some((step) => step?.onRenderSetupAssistantAction !== undefined)
	);
	useEffect(() => {
		checkProps(
			PROGRESS_INDICATOR,
			{
				disabledSteps: hasDisabledSteps,
				errorSteps: hasErrorSteps,
				hasDeprecatedSetupAssistantAction,
				orientation: propOrientation,
				tooltipIsOpenSteps: hasTooltipIsOpenSteps,
				tooltipPosition: propTooltipPosition,
				type,
				variant,
			},
			componentDoc
		);
	}, [
		hasDisabledSteps,
		hasErrorSteps,
		hasDeprecatedSetupAssistantAction,
		hasTooltipIsOpenSteps,
		propOrientation,
		propTooltipPosition,
		type,
		variant,
	]);

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

	if (type === 'path') {
		return (
			<Path
				assistiveText={assistiveText}
				className={className}
				selectedIndex={currentStepIndex}
				id={id}
				labels={{ ...defaultLabels, ...propLabels }}
				onStepClick={onStepClick}
				onStepFocus={onStepFocus}
				steps={allSteps.map((step) => ({
					isCompleted: findStep(step, completedSteps),
					isSelected: findStep(step, selectedStep),
					step,
				}))}
			/>
		);
	}

	const disabledSteps = propDisabledSteps ?? [];
	const errorSteps = propErrorSteps ?? [];

	// Calculate progress value
	const progressValue =
		currentStepIndex === 0
			? '0'
			: `${100 * (currentStepIndex / (allSteps.length - 1))}`;

	// Determine orientation
	const orientation =
		variant === 'setup-assistant' ? 'vertical' : propOrientation;

	// Determine tooltip position
	const tooltipPosition =
		propTooltipPosition ||
		(variant === 'modal' ? 'absolute' : 'overflowBoundaryElement');

	// Select step component based on orientation
	const StepComponent = (
		orientation === 'vertical' ? StepVertical : Step
	) as React.ComponentType<
		React.ComponentProps<typeof Step> &
			React.ComponentProps<typeof StepVertical>
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
