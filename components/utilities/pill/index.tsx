/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * This Pill component should be used within a listbox and differs from the standalone Pill component which is typically used for actions (such as a link) and not form fields. This component should be used in conjuction with `PillContainer`.
 */
import assign from 'lodash.assign';

import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';
import EventUtil from '../../../utilities/event';

import BaseSLDSPill from '../../../components/pill';

// The listbox Pill passes DOM attributes (`tabIndex`, `aria-selected`) and
// legacy event shapes that the standalone `PillProps` interface does not model.
// Alias to a permissive component type so this wrapper compiles.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SLDSPill = BaseSLDSPill as unknown as React.ComponentType<any>;

export interface PillAssistiveText {
	remove?: string;
}

export interface PillLabels {
	label?: string;
	remove?: string;
	removeTitle?: string;
}

export interface PillEvents {
	onBlur?: (event: React.FocusEvent, data?: unknown) => void;
	onClick?: (event: React.MouseEvent, data?: unknown) => void;
	onFocus?: (event: React.FocusEvent, data?: unknown) => void;
	onRequestFocus?: (event: unknown, data: { ref: unknown }) => void;
	onRequestFocusOnNextPill?: (event: unknown, data: unknown) => void;
	onRequestFocusOnPreviousPill?: (event: unknown, data: unknown) => void;
	onRequestRemove?: (event: unknown, data: unknown) => void;
}

export interface PillProps {
	/**
	 * Pill is the actively focused pill within a pill container. This will request focus on the DOM node.
	 */
	active?: boolean;
	/**
	 * **Assistive text for accessibility**
	 * * `remove`: Informs user of keyboard keys to press in order to remove a pill
	 */
	assistiveText?: PillAssistiveText;
	/**
	 * SLDSAvatar component to show on the left of the pill.
	 */
	avatar?: React.ReactElement;
	/**
	 * Applies the bare style to the component.
	 */
	bare?: boolean;
	/**
	 * Pills are often used for selection of a type of entity such as days in a daypicker. This prop allows you to pass in data that will be passed back to the event handler.
	 */
	eventData?: object;
	/**
	 * Callbacks for various pill events such as click, focus, etc
	 */
	events?: PillEvents;
	/**
	 * Applies the error style to the component.
	 */
	hasError?: boolean;
	/**
	 * The icon next to the pill label.
	 */
	icon?: React.ReactElement;
	/**
	 * Pill Label
	 */
	labels?: PillLabels;
	/**
	 * If true and is active pill in listbox, will trigger `events.onRequestFocus`
	 */
	requestFocus?: boolean;
	/**
	 * Pill Title
	 */
	title?: string;
	/**
	 * Allows the user to tab to the node
	 */
	tabIndex?: number;
}

const defaultProps: Partial<PillProps> = {
	assistiveText: {
		remove: ', Press delete or backspace to remove',
	},
	labels: {
		remove: 'Remove',
	},
	events: {},
};

const handleKeyDown = (
	event: React.KeyboardEvent,
	{ events, data }: { events: PillEvents; data?: unknown }
) => {
	// Helper function that takes an object literal of callbacks that are triggered with a key event
	mapKeyEventCallbacks(event, {
		callbacks: {
			[KEYS.BACKSPACE]: { callback: events.onRequestRemove, data },
			[KEYS.DELETE]: { callback: events.onRequestRemove, data },
			[KEYS.LEFT]: {
				callback: events.onRequestFocusOnPreviousPill,
				data: { ...(data as object), direction: 'previous' },
			},
			[KEYS.RIGHT]: {
				callback: events.onRequestFocusOnNextPill,
				data: { ...(data as object), direction: 'next' },
			},
		},
	});
};

const handleClickRemove = (
	event: React.MouseEvent,
	{ events, data }: { events: PillEvents; data?: unknown }
) => {
	EventUtil.trap(event);
	events.onRequestRemove?.(event, data);
};

const Pill = ({
	assistiveText = defaultProps.assistiveText,
	labels = defaultProps.labels,
	events = defaultProps.events as PillEvents,
	avatar,
	bare,
	hasError,
	tabIndex,
	icon,
	eventData,
	requestFocus,
	active,
}: PillProps) => {
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
					? (event: React.MouseEvent) => {
							if (events.onClick) {
								events.onClick(event, {
									...eventData,
								});
							}
					  }
					: null
			}
			onFocus={(event: React.FocusEvent) => {
				if (events.onFocus) {
					events.onFocus(event, {
						...eventData,
					});
				}
			}}
			onRemove={(event: React.MouseEvent) => {
				EventUtil.trap(event);
				handleClickRemove(event, {
					events,
					data: eventData,
				});
			}}
			onKeyDown={(event: React.KeyboardEvent) => {
				handleKeyDown(event, {
					events,
					data: eventData,
				});
			}}
			ref={(component: unknown) => {
				if (requestFocus && active) {
					events.onRequestFocus?.(undefined, { ref: component });
				}
			}}
		/>
	);
};

Pill.displayName = 'Pill';

export default Pill;
