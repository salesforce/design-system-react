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
import PopoverTooltip from '~/components/popover-tooltip';
import { PROGRESS_INDICATOR_STEP } from '../../../utilities/constants';

/**
 * Step renders a button icon and its tooltip if applied.
 * The button is applied with different css classes under different conditions.
 * Button icons have 4 types of status: completed (success), active (in progress), error (warning) and uncompleted (not approached)
 */
const Step = React.createClass({
	// ### Display Name
	displayName: PROGRESS_INDICATOR_STEP,

	// ### Prop Types
	propTypes: {
		id: PropTypes.number,
		/**
		 * tracks the index of current step
		 */
		currentStep: PropTypes.number.isRequired,
		/**
		 * Determines if there is an error occured in the current step
		 */
		hasError: PropTypes.bool,
		/**
		 * Description of tooltip attached to the step if applicable.
		 */
		description: PropTypes.string,
		/**
		 * Triggered when click on individual steps. By default, it receives an event and returns all info passed to that step.
		 * users are able to re-define it by passing a function as a prop
		 */
		onStepClick: PropTypes.func,
		/**
		 * Triggered when focus on individual steps. By default, it receives an event and returns all info passed to that step.
		 * users are able to re-define it by passing a function as a prop
		 */
		onStepFocus: PropTypes.func
	},

	/**
	 * buttonIcon represents the button icon used for each step.
	 * the button is applied with different css classes under different conditions.
	 */
	buttonIcon (renderIcon, showError, status, props) {
		const data = {
			id: props.id,
			currentStep: props.currentStep,
			hasError: props.hasError,
			description: props.description
		};
		const spanClassName = classNames('slds-button', { 'slds-button_icon': renderIcon }, 'slds-progress__marker', { 'slds-progress__marker_icon': renderIcon });
		const handleClick = (event) => props.onStepClick(event, data);
		const handleFocus = (event) => props.onStepFocus(event, data);

		const content = renderIcon ?
			(<svg className="slds-button__icon" aria-hidden="true">
				<use xlinkHref={'/assets/icons/utility-sprite/svg/symbols.svg#' + (showError ? 'warning' : 'success')} />
			</svg>)
			: null;

		const stepButton = (
			<button
					className={spanClassName}
					onClick={handleClick}
					onFocus={handleFocus}
					style={{ bottom: !renderIcon ? '3px' : '' }}
					aria-describedby={'progressIndicatorTooltip' + (this.props.id + 1)}
			>
				{ content }
				<span className="slds-assistive-text">Step { props.id + 1 }: { status }</span>
			</button>);
		return stepButton;
	},

	render () {
		const showComplete = this.props.id < this.props.currentStep;
		const showActive = this.props.id === this.props.currentStep && !this.props.hasError;
		const showError = this.props.id === this.props.currentStep && this.props.hasError;
		const renderIcon = showComplete || showError;
		// step status (one of ['Error', 'Completed', 'Active', 'Uncompleted'])
		let status = '';
		if (showError) {
			status = 'Error';
		} else if (showComplete) {
			status = 'Completed';
		} else if (showActive) {
			status = 'Active';
		} else status = 'Uncompleted';

		return (
			<PopoverTooltip
							align="top"
							id={'progressIndicatorTooltip' + (this.props.id + 1)}
							content={this.props.description}
							variant={showError ? 'error' : 'info'}
			>
				<li
					className={classNames('slds-progress__item', {
						'slds-is-completed': showComplete,
						'slds-is-active': showActive,
						'slds-has-error': showError
					}, this.props.className)}
				>
					{this.buttonIcon(renderIcon, showError, status, this.props)}
				</li>
			</PopoverTooltip>
		);
	}
});

export default Step;    // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
