import IconSettings from '../../icon-settings';
import Button from '../../button';
import ButtonGroup from '../';

export default {
	title: 'Components/ButtonGroup',
	component: ButtonGroup,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: [undefined, 'checkbox', 'list'],
		},
	},
};

// Default button group
export const Default = {
	render: () => (
		<ButtonGroup>
			<Button label="Refresh" />
			<Button label="Edit" />
			<Button label="Save" />
		</ButtonGroup>
	),
};

// Button group with icon buttons
export const IconGroup = {
	render: () => (
		<ButtonGroup>
			<Button
				assistiveText={{ icon: 'Chart' }}
				iconCategory="utility"
				iconName="chart"
				iconVariant="border-filled"
				variant="icon"
			/>
			<Button
				assistiveText={{ icon: 'Filter' }}
				iconCategory="utility"
				iconName="filterList"
				iconVariant="border-filled"
				variant="icon"
			/>
			<Button
				assistiveText={{ icon: 'Sort' }}
				iconCategory="utility"
				iconName="sort"
				iconVariant="border-filled"
				variant="icon"
			/>
		</ButtonGroup>
	),
};

// List variant
export const ListVariant = {
	render: () => (
		<ButtonGroup variant="list">
			<Button label="Refresh" />
			<Button label="Edit" />
			<Button label="Save" />
		</ButtonGroup>
	),
};

// With label
export const WithLabel = {
	render: () => (
		<ButtonGroup labels={{ label: 'My Button Group' }}>
			<Button label="Option A" />
			<Button label="Option B" />
			<Button label="Option C" />
		</ButtonGroup>
	),
};

// Mixed button types
export const MixedButtons = {
	render: () => (
		<ButtonGroup>
			<Button label="Neutral" />
			<Button label="Brand" variant="brand" />
			<Button
				assistiveText={{ icon: 'More' }}
				iconCategory="utility"
				iconName="down"
				iconVariant="border-filled"
				variant="icon"
			/>
		</ButtonGroup>
	),
};

// Single button
export const SingleButton = {
	render: () => (
		<ButtonGroup>
			<Button label="Single Button" />
		</ButtonGroup>
	),
};
