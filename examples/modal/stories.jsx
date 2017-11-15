/* eslint-disable react/display-name */

import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../components/icon-settings';

import { MODAL } from '../../utilities/constants';
import Button from '../../components/button';
import Modal from '../../components/modal';

import HeaderFooter from './header-footer';
import MenuContents from './menu-contents';
import CustomParentNode from './modal-custom-parent-node';
import Prompt from './prompt';
import Sizes from './sizes';
import Taglines from './taglines';

import SLDSSettings from '../../components/SLDSSettings';

SLDSSettings.setAppElement('#root');	// used by Modal component

storiesOf(MODAL, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium"><IconSettings iconPath="/assets/icons">{getStory()}</IconSettings></div>)
	.add('Base', () => (<MenuContents isOpen />))
	.add('Header Footer', () => (<HeaderFooter isOpen />))
	.add('Prompt', () => (<Prompt isOpen />))
	.add('Taglines', () => (<Taglines isOpen />))
	.add('Modal with Custom Parent Node', () => <CustomParentNode isOpen />)
	.add('Small', () => (
		<MenuContents
			closeButtonAssistiveText="Exit"
			isOpen
			tagline="Enter in details below"
			title="New Opportunity"
			onRequestClose={action('modal closed')}
			portalClassName="portal-class-name-test"
			footer={undefined}
		/>))
	.add('Small with footer, not dismissible', () => (
		<MenuContents
			dismissible={false}
			closeButtonAssistiveText="Exit"
			isOpen
			tagline="Enter in details below"
			title="New Opportunity"
			onRequestClose={action('modal closed')}
		/>))
	.add('Small with custom footer', () => (
		<MenuContents
			directional
			isOpen
			tagline="Enter in details below"
			title="New Opportunity"
			onRequestClose={action('modal closed')}
			footer={<div><Button label="Cancel" /> and some random text in here <Button label="Update" /><Button label="Run" variant="brand" /></div>}
		/>))
	.add('Small no header', () => (
		<MenuContents
			isOpen
			onRequestClose={action('modal closed')}
			footer={undefined}
		/>))
	.add('Large with directional footer', () => (
		<MenuContents
			directional
			isOpen
			onRequestClose={action('modal closed')}
			size="large"
		/>));
