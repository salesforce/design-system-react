/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode, type ReactElement, type MouseEvent } from 'react';
import classNames from 'classnames';
import { SETUP_ASSISTANT, SETUP_ASSISTANT_STEP } from '../../utilities/constants';

/**
 * Event data for step toggle
 */
export interface StepToggleEventData {
	index: number;
	isOpen: boolean;
	step: ReactElement;
}

/**
 * Props for child steps
 */
export interface SetupAssistantStepChildProps {
	index?: number;
	onToggleIsOpen?: (event: MouseEvent, data: StepToggleEventData) => void;
	stepNumber?: number;
}

/**
 * Props for the SetupAssistant component
 */
export interface SetupAssistantProps {
	/** SetupAssistantStep components */
	children?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** HTML id */
	id?: string;
	/** Whether the assistant has card styling */
	isCard?: boolean;
	/** Step toggle handler */
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
		<ol id={id} className={classNames('slds-setup-assistant', className as string)}>
			{React.Children.map(children, (child, i) => {
				if (!React.isValidElement(child)) return null;
				if ((child.type as { displayName?: string }).displayName !== SETUP_ASSISTANT_STEP) {
					return null;
				}
				const childProps = child.props as SetupAssistantStepChildProps;
				return React.cloneElement(child as ReactElement<SetupAssistantStepChildProps>, {
					index: i,
					onToggleIsOpen: onStepToggleIsOpen,
					stepNumber: i + 1,
					...childProps,
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

