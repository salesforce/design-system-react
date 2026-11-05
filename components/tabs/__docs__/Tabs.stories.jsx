import { useState } from 'react';

import IconSettings from '../../icon-settings';
import Tabs from '../';
import TabsPanel from '../panel';

// Tabs is controlled: keep the selected `value` in state and update it in `onSelect`.
// eslint-disable-next-line react/prop-types
const ControlledTabs = ({ initialValue, ...props }) => {
	const [value, setValue] = useState(initialValue);
	return (
		<Tabs
			{...props}
			onSelect={(event, data) => setValue(data.value)}
			value={value}
		/>
	);
};

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
		<ControlledTabs initialValue="tab-1">
			<TabsPanel label="Tab 1" value="tab-1">
				<h2 className="slds-text-heading_small slds-m-bottom_small">
					Tab 1 Content
				</h2>
				<p>This is the content for Tab 1.</p>
			</TabsPanel>
			<TabsPanel label="Tab 2" value="tab-2">
				<h2 className="slds-text-heading_small slds-m-bottom_small">
					Tab 2 Content
				</h2>
				<p>This is the content for Tab 2.</p>
			</TabsPanel>
			<TabsPanel label="Tab 3" value="tab-3">
				<h2 className="slds-text-heading_small slds-m-bottom_small">
					Tab 3 Content
				</h2>
				<p>This is the content for Tab 3.</p>
			</TabsPanel>
		</ControlledTabs>
	),
};

// Scoped variant
export const Scoped = {
	render: () => (
		<ControlledTabs initialValue="tab-1" variant="scoped">
			<TabsPanel label="Tab 1" value="tab-1">
				<h2 className="slds-text-heading_small slds-m-bottom_small">
					Tab 1 Content
				</h2>
				<p>Scoped tabs have a different visual style.</p>
			</TabsPanel>
			<TabsPanel label="Tab 2" value="tab-2">
				<h2 className="slds-text-heading_small slds-m-bottom_small">
					Tab 2 Content
				</h2>
				<p>This is the content for Tab 2.</p>
			</TabsPanel>
			<TabsPanel label="Tab 3" value="tab-3">
				<h2 className="slds-text-heading_small slds-m-bottom_small">
					Tab 3 Content
				</h2>
				<p>This is the content for Tab 3.</p>
			</TabsPanel>
		</ControlledTabs>
	),
};

// Vertical variant
export const Vertical = {
	render: () => (
		<ControlledTabs initialValue="tab-1" variant="vertical">
			<TabsPanel label="Tab 1" value="tab-1">
				<h2 className="slds-text-heading_small slds-m-bottom_small">
					Tab 1 Content
				</h2>
				<p>Vertical tabs are displayed on the left side.</p>
			</TabsPanel>
			<TabsPanel label="Tab 2" value="tab-2">
				<h2 className="slds-text-heading_small slds-m-bottom_small">
					Tab 2 Content
				</h2>
				<p>This is the content for Tab 2.</p>
			</TabsPanel>
			<TabsPanel label="Tab 3" value="tab-3">
				<h2 className="slds-text-heading_small slds-m-bottom_small">
					Tab 3 Content
				</h2>
				<p>This is the content for Tab 3.</p>
			</TabsPanel>
		</ControlledTabs>
	),
};

// With disabled tab
export const WithDisabledTab = {
	render: () => (
		<ControlledTabs initialValue="0">
			<TabsPanel label="Enabled">
				<p>This tab is enabled and can be selected.</p>
			</TabsPanel>
			<TabsPanel label="Disabled" disabled>
				<p>This tab is disabled.</p>
			</TabsPanel>
			<TabsPanel label="Also Enabled">
				<p>This tab is also enabled.</p>
			</TabsPanel>
		</ControlledTabs>
	),
};

// Initial value: the parent decides which tab starts selected
export const InitialValue = {
	render: () => (
		<ControlledTabs initialValue="second">
			<TabsPanel label="First" value="first">
				<p>First tab content.</p>
			</TabsPanel>
			<TabsPanel label="Second (Initial)" value="second">
				<p>This tab is selected initially.</p>
			</TabsPanel>
			<TabsPanel label="Third" value="third">
				<p>Third tab content.</p>
			</TabsPanel>
		</ControlledTabs>
	),
};
