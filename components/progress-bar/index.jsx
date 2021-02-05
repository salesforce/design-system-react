/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Progress Bar design pattern](https://lightningdesignsystem.com/components/progress-ring/) in React.
// Based on SLDS v2.4.5
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import assign from 'lodash.assign';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';
import { PROGRESS_BAR } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `progress`: This is a visually hidden label for the percent of progress.
	 * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({ progress: PropTypes.string }),
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
	labels: PropTypes.shape({
		label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		complete: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	}),
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
	/**
	 * Orientation of the progress bar to be used
	 */
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
	/**
	 * Custom styles to be passed to the component
	 */
	style: PropTypes.object,
};

const defaultProps = {
	assistiveText: {
		progress: 'Progress',
	},
	labels: {
		complete: 'Complete',
	},
	orientation: 'horizontal',
	style: {
		height: '100%',
	},
};

/**
 * A progress bar component communicates to the user the progress of a particular process
 */
class ProgressBar extends React.Component {
	constructor(props) {
		super(props);

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
	getDescription({ labels }) {
		if (labels.label) {
			return (
				<div
					className="slds-grid slds-grid_align-spread slds-p-bottom_x-small"
					id={`progress-bar-label-${this.getId()}`}
				>
					<span>{labels.label}</span>
					<span>
						<strong>
							{this.props.value}
							{'% '}
							{labels.complete}
						</strong>
					</span>
				</div>
			);
		}
		return '';
	}

	render() {
		const labels = assign({}, defaultProps.labels, this.props.labels);
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);
		const style = assign({}, defaultProps.style, this.props.style);
		return (
			<div id={this.getId()} style={style}>
				{this.props.orientation === 'horizontal' &&
					this.getDescription({ labels })}
				<div
					aria-labelledby={
						this.props.orientation === 'horizontal' && labels.label
							? `progress-bar-label-${this.getId()}`
							: undefined
					}
					aria-valuemin="0"
					aria-valuemax="100"
					aria-valuenow={this.props.value}
					aria-valuetext={`${assistiveText.progress}: ${this.props.value}%`}
					role="progressbar"
					className={classNames(
						'slds-progress-bar',
						this.props.radius ? `slds-progress-bar_${this.props.radius}` : null,
						this.props.thickness
							? `slds-progress-bar_${this.props.thickness}`
							: null,
						this.props.className,
						{
							'slds-progress-bar_vertical':
								this.props.orientation === 'vertical',
						}
					)}
				>
					<span
						className={classNames(
							`slds-progress-bar__value`,
							this.props.color
								? `slds-progress-bar__value_${this.props.color}`
								: null
						)}
						style={
							this.props.orientation === 'vertical'
								? {
										height: `${this.props.value}%`,
								  }
								: {
										width: `${this.props.value}%`,
								  }
						}
					>
						<span className="slds-assistive-text">
							{`${assistiveText.progress}: `}
							{`${this.props.value}%`}
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
