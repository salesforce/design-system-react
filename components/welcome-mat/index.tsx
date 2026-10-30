/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useEffect,
	useId,
	useMemo,
	type ReactNode,
	type ReactElement,
} from 'react';
import classNames from 'classnames';
import Modal, {
	type ModalRequestCloseData,
	type ModalRequestCloseEvent,
	type ModalRequestCloseTrigger,
} from '../modal';
import ProgressBar from '../progress-bar';
import type { WelcomeMatTileInjectedProps, WelcomeMatTileProps } from './tile';
import type { WelcomeMatInfoBadgeProps } from './info-badge';
import type { ChildrenOf } from '../../types/common';
import { WELCOME_MAT } from '../../utilities/constants';
import checkProps from './check-props';
import componentDoc from './component.json';

/**
 * Welcome mat variant types
 */
export type WelcomeMatVariant =
	'steps' | 'info-only' | 'splash' | 'trailhead-connected';

/**
 * Labels for WelcomeMat
 */
export interface WelcomeMatLabels {
	/** Title text */
	title?: string;
	/** Description text */
	description?: string;
	/** Text after units completed number */
	unitsCompletedAfter?: string;
}

/**
 * What caused a WelcomeMat close request (same as the underlying Modal's)
 */
export type WelcomeMatRequestCloseTrigger = ModalRequestCloseTrigger;

/**
 * Data passed to `onRequestClose` (forwarded from the underlying Modal)
 */
export type WelcomeMatRequestCloseData = ModalRequestCloseData;

/**
 * Event passed to `onRequestClose` (forwarded from the underlying Modal)
 */
export type WelcomeMatRequestCloseEvent = ModalRequestCloseEvent;

interface WelcomeMatBaseProps {
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** HTML id */
	id?: string;
	/** Whether modal is open */
	isOpen?: boolean;
	/** Text labels */
	labels?: WelcomeMatLabels;
	/**
	 * Close request handler, forwarded from the underlying Modal. Receives the triggering
	 * click or keydown event and `data.trigger`: `'close-button'`, `'escape'`, or `'click-outside'`.
	 */
	onRequestClose?: (
		event: WelcomeMatRequestCloseEvent,
		data: WelcomeMatRequestCloseData
	) => void;
}

/**
 * `variant` decides what the info panel shows. `steps` and
 * `trailhead-connected` show progress through `WelcomeMatTile` children;
 * `info-only` and `splash` show actions instead.
 */
export type WelcomeMatVariantProps =
	| {
			/** Tiles with a progress bar */
			variant?: 'steps';
			/** `WelcomeMatTile` elements. Progress counts the tiles and their `isComplete`. */
			children: ChildrenOf<WelcomeMatTileProps>;
			doNotShowAgainCheckbox?: never;
			infoBadge?: never;
			infoActions?: never;
			onRenderInfoActions?: never;
	  }
	| {
			/** Tiles with Trailhead progress and an info badge */
			variant: 'trailhead-connected';
			/** `WelcomeMatTile` elements. Progress counts the tiles and their `isComplete`. */
			children: ChildrenOf<WelcomeMatTileProps>;
			doNotShowAgainCheckbox?: never;
			/** `WelcomeMatInfoBadge` shown above the progress. The WelcomeMat sets its `isComplete` from the tiles. */
			infoBadge?: ReactElement<WelcomeMatInfoBadgeProps>;
			infoActions?: never;
			onRenderInfoActions?: never;
	  }
	| {
			/** Tiles with actions instead of progress */
			variant: 'info-only';
			/** `WelcomeMatTile` elements. Progress counts the tiles and their `isComplete`. */
			children: ChildrenOf<WelcomeMatTileProps>;
			/** Do not show again checkbox element */
			doNotShowAgainCheckbox?: ReactNode;
			infoBadge?: never;
			/** Actions shown below the description */
			infoActions?: ReactNode;
			/** @deprecated Use `infoActions` instead. */
			onRenderInfoActions?: () => ReactNode;
	  }
	| {
			/** Info panel only, with actions and no tiles */
			variant: 'splash';
			children?: never;
			/** Do not show again checkbox element */
			doNotShowAgainCheckbox?: ReactNode;
			infoBadge?: never;
			/** Actions shown below the description */
			infoActions?: ReactNode;
			/** @deprecated Use `infoActions` instead. */
			onRenderInfoActions?: () => ReactNode;
	  };

/**
 * Props for the WelcomeMat component
 */
export type WelcomeMatProps = WelcomeMatBaseProps & WelcomeMatVariantProps;

const defaultLabels: WelcomeMatLabels = {
	unitsCompletedAfter: 'units completed',
};

/**
 * A Welcome Mat provides a series of unordered items a user can click to learn about a thematic topic.
 */
const WelcomeMat = ({
	children,
	className,
	doNotShowAgainCheckbox,
	id: propId,
	infoActions,
	infoBadge,
	isOpen = true,
	labels: propLabels,
	onRequestClose,
	onRenderInfoActions,
	variant = 'steps',
}: WelcomeMatProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	const labels = { ...defaultLabels, ...propLabels };

	useEffect(() => {
		checkProps(WELCOME_MAT, { onRenderInfoActions }, componentDoc);
	}, [onRenderInfoActions]);

	// Calculate progress from children
	const { totalSteps, completedSteps, progress } = useMemo(() => {
		const tiles = React.Children.toArray(children).filter((c) =>
			React.isValidElement<WelcomeMatTileProps>(c)
		) as ReactElement<WelcomeMatTileProps>[];
		const total = tiles.length;
		const completed = tiles.filter((tile) => tile.props.isComplete).length;
		return {
			totalSteps: total,
			completedSteps: completed,
			progress: total > 0 ? (completed / total) * 100 : 0,
		};
	}, [children]);

	const splash = (
		<div
			className={classNames(
				'slds-welcome-mat__info-content',
				className as string
			)}
			id={`${id}-content`}
		>
			<h2 className="slds-welcome-mat__info-title" id={`${id}-label`}>
				{labels.title}
			</h2>
			<div className="slds-welcome-mat__info-description slds-text-longform">
				<p>{labels.description}</p>
			</div>
			{(variant === 'info-only' || variant === 'splash') && (
				<div className="slds-welcome-mat__info-actions">
					{infoActions ?? onRenderInfoActions?.()}
					{doNotShowAgainCheckbox && (
						<div className="slds-m-top_large">{doNotShowAgainCheckbox}</div>
					)}
				</div>
			)}
			{(variant === 'steps' || variant === 'trailhead-connected') &&
				children && (
					<div
						className={classNames('slds-welcome-mat__info-progress', {
							'slds-welcome-mat__info-progress_complete':
								completedSteps === totalSteps,
						})}
					>
						{variant === 'trailhead-connected' &&
							React.isValidElement<WelcomeMatInfoBadgeProps>(infoBadge) &&
							React.cloneElement(infoBadge, {
								isComplete: completedSteps === totalSteps || undefined,
							})}
						{(completedSteps !== totalSteps ||
							variant !== 'trailhead-connected') && (
							<>
								{variant === 'trailhead-connected' ? (
									<p>
										{completedSteps}/{totalSteps} {labels.unitsCompletedAfter}
									</p>
								) : (
									<p>
										<strong>
											{completedSteps}/{totalSteps} {labels.unitsCompletedAfter}
										</strong>
									</p>
								)}
								<ProgressBar value={progress} radius="circular" />
							</>
						)}
					</div>
				)}
		</div>
	);

	return (
		<Modal
			assistiveText={{
				dialogLabelledBy: `${id}-label`,
			}}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			size="small"
			id={`${id}-modal`}
		>
			<div
				className={classNames('slds-welcome-mat', {
					'slds-welcome-mat_info-only': variant === 'info-only',
					'slds-welcome-mat_splash': !children,
				})}
				id={id}
			>
				<div className="slds-welcome-mat__content slds-grid">
					{children ? (
						<>
							<div className="slds-welcome-mat__info slds-size_1-of-2">
								{splash}
							</div>
							<div
								className={classNames(
									'slds-welcome-mat__tiles',
									'slds-size_1-of-2',
									{
										'slds-welcome-mat__tiles_info-only':
											variant === 'info-only',
									}
								)}
							>
								{React.Children.map(children, (child) =>
									React.isValidElement(child)
										? React.cloneElement<
												WelcomeMatTileProps & WelcomeMatTileInjectedProps
											>(child as ReactElement<WelcomeMatTileProps>, { variant })
										: child
								)}
							</div>
						</>
					) : (
						<div className="slds-welcome-mat__info slds-size_1-of-1">
							{splash}
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
};

WelcomeMat.displayName = WELCOME_MAT;

export default WelcomeMat;
