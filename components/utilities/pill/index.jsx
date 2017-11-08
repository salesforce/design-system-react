/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import UtilityIcon from '../../../components/utilities/utility-icon';

import assign from 'lodash.assign';

import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';
import EventUtil from '../../../utilities/event';

import { shape } from 'airbnb-prop-types';

const propTypes = {
	/**
	 * Pill is the active pill within a listbox of pills. This will request focus on the DOM node.
	 */
	active: PropTypes.bool,
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `pressDeleteOrBackspace`: Informs user of keyboard keys to press in order to remove a pill
	 */
	assistiveText: shape({
		remove: PropTypes.string
	}),
	/*
	 * Pills are often used for selection of a type of entity such as days in a daypicker. This prop allows you to pass in data that will be passed back to the event handler.
	 */
	eventData: PropTypes.object,
	/*
	 * Callback called when pill is clicked, delete is pressed, or backspace is pressed.
	 */
	events: shape({
		onClick: PropTypes.func,
		onRequestFocus: PropTypes.func.isRequired,
		onRequestFocusOnNextPill: PropTypes.func.isRequired,
		onRequestFocusOnPreviousPill: PropTypes.func.isRequired,
		onRequestRemove: PropTypes.func.isRequired
	}),
	/*
	 * The icon next to the pill label.
	 */
	icon: PropTypes.element,
	/*
	 * Pill Label
	 */
	labels: shape({
		label: PropTypes.string.isRequired,
		removeTitle: PropTypes.string
	}),
	/*
	 * If true and is active pill in listbox, will trigger `events.onRequestFocus`
	 */
	requestFocus: PropTypes.bool,
	/*
	 * Pill Title
	 */
	title: PropTypes.string,
	/*
	 * Allows the user to tab to the node
	 */
	tabIndex: PropTypes.number
};

const defaultProps = {
	assistiveText: shape({
		remove: ', Press delete or backspace to remove'
	}),
	labels: {
		remove: 'Remove'
	},
	events: {}
};

const handleKeyDown = (event, { events, data }) => {
	// Helper function that takes an object literal of callbacks that are triggered with a key event
	mapKeyEventCallbacks(event, {
		callbacks: {
			[KEYS.BACKSPACE]: { callback: events.onRequestRemove, data },
			[KEYS.DELETE]: { callback: events.onRequestRemove, data },
			[KEYS.LEFT]: { callback: events.onRequestFocusOnPreviousPill,
				data: { ...data, direction: 'previous' } },
			[KEYS.RIGHT]: { callback: events.onRequestFocusOnNextPill,
				data: { ...data, direction: 'next' } }
		}
	});
};

const handleClickRemove = (event, { events, eventData }) => {
	events.onRequestRemove(event, eventData);
};

const Pill = (props) => {
	const assistiveText = assign({}, defaultProps.assistiveText, props.assistiveText);
	const labels = assign({}, defaultProps.labels, props.labels);

	return (
		<span // eslint-disable-line jsx-a11y/no-static-element-interactions
			className="slds-pill"
			role="option"
			tabIndex={props.tabIndex || '0'}
			aria-selected="true"
			onBlur={props.events.onBlur}
			onClick={(event) => {
				if (props.events.onClick) {
					props.events.onClick(event, {
						option: props.eventData
					});
				}
			}}
			onKeyDown={(event) => {
				handleKeyDown(event, {
					events: props.events,
					data: props.eventData
				});
			}}
			ref={(component) => {
				if (props.requestFocus && props.active) {
					props.events.onRequestFocus(undefined, { ref: component });
				}
			}}
		>
			{props.icon}
			<span className="slds-pill__label" title={labels.title}>{labels.label}</span>
			{props.events.onRequestRemove
				? <span // eslint-disable-line jsx-a11y/no-static-element-interactions
					className="slds-icon_container slds-pill__remove"
					title={labels.removeTitle}
					onClick={(event) => {
						EventUtil.trap(event);
						handleClickRemove(event, {
							events: props.events,
							eventData: props.eventData
						});
					}}
				>
					<UtilityIcon
						style={{ cursor: 'pointer' }}	// remove when fixed by SLDS CSS
						aria-hidden="true"
						category="utility"
						className="slds-icon slds-icon--x-small slds-icon-text-default"
						name="close"
					/>
					<span className="slds-assistive-text">{assistiveText.remove}</span>
				</span>
			: null}
		</span>
	);
};

Pill.displayName = 'Pill';
Pill.propTypes = propTypes;
Pill.defaultProps = defaultProps;

export default Pill;
