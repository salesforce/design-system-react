import { useState } from 'react';
import IconSettings from '../../icon-settings';
import ExpandableSection from '../';

export default {
	title: 'Components/ExpandableSection',
	component: ExpandableSection,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ maxWidth: '600px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		isOpen: { control: 'boolean' },
		nonCollapsible: { control: 'boolean' },
	},
};

// Default expandable section (uncontrolled)
export const Default = {
	render: () => (
		<ExpandableSection title="Expandable Section">
			<p>This is the content of the expandable section. It can contain any React content.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		</ExpandableSection>
	),
};

// Initially collapsed
export const InitiallyCollapsed = {
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<ExpandableSection
				title="Initially Collapsed"
				isOpen={isOpen}
				onToggleOpen={(e, { isOpen: currentOpen }) => setIsOpen(!currentOpen)}
			>
				<p>This section starts collapsed. Click to expand.</p>
			</ExpandableSection>
		);
	},
};

// Non-collapsible
export const NonCollapsible = {
	render: () => (
		<ExpandableSection title="Non-Collapsible Section" nonCollapsible>
			<p>This section cannot be collapsed. It&apos;s always visible.</p>
		</ExpandableSection>
	),
};

// Controlled example
export const Controlled = {
	render: () => {
		const [isOpen, setIsOpen] = useState(true);

		return (
			<div>
				<button
					className="slds-button slds-button_neutral slds-m-bottom_medium"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? 'Collapse' : 'Expand'} Section
				</button>
				<ExpandableSection
					title="Controlled Section"
					isOpen={isOpen}
					onToggleOpen={(e, { isOpen: currentOpen }) => setIsOpen(!currentOpen)}
				>
					<p>This section is controlled by external state.</p>
				</ExpandableSection>
			</div>
		);
	},
};

// Multiple sections
export const MultipleSections = {
	render: () => (
		<div className="slds-grid slds-grid_vertical">
			<ExpandableSection title="Section 1">
				<p>Content for section 1.</p>
			</ExpandableSection>
			<ExpandableSection title="Section 2">
				<p>Content for section 2.</p>
			</ExpandableSection>
			<ExpandableSection title="Section 3">
				<p>Content for section 3.</p>
			</ExpandableSection>
		</div>
	),
};

// With rich content
export const WithRichContent = {
	render: () => (
		<ExpandableSection title="Rich Content Section">
			<div className="slds-grid slds-wrap">
				<div className="slds-col slds-size_1-of-2 slds-p-around_small">
					<div className="slds-box">
						<h4 className="slds-text-heading_small">Item 1</h4>
						<p>Description for item 1</p>
					</div>
				</div>
				<div className="slds-col slds-size_1-of-2 slds-p-around_small">
					<div className="slds-box">
						<h4 className="slds-text-heading_small">Item 2</h4>
						<p>Description for item 2</p>
					</div>
				</div>
			</div>
		</ExpandableSection>
	),
};
