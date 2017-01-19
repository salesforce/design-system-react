/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { MODAL } from '../../utilities/constants';
import Modal from '../../components/modal';
import Lookup from '../../components/lookup';
import MenuPicklist from '../../components/menu-picklist';
import Timepicker from '../../components/time-picker';
import Datepicker from '../../components/date-picker';
import Button from '../../components/button';

import SLDSSettings from '../../components/SLDSSettings';
SLDSSettings.setAppElement('#root');	// used by Modal component

const getModal = props => (
	<Modal {...props} />
);

const modalFooter = [
	<Button key="modalBCancel" label="Cancel" />,
	<Button key="modalBSave" label="Save" variant="brand" />
];

const modalContent = (
	<section className="slds-p-around--large">
		<div className="slds-form-element slds-m-bottom--large">
			<label className="slds-form-element__label" htmlFor="opptyName">Opportunity Name</label>
			<div className="slds-form-element__control">
				<input id="opptyName" className="slds-input" type="text" placeholder="Enter name" />
			</div>
		</div>
		<div className="slds-form-element slds-m-bottom--large">
			<label className="slds-form-element__label" htmlFor="description">Opportunity Description</label>
			<div className="slds-form-element__control">
				<textarea id="description" className="slds-textarea" placeholder="Enter description"></textarea>
			</div>
		</div>

		{/*
		*/}
		<Lookup
			className="slds-m-bottom--large"
			emptyMessage="No Accounts Found"
			hasError={false}
			iconName="account"
			label="Account Name"
			onChange={action('change')}
			onSelect={action('selected')}
			options={[
				{ label: 'Paddy\'s Pub' },
				{ label: 'Tyrell Corp' },
				{ label: 'Paper St. Soap Company' },
				{ label: 'Nakatomi Investments' },
				{ label: 'Acme Landscaping' },
				{ label: 'Acme Construction' }
			]}
		/>

		<MenuPicklist
			className="slds-m-bottom--large"
			label="Lead Source"
			onSelect={(option) => { action('selected: ', option.label); }}
			options={[
				{ label: 'Third Party Program', value: 'A0' },
				{ label: 'Cold Call', value: 'B0' },
				{ label: 'LinkedIn', value: 'C0' },
				{ label: 'Direct Mail', value: 'D0' },
				{ label: 'Other', value: 'E0' }
			]}
			placeholder="Select Lead Source"
			value="B0"
		/>

		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">Amount</label>
			<div className="slds-form-element__control">
				<input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
			</div>
		</div>
		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">Amount</label>
			<div className="slds-form-element__control">
				<input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
			</div>
		</div>
		<div className="slds-m-bottom--large">
			<Datepicker
				onDateChange={() => { action('date is selected'); }}
			/>
		</div>

		<div className="slds-m-bottom--large">
			<Timepicker
				onDateChange={() => { action('time is selected'); }}
			/>
		</div>

		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">Amount</label>
			<div className="slds-form-element__control">
				<input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
			</div>
		</div>

		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">Amount</label>
			<div className="slds-form-element__control">
				<input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
			</div>
		</div>
		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">Amount</label>
			<div className="slds-form-element__control">
				<input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
			</div>
		</div>
		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">Amount</label>
			<div className="slds-form-element__control">
				<input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
			</div>
		</div>
		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">Amount</label>
			<div className="slds-form-element__control">
				<input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
			</div>
		</div>
	</section>
);

storiesOf(MODAL, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Small', () => getModal({
		isOpen: true,
		tagline: 'Enter in details below',
		title: 'New Opportunity',
		children: modalContent,
		onRequestClose: action('modal closed'),
		portalClassName: 'portal-class-name-test'
	}))
	.add('Small with footer', () => getModal({
		isOpen: true,
		tagline: 'Enter in details below',
		title: 'New Opportunity',
		children: modalContent,
		onRequestClose: action('modal closed'),
		footer: modalFooter
	}))
	.add('Prompt', () => getModal({
		isOpen: true,
		title: 'Delete state - Default',
		children: <div>Are you sure you want to delete the Default State? This action cannot be undone. Are you sure you want to delete the Default State? This action cannot be undone. Are you sure you want to delete the Default State? This action cannot be undone.</div>, // eslint-disable-line max-len
		prompt: 'error',
		onRequestClose: action('modal closed')
	}));
