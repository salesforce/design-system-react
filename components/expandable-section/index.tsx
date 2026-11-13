/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useId,
	useCallback,
	type ReactNode,
	type MouseEvent,
} from 'react';
import classNames from 'classnames';
import Button from '../button';
import { EXPANDABLE_SECTION } from '../../utilities/constants';
import { useControllableState } from '../../utilities/hooks';

/**
 * Open state of an uncontrolled section when `defaultIsOpen` is not set: sections start open.
 * This is a documented exception to the "booleans must not default to `true`" rule.
 */
const DEFAULT_IS_OPEN = true;

/**
 * Assistive text for ExpandableSection
 */
export interface ExpandableSectionAssistiveText {
	/** Label for the toggle button */
	toggleSection?: string;
}

/**
 * Props shared by every ExpandableSection
 */
interface ExpandableSectionBaseProps {
	/** Assistive text for accessibility */
	assistiveText?: ExpandableSectionAssistiveText;
	/** Content of the section */
	children?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Unique identifier */
	id?: string;
	/**
	 * Called when the toggle button is clicked, controlled or not. `data.isOpen` is the requested
	 * (next) open state.
	 */
	onToggleOpen?: (
		event: MouseEvent<HTMLButtonElement>,
		data: { isOpen: boolean }
	) => void;
	/** Section title (required) */
	title: string;
}

/** A section the user can collapse. Open or closed, controlled or not. */
interface ExpandableSectionCollapsibleProps {
	/**
	 * Open state when the section is controlled. When set, the section only expands and collapses when
	 * this prop changes: update it from `onToggleOpen`. Leave it `undefined` for an uncontrolled section
	 * (see `defaultIsOpen`).
	 */
	isOpen?: boolean;
	/**
	 * Initial open state of an uncontrolled section (`isOpen` is `undefined`). Defaults to `true`
	 * (sections start open); an exception to the boolean-default rule.
	 */
	defaultIsOpen?: boolean;
	/** Whether section cannot be collapsed */
	nonCollapsible?: false;
}

/**
 * A section that cannot be collapsed is always open: `isOpen={false}` or
 * `defaultIsOpen={false}` would hide its content with no way to show it.
 */
interface ExpandableSectionNonCollapsibleProps {
	/**
	 * Open state when the section is controlled. A non-collapsible section is
	 * always open, so only `true` is accepted.
	 */
	isOpen?: true;
	/** Initial open state. A non-collapsible section is always open. */
	defaultIsOpen?: true;
	/** Whether section cannot be collapsed */
	nonCollapsible: true;
}

/**
 * Props for the ExpandableSection component: a union on `nonCollapsible`, so
 * a section that can never be shown again does not compile.
 */
export type ExpandableSectionProps = ExpandableSectionBaseProps &
	(ExpandableSectionCollapsibleProps | ExpandableSectionNonCollapsibleProps);

const defaultAssistiveText: ExpandableSectionAssistiveText = {
	toggleSection: 'Toggle visibility of section',
};

/**
 * Toggle visibility of section content with the Expandable Section
 */
const ExpandableSection = ({
	assistiveText: propAssistiveText,
	children,
	className,
	id: propId,
	isOpen: controlledIsOpen,
	defaultIsOpen = DEFAULT_IS_OPEN,
	nonCollapsible = false,
	onToggleOpen,
	title,
}: ExpandableSectionProps): React.ReactElement => {
	const generatedId = useId();
	const [isOpenState, setIsOpen] = useControllableState(
		controlledIsOpen,
		defaultIsOpen
	);
	// A section that cannot be collapsed is always open, whatever `isOpen` says
	// (the types reject `false`; this covers JavaScript callers).
	const isOpen = nonCollapsible || isOpenState;

	const id = propId || generatedId;
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

	const contentId = `${id}-expanded-section-content`;

	const handleToggle = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const nextIsOpen = !isOpen;
			setIsOpen(nextIsOpen);
			onToggleOpen?.(event, { isOpen: nextIsOpen });
		},
		[isOpen, onToggleOpen, setIsOpen]
	);

	const buttonAriaProps = {
		'aria-controls': contentId,
		'aria-expanded': Boolean(isOpen),
	};

	const titleNode = (
		<span
			className={classNames('slds-truncate', {
				'slds-p-horizontal_small': nonCollapsible,
			})}
			title={title}
		>
			{title}
		</span>
	);

	return (
		<div
			className={classNames(
				'slds-section',
				{ 'slds-is-open': isOpen },
				className as string
			)}
		>
			<h3
				className={classNames('slds-section__title', {
					'slds-theme_shade': nonCollapsible,
				})}
			>
				{!nonCollapsible ? (
					<Button
						assistiveText={{ icon: assistiveText.toggleSection }}
						iconCategory="utility"
						iconClassName="slds-section__title-action-icon slds-button__icon_left"
						iconName="switch"
						onClick={handleToggle}
						className="slds-section__title-action"
						variant="base"
						{...buttonAriaProps}
					>
						{titleNode}
					</Button>
				) : (
					titleNode
				)}
			</h3>
			<div
				aria-hidden={!isOpen}
				className="slds-section__content"
				id={contentId}
			>
				{children}
			</div>
		</div>
	);
};

ExpandableSection.displayName = EXPANDABLE_SECTION;

export default ExpandableSection;
