/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * This Pill component should be used within a listbox and differs from the standalone Pill component which is typically used for actions (such as a link) and not form fields. This component should be used in conjuction with `PillContainer`.
 */
import React from 'react';
import PropTypes from 'prop-types';

import assign from 'lodash.assign';

import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';
import EventUtil from '../../../utilities/event';

import SLDSPill from '../../../components/pill';

const propTypes = {
	/**
	 * Pill is the actively focused pill within a pill container. This will request focus on the DOM node.
	 */
	active: PropTypes.bool,
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `pressDeleteOrBackspace`: Informs user of keyboard keys to press in order to remove a pill
	 */
	assistiveText: PropTypes.shape({
		remove: PropTypes.string,
	}),
	/**
	 * SLDSAvatar component to show on the left of the pill.
	 * _Tested with Mocha framework._
	 */
	avatar: PropTypes.element,
	/**
	 * Applies the bare style to the component.
	 * _Tested with Mocha framework._
	 */
	bare: PropTypes.bool,
	/*
	 * Pills are often used for selection of a type of entity such as days in a daypicker. This prop allows you to pass in data that will be passed back to the event handler.
	 */
	eventData: PropTypes.object,
	/*
	 * Callbacks for various pill events such as click, focus, etc
	 */
	events: PropTypes.shape({
		onClick: PropTypes.func,
		onFocus: PropTypes.func,
		onRequestFocus: PropTypes.func.isRequired,
		onRequestFocusOnNextPill: PropTypes.func.isRequired,
		onRequestFocusOnPreviousPill: PropTypes.func.isRequired,
		onRequestRemove: PropTypes.func.isRequired,
	}),
	/**
	 * Applies the error style to the component.
	 * _Tested with Mocha framework._
	 */
	hasError: PropTypes.bool,
	/*
	 * The icon next to the pill label.
	 */
	icon: PropTypes.element,
	/*
	 * Pill Label
	 */
	labels: PropTypes.shape({
		label: PropTypes.string.isRequired,
		removeTitle: PropTypes.string,
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
	tabIndex: PropTypes.number,
};

const defaultProps = {
	assistiveText: PropTypes.shape({
		remove: ', Press delete or backspace to remove',
	}),
	labels: {
		remove: 'Remove',
	},
	events: {},
};

const handleKeyDown = (event, { events, data }) => {
	// Helper function that takes an object literal of callbacks that are triggered with a key event
	mapKeyEventCallbacks(event, {
		callbacks: {
			[KEYS.BACKSPACE]: { callback: events.onRequestRemove, data },
			[KEYS.DELETE]: { callback: events.onRequestRemove, data },
			[KEYS.LEFT]: {
				callback: events.onRequestFocusOnPreviousPill,
				data: { ...data, direction: 'previous' },
			},
			[KEYS.RIGHT]: {
				callback: events.onRequestFocusOnNextPill,
				data: { ...data, direction: 'next' },
			},
		},
	});
};

const handleClickRemove = (event, { events, data }) => {
	EventUtil.trap(event);
	events.onRequestRemove(event, data);
};

const Pill = ({
	assistiveText = defaultProps.assistiveText,
	labels = defaultProps.labels,
	events = defaultProps.events,
	avatar,
	bare,
	hasError,
	tabIndex,
	icon,
	eventData,
	requestFocus,
	active,
}) => {
	const mergedAssistiveText = assign(
		{},
		defaultProps.assistiveText,
		assistiveText
	);
	const mergedLabels = assign({}, defaultProps.labels, labels);

	return (
		<SLDSPill
			avatar={avatar}
			bare={bare}
			hasError={hasError}
			tabIndex={tabIndex || '0'}
			icon={icon}
			variant="option"
			labels={mergedLabels}
			assistiveText={{
				remove: mergedAssistiveText.remove,
			}}
			aria-selected="true"
			onBlur={events.onBlur}
			onClick={
				typeof events.onClick === 'function'
					? (event) => {
							if (events.onClick) {
								events.onClick(event, {
									...eventData,
								});
							}
					  }
					: null
			}
			onFocus={(event) => {
				if (events.onFocus) {
					events.onFocus(event, {
						...eventData,
					});
				}
			}}
			onRemove={(event) => {
				EventUtil.trap(event);
				handleClickRemove(event, {
					events,
					data: eventData,
				});
			}}
			onKeyDown={(event) => {
				handleKeyDown(event, {
					events,
					data: eventData,
				});
			}}
			ref={(component) => {
				if (requestFocus && active) {
					events.onRequestFocus(undefined, { ref: component });
				}
			}}
		/>
	);
};

Pill.displayName = 'Pill';
Pill.propTypes = propTypes;

export default Pill;
