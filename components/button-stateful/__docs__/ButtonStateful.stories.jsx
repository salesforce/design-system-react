import { useState } from 'react';
import IconSettings from '../../icon-settings';
import ButtonStateful from '../';

export default {
	title: 'Components/ButtonStateful',
	component: ButtonStateful,
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
			options: ['base', 'neutral', 'brand', 'destructive', 'icon', 'icon-filled'],
		},
	},
};

// Default stateful button
export const Default = {
	render: () => (
		<ButtonStateful
			stateOne={{ iconName: 'add', label: 'Follow' }}
			stateTwo={{ iconName: 'check', label: 'Following' }}
			stateThree={{ iconName: 'close', label: 'Unfollow' }}
		/>
	),
};

// Controlled example
export const Controlled = {
	render: () => {
		const [active, setActive] = useState(false);

		return (
			<div>
				<p className="slds-m-bottom_small">Active: {active ? 'Yes' : 'No'}</p>
				<ButtonStateful
					active={active}
					onClick={() => setActive(!active)}
					stateOne={{ iconName: 'add', label: 'Follow' }}
					stateTwo={{ iconName: 'check', label: 'Following' }}
					stateThree={{ iconName: 'close', label: 'Unfollow' }}
				/>
			</div>
		);
	},
};

// Icon variant
export const IconVariant = {
	render: () => (
		<ButtonStateful
			variant="icon"
			iconName="like"
			assistiveText={{ icon: 'Like' }}
		/>
	),
};

// Icon filled variant
export const IconFilledVariant = {
	render: () => (
		<ButtonStateful
			variant="icon-filled"
			iconName="like"
			assistiveText={{ icon: 'Like' }}
		/>
	),
};

// Custom states
export const CustomStates = {
	render: () => (
		<ButtonStateful
			stateOne={{ iconName: 'like', label: 'Like' }}
			stateTwo={{ iconName: 'check', label: 'Liked' }}
			stateThree={{ iconName: 'close', label: 'Unlike' }}
		/>
	),
};

// Disabled
export const Disabled = {
	render: () => (
		<ButtonStateful
			disabled
			stateOne={{ iconName: 'add', label: 'Follow' }}
			stateTwo={{ iconName: 'check', label: 'Following' }}
			stateThree={{ iconName: 'close', label: 'Unfollow' }}
		/>
	),
};
