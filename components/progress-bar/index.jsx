/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Progress Bar design pattern](https://lightningdesignsystem.com/components/progress-ring/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PROGRESS_BAR } from '../../utilities/constants';

const propTypes = {
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * CSS classes to be added to tag with `.slds-progress-bar`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Label for the progress bar
	 */
	label: PropTypes.string,
	/**
	 *  Set radius of progress bar
	 */
	radius: PropTypes.oneOf(['circular']),
	/**
	 *  Set fill of progress bar
	 */
	color: PropTypes.oneOf(['success']),
	/**
	 *  Set progress bar thickness
	 */
	thickness: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
	 * Percentage of progress completion, ranging [0, 100].
	 */
	value: PropTypes.number.isRequired,
};

const defaultProps = {};

/**
 * A progress bar component communicates to the user the progress of a particular process
 */
class ProgressBar extends React.Component {
	/**
	 * ID as a string
	 * @returns {string} id
	 */
	getId() {
		return this.props.id;
	}

	/**
	 * Border Radius as String
	 * @returns {string} Border
	 */
	getBorder() {
		if (this.props.radius) {
			return `slds-progress-bar_${this.props.radius}`;
		}
		return '';
	}

	/**
	 * Fill color as a string
	 * @returns {string} Color
	 */
	getColor() {
		if (this.props.color) {
			return `slds-progress-bar__value_${this.props.color}`;
		}
		return '';
	}

	/**
	 * Bar thickness as a string
	 * @returns {string} Thickness
	 */
	getThickness() {
		if (this.props.thickness) {
			return `slds-progress-bar_${this.props.thickness}`;
		}
		return 'slds-progress-bar_medium';
	}

	/**
	 * Enables Descriptive Progress Bar if label is provided
	 * @returns {string} description
	 */
	getDescription() {
		if (this.props.label) {
			return (
				<div
					className="slds-grid slds-grid_align-spread slds-p-bottom_x-small"
					id="progress-bar-label-id-4"
				>
					<span>{this.props.label}</span>
					<span aria-hidden="true">
						<strong>{this.progressPercent()} Complete</strong>
					</span>
				</div>
			);
		}
		return '';
	}

	/**
	 * Progress percentage as a string
	 * @returns {string} Percentage
	 */
	progressPercent() {
		return `${this.props.value}%`;
	}

	render() {
		return (
			<div id={this.getId()}>
				{this.getDescription()}
				<div
					className={classNames(
						'slds-progress-bar',
						this.getBorder(),
						this.getThickness(),
						this.props.className
					)}
					style={{
						width: this.progressPercent(),
					}}
				>
					<span
						className={classNames('slds-progress-bar__value', this.getColor())}
					>
						<span className="slds-assistive-text">
							Progress: {this.progressPercent()}
						</span>
					</span>
				</div>
			</div>
		);
	}
}

ProgressBar.displayName = PROGRESS_BAR;
ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
