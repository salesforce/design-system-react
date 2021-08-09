/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
import classNames from 'classnames';

// Child component
import { PROGRESS_INDICATOR_STEP_VERTICAL } from '../../../utilities/constants';
import Icon from '../../icon';

// ### Display Name
const displayName = PROGRESS_INDICATOR_STEP_VERTICAL;

// ### Prop Types
const propTypes = {
	/**
	 * Index of step. Used for id's if no step ID exists
	 */
	index: PropTypes.number,
	/**
	 * Determines if the step has been completed
	 */
	isCompleted: PropTypes.bool,
	/**
	 * Determines if the step contains an error
	 */
	isError: PropTypes.bool,
	/**
	 * Determines if the step is currently selected (active)
	 */
	isSelected: PropTypes.bool,
	/**
	 * Triggered when click on individual steps. By default, it receives an event and returns all info passed to that step.
	 * users are able to re-define it by passing a function as a prop
	 */
	onClick: PropTypes.func,
	/**
	 * Step object. This is passed into event callbacks.
	 */
	step: PropTypes.object,
	/**
	 * The variant of the parent progress indicator
	 */
	variant: PropTypes.string,
};

/**
 * StepVertical renders a step icon and its step label if applied
 */
class StepVertical extends React.Component {
	/**
	 * stepIcon represents the icon used for each step.
	 */
	stepIcon = (renderIcon, status, props) => {
		const data = {
			isSelected: this.props.isSelected,
			isError: this.props.isError,
			isCompleted: this.props.isCompleted,
			step: this.props.step,
		};

		const icon = renderIcon ? (
			<Icon
				category="utility"
				size="x-small"
				name={this.props.isError ? 'error' : 'success'}
			/>
		) : null;

		const handleClick = (event) => this.props.onClick(event, data);

		return this.props.onClick ? (
			<button
				className={classNames('slds-button slds-progress__marker', {
					'slds-progress__marker_icon': renderIcon,
					'slds-progress__marker_icon-success':
						this.props.variant === 'setup-assistant' &&
						renderIcon &&
						!this.props.isError,
				})}
				type="button"
				onClick={handleClick}
			>
				{icon}
				<span className="slds-assistive-text">
					{this.props.step.assistiveText || (
						<React.Fragment>
							{`${this.props.assistiveText.step} ${this.props.index + 1}: `}
							{this.props.step.label}
							{status ? ` - ${status}` : ''}
						</React.Fragment>
					)}
				</span>
			</button>
		) : (
			<span
				className={classNames('slds-progress__marker', {
					'slds-progress__marker_icon': renderIcon,
					'slds-progress__marker_icon-success':
						this.props.variant === 'setup-assistant' &&
						renderIcon &&
						!this.props.isError,
				})}
			>
				{icon}
				<span className="slds-assistive-text">
					{this.props.step.assistiveText || (
						<React.Fragment>
							{`${props.assistiveText.step} ${props.index + 1}: `}
							{props.step.label}
							{status ? ` - ${status}` : ''}
						</React.Fragment>
					)}
				</span>
			</span>
		);
	};

	renderStepContent = () => {
		if (
			this.props.step.onRenderSetupAssistantAction ||
			this.props.step.setupAssistantEstimatedTime
		) {
			return (
				<div
					id={`progress-indicator-vertical-label-${
						this.props.step.id || this.props.index
					}`}
					className="slds-progress__item_content slds-grid slds-grid_align-spread"
				>
					<div className="slds-size_3-of-4">{this.props.step.label}</div>
					<div className="slds-grid slds-grid_align-end slds-size_1-of-4">
						<div className="slds-media__figure slds-media__figure_reverse">
							{this.props.step.onRenderSetupAssistantAction}
							{this.props.step.setupAssistantEstimatedTime && (
								<p className="slds-text-align_right slds-text-color_weak slds-p-top_medium">
									{this.props.step.setupAssistantEstimatedTime}
								</p>
							)}
						</div>
					</div>
				</div>
			);
		}
		return (
			<div
				id={`progress-indicator-vertical-label-${
					this.props.step.id || this.props.index
				}`}
				className="slds-progress__item_content slds-grid slds-grid_align-spread"
			>
				{this.props.step.label}
			</div>
		);
	};

	render() {
		const renderIcon = this.props.isCompleted || this.props.isError;
		let status = '';
		if (this.props.isError) {
			status = this.props.assistiveText.errorStep;
		} else if (this.props.isCompleted) {
			status = this.props.assistiveText.completedStep;
		} else if (this.props.isDisabled) {
			status = this.props.assistiveText.disabledStep;
		}

		return (
			<li
				className={classNames('slds-progress__item', {
					'slds-is-completed': this.props.isCompleted,
					'slds-is-active': this.props.isSelected && !this.props.isError,
					'slds-has-error': this.props.isError,
				})}
			>
				{this.stepIcon(renderIcon, status, this.props)}
				{this.renderStepContent()}
			</li>
		);
	}
}

StepVertical.propTypes = propTypes;
StepVertical.displayName = displayName;

export default StepVertical; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
