/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Welcome Mat design pattern](https://lightningdesignsystem.com/components/welcome-mat/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import assign from 'lodash.assign';

import Modal from '../modal';
import ProgressBar from '../progress-bar';

import { WELCOME_MAT } from '../../utilities/constants';

const displayName = WELCOME_MAT;

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
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * Whether the modal is open
	 */
	isOpen: PropTypes.bool,
	/**
	 * **Weclome Mat labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `title`: Title for the Welcome Mat
	 * * `description`: Label for the radio input
	 * * `unitsCompletedAfter`: Label for the radio input
	 */
	labels: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		unitsCompletedAfter: PropTypes.string,
	}),
	/**
	 *	Variant of the WelcomeMat
	 */
	variant: PropTypes.oneOf([
		'steps',
		'info-only',
		'splash',
		'trailhead-connected',
	]),
	/**
	 * Link to learn more button
	 */
	onRenderInfoActions: PropTypes.func,
	/**
	 * Callback to fire when modal is dismissed
	 */
	onRequestClose: PropTypes.func,
	/**
	 *  Accepts a single WelcomeMatInfoBadge component, to be used with the trailhead variant
	 */
	infoBadge: PropTypes.node,
	/**
	 *  Do not show again checkbox for info-only variant
	 */
	doNotShowAgainCheckbox: PropTypes.node,
};

const defaultProps = {
	labels: {
		unitsCompletedAfter: 'units completed',
	},
	variant: 'steps',
	isOpen: true,
};

/**
 * A Welcome Mat provides a series of unordered items a user can click to learn about a thematic topic.
 */
class WelcomeMat extends React.Component {
	constructor(props) {
		super(props);

		this.generatedId = shortid.generate();
		this.getCount();
	}

	/**
	 * Get the WelcomeMat's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	getCount() {
		const totalSteps = React.Children.count(this.props.children);
		const completedSteps = React.Children.toArray(this.props.children).filter(
			(c) => c.props.isComplete
		).length;
		const progress = (completedSteps / totalSteps) * 100;
		this.state = {
			totalSteps,
			completedSteps,
			progress,
		};
	}

	render() {
		const labels = assign({}, defaultProps.labels, this.props.labels);
		const splash = (
			<div
				className={classNames(
					'slds-welcome-mat__info-content',
					this.props.className
				)}
				id={`${this.getId()}-content`}
			>
				<h2
					className="slds-welcome-mat__info-title"
					id={`${this.getId()}-label`}
				>
					{labels.title}
				</h2>
				<div className="slds-welcome-mat__info-description slds-text-longform">
					<p>{labels.description}</p>
				</div>
				{this.props.variant === 'info-only' ||
				this.props.variant === 'splash' ? (
					<div className="slds-welcome-mat__info-actions">
						{this.props.onRenderInfoActions()
							? this.props.onRenderInfoActions()
							: null}
						<div className="slds-m-top_large">
							{this.props.doNotShowAgainCheckbox
								? this.props.doNotShowAgainCheckbox
								: null}
						</div>
					</div>
				) : null}
				{(this.props.variant === 'steps' ||
					this.props.variant === 'trailhead-connected') &&
				this.props.children ? (
					<React.Fragment>
						<div
							className={classNames(
								'slds-welcome-mat__info-progress',
								this.state.completedSteps === this.state.totalSteps
									? 'slds-welcome-mat__info-progress_complete'
									: null
							)}
						>
							{this.props.variant === 'trailhead-connected'
								? React.Children.map(this.props.infoBadge, (child) =>
										React.cloneElement(child, {
											isComplete:
												this.state.completedSteps === this.state.totalSteps
													? true
													: null,
										})
								  )
								: null}
							{this.state.completedSteps !== this.state.totalSteps ||
							this.props.variant !== 'trailhead-connected' ? (
								<React.Fragment>
									{this.props.variant === 'trailhead-connected' ? (
										<p>
											{this.state.completedSteps}
											{`/`}
											{this.state.totalSteps}
											{` ${labels.unitsCompletedAfter}`}
										</p>
									) : (
										<p>
											<strong>
												{this.state.completedSteps}
												{`/`}
												{this.state.totalSteps}
												{` ${labels.unitsCompletedAfter}`}
											</strong>
										</p>
									)}
									<ProgressBar value={this.state.progress} radius="circular" />
								</React.Fragment>
							) : null}
						</div>
					</React.Fragment>
				) : null}
			</div>
		);

		return (
			<Modal
				assistiveText={{
					dialogLabelledBy: `${this.getId()}-label`,
				}}
				isOpen={this.props.isOpen}
				onRequestClose={this.props.onRequestClose}
				size="small"
				id={`${this.getId()}-modal`}
			>
				<div
					className={classNames(
						'slds-welcome-mat',
						{
							'slds-welcome-mat_info-only': this.props.variant === 'info-only',
						},
						this.props.children ? null : 'slds-welcome-mat_splash'
					)}
					id={this.getId()}
				>
					<div className="slds-welcome-mat__content slds-grid">
						{this.props.children ? (
							<React.Fragment>
								<div className="slds-welcome-mat__info slds-size_1-of-2">
									{splash}
								</div>
								<div
									className={classNames(
										'slds-welcome-mat__tiles',
										'slds-size_1-of-2',
										this.props.variant === 'info-only'
											? 'slds-welcome-mat__tiles_info-only'
											: null
									)}
								>
									{React.Children.map(this.props.children, (child) =>
										React.cloneElement(child, {
											variant: this.props.variant,
										})
									)}
								</div>
							</React.Fragment>
						) : (
							<div className="slds-welcome-mat__info slds-size_1-of-1">
								{splash}
							</div>
						)}
					</div>
				</div>
			</Modal>
		);
	}
}

WelcomeMat.displayName = displayName;
WelcomeMat.propTypes = propTypes;
WelcomeMat.defaultProps = defaultProps;

export default WelcomeMat;
