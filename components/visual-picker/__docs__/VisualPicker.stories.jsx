import { useState } from 'react';
import IconSettings from '../../icon-settings';
import VisualPicker from '../';
import Radio from '../../radio';
import Checkbox from '../../checkbox';
import Icon from '../../icon';

export default {
	title: 'Components/VisualPicker',
	component: VisualPicker,
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
		size: {
			control: { type: 'select' },
			options: ['medium', 'large'],
		},
		vertical: { control: 'boolean' },
		coverable: { control: 'boolean' },
	},
};

// Price-tile content rendered inside each non-coverable option.
const priceTile = (price) => (
	<span>
		<span className="slds-text-heading_large">{price}</span>
		<span className="slds-text-title">USD/user/month *</span>
	</span>
);

// Radio variant
export const RadioPicker = {
	render: () => {
		const [selected, setSelected] = useState('option1');

		return (
			<VisualPicker id="radio-picker" label="Select an Option">
				<Radio
					id="option1"
					labels={{
						heading: 'Lightning Professional',
						label: 'Complete CRM for teams of any size',
					}}
					checked={selected === 'option1'}
					onChange={() => setSelected('option1')}
					onRenderVisualPicker={() => priceTile('$30')}
				/>
				<Radio
					id="option2"
					labels={{
						heading: 'Lightning Enterprise',
						label: 'Everything you need to take support further',
					}}
					checked={selected === 'option2'}
					onChange={() => setSelected('option2')}
					onRenderVisualPicker={() => priceTile('$150')}
				/>
				<Radio
					id="option3"
					labels={{
						heading: 'Lightning Unlimited',
						label: 'Complete support with enterprise customization',
					}}
					checked={selected === 'option3'}
					onChange={() => setSelected('option3')}
					onRenderVisualPicker={() => priceTile('$300')}
				/>
			</VisualPicker>
		);
	},
};

// Checkbox variant
export const CheckboxPicker = {
	render: () => {
		const [checked, setChecked] = useState({
			accounts: true,
			contacts: false,
			leads: false,
		});

		return (
			<VisualPicker id="checkbox-picker" label="Select Features">
				<Checkbox
					id="accounts"
					labels={{ heading: 'Accounts', label: 'Track companies' }}
					checked={checked.accounts}
					onChange={() =>
						setChecked((prev) => ({ ...prev, accounts: !prev.accounts }))
					}
					onRenderVisualPicker={() => priceTile('$30')}
				/>
				<Checkbox
					id="contacts"
					labels={{ heading: 'Contacts', label: 'Track people' }}
					checked={checked.contacts}
					onChange={() =>
						setChecked((prev) => ({ ...prev, contacts: !prev.contacts }))
					}
					onRenderVisualPicker={() => priceTile('$50')}
				/>
				<Checkbox
					id="leads"
					labels={{ heading: 'Leads', label: 'Track prospects' }}
					checked={checked.leads}
					onChange={() => setChecked((prev) => ({ ...prev, leads: !prev.leads }))}
					onRenderVisualPicker={() => priceTile('$70')}
				/>
			</VisualPicker>
		);
	},
};

// Large size
export const LargeSize = {
	render: () => {
		const [selected, setSelected] = useState('option1');

		return (
			<VisualPicker id="large-picker" label="Select Size" size="large">
				<Radio
					id="option1"
					labels={{ heading: 'Starter', label: 'For small teams' }}
					checked={selected === 'option1'}
					onChange={() => setSelected('option1')}
					onRenderVisualPicker={() => priceTile('$30')}
				/>
				<Radio
					id="option2"
					labels={{ heading: 'Growth', label: 'For growing teams' }}
					checked={selected === 'option2'}
					onChange={() => setSelected('option2')}
					onRenderVisualPicker={() => priceTile('$150')}
				/>
				<Radio
					id="option3"
					labels={{ heading: 'Enterprise', label: 'For large orgs' }}
					checked={selected === 'option3'}
					onChange={() => setSelected('option3')}
					onRenderVisualPicker={() => priceTile('$300')}
				/>
			</VisualPicker>
		);
	},
};

// Vertical layout
export const VerticalLayout = {
	render: () => {
		const [selected, setSelected] = useState('option1');

		return (
			<VisualPicker id="vertical-picker" label="Select Plan" vertical>
				<Radio
					id="option1"
					labels={{ heading: 'Starter', label: 'For small teams' }}
					checked={selected === 'option1'}
					onChange={() => setSelected('option1')}
					onRenderVisualPicker={() => priceTile('$30')}
				/>
				<Radio
					id="option2"
					labels={{ heading: 'Professional', label: 'For growing teams' }}
					checked={selected === 'option2'}
					onChange={() => setSelected('option2')}
					onRenderVisualPicker={() => priceTile('$150')}
				/>
				<Radio
					id="option3"
					labels={{ heading: 'Enterprise', label: 'For large orgs' }}
					checked={selected === 'option3'}
					onChange={() => setSelected('option3')}
					onRenderVisualPicker={() => priceTile('$300')}
				/>
			</VisualPicker>
		);
	},
};

// Coverable — icons cover the tile, swapped for a check when selected.
const coverableSelected = () => (
	<Icon category="utility" name="check" colorVariant="base" size="large" />
);

export const Coverable = {
	render: () => {
		const [selected, setSelected] = useState('option1');

		return (
			<VisualPicker
				id="coverable-picker"
				label="Select with Cover Effect"
				coverable
			>
				<Radio
					id="option1"
					labels={{ label: 'Connected App' }}
					checked={selected === 'option1'}
					onChange={() => setSelected('option1')}
					onRenderVisualPickerSelected={coverableSelected}
					onRenderVisualPickerNotSelected={() => (
						<Icon category="utility" name="connected_apps" size="large" />
					)}
				/>
				<Radio
					id="option2"
					labels={{ label: 'Custom App' }}
					checked={selected === 'option2'}
					onChange={() => setSelected('option2')}
					onRenderVisualPickerSelected={coverableSelected}
					onRenderVisualPickerNotSelected={() => (
						<Icon category="utility" name="custom_apps" size="large" />
					)}
				/>
			</VisualPicker>
		);
	},
};
