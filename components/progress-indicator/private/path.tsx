/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import classNames from 'classnames';

import UtilityIcon from '../../utilities/utility-icon';
import { useRovingTabIndex } from '../../../utilities/hooks';
import { PROGRESS_INDICATOR_PATH } from '../../../utilities/constants';
import {
	type ProgressIndicatorAssistiveText,
	type ProgressIndicatorLabels,
	type ProgressStep,
	type StepEventData,
} from '../index';

export interface PathStepState {
	isCompleted: boolean;
	isSelected: boolean;
	step: ProgressStep;
}

export interface PathProps {
	/**
	 * Assistive text for each stage's status
	 */
	assistiveText: ProgressIndicatorAssistiveText;
	/**
	 * CSS class names to be added to the `slds-path` element.
	 */
	className?: string | string[] | Record<string, boolean>;
	/**
	 * Index of the stage that holds the tab stop before the user moves it
	 */
	defaultActiveIndex: number;
	/**
	 * HTML id for component.
	 */
	id: string;
	/**
	 * Visible text before the current stage's name
	 */
	labels: ProgressIndicatorLabels;
	/**
	 * Triggered when a stage is clicked
	 */
	onStepClick?: (
		event: React.MouseEvent | React.KeyboardEvent,
		data: StepEventData
	) => void;
	/**
	 * Triggered when a stage receives focus
	 */
	onStepFocus?: (event: React.FocusEvent, data: StepEventData) => void;
	/**
	 * Each stage and its status
	 */
	steps: PathStepState[];
}

/**
 * Path renders the steps as SLDS Path stages, like `lightning-progress-indicator` with `type="path"`.
 * The stages are a single tab stop; the arrow keys move between them.
 */
const Path = ({
	assistiveText,
	className,
	defaultActiveIndex,
	id,
	labels,
	onStepClick,
	onStepFocus,
	steps,
}: PathProps): React.ReactElement => {
	const { activeIndex, getItemProps } = useRovingTabIndex<HTMLAnchorElement>({
		count: steps.length,
		defaultIndex: defaultActiveIndex,
	});
	const stageNameId = `${id}-stage-name`;
	const currentStep = steps.find(({ isSelected }) => isSelected)?.step;

	return (
		<div id={id} className={classNames('slds-path', className)}>
			<div className="slds-grid slds-path__track">
				<div className="slds-grid slds-path__scroller-container">
					<div className="slds-path__scroller">
						<div className="slds-path__scroller_inner">
							<ul
								className="slds-path__nav"
								role="listbox"
								aria-orientation="horizontal"
								aria-labelledby={stageNameId}
							>
								{steps.map(({ isCompleted, isSelected, step }, index) => {
									const isComplete = isCompleted && !isSelected;
									const data: StepEventData = {
										isCompleted,
										isDisabled: false,
										isError: false,
										isSelected,
										step,
									};
									const itemProps = getItemProps(index);

									let stageAssistiveText = step.assistiveText;
									if (stageAssistiveText === undefined) {
										if (isSelected) {
											stageAssistiveText = assistiveText.currentStage;
										} else if (isComplete) {
											stageAssistiveText = assistiveText.completedStage;
										}
									}

									return (
										<li
											key={`${id}-${step.id}`}
											className={classNames('slds-path__item', {
												'slds-is-complete': isComplete,
												'slds-is-current': isSelected,
												'slds-is-incomplete': !isComplete && !isSelected,
												'slds-is-active': index === activeIndex,
											})}
											role="presentation"
										>
											{/* SLDS and lightning-progress-indicator render each stage as an `a[role=option]` */}
											{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
											<a
												{...itemProps}
												aria-selected={index === activeIndex}
												className="slds-path__link"
												href="#"
												id={`${id}-path-${step.id}`}
												onClick={(event) => {
													event.preventDefault();
													onStepClick?.(event, data);
												}}
												onFocus={(event) => {
													itemProps.onFocus();
													onStepFocus?.(event, data);
												}}
												role="option"
											>
												<span className="slds-path__stage">
													<UtilityIcon
														aria-hidden="true"
														category="utility"
														className="slds-icon slds-icon_x-small"
														name="check"
													/>
													{stageAssistiveText ? (
														<span className="slds-assistive-text">
															{stageAssistiveText}
														</span>
													) : null}
												</span>
												<span className="slds-path__title">{step.label}</span>
											</a>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
				<div className="slds-grid">
					<span id={stageNameId} className="slds-path__stage-name">
						{labels.stageNameBefore} {currentStep?.label}
					</span>
				</div>
			</div>
		</div>
	);
};

Path.displayName = PROGRESS_INDICATOR_PATH;

export default Path;
