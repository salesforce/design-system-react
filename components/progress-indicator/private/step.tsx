/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
import classNames from 'classnames';

// Child component
import Tooltip, {
	type TooltipAlign,
	type TooltipTheme,
} from '../../tooltip';
import { PROGRESS_INDICATOR_STEP } from '../../../utilities/constants';
import ButtonIcon from '../../icon/button-icon';
import {
	type ProgressStep,
	type ProgressIndicatorAssistiveText,
	type ProgressIndicatorVariant,
	type TooltipPosition,
	type StepEventData,
} from '../index';

// ### Display Name
const displayName = PROGRESS_INDICATOR_STEP;

export interface StepProps {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `completedStep`: Label for a completed step. The default is `Completed Step`
	 * * `disabledStep`: Label for disabled step. The default is `Disabled Step`
	 * * `errorStep`: Label for a step with an error. The default is `Error Step`
	 * * `percentage`: Label for Progress Bar. The default is `Progress: [this.props.value]%`.
	 * * `step`: Label for a step. It will be typically followed by the number of the step such as "Step 1".
	 */
	assistiveText?: ProgressIndicatorAssistiveText;
	/**
	 * Id for Steps, ranging in [0, steps.length).
	 */
	id?: number | string;
	/**
	 * Index of step. Used for id's if no step ID exists
	 */
	index: number;
	/**
	 * Determines if the step has been completed
	 */
	isCompleted?: boolean;
	/**
	 * Determines if the step has been disabled
	 */
	isDisabled?: boolean;
	/**
	 * Determines if the step contains an error
	 */
	isError?: boolean;
	/**
	 * Determines if the step is currently selected (active)
	 */
	isSelected?: boolean;
	/**
	 * Triggered when click on individual steps.
	 */
	onClick?: (
		event: React.MouseEvent | React.KeyboardEvent,
		data: StepEventData
	) => void;
	/**
	 * Triggered when focus on individual steps.
	 */
	onFocus?: (event: React.FocusEvent, data: StepEventData) => void;
	/**
	 * Step object. This is passed into event callbacks.
	 */
	step: ProgressStep;
	/**
	 * Determines if the tooltip attached to step is always open.
	 */
	tooltipIsOpen?: boolean;
	/**
	 * Position strategy for the step's tooltip.
	 */
	tooltipPosition?: TooltipPosition;
	/**
	 * The variant of the parent progress indicator
	 */
	variant?: ProgressIndicatorVariant;
}

/**
 * Step renders a button icon and its tooltip if applied.
 * The button is applied with different css classes under different conditions.
 * Button icons have 4 types of status: completed (success), active (in progress), error (warning) and uncompleted (not approached)
 */
class Step extends React.Component<StepProps> {
	static displayName = displayName;

	/**
	 * buttonIcon represents the button icon used for each step.
	 * the button is applied with different css classes under different conditions.
	 */
	buttonIcon(renderIcon: boolean, status: string, props: StepProps) {
		const data: StepEventData = {
			isSelected: !!props.isSelected,
			isError: !!props.isError,
			isCompleted: !!props.isCompleted,
			isDisabled: !!props.isDisabled,
			step: props.step,
		};

		const icon = renderIcon ? (
			<ButtonIcon
				category="utility"
				name={this.props.isError ? 'error' : 'success'}
			/>
		) : null;

		const handleClick = (event: React.MouseEvent) => props.onClick?.(event, data);
		const handleFocus = (event: React.FocusEvent) =>
			props.onFocus?.(event, data);

		const stepButton = props.isDisabled ? (
			<a
				className={classNames(
					'slds-button',
					{ 'slds-button_icon': renderIcon },
					'slds-progress__marker',
					{ 'slds-progress__marker_icon': renderIcon },
					'slds-is-disabled'
				)}
				aria-disabled
				aria-describedby={`progress-indicator-tooltip-${
					this.props.step.id || this.props.index
				}`}
				style={{ cursor: 'not-allowed' }}
				tabIndex={0}
				role="button"
			>
				{icon}
				<span className="slds-assistive-text">
					{this.props.step.assistiveText || (
						<React.Fragment>
							{`${props.assistiveText?.step} ${props.index + 1}: `}
							{props.step.label}
							{`- ${status}`}
						</React.Fragment>
					)}
				</span>
			</a>
		) : (
			<button
				className={classNames(
					'slds-button',
					{ 'slds-button_icon': renderIcon },
					'slds-progress__marker',
					{ 'slds-progress__marker_icon': renderIcon }
				)}
				onClick={handleClick}
				onFocus={handleFocus}
				aria-describedby={`progress-indicator-tooltip-${
					this.props.step.id || this.props.index
				}`}
				aria-current={this.props.isSelected ? 'step' : undefined}
				type="button"
			>
				{icon}
				<span className="slds-assistive-text">
					{this.props.step.assistiveText || (
						<React.Fragment>
							{`${props.assistiveText?.step} ${props.index + 1}: `}
							{props.step.label}
							{status ? ` - ${status}` : ''}
						</React.Fragment>
					)}
				</span>
			</button>
		);

		return stepButton;
	}

	render() {
		const renderIcon = this.props.isCompleted || this.props.isError;
		let status = '';
		if (this.props.isError) {
			status = this.props.assistiveText?.errorStep || '';
		} else if (this.props.isCompleted) {
			status = this.props.assistiveText?.completedStep || '';
		} else if (this.props.isDisabled) {
			status = this.props.assistiveText?.disabledStep || '';
		}

		const tooltipProps: {
			align: TooltipAlign;
			id: string;
			content: React.ReactNode;
			theme: TooltipTheme;
			position?: TooltipPosition;
			triggerStyle: React.CSSProperties;
			isOpen?: boolean;
		} = {
			align: 'top',
			id: `progress-indicator-tooltip-${
				this.props.step.id || this.props.index
			}`,
			content: this.props.step.label,
			theme: 'info',
			position: this.props.tooltipPosition,
			triggerStyle: { display: !renderIcon ? 'flex' : '' },
		};

		// This is mainly for dev test purpose.
		// `isOpen` is only set to true if tooltip is specified to be open
		// Do not set isOpen to false or undefined otherwise, because that will
		// disable any interaction with tooltips
		if (this.props.tooltipIsOpen) {
			tooltipProps.isOpen = true;
		}

		return (
			<li
				className={classNames('slds-progress__item', {
					'slds-is-completed': this.props.isCompleted,
					'slds-is-active': this.props.isSelected && !this.props.isError,
					'slds-has-error': this.props.isError,
				})}
			>
				<Tooltip {...tooltipProps}>
					{this.buttonIcon(!!renderIcon, status, this.props)}
				</Tooltip>
			</li>
		);
	}
}

export default Step;
