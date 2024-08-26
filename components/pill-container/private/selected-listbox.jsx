/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Avatar from '../../avatar';
import Icon from '../../icon';
import Pill from '../../utilities/pill';

import isReactComponent from '../../../utilities/is-react-component';

const propTypes = {
	/*
	 * The option object within the selection prop that should have focus.
	 */
	activeOption: PropTypes.object,
	/*
	 * The index of the option object within the selection prop that should have focus.
	 */
	activeOptionIndex: PropTypes.number,
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
	 * * `removePill`: Aids in keyboard interaction with Pills.
	 * * `selectedListboxLabel`: Used to identify the listbox
	 */
	assistiveText: PropTypes.shape({
		label: PropTypes.string,
		removePill: PropTypes.string,
		selectedListboxLabel: PropTypes.string,
	}),
	/**
	 * CSS classes to be added to the top-level `div` tag.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/*
	 * Callbacks for various pill events such as click, focus, etc
	 */
	events: PropTypes.shape({
		onClickPill: PropTypes.func,
		onPillFocus: PropTypes.func.isRequired,
		onRequestFocus: PropTypes.func.isRequired,
		onRequestFocusOnNextPill: PropTypes.func.isRequired,
		onRequestFocusOnPreviousPill: PropTypes.func.isRequired,
		onRequestRemove: PropTypes.func.isRequired,
	}),
	/**
	 * HTML id for component main container
	 */
	id: PropTypes.string,
	/**
	 * Determines whether component renders as a bare pill container with associated styling for child pills
	 */
	isBare: PropTypes.bool,
	/**
	 * Adds inline (inside of input) styling
	 */
	isInline: PropTypes.bool,
	/**
	 * Determines whether component renders as a pill container with associated styling and behavior
	 */
	isPillContainer: PropTypes.bool,
	/**
	 * The value of `aria-orientation` to use on the listbox element
	 */
	listboxAriaOrientation: PropTypes.string,
	/**
	 * The value of `role` to use on the listbox element
	 */
	listboxRole: PropTypes.string,
	/**
	 * The value of `aria-orientation` to use on the container element
	 */
	containerAriaOrientation: PropTypes.string,
	/**
	 * The value of `role` to use on the container element
	 */
	containerRole: PropTypes.string,
	/*
	 * Pill Label
	 */
	labels: PropTypes.shape({
		label: PropTypes.string,
		remove: PropTypes.string,
		title: PropTypes.string,
	}),
	/**
	 * Changes styles of the input. Currently `entity` is not supported.
	 */
	renderAtSelectionLength: PropTypes.number,
	/**
	 * This callback exposes the selected listbox reference / DOM node to parent components.
	 */
	selectedListboxRef: PropTypes.func,
	/**
	 * Accepts an array of item objects.
	 */
	selection: PropTypes.array,
	/**
	 * Custom styles to be passed to the top-level `div` tag
	 */
	style: PropTypes.object,
	/**
	 * Requests that the active option set focus on render
	 */
	listboxHasFocus: PropTypes.bool,
	/**
	 * Changes styles of the input. Currently `entity` is not supported.
	 */
	variant: PropTypes.oneOf(['base', 'inline-listbox', 'readonly']),
};

const getAvatar = (option) => {
	const avatarObject = option.avatar;
	let avatar = null;

	if (avatarObject) {
		if (isReactComponent(avatarObject) || avatarObject instanceof HTMLElement) {
			avatar = avatarObject;
		} else if (avatarObject.imgSrc) {
			avatar = (
				<Avatar
					imgSrc={avatarObject.imgSrc}
					title={avatarObject.title || option.label}
					variant={avatarObject.variant || 'user'}
				/>
			);
		}
	}

	return avatar;
};

const getIcon = (option) => {
	const iconObject = option?.icon || null;
	let icon = null;

	if (iconObject) {
		if (isReactComponent(iconObject) || iconObject instanceof HTMLElement) {
			icon = iconObject;
		} else if (iconObject.category && iconObject.name) {
			icon = (
				<Icon
					category={iconObject.category}
					name={iconObject.name}
					title={iconObject.title || option.label}
				/>
			);
		}
	}

	return icon;
};

const SelectedListBox = ({
	listboxAriaOrientation = 'horizontal',
	listboxRole = 'listbox',
	renderAtSelectionLength = 1,
	selection,
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
}) =>
	selection.length >= renderAtSelectionLength ? (
		<div // eslint-disable-line jsx-a11y/role-supports-aria-props
			className={
				classNames(
					{
						'slds-pill_container': isPillContainer,
					},
					className
				) || undefined
			}
			id={id}
			ref={(ref) => {
				if (selectedListboxRef) {
					selectedListboxRef(ref);
				}
			}}
			style={style}
			// Remove role and aria-orientation after slds-has-inline-listbox is deprecated in Combobox
			role={containerRole}
			aria-orientation={containerAriaOrientation}
		>
			<ul
				className={classNames('slds-listbox', {
					'slds-listbox_inline': isInline,
					'slds-listbox_horizontal': !isInline,
					'slds-p-top_xxx-small': !isInline,
				})}
				aria-label={assistiveText.selectedListboxLabel}
				role={listboxRole}
				aria-orientation={listboxAriaOrientation}
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
									remove: assistiveText.removePill,
								}}
								avatar={avatar}
								bare={option.bare || isBare}
								error={option.error}
								events={{
									onBlur: events.onBlurPill,
									onClick:
										typeof events.onClickPill === 'function'
											? (event, data) => {
													events.onClickPill(event, {
														...data,
														index: renderIndex,
													});
											  }
											: null,
									onFocus: (event, data) => {
										events.onPillFocus(event, {
											...data,
											index: renderIndex,
										});
									},
									onRequestFocusOnNextPill: events.onRequestFocusOnNextPill,
									onRequestFocusOnPreviousPill:
										events.onRequestFocusOnPreviousPill,
									onRequestRemove: (event, data) => {
										events.onRequestRemove(event, {
											...data,
											index: renderIndex,
										});
									},
									onRequestFocus: events.onRequestFocus,
								}}
								eventData={{ option }}
								hasError={option.error}
								icon={icon}
								labels={{
									label: option.label,
									title: option.title ?? option.label,
									removeTitle: labels.removePillTitle,
								}}
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
SelectedListBox.propTypes = propTypes;

export default SelectedListBox;
