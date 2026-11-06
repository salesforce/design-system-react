/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Welcome Mat InfoBadge design pattern](https://lightningdesignsystem.com/components/welcome-mat/) in React.
// Based on SLDS v2.4.0
import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import Icon from '../icon';

import { WELCOME_MAT_BADGE } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';
import checkProps from './check-props';
import componentDoc from './component.json';

const displayName = WELCOME_MAT_BADGE;

// SLDS 2 only sizes and positions the complete check inside a tile, so the
// badge's check needs the geometry SLDS 1 applied to every welcome mat check.
// Visibility still comes from `.slds-welcome-mat__info-progress_complete`.
const completeCheckStyle: React.CSSProperties = {
	position: 'absolute',
	height: '1.25rem',
	width: '1.25rem',
	padding: '0.25rem',
	borderRadius: '1.25rem',
	lineHeight: 0,
	background: 'var(--slds-g-color-success-1, #3ba755)',
};

export interface WelcomeMatInfoBadgeProps {
	/**
	 *  **Assistive text for accessibility.**
	 * * `completed` : For users of assistive technology, assistive text for completed icon.
	 * * `image` : Alt text for the badge `image`. Defaults to `''` (decorative).
	 */
	assistiveText?: {
		completed?: string;
		image?: string;
	};
	/**
	 * Content rendered inside the badge container.
	 */
	children?: ReactNode;
	/**
	 * Actions shown when the trail is complete (`isComplete` is true)
	 */
	completeActions?: ReactNode;
	/**
	 * CSS class names to be added to the root element.
	 */
	className?: string | string[] | Record<string, boolean>;
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
	/** @deprecated Use `completeActions` instead. */
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

	componentDidMount() {
		checkProps(WELCOME_MAT_BADGE, this.props, componentDoc);
	}

	componentDidUpdate() {
		checkProps(WELCOME_MAT_BADGE, this.props, componentDoc);
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
			<div
				id={this.getId()}
				className={classNames(this.props.className as string) || undefined}
			>
				<div className="slds-welcome-mat__info-badge-container">
					<img
						className="slds-welcome-mat__info-badge"
						src={this.props.image}
						width="50"
						height="50"
						alt={this.props.assistiveText?.image ?? ''}
					/>
					{this.props.isComplete ? (
						<Icon
							category="action"
							name="check"
							assistiveText={{ label: this.getCompletedText() }}
							containerStyle={completeCheckStyle}
							size="xx-small"
						/>
					) : null}
				</div>
				{this.props.children}
				{this.props.isComplete
					? (this.props.completeActions ??
						this.props.onCompleteRenderActions?.())
					: null}
			</div>
		);
	}
}

export default InfoBadge;
