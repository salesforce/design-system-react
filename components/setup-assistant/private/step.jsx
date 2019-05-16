/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import Button from '../../button';
import ProgressRing from '../../progress-ring';

const SETUP_ASSISTANT_STEP = 'SLDSSetupAssistantStep';

const propTypes = {
	/**
	 * Accepts a node to display the step's available action(s). Typically a Button, Button of variant "link," or Checkbox of variant "toggle"
	 */
	action: PropTypes.node,
	/**
	 * Assistive text passed in from the parent setup assistant
	 */
	assistiveText: PropTypes.object,
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Detailed description of the step
	 */
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Estimated time for completing the step
	 */
	estimatedTime: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Heading for the step
	 */
	heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	index: PropTypes.number,
	isExpandable: PropTypes.bool,
	isOpen: PropTypes.bool,
	onRenderContent: PropTypes.func,
	onToggleIsOpen: PropTypes.func,
	/**
	 * Percentage of step completed. No progress indicator will be shown for the step unless this is provided
	 */
	progress: PropTypes.number,
	progressIndicator: PropTypes.node,
	scopedNotification: PropTypes.node,
	/**
	 * Display number for the step. Only appears if progress indicator is enabled
	 */
	stepNumber: PropTypes.number,
};

const defaultProps = {};

class Step extends React.Component {
	constructor(props) {
		super(props);
		this.generatedId = shortid.generate();
		this.state = {
			isOpen: props.isOpen || false
		};
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	getIsOpen () {
		return this.props.isOpen !== undefined ? this.props.isOpen : this.state.isOpen;
	}

	toggleIsOpen = (event) => {
		if (this.props.onToggleIsOpen) {
			this.props.onToggleIsOpen(event, { index: this.props.index, isOpen: this.getIsOpen(), step: this.props });
		} else {
			this.setState({ isOpen: !this.getIsOpen() });
		}
	};

	render() {
		const summary = (
			<div className="slds-setup-assistant__step-summary">
				<div className="slds-media">
					{this.props.progress !== undefined ? (
						<div className="slds-media__figure">
							<ProgressRing
								className={classNames('slds-progress-ring_large', {
									'slds-progress-ring_active-step': this.props.progress !== undefined && this.props.progress > 0 && this.props.progressIndicator
								})}
								hasIcon
								icon={
									this.props.progress === 100 ? null : this.props.stepNumber
								}
								theme={this.props.progress === 100 ? 'complete' : null}
								value={this.props.progress}
							/>
						</div>
					) : null}
					<div className="slds-setup-assistant__step-summary-content slds-media__body">
						<h3 className="slds-setup-assistant__step-summary-title slds-text-heading_small">
							{(this.props.isExpandable) ? (
								<Button
									aria-controls={`${this.getId()}-detail-content`}
									className="slds-button_reset"
									label={this.props.heading}
									onClick={this.toggleIsOpen}
									variant="base"
								/>
							) : (
								this.props.heading
							)}
						</h3>
						<p>{this.props.description}</p>
					</div>
					<div className="slds-media__figure slds-media__figure_reverse">
						{this.props.action}
						{this.props.estimatedTime ? (
							<p className="slds-text-align_right slds-text-color_weak slds-p-top_medium">
								{this.props.estimatedTime}
							</p>
						) : null}
					</div>
				</div>
			</div>
		);

		return (
			<li
				className={classNames(
					'slds-setup-assistant__item',
					this.props.className
				)}
			>
				<article className="slds-setup-assistant__step">
					{(this.props.isExpandable) ? (
						<div className={classNames('slds-summary-detail', {
							'slds-is-open': this.getIsOpen()
						})}>
							<Button
								aria-controls={`${this.getId()}-detail-content`}
								className="slds-m-right_x-small slds-m-top_x-small"
								iconCategory="utility"
								iconClassName="slds-summary-detail__action-icon"
								iconName="switch"
								onClick={this.toggleIsOpen}
								variant="icon"
							/>
							<div className="slds-container_fluid">
								<div className="slds-summary-detail__title">
									{summary}
								</div>
								<div
									className="slds-summary-detail__content"
									id={`${this.getId()}-detail-content`}
								>
									<div className="slds-setup-assistant__step-detail">
										{(this.props.onRenderContent) ? (
											this.props.onRenderContent()
										) : (
											<>
												{this.props.progressIndicator}
												{this.props.scopedNotification}
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					) : (
						summary
					)}
				</article>
			</li>
		);
	}
}

Step.displayName = SETUP_ASSISTANT_STEP;
Step.propTypes = propTypes;
Step.defaultProps = defaultProps;

export default Step;
