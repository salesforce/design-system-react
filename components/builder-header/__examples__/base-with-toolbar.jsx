import React from 'react';
import IconSettings from '../../icon-settings';
import Button from '../../button';
import ButtonGroup from '../../button-group';
import Dropdown from '../../menu-dropdown';
import BuilderHeader from '../../builder-header';
import BuilderHeaderNav from '../../builder-header/nav';
import BuilderHeaderNavLink from '../../builder-header/nav-link';
import BuilderHeaderToolbar from '../../builder-header/toolbar';

const Example = (props) => (
	<IconSettings iconPath="/assets/icons">
		<BuilderHeader
			assistiveText={{
				backIcon: 'Back',
				helpIcon: 'Help',
				icon: 'Builder',
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
				<Dropdown
					assistiveText={{ icon: 'Dropdown' }}
					iconCategory="utility"
					iconName="page"
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
	</IconSettings>
);

Example.displayName = 'BuilderHeaderBaseWithToolbar';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
