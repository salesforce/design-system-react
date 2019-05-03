/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import ProgressRing from '~/components/progress-ring';
import classNames from '../../utilities/class-names';
import { SETUP_ASSISTANT_STEP } from '../../utilities/constants';

const propTypes = {
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Title for the step
	 */
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Detailed description of the step
	 */
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Estimated time for completing the step
	 */
	estimatedTime: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Whether the step is complete
	 */
	isComplete: PropTypes.bool,

	/**
	 * Whether to show toggler
	 */
	showToggler: PropTypes.bool,

	progress: PropTypes.number,

	stepNo: PropTypes.number,

	link: PropTypes.shape({
		text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		link: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	}),

	button: PropTypes.shape({
		text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		link: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	}),
};

const defaultProps = {
	isComplete: false,
	showToggler: false,
	showStepProgress: false,
	progress: 0,
};

class Step extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: this.props.collapsed,
		};
	}

	expand = () => {
		if (this.state.collapsed) {
			this.setState({ collapsed: false });
		} else {
			this.setState({ collapsed: true });
		}
	};

	render() {
		return (
			<li
				className={classNames(
					'slds-setup-assistant__item',
					this.props.className
				)}
			>
				<article className="slds-setup-assistant__step">
					<div className="slds-setup-assistant__step-summary">
						<div className="slds-media">
							{this.props.showStepProgress ? (
								<div className="slds-media__figure">
									<ProgressRing
										className="slds-progress-ring_large"
										value={this.props.progress}
										theme={this.props.progress === 100 ? 'complete' : null}
										icon={
											this.props.progress === 100 ? null : this.props.stepNo
										}
										hasIcon
									/>
								</div>
							) : null}
							<div className="slds-setup-assistant__step-summary-content slds-media__body">
								<h3 className="slds-setup-assistant__step-summary-title slds-text-heading_small">
									{this.props.title}
								</h3>
								<p>{this.props.description}</p>
							</div>
							<div className="slds-media__figure slds-media__figure_reverse">
								{this.props.button ? (
									<button className="slds-button slds-button_outline-brand">
										{this.props.button.text}
									</button>
								) : null}
								{this.props.showToggler ? (
									<div className="slds-form-element">
										<label className="slds-checkbox_toggle slds-grid">
											<span className="slds-form-element__label slds-m-bottom_none slds-assistive-text">
												Turn on tracking for profiles
											</span>
											<input type="checkbox" />
											<div
												className="slds-checkbox_faux_container"
												aria-live="assertive"
											>
												<div className="slds-checkbox_faux" />
												<div className="slds-checkbox_on">Enabled</div>
												<div className="slds-checkbox_off">Disabled</div>
											</div>
										</label>
									</div>
								) : null}
								{this.props.link ? (
									<a href={this.props.link.link}>{this.props.link.text}</a>
								) : null}
								{this.props.estimatedTime ? (
									<p className="slds-text-align_right slds-text-color_weak slds-p-top_medium">
										{this.props.estimatedTime}
									</p>
								) : null}
							</div>
						</div>
					</div>
				</article>
			</li>
		);
	}
}

Step.displayName = SETUP_ASSISTANT_STEP;
Step.propTypes = propTypes;
Step.defaultProps = defaultProps;

export default Step;
