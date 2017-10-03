/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import { shape } from 'airbnb-prop-types';

import ProgressBar from './progress-bar';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
import classNames from 'classnames';

import { PROGRESS_INDICATOR_PROGRESS } from '../../../utilities/constants';

// ### Prop Types
const propTypes = {
	/**
	 * Assistive text for percentage
	 */
	assistiveText: shape({
		percentage: PropTypes.string
	}),
	/**
	 * Steps in the component
	 */
	children: PropTypes.node,
	/**
	 * CSS class names to be added to the container element.
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/**
	 * HTML id for component.
	 */
	id: PropTypes.string.isRequired,
	/**
	 * Percentage of progress completion, ranging [0, 100]
	 */
	value: PropTypes.string.isRequired,
	/**
	 * Determines component style
	 */
	variant: PropTypes.oneOf(['base', 'modal'])
};

/**
 * Progress renders all step buttons and a container wrapping these buttongs and a progress bar
 */
class Progress extends React.Component {
	/**
	 * Get the progress's HTML id. Generate a new one if no ID present.
	 */
	getId () {
		return this.props.id;
	}

	render () {
		return (
			<div
				id={this.getId()}
				className={classNames('slds-progress', { 'slds-progress_shade': this.props.variant === 'modal' }, this.props.className)}
			>
				<ol className="slds-progress__list">
					{ this.props.children }
				</ol>
				<ProgressBar value={this.props.value} assistiveText={this.props.assistiveText} />
			</div>
		);
	}
}

Progress.propTypes = propTypes;
Progress.displayName = PROGRESS_INDICATOR_PROGRESS;

export default Progress;
