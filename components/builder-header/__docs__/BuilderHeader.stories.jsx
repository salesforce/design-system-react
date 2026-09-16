import IconSettings from '../../icon-settings';
import Button from '../../button';
import ButtonGroup from '../../button-group';
import Icon from '../../icon';
import Tooltip from '../../tooltip';
import BuilderHeader from '../';
import BuilderHeaderNav from '../nav';
import BuilderHeaderNavLink from '../nav-link';
import BuilderHeaderNavDropdown from '../nav-dropdown';
import BuilderHeaderToolbar from '../toolbar';
import BuilderHeaderUtilities from '../utilities';

export default {
	title: 'Components/BuilderHeader',
	component: BuilderHeader,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// Default builder header
export const Default = {
	render: () => (
		<BuilderHeader
			events={{
				onClickBack: () => console.log('Back clicked'),
				onClickHelp: () => console.log('Help clicked'),
			}}
		/>
	),
};

// Custom labels
export const CustomLabels = {
	render: () => (
		<BuilderHeader
			labels={{
				title: 'My App Builder',
				pageType: 'Home Page',
				back: 'Go Back',
				help: 'Get Help',
			}}
			events={{
				onClickBack: () => console.log('Back clicked'),
				onClickHelp: () => console.log('Help clicked'),
			}}
		/>
	),
};

// Custom icon
export const CustomIcon = {
	render: () => (
		<BuilderHeader
			iconCategory="standard"
			iconName="account"
			labels={{
				title: 'Account Builder',
				pageType: 'Account Details',
			}}
			events={{
				onClickBack: () => console.log('Back clicked'),
				onClickHelp: () => console.log('Help clicked'),
			}}
		/>
	),
};

// Shared nav used by the toolbar-bearing stories below.
const BuilderNav = () => (
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
);

// Shared canvas/edit button groups rendered inside the toolbar.
const ToolbarButtonGroups = () => (
	<>
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
	</>
);

// Save/Run/Save As action cluster shared by the save-state stories.
const SaveActions = () => (
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
);

const builderProps = {
	assistiveText: { backIcon: 'Back', helpIcon: 'Help', icon: 'Builder' },
	labels: { back: 'Back', help: 'Help', pageType: 'Page Type', title: 'App Name' },
	style: { position: 'relative' },
};

// Full builder header with a toolbar: nav + canvas/edit button groups + Run/Save As/Save.
export const WithToolbar = {
	render: () => (
		<BuilderHeader
			{...builderProps}
			events={{
				onClickBack: () => console.log('onClickBack'),
				onClickHelp: () => console.log('onClickHelp'),
			}}
		>
			<BuilderNav />
			<BuilderHeaderToolbar
				assistiveText={{ actions: 'Document Actions' }}
				onRenderActions={() => (
					<div>
						<SaveActions />
					</div>
				)}
			>
				<ToolbarButtonGroups />
			</BuilderHeaderToolbar>
		</BuilderHeader>
	),
};

// Utilities region: a secondary nav (back link + help dropdown) on the right side.
export const WithUtilities = {
	render: () => (
		<BuilderHeader
			{...builderProps}
			events={{
				onClickBack: () => console.log('onClickBack'),
				onClickHelp: () => console.log('onClickHelp'),
			}}
		>
			<BuilderNav />
			<BuilderHeaderUtilities>
				<BuilderHeaderNavLink
					assistiveText={{ label: 'Back' }}
					iconCategory="utility"
					iconName="back"
					label="Back"
					onClick={() => console.log('link/onClick')}
				/>
				<BuilderHeaderNavDropdown
					assistiveText={{ icon: 'Dropdown' }}
					iconCategory="utility"
					iconName="help"
					id="utilities-dropdown"
					label="Help"
					menuPosition="overflowBoundaryElement"
					options={[
						{
							label: 'Builder Help',
							value: 'A0',
							leftIcon: { name: 'help', category: 'utility' },
						},
						{
							label: 'Keyboard Shortcuts',
							value: 'B0',
							leftIcon: { name: 'keyboard_dismiss', category: 'utility' },
						},
					]}
					onSelect={() => console.log('dropdown/onSelect')}
					width="x-small"
				/>
			</BuilderHeaderUtilities>
		</BuilderHeader>
	),
};

// Save success: a green check + "Saved" status text in the toolbar actions.
export const SuccessfulSave = {
	render: () => (
		<BuilderHeader {...builderProps}>
			<BuilderNav />
			<BuilderHeaderToolbar
				assistiveText={{ actions: 'Document Actions' }}
				onRenderActions={() => (
					<div>
						<Icon
							category="utility"
							className="slds-m-right_x-small"
							name="check"
							size="x-small"
							style={{ fill: '#4BCA81' }}
						/>
						<span className="slds-color__text_gray-10 slds-align-middle slds-m-right_small">
							Saved
						</span>
						<SaveActions />
					</div>
				)}
			>
				<ToolbarButtonGroups />
			</BuilderHeaderToolbar>
		</BuilderHeader>
	),
};

// After a save settles: relative "Saved 5 mins ago" status text with a tooltip.
export const AfterSuccessfulSave = {
	render: () => (
		<BuilderHeader {...builderProps}>
			<BuilderNav />
			<BuilderHeaderToolbar
				assistiveText={{ actions: 'Document Actions' }}
				onRenderActions={() => (
					<div>
						<Tooltip
							id="status-tooltip"
							align="bottom"
							content="Last modified on June 1, 2018 by SysAdmin"
						>
							<span
								className="slds-color__text_gray-10 slds-align-middle slds-m-right_small"
								tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
							>
								Saved 5 mins ago
							</span>
						</Tooltip>
						<SaveActions />
					</div>
				)}
			>
				<ToolbarButtonGroups />
			</BuilderHeaderToolbar>
		</BuilderHeader>
	),
};

// Save failure: status text plus an error popover trigger in the toolbar.
export const FailedSave = {
	render: () => (
		<BuilderHeader {...builderProps}>
			<BuilderNav />
			<BuilderHeaderToolbar
				assistiveText={{ actions: 'Document Actions' }}
				onRenderActions={() => (
					<div>
						<Tooltip
							id="status-tooltip"
							align="bottom"
							content="Last modified on June 1, 2018 by SysAdmin"
						>
							<button
								type="button"
								className="slds-button slds-color__text_gray-10 slds-align-middle slds-m-right_x-small"
							>
								Saved 45 mins ago
							</button>
						</Tooltip>
						<Button
							assistiveText={{ icon: 'Error' }}
							iconCategory="utility"
							iconClassName="slds-icon-text-error"
							iconName="error"
							iconSize="medium"
							iconVariant="container"
							colorVariant="error"
							variant="icon"
						/>
						<SaveActions />
					</div>
				)}
			>
				<ToolbarButtonGroups />
			</BuilderHeaderToolbar>
		</BuilderHeader>
	),
};
