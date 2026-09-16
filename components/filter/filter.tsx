/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useState, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import Button from '../button';
import Popover from '../popover';

import { FILTER } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';

import {
	FilterAssistiveText,
	FilterChangeHandler,
	FilterRemoveHandler,
} from './types';

export interface FilterProps {
	/** Aligns the popover with the respective side of the trigger */
	align?: 'left' | 'right';
	/** Assistive text for accessibility */
	assistiveText?: FilterAssistiveText;
	/** Contents of popover - dropdowns and inputs that set filter criteria */
	children?: React.ReactNode;
	/** Custom CSS classes for slds-filters__item node */
	className?: string | string[] | Record<string, boolean>;
	/** Applies error state styling */
	isError?: boolean;
	/** Unique ID for keyboard navigation and ARIA support */
	id?: string;
	/** If true, the filter will not display an editing popover when clicked */
	isLocked?: boolean;
	/** Applies new filter styling */
	isNew?: boolean;
	/** If true, the filter will not include a remove button */
	isPermanent?: boolean;
	/** Callback when Done within the Popover is clicked */
	onChange?: FilterChangeHandler;
	/** Callback when "Remove Filter" button is clicked */
	onRemove?: FilterRemoveHandler;
	/** Callback when Filter is clicked */
	onClick?: () => void;
	/** Custom Popover component with overridable props */
	popover?: React.ReactElement;
	/** The filter predicate (e.g., "is PURPLE") */
	predicate?: React.ReactNode;
	/** The filter property (e.g., "Hair Color") */
	property?: React.ReactNode;
}

const defaultAssistiveText: FilterAssistiveText = {
	editFilter: 'Edit filter:',
	editFilterHeading: 'Choose filter criteria',
};

/**
 * A Filter is a popover with custom trigger. It can be used by Panel Filtering.
 * Menus within a Filter Popover will need to not have "portal mounts" and be inline.
 */
const Filter: React.FC<FilterProps> = ({
	align = 'left',
	assistiveText: assistiveTextProp,
	children,
	className,
	isError = false,
	id: idProp,
	isLocked = false,
	isNew = false,
	isPermanent = false,
	onChange,
	onRemove,
	onClick,
	popover,
	predicate = 'New Filter',
	property,
}) => {
	// Generate stable ID
	const generatedId = useMemo(() => generateId(), []);
	const id = idProp || generatedId;

	// Popover state - use popover's isOpen if provided
	const [popoverIsOpen, setPopoverIsOpen] = useState(
		(popover?.props as { isOpen?: boolean } | undefined)?.isOpen ?? false
	);

	// Merge assistive text with defaults
	const assistiveText = useMemo<FilterAssistiveText>(
		() => ({
			...defaultAssistiveText,
			...assistiveTextProp,
			removeFilter:
				assistiveTextProp?.removeFilter ||
				`Remove Filter: ${property} ${predicate}`,
		}),
		[assistiveTextProp, property, predicate]
	);

	// Handle filter click
	const handleFilterClick = useCallback(() => {
		setPopoverIsOpen(true);
		onClick?.();
	}, [onClick]);

	// Handle popover close
	const handleClose = useCallback(() => {
		setPopoverIsOpen(false);
	}, []);

	// Handle change (Done button clicked)
	const handleChange = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setPopoverIsOpen(false);
			onChange?.(event, { id });
		},
		[onChange, id]
	);

	// Handle remove
	const handleRemove = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			onRemove?.(event, { id });
		},
		[onRemove, id]
	);

	// Build popover body
	const popoverBody = (
		<div>
			<h4 className="slds-assistive-text" id={`${id}-popover-heading`}>
				{assistiveText.editFilterHeading}
			</h4>
			{children}
			<div className="slds-m-top_small slds-text-align_right">
				<Button
					className="slds-col_bump-left"
					label="Done"
					onClick={handleChange}
				/>
			</div>
		</div>
	);

	// Build popover props
	const popoverProps = {
		ariaLabelledby: `${id}-popover-heading`,
		align,
		body: popoverBody,
		heading: '',
		id,
		isOpen: popoverIsOpen,
		offset: align === 'right' ? '0px -35px' : undefined,
		onClose: handleClose,
		onRequestClose: handleClose,
		position: 'overflowBoundaryElement' as const,
		triggerClassName: 'slds-grow',
		// Merge with custom popover props if provided
		...(popover?.props || {}),
		// Remove children from merged props
		children: undefined,
	};

	// Trigger button content
	const triggerContent = (
		<>
			<span className="slds-assistive-text">{assistiveText.editFilter}</span>
			{property ? (
				<span className="slds-show slds-text-body_small">{property}</span>
			) : null}
			<span className="slds-show">{predicate}</span>
		</>
	);

	return (
		<div
			className={classNames(
				'slds-filters__item',
				'slds-grid',
				'slds-grid_vertical-align-center',
				{
					'slds-is-locked': isLocked,
					'slds-is-new': isNew,
					'slds-has-error': isError,
				},
				className
			)}
		>
			{!isLocked && (children || popover) ? (
				// @ts-expect-error - Popover props are complex with overrides
				<Popover {...popoverProps} silenceDeprecatedPropertyWarning>
					<button
						className="slds-button_reset slds-grow slds-has-blur-focus"
						onClick={handleFilterClick}
						aria-describedby={isError ? `${id}-error` : undefined}
						type="button"
					>
						{triggerContent}
					</button>
				</Popover>
			) : (
				<button
					aria-describedby={isError ? `${id}-error` : undefined}
					className="slds-button_reset slds-grow slds-has-blur-focus"
					disabled
					type="button"
				>
					<span className="slds-show slds-text-body_small">{property}</span>
					<span className="slds-show">{predicate}</span>
				</button>
			)}
			{!isPermanent && !isLocked && (
				<Button
					assistiveText={{ icon: assistiveText.removeFilter }}
					hint
					iconCategory="utility"
					iconName="delete"
					iconSize="small"
					iconVariant="bare"
					onClick={handleRemove}
					title={assistiveText.removeFilter}
					variant="icon"
				/>
			)}
		</div>
	);
};

Filter.displayName = FILTER;

export default Filter;

