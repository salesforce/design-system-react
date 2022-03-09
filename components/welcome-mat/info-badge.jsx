/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Welcome Mat InfoBadge design pattern](https://lightningdesignsystem.com/components/welcome-mat/) in React.
// Based on SLDS v2.4.0
import React from 'react';
import PropTypes from 'prop-types';
// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import Icon from '../icon';

import { WELCOME_MAT_BADGE } from '../../utilities/constants';

const displayName = WELCOME_MAT_BADGE;

const propTypes = {
	/**
	 *  **Assistive text for accessibility.**
	 * * `completed` : For users of assistive technology, assistive text for completed icon.
	 */
	assistiveText: PropTypes.shape({
		completed: PropTypes.string,
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
	 * HTML id for component.
	 */
	id: PropTypes.string,
	/**
	 * Icon for the tile
	 */
	image: PropTypes.string,
	/**
	 * Whether the trail is completed
	 */
	isComplete: PropTypes.bool,
	/**
	 * Actions to be rendered on completion of the trail
	 */
	onCompleteRenderActions: PropTypes.func,
};

const defaultProps = {
	isComplete: false,
	variant: 'steps',
};

/**
 * InfoBadge component item represents a tile in a Welcome Mat
 */
class InfoBadge extends React.Component {
	constructor(props) {
		super(props);

		this.generatedId = shortid.generate();
	}

	/**
	 * Get the Welcome Mat Info Badge's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	getCompletedText() {
		return this.props.assistiveText && this.props.assistiveText.completed
			? this.props.assistiveText.completed
			: 'Completed';
	}

	render() {
		return (
			<div id={this.getId()} className={this.props.className}>
				<div className="slds-welcome-mat__info-badge-container">
					<img
						className="slds-welcome-mat__info-badge"
						src={this.props.image}
						width="50"
						height="50"
						alt=""
					/>
					<Icon
						category="action"
						name="check"
						assistiveText={{ label: this.getCompletedText() }}
					/>
				</div>
				{this.props.children}
				{this.props.isComplete ? this.props.onCompleteRenderActions() : null}
			</div>
		);
	}
}

InfoBadge.displayName = displayName;
InfoBadge.propTypes = propTypes;
InfoBadge.defaultProps = defaultProps;

export default InfoBadge;
