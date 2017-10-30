/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../components/icon-settings';

import { MODAL } from '../../utilities/constants';
import Modal from '../../components/modal';
import Lookup from '../../components/lookup';
import Combobox from '../../components/combobox';
import Timepicker from '../../components/time-picker';
import Textarea from '../../components/forms/textarea';
import Input from '../../components/forms/input';
import Datepicker from '../../components/date-picker';
import Button from '../../components/button';
import Icon from '../../components/icon';

import ModalCustomParentNode from './modal-custom-parent-node';


import SLDSSettings from '../../components/SLDSSettings';

SLDSSettings.setAppElement('#root');	// used by Modal component

const getModal = (props) => (
	<Modal {...props} />
);

const modalFooter = [
	<Button key="modalBCancel" label="Cancel" />,
	<Button key="modalBSave" label="Save" variant="brand" />
];

const accounts = [
	{ id: '1', label: 'Acme', subTitle: 'Account • San Francisco', type: 'account' },
	{ id: '2', label: 'Salesforce.com, Inc.', subTitle: 'Account • San Francisco', type: 'account' },
	{ id: '3', label: 'Paddy\'s Pub', subTitle: 'Account • Boston, MA', type: 'account' },
	{ id: '4', label: 'Tyrell Corp', subTitle: 'Account • San Francisco, CA', type: 'account' },
	{ id: '5', label: 'Paper St. Soap Company', subTitle: 'Account • Beloit, WI', type: 'account' },
	{ id: '6', label: 'Nakatomi Investments', subTitle: 'Account • Chicago, IL', type: 'account' },
	{ id: '7', label: 'Acme Landscaping', type: 'account' },
	{ id: '8', label: 'Acme Construction', subTitle: 'Account • Grand Marais, MN', type: 'account' }
];

const accountsWithIcon = accounts.map((elem) => Object.assign(elem, {
	icon: <Icon
		assistiveText="Account"
		category="standard"
		name={elem.type}
	/> })
);

const modalContent = (
	<div className="slds-form_stacked slds-p-around_medium">
		<Input
			id="unique-id-1"
			label="Opportunity Name"
			placeholder="Enter name"
		/>
		<Textarea
			id="unique-id-1"
			label="Opportunity Description"
			placeholder="Enter description"
		/>
		<Combobox
			id="combobox-autocomplete-unique-id"
			labels={{
				label: 'Account Name',
				placeholderReadOnly: 'Select account'
			}}
			options={accountsWithIcon}
			variant="base"
		/>
		<Combobox
			id="combobox-readonly-unique-id"
			labels={{
				label: 'Lead Source',
				placeholderReadOnly: 'Select source'
			}}
			options={[
				{ id: 1, label: 'Third Party Program' },
				{ id: 2, label: 'Cold Call' },
				{ id: 3, label: 'LinkedIn' },
				{ id: 4, label: 'Direct Mail' },
				{ id: 5, label: 'Other' }
			]}
			variant="readonly"
		/>
		<Input
			fixedTextLeft="$"
			id="unique-id-1"
			label="Amount"
			placeholder="Enter amount"
		/>
		<div className="slds-form-element">
			<Datepicker
				label="Start Date"
			/>
		</div>
		<div className="slds-form-element">
			<Timepicker
				label="Start Time"
			/>
		</div>
		<Input
			id="unique-id-1"
			label="Additional Input"
			placeholder="To create scrolling modal"
		/>
		<Input
			id="unique-id-1"
			label="Additional Input"
			placeholder="To create scrolling modal"
		/>
		<Input
			id="unique-id-1"
			label="Additional Input"
			placeholder="To create scrolling modal"
		/>
		<Input
			id="unique-id-1"
			label="Additional Input"
			placeholder="To create scrolling modal"
		/>
		<Input
			id="unique-id-1"
			label="Additional Input"
			placeholder="To create scrolling modal"
		/>
		<Input
			id="unique-id-1"
			label="Additional Input"
			placeholder="To create scrolling modal"
		/>
		<Input
			id="unique-id-1"
			label="Additional Input"
			placeholder="To create scrolling modal"
		/>
	</div>
);

storiesOf(MODAL, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium"><IconSettings iconPath="/assets/icons">{getStory()}</IconSettings></div>)
	.add('Modal with Custom Parent Node', () => <ModalCustomParentNode />)
	.add('Small', () => getModal({
		closeButtonAssistiveText: 'Exit',
		isOpen: true,
		tagline: 'Enter in details below',
		title: 'New Opportunity',
		children: modalContent,
		onRequestClose: action('modal closed'),
		portalClassName: 'portal-class-name-test'
	}))
	.add('Small with footer, not dismissible', () => getModal({
		dismissible: false,
		isOpen: true,
		tagline: 'Enter in details below',
		title: 'New Opportunity',
		children: modalContent,
		onRequestClose: action('modal closed'),
		footer: modalFooter
	}))
	.add('Small with custom footer', () => getModal({
		directional: true,
		isOpen: true,
		tagline: 'Enter in details below',
		title: 'New Opportunity',
		children: modalContent,
		onRequestClose: action('modal closed'),
		footer: <div><Button label="cancel" /> and some random text in here <Button label="update" /><Button label="run" /></div>
	}))
	.add('Small no header', () => getModal({
		isOpen: true,
		children: modalContent,
		onRequestClose: action('modal closed'),
		portalClassName: 'portal-class-name-test'
	}))
	.add('Large with directional footer', () => getModal({
		directional: true,
		isOpen: true,
		tagline: 'Enter in details below',
		title: 'New Opportunity',
		children: modalContent,
		onRequestClose: action('modal closed'),
		footer: modalFooter,
		size: 'large'

	}))
	.add('Prompt', () => getModal({
		isOpen: true,
		title: 'Delete state - Default',
		children: <div className="slds-p-around--medium">Are you sure you want to delete the Default State? This action cannot be undone. Are you sure you want to delete the Default State? This action cannot be undone. Are you sure you want to delete the Default State? This action cannot be undone. <Button className="slds-m-around--medium">Ok, got it!</Button></div>, // eslint-disable-line max-len
		prompt: 'error',
		onRequestClose: action('modal closed')
	}));
