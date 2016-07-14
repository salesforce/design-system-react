/* eslint-disable indent */
/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { MENU_PICKLIST } from '../../utilities/constants';
import Picklist from '../../components/menu-picklist';

const options = [
	{ label: 'An option that is Super Super Long', value: 'A0' },
	{ label: 'Another option', value: 'B0' },
	{ label: 'C Option', value: 'C0' },
	{ label: 'D Option', value: 'D0' },
	{ label: 'E Option', value: 'E0' },
	{ label: 'A1 Option', value: 'A1' },
	{ label: 'B2 Option', value: 'B1' },
	{ label: 'C2 Option', value: 'C1' },
	{ label: 'D2 Option', value: 'D1' },
	{ label: 'E2 Option Super Super Long', value: 'E1' }
];

const getPicklist = (props) => (
	<Picklist {...props} />
);

storiesOf(MENU_PICKLIST, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Modal', () => getPicklist({
		label: 'Contacts',
		placeholder: 'Select a contact',
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		options
	}))
	.add('Non-modal', () => getPicklist({
		label: 'Contacts',
		modal: false,
		placeholder: 'Select a contact',
		onSelect: (...rest) => {
			action('Selected')(...rest);
		},
		options
	}));
