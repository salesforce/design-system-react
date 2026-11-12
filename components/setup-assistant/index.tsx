/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode, type MouseEvent } from 'react';
import classNames from 'classnames';
import { SETUP_ASSISTANT } from '../../utilities/constants';
import isElementOfType from '../../utilities/is-element-of-type';
import type { ChildrenOf } from '../../types/common';
import SetupAssistantStep, {
	type StepProps,
	type StepInjectedProps,
} from './step';

/**
 * Event data for step toggle
 */
export interface StepToggleEventData {
	/** Index of the toggled step within the Setup Assistant */
	index: number;
	/** Requested (next) open state: `true` to expand the step, `false` to collapse it */
	isOpen: boolean;
	/** Props of the step being toggled */
	step: StepProps;
}

/**
 * Props for the SetupAssistant component
 */
export interface SetupAssistantProps {
	/** `SetupAssistantStep` elements. Other children are ignored. */
	children?: ChildrenOf<StepProps>;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** HTML id */
	id?: string;
	/** Whether the assistant has card styling */
	isCard?: boolean;
	/** Called when a step requests to expand / collapse. `data.isOpen` is the requested (next) state. */
	onStepToggleIsOpen?: (event: MouseEvent, data: StepToggleEventData) => void;
	/** Progress bar component */
	progressBar?: ReactNode;
}

/**
 * Setup Assistant provides Administrators with a centralized list of tasks for
 * onboarding organizations, clouds, or features within the Salesforce Platform.
 */
const SetupAssistant = ({
	children,
	className,
	id: propId,
	isCard = false,
	onStepToggleIsOpen,
	progressBar,
}: SetupAssistantProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	const steps = (
		<ol
			id={id}
			className={classNames('slds-setup-assistant', className as string)}
		>
			{React.Children.map(children, (child, i) => {
				if (!isElementOfType<StepProps>(child, SetupAssistantStep)) {
					return null;
				}
				// The step's own `onToggleIsOpen` and `stepNumber` win
				return React.cloneElement<StepProps & StepInjectedProps>(child, {
					index: i,
					// `data.index` is always set for steps inside a SetupAssistant
					onToggleIsOpen: onStepToggleIsOpen as StepProps['onToggleIsOpen'],
					stepNumber: i + 1,
					...child.props,
				});
			})}
		</ol>
	);

	if (isCard) {
		return (
			<section className="slds-card">
				<header className="slds-theme_shade slds-p-around_medium slds-m-bottom_small">
					{progressBar}
				</header>
				{steps}
			</section>
		);
	}

	return <>{steps}</>;
};

SetupAssistant.displayName = SETUP_ASSISTANT;

export default SetupAssistant;
