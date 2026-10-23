/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useId,
	useMemo,
	type ReactNode,
	type ReactElement,
} from 'react';
import classNames from 'classnames';
import Modal from '../modal';
import ProgressBar from '../progress-bar';
import { WELCOME_MAT } from '../../utilities/constants';

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

interface WelcomeMatBaseProps {
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** HTML id */
	id?: string;
	/** Whether modal is open */
	isOpen?: boolean;
	/** Text labels */
	labels?: WelcomeMatLabels;
	/** Close request handler */
	onRequestClose?: () => void;
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
			/** WelcomeMatTile children */
			children: ReactNode;
			doNotShowAgainCheckbox?: never;
			infoBadge?: never;
			onRenderInfoActions?: never;
	  }
	| {
			/** Tiles with Trailhead progress and an info badge */
			variant: 'trailhead-connected';
			/** WelcomeMatTile children */
			children: ReactNode;
			doNotShowAgainCheckbox?: never;
			/** WelcomeMatInfoBadge shown above the progress */
			infoBadge?: ReactNode;
			onRenderInfoActions?: never;
	  }
	| {
			/** Tiles with actions instead of progress */
			variant: 'info-only';
			/** WelcomeMatTile children */
			children: ReactNode;
			/** Do not show again checkbox element */
			doNotShowAgainCheckbox?: ReactNode;
			infoBadge?: never;
			/** Render function for info actions */
			onRenderInfoActions?: () => ReactNode;
	  }
	| {
			/** Info panel only, with actions and no tiles */
			variant: 'splash';
			children?: never;
			/** Do not show again checkbox element */
			doNotShowAgainCheckbox?: ReactNode;
			infoBadge?: never;
			/** Render function for info actions */
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

	// Calculate progress from children
	const { totalSteps, completedSteps, progress } = useMemo(() => {
		const total = React.Children.count(children);
		const completed = React.Children.toArray(children).filter(
			(c) =>
				React.isValidElement(c) &&
				(c.props as { isComplete?: boolean }).isComplete
		).length;
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
					{onRenderInfoActions?.()}
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
							React.Children.map(infoBadge, (child) =>
								React.isValidElement(child)
									? React.cloneElement(
											child as ReactElement<{ isComplete?: boolean }>,
											{
												isComplete: completedSteps === totalSteps || undefined,
											}
										)
									: child
							)}
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
										? React.cloneElement(
												child as ReactElement<{ variant?: WelcomeMatVariant }>,
												{
													variant,
												}
											)
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
