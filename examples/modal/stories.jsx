/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../components/icon-settings';

import { MODAL } from '../../utilities/constants';
import Button from '../../components/button';
import Modal from '../../components/modal';

import MenuContentsModal from './menu-contents';
import ModalCustomParentNode from './modal-custom-parent-node';

import SLDSSettings from '../../components/SLDSSettings';

SLDSSettings.setAppElement('#root');	// used by Modal component

storiesOf(MODAL, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium"><IconSettings iconPath="/assets/icons">{getStory()}</IconSettings></div>)
	.add('Base', () => (
		<MenuContentsModal />))
	.add('Modal with Custom Parent Node', () => <ModalCustomParentNode />)
	.add('Small', () => (
		<MenuContentsModal
			closeButtonAssistiveText="Exit"
			isOpen
			tagline="Enter in details below"
			title="New Opportunity"
			onRequestClose={action('modal closed')}
			portalClassName="portal-class-name-test"
			footer={undefined}
		/>))
	.add('Small with footer, not dismissible', () => (
		<MenuContentsModal
			dismissible={false}
			closeButtonAssistiveText="Exit"
			isOpen
			tagline="Enter in details below"
			title="New Opportunity"
			onRequestClose={action('modal closed')}
		/>))
	.add('Small with custom footer', () => (
		<MenuContentsModal
			directional
			isOpen
			tagline="Enter in details below"
			title="New Opportunity"
			onRequestClose={action('modal closed')}
			footer={<div><Button label="Cancel" /> and some random text in here <Button label="Update" /><Button label="Run" variant="brand" /></div>}
		/>))
	.add('Small no header', () => (
		<MenuContentsModal
			isOpen
			onRequestClose={action('modal closed')}
			footer={undefined}
		/>))
	.add('Large with directional footer', () => (
		<MenuContentsModal
			directional
			isOpen
			onRequestClose={action('modal closed')}
			size="large"
		/>))
	.add('Prompt', () => (
		<Modal
			isOpen
			title="Delete state - Default"
			prompt="error"
			onRequestClose={action('modal closed')}
		>
			<div className="slds-p-around--medium">Are you sure you want to delete the Default State? This action cannot be undone. Are you sure you want to delete the Default State? This action cannot be undone. Are you sure you want to delete the Default State? This action cannot be undone. <Button className="slds-m-around--medium">Ok, got it!</Button></div>
		</Modal>
	));
