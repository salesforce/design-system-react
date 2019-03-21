/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Progress Bar design pattern](https://lightningdesignsystem.com/components/progress-ring/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
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
	label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
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
	componentWillMount() {
		this.generatedId = shortid.generate();
	}

	/**
	 * ID as a string
	 * @returns {string} id
	 */
	getId() {
		return this.props.id || this.generatedId;
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
						<strong>{this.props.value}% Complete</strong>
					</span>
				</div>
			);
		}
		return '';
	}

	render() {
		return (
			<div id={this.getId()}>
				{this.getDescription()}
				<div
					className={classNames(
						'slds-progress-bar',
						`slds-progress-bar_${this.props.radius}`,
						`slds-progress-bar_${this.props.thickness}`,
						this.props.className,
					)}
					style={{
						width: `${this.props.value}%`,
					}}
				>
					<span
						className={classNames(
							`slds-progress-bar__value`,
							`slds-progress-bar__value_${this.props.color}`,
						)}
					>
						<span className="slds-assistive-text">
							Progress: {`${this.props.value}%`}
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
