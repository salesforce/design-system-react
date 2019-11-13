/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import assign from 'lodash.assign';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

import Button from '../button';
import ProgressRing from '../progress-ring';

import { ICON, SETUP_ASSISTANT_STEP } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `expandStep`: Button that examples a step
	 * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		expandStep: PropTypes.string,
	}),
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
	/**
	 * Index of the step within the step array
	 */
	index: PropTypes.number,
	/**
	 * Dictates whether the step can be expanded / collapsed
	 */
	isExpandable: PropTypes.bool,
	/**
	 * If `isExpandable` is true, this prop can be used to control the expanded state. If not provided state will be used instead
	 */
	isOpen: PropTypes.bool,
	/**
	 * Function that is called to render a step's available action(s). Typically returns a Button, Button of variant "link," or Checkbox of variant "toggle"
	 */
	onRenderAction: PropTypes.func,
	/**
	 * Function that is called to render step content. Typically returns a ProgressIndicator and/or ScopedNotification component
	 */
	onRenderContent: PropTypes.func,
	/**
	 * Function that is called to render content within the media figure. Expects to be returned an Icon or ProgressRing component
	 */
	onRenderFigure: PropTypes.func,
	/**
	 * Function to handle requests to expand / collapse the step
	 */
	onToggleIsOpen: PropTypes.func,
	/**
	 * Percentage of step completed. No progress indicator will be shown for the step unless this is provided
	 */
	progress: PropTypes.number,
	/**
	 * Display number for the step. Only appears if progress indicator is enabled. Determined automatically by parent if not provided.
	 */
	stepNumber: PropTypes.number,
};

const defaultProps = {
	assistiveText: { expandStep: 'Expand Step' },
};

/**
 * Setup Assistant Step component is used to specify individual items within the Setup Assistant
 * filled with learning and task links along with a recommended sequence that may have progress tracking
 */
class Step extends React.Component {
	constructor(props) {
		super(props);
		this.generatedId = shortid.generate();
		this.state = {
			isOpen: props.isOpen || false,
		};
		checkProps(SETUP_ASSISTANT_STEP, this.props, componentDoc);
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	getIsOpen() {
		return this.props.isOpen !== undefined
			? this.props.isOpen
			: this.state.isOpen;
	}

	toggleIsOpen = (event) => {
		if (this.props.onToggleIsOpen) {
			this.props.onToggleIsOpen(event, {
				index: this.props.index,
				isOpen: this.getIsOpen(),
				step: this.props,
			});
		} else {
			this.setState({ isOpen: !this.getIsOpen() });
		}
	};

	renderMediaContent() {
		return (
			<React.Fragment>
				<div className="slds-setup-assistant__step-summary-content slds-media__body">
					<h3 className="slds-setup-assistant__step-summary-title slds-text-heading_small">
						{this.props.isExpandable ? (
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
					{this.props.onRenderAction ? this.props.onRenderAction() : null}
					{this.props.estimatedTime ? (
						<p
							className={classNames(
								'slds-text-align_right',
								'slds-text-color_weak',
								{
									'slds-p-top_medium': this.props.onRenderAction !== undefined,
								}
							)}
						>
							{this.props.estimatedTime}
						</p>
					) : null}
				</div>
			</React.Fragment>
		);
	}

	renderSummary() {
		let figure;
		let progressRingTheme;

		if (this.props.progress > 0 && this.props.progress < 100) {
			progressRingTheme = 'active';
		} else if (this.props.progress === 100) {
			progressRingTheme = 'complete';
		}

		if (this.props.onRenderFigure) {
			figure = this.props.onRenderFigure();

			if (figure && figure.type && figure.type.displayName === ICON) {
				let containerStyle = {
					position: 'relative',
					top: this.props.isExpandable ? '5px' : '-3px',
				};

				if (figure.props.containerStyle) {
					containerStyle = {
						...containerStyle,
						...figure.props.containerStyle,
					};
				}

				figure = React.cloneElement(figure, {
					...figure.props,
					containerStyle,
					size: 'small',
				});
				figure = <div className="slds-media__figure">{figure}</div>;
			}
		} else if (this.props.progress !== undefined) {
			figure = (
				<div className="slds-media__figure">
					<ProgressRing
						hasIcon
						icon={this.props.progress === 100 ? null : this.props.stepNumber}
						flowDirection="fill"
						size="large"
						theme={progressRingTheme}
						value={this.props.progress}
					/>
				</div>
			);
		}

		return (
			<div className="slds-setup-assistant__step-summary">
				<div className="slds-media">
					{figure}
					{this.props.isExpandable || this.props.progress !== undefined ? (
						<div className="slds-media__body slds-m-top_x-small">
							<div className="slds-media">{this.renderMediaContent()}</div>
						</div>
					) : (
						this.renderMediaContent()
					)}
				</div>
			</div>
		);
	}

	render() {
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);
		return (
			<li
				className={classNames(
					'slds-setup-assistant__item',
					this.props.className
				)}
				id={this.getId()}
			>
				<article className="slds-setup-assistant__step">
					{this.props.isExpandable ? (
						<div
							className={classNames('slds-summary-detail', {
								'slds-is-open': this.getIsOpen(),
							})}
						>
							<Button
								assistiveText={{ icon: assistiveText.expandStep }}
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
									{this.renderSummary()}
								</div>
								<div
									className="slds-summary-detail__content"
									id={`${this.getId()}-detail-content`}
								>
									<div className="slds-setup-assistant__step-detail">
										{this.props.onRenderContent
											? this.props.onRenderContent()
											: null}
									</div>
								</div>
							</div>
						</div>
					) : (
						this.renderSummary()
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
