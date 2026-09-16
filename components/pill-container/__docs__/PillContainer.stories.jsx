import { useState } from 'react';
import IconSettings from '../../icon-settings';
import PillContainer from '../';
import Icon from '../../icon';

const initialOptions = [
	{ id: '1', label: 'Acme', title: 'Acme Corporation' },
	{ id: '2', label: 'Salesforce.com', title: 'Salesforce.com, Inc.' },
	{ id: '3', label: 'Globex', title: 'Globex Corporation' },
];

export default {
	title: 'Components/PillContainer',
	component: PillContainer,
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
		variant: {
			control: { type: 'select' },
			options: ['base', 'bare'],
		},
	},
};

// Default pill container
export const Default = {
	render: () => (
		<PillContainer options={initialOptions} />
	),
};

// Interactive example with removal
export const Interactive = {
	render: () => {
		const [options, setOptions] = useState(initialOptions);

		return (
			<PillContainer
				options={options}
				onRequestRemovePill={(event, { index }) => {
					setOptions((prev) => prev.filter((_, i) => i !== index));
				}}
				onClickPill={(event, { option }) => {
					console.log('Clicked:', option.label);
				}}
			/>
		);
	},
};

// Bare variant
export const BareVariant = {
	render: () => (
		<PillContainer
			options={initialOptions}
			variant="bare"
		/>
	),
};

// With icons
export const WithIcons = {
	render: () => {
		const optionsWithIcons = [
			{
				id: '1',
				label: 'Account',
				icon: <Icon category="standard" name="account" size="small" />,
			},
			{
				id: '2',
				label: 'Contact',
				icon: <Icon category="standard" name="contact" size="small" />,
			},
			{
				id: '3',
				label: 'Opportunity',
				icon: <Icon category="standard" name="opportunity" size="small" />,
			},
		];

		return <PillContainer options={optionsWithIcons} />;
	},
};

// With error state
export const WithError = {
	render: () => {
		const optionsWithError = [
			{ id: '1', label: 'Valid Item' },
			{ id: '2', label: 'Invalid Item', error: true },
			{ id: '3', label: 'Another Valid' },
		];

		return <PillContainer options={optionsWithError} />;
	},
};

// Empty state
export const Empty = {
	render: () => (
		<div>
			<p className="slds-m-bottom_small">When options is empty, the component returns null:</p>
			<PillContainer options={[]} />
			<p className="slds-text-color_weak">(Nothing rendered above)</p>
		</div>
	),
};
