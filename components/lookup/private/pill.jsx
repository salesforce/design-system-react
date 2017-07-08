/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash.assign';
import classNames from 'classnames';
import { shape } from 'airbnb-prop-types';

import Button from '~/components/button';
import Icon from '~/components/icon';
import KEYS from '../../../utilities/key-code';
import mapKeyEventCallbacks from '../../../utilities/key-callbacks';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `pressDeleteOrBackspace`: Informs user of keyboard keys to press in order to remove a pill
	 */
	assistiveText: shape({
		pressDeleteOrBackspace: PropTypes.string
	}),
	/*
	 * Pills are often used for selection of a type of entity such as days in a daypicker or an option from a Picklist or Lookup. This prop allows you to pass in data that will be passed back to the event handler.
	 */
	eventData: PropTypes.object,
	/*
	 * Callback called when pill is clicked, delete is pressed, or backspace is pressed.
	 */
	events: shape({
		onRequestRemove: PropTypes.func
	}),
	/*
	 * Pill Label
	 */
	labels: shape({
		label: PropTypes.string,
		remove: PropTypes.string,
		title: PropTypes.string
	}),
	/*
	 * Pill Title
	 */
	title: PropTypes.string,
	variants: PropTypes.oneOf(['base', 'option'])
};

const defaultProps = {
	assistiveText: shape({
		pressDeleteOrBackspace: 'Press delete or backspace to remove'
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
			[KEYS.DELETE]: { callback: events.onRequestRemove, data },
			[KEYS.BACKSPACE]: { callback: events.onRequestRemove, data }
		}
	});
};

const Pill = (props) => {
	const assistiveText = assign({}, defaultProps.assistiveText, props.assistiveText);
	const labels = assign({}, defaultProps.labels, props.labels);

	const isOption =  props.variant === 'option';
	const pillClassName = classNames(props.className, 'slds-pill', {
		'slds-pill_link': !isOption
	});

	const renderIcon = props.iconName
		? (
			<span className="slds-avatar slds-avatar_x-small slds-pill__icon_container">
				<Icon
					category={props.iconCategory}
					className="slds-pill__icon"
					inverse={props.iconInverse}
					name={props.iconName}
				/>
			</span>
		)
		: null;

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<span
			className={pillClassName}
			role={isOption ? 'option' : null}
			tabIndex={isOption ? 0 : null}
			aria-selected={isOption ? 'true' : null}
			onKeyDown={(event) => {
				handleKeyDown(event, {
					events: props.events,
					data: props.eventData
				});
			}}
		>
			{isOption
					? (
						<span>
							{renderIcon}
							<span className="slds-pill__label" title={labels.title}>
								{labels.label}
							</span>
						</span>
					)
					: (
						// eslint-disable-next-line no-script-url
						<a href="javascript:void(0);" className="slds-pill__action" style={{ width: '100%' }} title={labels.title}>
							{renderIcon}
							<span className="slds-pill__label">{labels.label}</span>
						</a>
					)
			}

			{props.events.onRequestRemove
					? <Button
						assistiveText={assistiveText.pressDeleteOrBackspace}
						className="slds-pill__remove"
						iconName="close"
						onClick={(event) => {
							props.events.onRequestRemove(event, {
								events: props.events,
								eventData: props.eventData
							});
						}}
						tabIndex="-1"
						variant="icon"
					/>
					: null}
		</span>
	);
};

Pill.displayName = 'Pill';
Pill.propTypes = propTypes;
Pill.defaultProps = defaultProps;

export default Pill;
