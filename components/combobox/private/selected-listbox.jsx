/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Pill from '../../utilities/pill';

import classNames from 'classnames';

import { shape } from 'airbnb-prop-types';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
	 * * `removePill`: Aids in keyboard interaction with Pills.
	 */
	assistiveText: shape({
		label: PropTypes.string,
		removePill: PropTypes.string
	}),
	/**
	 * HTML id for Combobox
	 */
	id: PropTypes.string,
	/**
	 * Adds inline (inside of input) styling
	 */
	isInline: PropTypes.bool,
	/*
	 * Pill Label
	 */
	labels: shape({
		label: PropTypes.string,
		remove: PropTypes.string,
		title: PropTypes.string
	}),
	/*
	 * Callback called when pill is clicked, delete is pressed, or backspace is pressed.
	 */
	events: shape({
		onRequestRemove: PropTypes.func
	}),
	/**
	 * Accepts an array of item objects.
	 */
	selection: PropTypes.array
};

const defaultProps = {};

const SelectedListBox = (props) => (
	<div // eslint-disable-line jsx-a11y/role-supports-aria-props
		id={`${props.id}-selected-listbox`}
		role="listbox"
		aria-orientation="horizontal"
	>
		<ul
			className={classNames(
				'slds-listbox', {
					'slds-listbox--inline': props.isInline,
					'slds-listbox_horizontal': !props.isInline,
					'slds-p-top_xxx-small': !props.isInline
				}
			)}
			role="group"
			aria-label={props.assistiveText.listboxLabel}
		>
			{props.selection.map((item) => {
				const icon = item.icon
					? React.cloneElement(item.icon, {
						containerClassName: 'slds-pill__icon_container'
					})
					: null;

				return (
					<li
						role="presentation"
						className="slds-listbox__item"
						key={`${props.id}-list-item-${item.label}`}
					>
						<Pill
							assistiveText={{
								remove: props.assistiveText.removePill
							}}
							events={{
								onRequestRemove: (event) => {
									props.events.onRequestRemove(event, { option: item });
								}
							}}
							eventData={{ item }}
							icon={icon}
							labels={{
								label: item.label,
								removeTitle: props.labels.removePillTitle
							}}
						/>
					</li>
				);
			})}

		</ul>
	</div>);

SelectedListBox.displayName = 'SelectedListBox';
SelectedListBox.propTypes = propTypes;
SelectedListBox.defaultProps = defaultProps;

export default SelectedListBox;
