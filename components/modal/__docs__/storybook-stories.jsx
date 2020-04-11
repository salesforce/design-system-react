/* eslint-disable react/display-name */
import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';
import { MODAL } from '../../../utilities/constants';
import Modal from '../../modal';
import Combobox from '../../combobox/';
import Timepicker from '../../time-picker';
import Datepicker from '../../date-picker';
import Button from '../../button';
import ComboboxBase from '../../combobox/__examples__/base';
import ModalCustomParentNode from '../__examples__/modal-custom-parent-node';
import SLDSSettings from '../../SLDSSettings';
import HeaderFooter from '../__examples__/header-footer';
import MenuContents from '../__examples__/menu-contents';
import Prompt from '../__examples__/prompt';
import Sizes from '../__examples__/sizes';
import Taglines from '../__examples__/taglines';

import { canUseDOM } from '../../../utilities/execution-environment';

// used by Modal component
if (canUseDOM && document.querySelector('#root')) {
	SLDSSettings.setAppElement('#root');
} else if (canUseDOM) {
	SLDSSettings.setAppElement(document.createElement('div'));
}

const getModal = (props) => <Modal {...props} />;

const modalFooter = [
	<Button key="modalBCancel" label="Cancel" />,
	<Button key="modalBSave" label="Save" variant="brand" />,
];
const leadSourceTypes = [
	{
		id: 1,
		label: 'Third Party Program',
		value: 'A0',
	},
	{
		id: 2,
		label: 'Cold Call',
		value: 'B0',
	},
	{
		id: 3,
		label: 'LinkedIn',
		value: 'C0',
	},
	{
		id: 4,
		label: 'Direct Mail',
		value: 'D0',
	},
	{
		id: 5,
		label: 'Other',
		value: 'E0',
	},
];
const modalContent = (
	<section className="slds-p-around_large">
		<div className="slds-form-element slds-m-bottom_large">
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
		<div className="slds-form-element slds-m-bottom_large">
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

		<div className="slds-form-element slds-m-vertical_large">
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
		<div className="slds-form-element slds-m-vertical_large">
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
		<div className="slds-m-bottom_large">
			<Datepicker
				onDateChange={() => {
					action('date is selected');
				}}
				formatter={(date) => {
					return date ? moment(date).format('M/D/YYYY') : '';
				}}
				parser={(dateString) => {
					return moment(dateString, 'MM-DD-YYYY').toDate();
				}}
			/>
		</div>

		<div className="slds-form-element slds-m-bottom_large">
			<ComboboxBase />
		</div>

		<div className="slds-m-bottom_large">
			<Combobox
				events={{
					onSelect: (event, data) =>
						action('selected: ', data.selection[0].label),
				}}
				labels={{
					label: 'Lead Source',
					placeholder: 'Select Lead Source',
				}}
				menuPosition="relative"
				options={leadSourceTypes}
				selection={[leadSourceTypes[1]]}
				variant="readonly"
			/>
		</div>

		<div className="slds-m-bottom_large">
			<Timepicker
				onDateChange={() => {
					action('time is selected');
				}}
			/>
		</div>

		<div className="slds-form-element slds-m-vertical_large">
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

		<div className="slds-form-element slds-m-vertical_large">
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
		<div className="slds-form-element slds-m-vertical_large">
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
		<div className="slds-form-element slds-m-vertical_large">
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
		<div className="slds-form-element slds-m-vertical_large">
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
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Modal with Custom Parent Node', () => <ModalCustomParentNode />)
	.add('Small', () =>
		getModal({
			assistiveText: {
				closeButton: 'Exit',
			},
			isOpen: true,
			tagline: 'Enter in details below',
			heading: 'New Opportunity',
			children: modalContent,
			onRequestClose: action('modal closed'),
			portalClassName: 'portal-class-name-test',
		})
	)
	.add('Small with footer, not dismissible', () =>
		getModal({
			disableClose: true,
			isOpen: true,
			tagline: 'Enter in details below',
			heading: 'New Opportunity',
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
			heading: 'New Opportunity',
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
	.add('Small no header and custom footer', () =>
		getModal({
			isOpen: true,
			children: modalContent,
			onRequestClose: action('modal closed'),
			portalClassName: 'portal-class-name-test',
			footer: modalFooter,
		})
	)
	.add('Large with directional footer', () =>
		getModal({
			directional: true,
			isOpen: true,
			tagline: 'Enter in details below',
			heading: 'New Opportunity',
			children: modalContent,
			onRequestClose: action('modal closed'),
			footer: modalFooter,
			size: 'large',
		})
	)
	.add('Prompt', () =>
		getModal({
			isOpen: true,
			heading: 'Delete state - Default',
			children: (
				<div className="slds-p-around_medium">
					Are you sure you want to delete the Default State? This action cannot
					be undone. Are you sure you want to delete the Default State? This
					action cannot be undone. Are you sure you want to delete the Default
					State? This action cannot be undone.{' '}
					<Button className="slds-m-around_medium">Ok, got it!</Button>
				</div>
			),
			// eslint-disable-line max-len
			prompt: 'error',
			onRequestClose: action('modal closed'),
		})
	)
	.add('Docs site HeaderFooter', () => <HeaderFooter />)
	.add('Docs site MenuContents', () => <MenuContents />)
	.add('Docs site Prompt', () => <Prompt />)
	.add('Docs site Sizes', () => <Sizes />)
	.add('Docs site Taglines', () => <Taglines />);
