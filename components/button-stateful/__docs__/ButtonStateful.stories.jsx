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
			options: [
				'base',
				'neutral',
				'brand',
				'destructive',
				'success',
				'text',
				'icon',
				'icon-filled',
			],
		},
	},
};

// ButtonStateful is controlled, so each story keeps `isActive` in state.
const StatefulButton = (props) => {
	const [isActive, setIsActive] = useState(false);
	return (
		<ButtonStateful
			isActive={isActive}
			onClick={(event, data) => setIsActive(data.isActive)}
			{...props}
		/>
	);
};

// Default stateful button
export const Default = {
	render: () => (
		<StatefulButton
			stateOne={{ iconName: 'add', label: 'Follow' }}
			stateTwo={{ iconName: 'check', label: 'Following' }}
			stateThree={{ iconName: 'close', label: 'Unfollow' }}
		/>
	),
};

// Controlled example
export const Controlled = {
	render: () => {
		const [isActive, setIsActive] = useState(false);

		return (
			<div>
				<p className="slds-m-bottom_small">Active: {isActive ? 'Yes' : 'No'}</p>
				<ButtonStateful
					isActive={isActive}
					onClick={(event, data) => setIsActive(data.isActive)}
					stateOne={{ iconName: 'add', label: 'Follow' }}
					stateTwo={{ iconName: 'check', label: 'Following' }}
					stateThree={{ iconName: 'close', label: 'Unfollow' }}
				/>
			</div>
		);
	},
};

// Success variant
export const SuccessVariant = {
	render: () => (
		<StatefulButton
			variant="success"
			stateOne={{ iconName: 'add', label: 'Follow' }}
			stateTwo={{ iconName: 'check', label: 'Following' }}
			stateThree={{ iconName: 'close', label: 'Unfollow' }}
		/>
	),
};

// Text variant
export const TextVariant = {
	render: () => (
		<StatefulButton
			variant="text"
			stateOne={{ iconName: 'add', label: 'Follow' }}
			stateTwo={{ iconName: 'check', label: 'Following' }}
			stateThree={{ iconName: 'close', label: 'Unfollow' }}
		/>
	),
};

// Icon variant
export const IconVariant = {
	render: () => (
		<StatefulButton
			variant="icon"
			iconName="like"
			assistiveText={{ icon: 'Like' }}
		/>
	),
};

// Icon filled variant
export const IconFilledVariant = {
	render: () => (
		<StatefulButton
			variant="icon-filled"
			iconName="like"
			assistiveText={{ icon: 'Like' }}
		/>
	),
};

// Custom states
export const CustomStates = {
	render: () => (
		<StatefulButton
			stateOne={{ iconName: 'like', label: 'Like' }}
			stateTwo={{ iconName: 'check', label: 'Liked' }}
			stateThree={{ iconName: 'close', label: 'Unlike' }}
		/>
	),
};

// Disabled
export const Disabled = {
	render: () => (
		<StatefulButton
			disabled
			stateOne={{ iconName: 'add', label: 'Follow' }}
			stateTwo={{ iconName: 'check', label: 'Following' }}
			stateThree={{ iconName: 'close', label: 'Unfollow' }}
		/>
	),
};
