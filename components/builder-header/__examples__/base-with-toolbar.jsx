import React from 'react';

import IconSettings from '../../icon-settings';
import Button from '../../button';
import ButtonGroup from '../../button-group';
import BuilderHeader from '../../builder-header';
import BuilderHeaderNav from '../../builder-header/nav';
import BuilderHeaderNavLink from '../../builder-header/nav-link';
import BuilderHeaderNavDropdown from '../../builder-header/nav-dropdown';
import BuilderHeaderToolbar from '../../builder-header/toolbar';

const Example = (props) => (
	<IconSettings iconPath="/assets/icons">
		<BuilderHeader
			assistiveText={{
				backIcon: 'Back',
				helpIcon: 'Help',
				icon: 'Builder',
			}}
			events={{
				onClickBack: () => console.log('onClickBack'),
				onClickHelp: () => console.log('onClickHelp'),
			}}
			labels={{
				back: 'Back',
				help: 'Help',
				pageType: 'Page Type',
				title: 'App Name',
			}}
			style={{ position: 'relative' }}
		>
			<BuilderHeaderNav>
				<BuilderHeaderNavLink
					assistiveText={{ label: 'Link' }}
					iconCategory="utility"
					iconName="settings"
					label="Link"
				/>
				<BuilderHeaderNavDropdown
					assistiveText={{ icon: 'Dropdown' }}
					iconCategory="utility"
					iconName="page"
					id="dropdown"
					label="Dropdown"
					options={[
						{ label: 'Menu Item One', value: 'A0' },
						{ label: 'Menu Item Two', value: 'B0' },
					]}
				/>
			</BuilderHeaderNav>
			<BuilderHeaderToolbar
				assistiveText={{
					actions: 'Document Actions',
				}}
				onRenderActions={() => (
					<div>
						<Button
							iconCategory="utility"
							iconName="right"
							iconPosition="left"
							label="Run"
						/>
						<Button label="Save As" />
						<Button label="Save" variant="brand" />
					</div>
				)}
			>
				<ButtonGroup label="Canvas Actions" id="button-group-canvas-actions">
					<Button
						assistiveText={{ icon: 'Undo' }}
						iconCategory="utility"
						iconName="undo"
						iconVariant="border"
						variant="icon"
					/>
					<Button
						assistiveText={{ icon: 'Redo' }}
						iconCategory="utility"
						iconName="redo"
						iconVariant="border"
						variant="icon"
					/>
				</ButtonGroup>
				<ButtonGroup label="Edit Actions" id="button-group-edit-actions">
					<Button
						assistiveText={{ icon: 'Cut' }}
						iconCategory="utility"
						iconName="cut"
						iconVariant="border"
						variant="icon"
					/>
					<Button
						assistiveText={{ icon: 'Copy' }}
						iconCategory="utility"
						iconName="copy"
						iconVariant="border"
						variant="icon"
					/>
					<Button
						assistiveText={{ icon: 'Paste' }}
						iconCategory="utility"
						iconName="paste"
						iconVariant="border"
						variant="icon"
					/>
				</ButtonGroup>
			</BuilderHeaderToolbar>
		</BuilderHeader>
	</IconSettings>
);

Example.displayName = 'BuilderHeaderBaseWithToolbar';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
