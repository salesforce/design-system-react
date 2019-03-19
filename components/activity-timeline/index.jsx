/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Activity Timeline Component

// Implements the [Activity Timeline design pattern](https://lightningdesignsystem.com/components/activity-timeline/) in React.

import React from 'react';
import { ACTIVITY_TIMELINE } from '../../utilities/constants';

/**
 * The activity timeline displays each of the user’s upcoming, current, and past activities.
 */

class ActivityTimeline extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isInitialRender: true,
		};
	}

	render() {

		return (
			<ul className="slds-timeline">
				{this.props.children}
			</ul>
		);
	}
}

ActivityTimeline.displayName = ACTIVITY_TIMELINE;

export default ActivityTimeline;
