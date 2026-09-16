import IconSettings from '../../icon-settings';
import Tabs from '../';
import TabsPanel from '../panel';

export default {
	title: 'Components/Tabs',
	component: Tabs,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ maxWidth: '800px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'scoped', 'vertical'],
		},
	},
};

// Default tabs
export const Default = {
	render: () => (
		<Tabs>
			<TabsPanel label="Tab 1">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Tab 1 Content</h2>
				<p>This is the content for Tab 1.</p>
			</TabsPanel>
			<TabsPanel label="Tab 2">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Tab 2 Content</h2>
				<p>This is the content for Tab 2.</p>
			</TabsPanel>
			<TabsPanel label="Tab 3">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Tab 3 Content</h2>
				<p>This is the content for Tab 3.</p>
			</TabsPanel>
		</Tabs>
	),
};

// Scoped variant
export const Scoped = {
	render: () => (
		<Tabs variant="scoped">
			<TabsPanel label="Tab 1">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Tab 1 Content</h2>
				<p>Scoped tabs have a different visual style.</p>
			</TabsPanel>
			<TabsPanel label="Tab 2">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Tab 2 Content</h2>
				<p>This is the content for Tab 2.</p>
			</TabsPanel>
			<TabsPanel label="Tab 3">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Tab 3 Content</h2>
				<p>This is the content for Tab 3.</p>
			</TabsPanel>
		</Tabs>
	),
};

// Vertical variant
export const Vertical = {
	render: () => (
		<Tabs variant="vertical">
			<TabsPanel label="Tab 1">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Tab 1 Content</h2>
				<p>Vertical tabs are displayed on the left side.</p>
			</TabsPanel>
			<TabsPanel label="Tab 2">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Tab 2 Content</h2>
				<p>This is the content for Tab 2.</p>
			</TabsPanel>
			<TabsPanel label="Tab 3">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Tab 3 Content</h2>
				<p>This is the content for Tab 3.</p>
			</TabsPanel>
		</Tabs>
	),
};

// With disabled tab
export const WithDisabledTab = {
	render: () => (
		<Tabs>
			<TabsPanel label="Enabled">
				<p>This tab is enabled and can be selected.</p>
			</TabsPanel>
			<TabsPanel label="Disabled" disabled>
				<p>This tab is disabled.</p>
			</TabsPanel>
			<TabsPanel label="Also Enabled">
				<p>This tab is also enabled.</p>
			</TabsPanel>
		</Tabs>
	),
};

// Default selected index
export const DefaultSelectedIndex = {
	render: () => (
		<Tabs defaultSelectedIndex={1}>
			<TabsPanel label="First">
				<p>First tab content.</p>
			</TabsPanel>
			<TabsPanel label="Second (Default)">
				<p>This tab is selected by default.</p>
			</TabsPanel>
			<TabsPanel label="Third">
				<p>Third tab content.</p>
			</TabsPanel>
		</Tabs>
	),
};
