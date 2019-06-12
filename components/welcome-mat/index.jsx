/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Welcome Mat design pattern](https://lightningdesignsystem.com/components/welcome-mat/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Modal from '~/components/modal';
import ProgressBar from '~/components/progress-bar';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
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
	 * Title for the Welcome Mat
	 */
	title: PropTypes.string,
	/**
	 * Description for the Welcome Mat
	 */
	description: PropTypes.string,
	/**
	 * Whether the Welcome Mat has steps
	 */
	isInfoOnly: PropTypes.bool,
	/**
	 * Link to learn more button
	 */
	learnMoreURL: PropTypes.string,
};

const defaultProps = {
	isInfoOnly: false,
};

/**
 * A Welcome Mat provides a series of unordered items a user can click to learn about a thematic topic.
 */
class WelcomeMat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			completedSteps: 0,
			totalSteps: 0,
			progress: 0,
		};
	}

	componentWillMount() {
		this.generatedId = shortid.generate();
		this.getCount();
	}

	/**
	 * Get the File's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	getCount() {
		const totalSteps = React.Children.count(this.props.children);
		const completedSteps = React.Children.toArray(this.props.children).filter(
			(c) => c.props.isComplete
		).length;
		const progress = completedSteps / totalSteps * 100;
		this.setState({
			totalSteps,
			completedSteps,
			progress,
		});
	}

	render() {
		const splash = (
			<div
				className="slds-welcome-mat__info-content"
				id={`${this.getId}-content`}
			>
				<h2 className="slds-welcome-mat__info-title" id={`${this.getId}-label`}>
					{this.props.title}
				</h2>
				<div className="slds-welcome-mat__info-description slds-text-longform">
					<p>{this.props.description}</p>
				</div>
				{this.props.learnMoreURL ? (
					<div className="slds-welcome-mat__info-actions">
						<a
							href={this.props.learnMoreURL}
							className="slds-button slds-button_brand"
						>
							Learn More
						</a>
					</div>
				) : null}
				{!this.props.isInfoOnly && this.props.children ? (
					<React.Fragment>
						<div className="slds-welcome-mat__info-progress">
							<p>
								<strong>
									{this.state.completedSteps}/{this.state.totalSteps} units
									completed
								</strong>
							</p>
						</div>
						<ProgressBar value={this.state.progress} radius="circular" />
					</React.Fragment>
				) : null}
			</div>
		);

		return (
			<Modal isOpen>
				<div
					className={classNames(
						'slds-welcome-mat',
						this.props.children ? null : 'slds-welcome-mat_splash'
					)}
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
										this.props.isInfoOnly
											? 'slds-welcome-mat__tiles_info-only'
											: null
									)}
								>
									{React.Children.map(this.props.children, (child) =>
										React.cloneElement(child, {
											isInfoOnly: this.props.isInfoOnly,
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
