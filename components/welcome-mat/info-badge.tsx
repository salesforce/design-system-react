/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Welcome Mat InfoBadge design pattern](https://lightningdesignsystem.com/components/welcome-mat/) in React.
// Based on SLDS v2.4.0
import React, { type ReactNode } from 'react';
import Icon from '../icon';

import { WELCOME_MAT_BADGE } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';

const displayName = WELCOME_MAT_BADGE;

export interface WelcomeMatInfoBadgeProps {
	/**
	 *  **Assistive text for accessibility.**
	 * * `completed` : For users of assistive technology, assistive text for completed icon.
	 */
	assistiveText?: {
		completed?: string;
	};
	/**
	 * Content rendered inside the badge container.
	 */
	children?: ReactNode;
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * HTML id for component.
	 */
	id?: string;
	/**
	 * Icon for the tile
	 */
	image?: string;
	/**
	 * Whether the trail is completed
	 */
	isComplete?: boolean;
	/**
	 * Actions to be rendered on completion of the trail
	 */
	onCompleteRenderActions?: () => ReactNode;
}

const defaultProps: Partial<WelcomeMatInfoBadgeProps> = {
	isComplete: false,
};

/**
 * InfoBadge component item represents a tile in a Welcome Mat
 */
class InfoBadge extends React.Component<WelcomeMatInfoBadgeProps> {
	static displayName = displayName;

	static defaultProps = defaultProps;

	generatedId: string;

	constructor(props: WelcomeMatInfoBadgeProps) {
		super(props);

		this.generatedId = generateId();
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
			<div id={this.getId()} className={this.props.className as string}>
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
				{this.props.isComplete
					? this.props.onCompleteRenderActions?.()
					: null}
			</div>
		);
	}
}

export default InfoBadge;
