/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { MODAL } from '../../../utilities/constants';
import Modal from '../../modal';
import MenuPicklist from '../../menu-picklist';
import Timepicker from '../../time-picker';
import Datepicker from '../../date-picker';
import Button from '../../button';

import ComboboxBase from '../../combobox/__examples__/base';

import ModalCustomParentNode from '../__examples__/modal-custom-parent-node';

import SLDSSettings from '../../SLDSSettings';

SLDSSettings.setAppElement('#root'); // used by Modal component

const getModal = (props) => <Modal {...props} />;

const modalFooter = [
	<Button key="modalBCancel" label="Cancel" />,
	<Button key="modalBSave" label="Save" variant="brand" />,
];

const modalContent = (
	<section className="slds-p-around--large">
		<div className="slds-form-element slds-m-bottom--large">
			<label className="slds-form-element__label" htmlFor="opptyName">
				Opportunity Name
			</label>
			<div className="slds-form-element__control">
				<input
					id="opptyName"
					className="slds-input"
					type="text"
					placeholder="Enter name"
				/>
			</div>
		</div>
		<div className="slds-form-element slds-m-bottom--large">
			<label className="slds-form-element__label" htmlFor="description">
				Opportunity Description
			</label>
			<div className="slds-form-element__control">
				<textarea
					id="description"
					className="slds-textarea"
					placeholder="Enter description"
				/>
			</div>
		</div>

		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">
				Amount
			</label>
			<div className="slds-form-element__control">
				<input
					id="amount"
					className="slds-input"
					type="text"
					placeholder="Enter Amount"
				/>
			</div>
		</div>
		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">
				Amount
			</label>
			<div className="slds-form-element__control">
				<input
					id="amount"
					className="slds-input"
					type="text"
					placeholder="Enter Amount"
				/>
			</div>
		</div>
		<div className="slds-m-bottom--large">
			<Datepicker
				onDateChange={() => {
					action('date is selected');
				}}
			/>
		</div>

		<div className="slds-form-element slds-m-bottom--large">
			<ComboboxBase />
		</div>

		<MenuPicklist
			className="slds-m-bottom--large"
			label="Lead Source"
			onSelect={(option) => {
				action('selected: ', option.label);
			}}
			options={[
				{ label: 'Third Party Program', value: 'A0' },
				{ label: 'Cold Call', value: 'B0' },
				{ label: 'LinkedIn', value: 'C0' },
				{ label: 'Direct Mail', value: 'D0' },
				{ label: 'Other', value: 'E0' },
			]}
			placeholder="Select Lead Source"
			value="B0"
		/>

		<div className="slds-m-bottom--large">
			<Timepicker
				onDateChange={() => {
					action('time is selected');
				}}
			/>
		</div>

		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">
				Amount
			</label>
			<div className="slds-form-element__control">
				<input
					id="amount"
					className="slds-input"
					type="text"
					placeholder="Enter Amount"
				/>
			</div>
		</div>

		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">
				Amount
			</label>
			<div className="slds-form-element__control">
				<input
					id="amount"
					className="slds-input"
					type="text"
					placeholder="Enter Amount"
				/>
			</div>
		</div>
		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">
				Amount
			</label>
			<div className="slds-form-element__control">
				<input
					id="amount"
					className="slds-input"
					type="text"
					placeholder="Enter Amount"
				/>
			</div>
		</div>
		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">
				Amount
			</label>
			<div className="slds-form-element__control">
				<input
					id="amount"
					className="slds-input"
					type="text"
					placeholder="Enter Amount"
				/>
			</div>
		</div>
		<div className="slds-form-element slds-m-vertical--large">
			<label className="slds-form-element__label" htmlFor="amount">
				Amount
			</label>
			<div className="slds-form-element__control">
				<input
					id="amount"
					className="slds-input"
					type="text"
					placeholder="Enter Amount"
				/>
			</div>
		</div>
	</section>
);

storiesOf(MODAL, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Modal with Custom Parent Node', () => <ModalCustomParentNode />)
	.add('Small', () =>
		getModal({
			closeButtonAssistiveText: 'Exit',
			isOpen: true,
			tagline: 'Enter in details below',
			title: 'New Opportunity',
			children: modalContent,
			onRequestClose: action('modal closed'),
			portalClassName: 'portal-class-name-test',
		})
	)
	.add('Small with footer, not dismissible', () =>
		getModal({
			dismissible: false,
			isOpen: true,
			tagline: 'Enter in details below',
			title: 'New Opportunity',
			children: modalContent,
			onRequestClose: action('modal closed'),
			footer: modalFooter,
		})
	)
	.add('Small with custom footer', () =>
		getModal({
			directional: true,
			isOpen: true,
			tagline: 'Enter in details below',
			title: 'New Opportunity',
			children: modalContent,
			onRequestClose: action('modal closed'),
			footer: (
				<div>
					<Button label="cancel" /> and some random text in here{' '}
					<Button label="update" />
					<Button label="run" />
				</div>
			),
		})
	)
	.add('Small no header', () =>
		getModal({
			isOpen: true,
			children: modalContent,
			onRequestClose: action('modal closed'),
			portalClassName: 'portal-class-name-test',
		})
	)
	.add('Large with directional footer', () =>
		getModal({
			directional: true,
			isOpen: true,
			tagline: 'Enter in details below',
			title: 'New Opportunity',
			children: modalContent,
			onRequestClose: action('modal closed'),
			footer: modalFooter,
			size: 'large',
		})
	)
	.add('Prompt', () =>
		getModal({
			isOpen: true,
			title: 'Delete state - Default',
			children: (
				<div className="slds-p-around--medium">
					Are you sure you want to delete the Default State? This action cannot
					be undone. Are you sure you want to delete the Default State? This
					action cannot be undone. Are you sure you want to delete the Default
					State? This action cannot be undone.{' '}
					<Button className="slds-m-around--medium">Ok, got it!</Button>
				</div>
			), // eslint-disable-line max-len
			prompt: 'error',
			onRequestClose: action('modal closed'),
		})
	);
