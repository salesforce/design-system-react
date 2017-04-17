/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Scheduler

// Implements tje [Scheduler design pattern](https://www.lightningdesignsystem.com/components/schedulers) in React.
// Based on SLDS v2.3.0-rc.1

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ## Constants
import { SCHEDULER } from '../../utilities/constants';

/**
 * A scheduler is a grouping of a datepicker, a timepicker, a timezone picklist, and a reoccurrence interface that allows the user to create a reoccurring event.
 */
class Scheduler extends React.Component {
	static displayName = SCHEDULER;

	static propTypes = {
		/**
		 * **Assistive text for accessibility**
		 * * ``:
		 */
		assistiveText: PropTypes.shape({
		}),
		/**
			* Custom CSS classes for `slds-filters__item` node. Uses `classNames` [API](https://github.com/JedWatson/classnames).
			*/
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string]),
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. An `id` will be generated if none is supplied.
		 */
		id: PropTypes.string
	};

	static defaultProps = {
		assistiveText: {}
	};

	componentWillMount () {
		this.generatedId = shortid.generate();
	}

	getId = () => (this.props.id || this.generatedId);

	render () {
		return (
			<div
				className={classNames(
					'slds-scheduler',
					this.props.className
				)}
				id={this.getId()}
			>test</div>
		);
	}
}

export default Scheduler;
