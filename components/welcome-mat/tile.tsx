/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Welcome Mat Tile design pattern](https://lightningdesignsystem.com/components/welcome-mat/) in React.
// Based on SLDS v2.4.0
import React, { type ReactNode } from 'react';
import classNames from 'classnames';

import Icon from '../icon';

import { WELCOME_MAT_TILE } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';

const displayName = WELCOME_MAT_TILE;

export type WelcomeMatTileVariant =
	| 'steps'
	| 'info-only'
	| 'splash'
	| 'trailhead-connected';

export interface WelcomeMatTileProps {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `completedIcon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the complete icon means.
	 */
	assistiveText?: {
		completedIcon?: string;
	};
	/**
	 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Description for the tile component.
	 */
	description?: string;
	/**
	 * Href for the tile link
	 */
	href?: string;
	/**
	 * Icon for the tile
	 */
	icon?: ReactNode;
	/**
	 * HTML id for component.
	 */
	id?: string;
	/**
	 * Whether the tile is completed
	 */
	isComplete?: boolean;
	/**
	 * Title for the tile component.
	 */
	title?: string;
	/**
	 * Variant of the Welcome Mat Tile
	 */
	variant?: WelcomeMatTileVariant;
}

const defaultProps: Partial<WelcomeMatTileProps> = {
	assistiveText: {
		completedIcon: 'Completed',
	},
	isComplete: false,
	variant: 'steps',
};

/**
 * Tile component item represents a tile in a Welcome Mat
 */
class Tile extends React.Component<WelcomeMatTileProps> {
	static displayName = displayName;

	static defaultProps = defaultProps;

	generatedId: string;

	constructor(props: WelcomeMatTileProps) {
		super(props);

		this.generatedId = generateId();
	}

	/**
	 * Get the Welcome Mat Tile's HTML id. Generate a new one if no ID present.
	 */
	getId() {
		return this.props.id || this.generatedId;
	}

	render() {
		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};
		const body = (
			<React.Fragment>
				<div
					className={classNames(
						'slds-media__figure',
						'slds-media__figure_fixed-width',
						'slds-align_absolute-center'
					)}
				>
					<div className="slds-welcome-mat__tile-figure">
						<div className="slds-welcome-mat__tile-icon-container">
							{this.props.icon}
							{this.props.isComplete && this.props.variant !== 'info-only' ? (
								<Icon
									assistiveText={{
										label: assistiveText.completedIcon,
									}}
									category="action"
									name="check"
									title={assistiveText.completedIcon}
								/>
							) : null}
						</div>
					</div>
				</div>
				<div className="slds-media__body">
					<div className="slds-welcome-mat__tile-body">
						<h3 className="slds-welcome-mat__tile-title">{this.props.title}</h3>
						<p className="slds-welcome-mat__tile-description">
							{this.props.description}
						</p>
					</div>
				</div>
			</React.Fragment>
		);

		return (
			<div
				id={this.getId()}
				className={classNames(
					'slds-welcome-mat__tile',
					this.props.variant === 'info-only'
						? 'slds-welcome-mat__tile_info-only'
						: null,
					this.props.isComplete && this.props.variant !== 'info-only'
						? 'slds-welcome-mat__tile_complete'
						: null,
					this.props.className as string
				)}
			>
				{this.props.variant === 'info-only' ? (
					<div className="slds-media">{body}</div>
				) : (
					<a
						href={this.props.href}
						className="slds-box slds-box_link slds-media"
					>
						{body}
					</a>
				)}
			</div>
		);
	}
}

export default Tile;
