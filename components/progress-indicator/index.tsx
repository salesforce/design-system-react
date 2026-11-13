/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useCallback,
	useEffect,
	useId,
	useMemo,
	type ReactNode,
} from 'react';
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
 * Status of a single step. A step has at most one status.
 */
export type ProgressStepStatus = 'completed' | 'disabled' | 'error';

/**
 * Step object structure
 */
export interface ProgressStep {
	/** Unique identifier. Steps are matched by `id`. */
	id: string | number;
	/**
	 * Status of the step. A step has one status, so it cannot be both `error` and `completed`.
	 * `disabled` and `error` apply to `type="base"` only; `type="path"` shows `completed`.
	 */
	status?: ProgressStepStatus;
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

/** Props every ProgressIndicator takes. */
interface ProgressIndicatorBaseProps {
	/** Assistive text for accessibility */
	assistiveText?: ProgressIndicatorAssistiveText;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** @deprecated Set `status: 'completed'` on the step. Matched by `id`. */
	completedSteps?: ProgressStep[];
	/** HTML id attribute */
	id?: string;
	/** **Text labels for internationalization** */
	labels?: ProgressIndicatorLabels;
	/** Click handler for steps */
	onStepClick?: (
		event: React.MouseEvent | React.KeyboardEvent,
		data: StepEventData
	) => void;
	/** Focus handler for steps */
	onStepFocus?: (event: React.FocusEvent, data: StepEventData) => void;
	/**
	 * Currently selected step: the `id` of one of the `steps` (a step object is also accepted and
	 * matched by its `id`; one without an `id` is matched by its content, which is deprecated). The
	 * first step is selected when nothing matches.
	 */
	selectedStep: ProgressStep | ProgressStep['id'];
	/** Array of all steps */
	steps: ProgressStep[];
}

/** Props of the step markers on a progress bar: `type="base"`, any variant. */
interface ProgressIndicatorMarkerProps {
	/** @deprecated Set `status: 'disabled'` on the step. Matched by `id`. */
	disabledSteps?: ProgressStep[];
	/** @deprecated Set `status: 'error'` on the step. Matched by `id`. */
	errorSteps?: ProgressStep[];
	/** Steps with open tooltips (for development). */
	tooltipIsOpenSteps?: ProgressStep[];
	/** Tooltip position strategy. */
	tooltipPosition?: TooltipPosition;
}

/**
 * Step markers on a progress bar, with each step's label in a tooltip.
 * * `base` - (default) For white backgrounds.
 * * `shade` - For shaded backgrounds. Adds a light gray border to the step markers, like `variant="shade"` on `lightning-progress-indicator`.
 * * `modal` - The `shade` styling, with tooltips positioned for a modal footer.
 */
interface ProgressIndicatorBarProps
	extends ProgressIndicatorBaseProps, ProgressIndicatorMarkerProps {
	/**
	 * Visual pattern, like `type` on `lightning-progress-indicator`.
	 * * `base` - (default) Step markers on a progress bar.
	 */
	type?: 'base';
	/** Component variant. */
	variant?: Exclude<ProgressIndicatorVariant, 'setup-assistant'>;
	/** Orientation (horizontal or vertical). */
	orientation?: ProgressIndicatorOrientation;
}

/** Vertical steps with a bordered list, for Setup Assistant. Always vertical. */
interface ProgressIndicatorSetupAssistantProps
	extends ProgressIndicatorBaseProps, ProgressIndicatorMarkerProps {
	type?: 'base';
	/** Vertical steps with a bordered list, for Setup Assistant. */
	variant: 'setup-assistant';
	/** Setup Assistant is always vertical. */
	orientation?: 'vertical';
}

/**
 * SLDS Path, with each step's label shown in its stage. Use the arrow keys to
 * move between stages. Completion comes from `status: 'completed'`; there are no
 * error, disabled, tooltip, orientation or variant props.
 */
interface ProgressIndicatorPathProps extends ProgressIndicatorBaseProps {
	/** Visual pattern: SLDS Path, with each step's label shown in its stage. */
	type: 'path';
	disabledSteps?: never;
	errorSteps?: never;
	orientation?: never;
	tooltip?: never;
	tooltipIsOpenSteps?: never;
	tooltipPosition?: never;
	variant?: never;
}

/**
 * Props for the ProgressIndicator component: a union on `type` and `variant`,
 * so a prop that a pattern ignores (or `orientation` that Setup Assistant
 * overrides) does not compile.
 */
export type ProgressIndicatorProps =
	| ProgressIndicatorBarProps
	| ProgressIndicatorSetupAssistantProps
	| ProgressIndicatorPathProps;

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
 * Check if a step is one of the items, matching by `id`
 */
function findStep(
	item: ProgressStep | undefined,
	items: ProgressStep | ProgressStep[] | undefined
): boolean {
	if (!item || !items) return false;

	const itemsArray = Array.isArray(items) ? items : [items];

	return itemsArray.some((arrayItem) => arrayItem.id === item.id);
}

/**
 * Progress Indicator communicates to the user the progress of a particular process.
 */
const ProgressIndicator = (
	props: ProgressIndicatorProps
): React.ReactElement => {
	const {
		assistiveText: propAssistiveText,
		className,
		completedSteps: propCompletedSteps,
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
	} = props as ProgressIndicatorBaseProps &
		ProgressIndicatorMarkerProps & {
			orientation?: ProgressIndicatorOrientation;
			type?: ProgressIndicatorType;
			variant?: ProgressIndicatorVariant;
		};
	const generatedId = useId();
	const id = propId || generatedId;

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const hasValidSteps = checkSteps(propSteps);
	const allSteps = hasValidSteps ? propSteps : defaultSteps;
	const completedSteps = propCompletedSteps ?? [];
	// A step's own `status` wins over the deprecated arrays. It is one status, so it excludes the others.
	const getStatusFlags = (step: ProgressStep) =>
		step.status === undefined
			? {
					isCompleted: findStep(step, completedSteps),
					isDisabled: findStep(step, propDisabledSteps),
					isError: findStep(step, propErrorSteps),
				}
			: {
					isCompleted: step.status === 'completed',
					isDisabled: step.status === 'disabled',
					isError: step.status === 'error',
				};
	const selectedStepId =
		typeof selectedStep === 'object' ? selectedStep?.id : selectedStep;
	// A step object without an `id` is matched the 0.10.x way, by its whole content.
	const selectedStepWithoutId =
		typeof selectedStep === 'object' && selectedStep?.id === undefined
			? JSON.stringify(selectedStep)
			: undefined;
	const isSelectedStep = useCallback(
		(step: ProgressStep) =>
			selectedStepWithoutId === undefined
				? step.id === selectedStepId
				: JSON.stringify(step) === selectedStepWithoutId,
		[selectedStepId, selectedStepWithoutId]
	);

	// Check props in development. Pass whether each step array has items, not the array itself, so that
	// an empty array doesn't count as passed and a new array on each render doesn't re-run the check.
	const hasDisabledSteps = Boolean(propDisabledSteps?.length);
	const hasErrorSteps = Boolean(propErrorSteps?.length);
	const hasDeprecatedCompletedSteps = Boolean(propCompletedSteps?.length);
	const hasInvalidSteps = propSteps !== undefined && !hasValidSteps;
	const hasTooltipIsOpenSteps = Boolean(tooltipIsOpenSteps?.length);
	const hasSelectedStepWithoutId = selectedStepWithoutId !== undefined;
	const hasDeprecatedSetupAssistantAction = Boolean(
		propSteps?.some((step) => step?.onRenderSetupAssistantAction !== undefined)
	);
	useEffect(() => {
		checkProps(
			PROGRESS_INDICATOR,
			{
				disabledSteps: hasDisabledSteps,
				errorSteps: hasErrorSteps,
				hasDeprecatedCompletedSteps,
				hasInvalidSteps,
				hasSelectedStepWithoutId,
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
		hasDeprecatedCompletedSteps,
		hasInvalidSteps,
		hasSelectedStepWithoutId,
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
			if (isSelectedStep(allSteps[i])) {
				index = i;
				break;
			}
		}
		return index;
	}, [allSteps, isSelectedStep]);

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
					isCompleted: getStatusFlags(step).isCompleted,
					isSelected: isSelectedStep(step),
					step,
				}))}
			/>
		);
	}

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
					isSelected={isSelectedStep(step)}
					isDisabled={getStatusFlags(step).isDisabled}
					isError={getStatusFlags(step).isError}
					isCompleted={getStatusFlags(step).isCompleted}
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
