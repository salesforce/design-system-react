import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../../button';
import ButtonGroup from '../../button-group';
import Dropdown from '../../menu-dropdown';
import BuilderHeader from '../../builder-header';
import BuilderHeaderNav from '../../builder-header/nav';
import BuilderHeaderNavLink from '../../builder-header/nav-link';
import BuilderHeaderToolbar from '../../builder-header/toolbar';
import IconSettings from '../../icon-settings';

import { BUILDER_HEADER } from '../../../utilities/constants';

storiesOf(BUILDER_HEADER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => (
		<BuilderHeader
			assistiveText={{ icon: 'Builder', actions: 'Document Actions' }}
			labels={{
				back: 'Back',
				help: 'Help',
				pageType: 'Page Type',
				title: 'App Name',
			}}
			onRenderActions={() => (
				<>
					<Button
						iconCategory="utility"
						iconName="right"
						iconPosition="left"
						label="Run"
					/>
					<Button label="Save As" />
					<Button label="Save" variant="brand" />
				</>
			)}
		>
			<BuilderHeaderNav>
				<BuilderHeaderNavLink
					iconCategory="utility"
					iconName="settings"
					label="Link"
					href="javascript:void(0);"
				/>
				<Dropdown
					iconCategory="utility"
					iconName="page"
					label="Dropdown"
					options={[
						{ label: 'Menu Item One', value: 'A0' },
						{ label: 'Menu Item Two', value: 'B0' },
					]}
				/>
			</BuilderHeaderNav>
			<BuilderHeaderToolbar>
				<ButtonGroup label="Canvas Actions">
					<Button
						assistiveText={{ icon: 'Undo' }}
						className="slds-button_icon-border"
						iconCategory="utility"
						iconName="undo"
						variant="icon"
					/>
					<Button
						assistiveText={{ icon: 'Redo' }}
						className="slds-button_icon-border"
						iconCategory="utility"
						iconName="redo"
						variant="icon"
					/>
				</ButtonGroup>
				<ButtonGroup label="Edit Actions">
					<Button
						assistiveText={{ icon: 'Cut' }}
						className="slds-button_icon-border"
						iconCategory="utility"
						iconName="cut"
						variant="icon"
					/>
					<Button
						assistiveText={{ icon: 'Copy' }}
						className="slds-button_icon-border"
						iconCategory="utility"
						iconName="copy"
						variant="icon"
					/>
					<Button
						assistiveText={{ icon: 'Paste' }}
						className="slds-button_icon-border"
						iconCategory="utility"
						iconName="paste"
						variant="icon"
					/>
				</ButtonGroup>
			</BuilderHeaderToolbar>
		</BuilderHeader>
	));
