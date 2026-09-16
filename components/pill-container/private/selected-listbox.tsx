/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	type ReactNode,
	type ReactElement,
	type CSSProperties,
	type MouseEvent,
	type KeyboardEvent,
	type FocusEvent,
	type SyntheticEvent,
} from 'react';

import classNames from 'classnames';

import Avatar from '../../avatar';
import Icon from '../../icon';
import Pill from '../../utilities/pill';

import type { IconCategory } from '../../../types/common';

import isReactComponent from '../../../utilities/is-react-component';

export interface SelectedListBoxOption {
	id?: string;
	label?: ReactNode | string;
	title?: string;
	icon?: ReactNode | { category?: string; name?: string };
	avatar?: ReactNode | { imgSrc?: string; title?: string; variant?: string };
	bare?: boolean;
	error?: boolean;
	[key: string]: unknown;
}

export interface SelectedListBoxLabels {
	removePillTitle?: string;
	selectedListboxLabel?: string;
}

export interface SelectedListBoxProps {
	activeOption?: SelectedListBoxOption;
	activeOptionIndex?: number;
	assistiveText?: {
		removePill?: string;
		selectedListboxLabel?: string;
		[key: string]: unknown;
	};
	className?: unknown[] | Record<string, unknown> | string;
	containerRole?: string;
	containerAriaOrientation?: string | null;
	listboxRole?: string;
	listboxAriaOrientation?: string | null;
	events: {
		onBlurPill?: () => void;
		onClickPill?: (
			event: MouseEvent | KeyboardEvent,
			data: { index: number; option: SelectedListBoxOption }
		) => void;
		onPillFocus?: (
			event: FocusEvent,
			data: { index: number; option: SelectedListBoxOption }
		) => void;
		onRequestFocus?: (
			event: SyntheticEvent | unknown,
			data: { ref: HTMLElement | null }
		) => void;
		onRequestFocusOnNextPill?: (
			event: SyntheticEvent | KeyboardEvent,
			data: { direction: 'next' | 'previous' }
		) => void;
		onRequestFocusOnPreviousPill?: (
			event: SyntheticEvent | KeyboardEvent,
			data: { direction: 'next' | 'previous' }
		) => void;
		onRequestRemove?: (
			event: MouseEvent | KeyboardEvent | SyntheticEvent,
			data: { index?: number; option: SelectedListBoxOption }
		) => void;
	};
	id: string;
	isBare?: boolean;
	isInline?: boolean;
	isPillContainer?: boolean;
	labels?: SelectedListBoxLabels;
	listboxHasFocus?: boolean;
	renderAtSelectionLength?: number;
	selectedListboxRef?: (ref: HTMLUListElement | null) => void;
	selection?: SelectedListBoxOption[];
	style?: CSSProperties;
	variant?: string;
}

const getAvatar = (option: SelectedListBoxOption): ReactNode => {
	const avatarObject = option.avatar;
	let avatar: ReactNode = null;

	if (avatarObject) {
		if (
			isReactComponent(avatarObject) ||
			avatarObject instanceof HTMLElement
		) {
			avatar = avatarObject as ReactNode;
		} else if ((avatarObject as { imgSrc?: string }).imgSrc) {
			const avatarData = avatarObject as {
				imgSrc?: string;
				title?: string;
				variant?: string;
			};
			avatar = (
				<Avatar
					imgSrc={avatarData.imgSrc}
					title={avatarData.title || (option.label as string)}
					variant={
						(avatarData.variant as 'user' | 'entity') || 'user'
					}
				/>
			);
		}
	}

	return avatar;
};

const getIcon = (option: SelectedListBoxOption): ReactNode => {
	const iconObject = option?.icon || null;
	let icon: ReactNode = null;

	if (iconObject) {
		if (isReactComponent(iconObject) || iconObject instanceof HTMLElement) {
			icon = iconObject as ReactNode;
		} else {
			const iconData = iconObject as {
				category?: string;
				name?: string;
				title?: string;
			};
			if (iconData.category && iconData.name) {
				icon = (
					<Icon
						category={iconData.category as IconCategory}
						name={iconData.name}
						title={iconData.title || (option.label as string)}
					/>
				);
			}
		}
	}

	return icon;
};

const SelectedListBox = ({
	listboxAriaOrientation = 'horizontal',
	listboxRole = 'listbox',
	renderAtSelectionLength = 1,
	selection = [],
	isPillContainer,
	className,
	id,
	selectedListboxRef,
	style,
	containerRole,
	containerAriaOrientation,
	isInline,
	assistiveText,
	activeOptionIndex,
	listboxHasFocus,
	isBare,
	events,
	labels,
}: SelectedListBoxProps) =>
	selection.length >= renderAtSelectionLength ? (
		<div // eslint-disable-line jsx-a11y/role-supports-aria-props
			className={
				classNames(
					{
						'slds-pill_container': isPillContainer,
					},
					className as string
				) || undefined
			}
			id={id}
			ref={(ref) => {
				if (selectedListboxRef) {
					// The ambient contract types this ref as an HTMLUListElement even
					// though it is attached to the container div.
					selectedListboxRef(ref as unknown as HTMLUListElement | null);
				}
			}}
			style={style}
			// Remove role and aria-orientation after slds-has-inline-listbox is deprecated in Combobox
			role={containerRole}
			aria-orientation={
				containerAriaOrientation as React.AriaAttributes['aria-orientation']
			}
		>
			<ul
				className={classNames('slds-listbox', {
					'slds-listbox_inline': isInline,
					'slds-listbox_horizontal': !isInline,
					'slds-p-top_xxx-small': !isInline,
				})}
				aria-label={assistiveText?.selectedListboxLabel}
				role={listboxRole}
				aria-orientation={
					listboxAriaOrientation as React.AriaAttributes['aria-orientation']
				}
			>
				{selection.map((option, renderIndex) => {
					const hasTabIndex = renderIndex === activeOptionIndex;
					const icon = getIcon(option);
					const avatar = !icon ? getAvatar(option) : null;

					return (
						<li
							role="presentation"
							className="slds-listbox__item"
							key={`${id}-list-item-${option.id}`}
						>
							<Pill
								active={hasTabIndex && listboxHasFocus}
								assistiveText={{
									remove: assistiveText?.removePill,
								}}
								avatar={avatar as ReactElement}
								bare={option.bare || isBare}
								events={{
									onBlur: events.onBlurPill,
									onClick:
										typeof events.onClickPill === 'function'
											? (event: React.MouseEvent, data?: unknown) => {
													events.onClickPill?.(
														event as unknown as MouseEvent,
														{
															...(data as object),
															index: renderIndex,
														} as {
															index: number;
															option: SelectedListBoxOption;
														}
													);
											  }
											: undefined,
									onFocus: (event: React.FocusEvent, data?: unknown) => {
										events.onPillFocus?.(event, {
											...(data as object),
											index: renderIndex,
										} as {
											index: number;
											option: SelectedListBoxOption;
										});
									},
									onRequestFocusOnNextPill: events.onRequestFocusOnNextPill as
										| ((event: unknown, data: unknown) => void)
										| undefined,
									onRequestFocusOnPreviousPill:
										events.onRequestFocusOnPreviousPill as
											| ((event: unknown, data: unknown) => void)
											| undefined,
									onRequestRemove: (event: unknown, data: unknown) => {
										events.onRequestRemove?.(
											event as unknown as MouseEvent,
											{
												...(data as object),
												index: renderIndex,
											} as {
												index?: number;
												option: SelectedListBoxOption;
											}
										);
									},
									onRequestFocus: events.onRequestFocus as
										| ((event: unknown, data: { ref: unknown }) => void)
										| undefined,
								}}
								eventData={{ option }}
								hasError={option.error}
								icon={icon as ReactElement}
								labels={{
									label: option.label as string,
									removeTitle: labels?.removePillTitle,
								}}
								title={(option.title ?? option.label) as string}
								requestFocus={listboxHasFocus}
								tabIndex={hasTabIndex ? 0 : -1}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	) : null;

SelectedListBox.displayName = 'SelectedListBox';

export default SelectedListBox;
