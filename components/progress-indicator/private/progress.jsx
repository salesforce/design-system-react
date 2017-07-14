/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
import classNames from 'classnames';

import { PROGRESS_INDICATOR_PROGRESS } from '../../../utilities/constants';

/**
 * ProgressBar renders the blue/gray progress bar and dynamically updates its completion percentage
 */
const ProgressBar = React.createClass({
	propTypes: {
		/**
		 * percentage of progress completion, with range of [0, 100]
		 */
		value: PropTypes.string.isRequired
	},

	render () {
		return (<div className="slds-progress-bar slds-progress-bar_x-small" aria-valuemin="0" aria-valuemax="100" aria-valuenow={this.props.value} role="progressbar" tabIndex={0}>
			<span className="slds-progress-bar__value" style={{ width: this.props.value + '%' }}>
				<span className="slds-assistive-text">Progress: {this.props.value}%</span>
			</span>
		</div>);
	}
});

/**
 * Progress renders all step buttons and a container wrapping these buttongs and a progress bar
 */
const Progress = React.createClass({
	// ### Display Name
	displayName: PROGRESS_INDICATOR_PROGRESS,

	// ### Prop Types
	propTypes: {
		/**
		 * HTML id for component.
		 */
		id: PropTypes.string.isRequired,
		/**
		 * CSS class names to be added to the container element.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * percentage of progress completion, ranging [0, 100]
		 */
		value: PropTypes.string.isRequired,
		/**
		 * Determines component style
		 */
		variant: PropTypes.oneOf(['basic', 'modal'])
	},

	/**
	 * Get the progress's HTML id. Generate a new one if no ID present.
	 */
	getId () {
		return this.props.id;
	},

	render () {
		return (
			<div
				id={this.getId()}
				className={classNames('slds-progress', { 'slds-progress_shade': this.props.variant === 'modal' }, this.props.className)}
				role="progressbar"
			>
				<ol className="slds-progress__list">
					{ this.props.children }
				</ol>
				<ProgressBar value={this.props.value} />
			</div>
		);
	}
});
export default Progress;
