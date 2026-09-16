import IconSettings from '../../icon-settings';
import Icon from '../../icon';
import Avatar from '../../avatar';
import Pill from '../';

export default {
	title: 'Components/Pill',
	component: Pill,
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
			options: ['link', 'option'],
		},
		bare: {
			control: 'boolean',
		},
		hasError: {
			control: 'boolean',
		},
	},
};

// Default linked pill
export const LinkedPill = {
	args: {
		labels: {
			label: 'Linked Pill',
			removeTitle: 'Remove',
		},
		href: 'https://salesforce.com',
		variant: 'link',
		onRemove: () => console.log('Pill removed'),
	},
};

// Unlinked pill
export const UnlinkedPill = {
	args: {
		labels: {
			label: 'Unlinked Pill',
			removeTitle: 'Remove',
		},
		variant: 'option',
		onRemove: () => console.log('Pill removed'),
	},
};

// Pill with icon
export const WithIcon = {
	render: () => (
		<Pill
			labels={{ label: 'Pill with Icon', removeTitle: 'Remove' }}
			icon={
				<Icon
					assistiveText={{ label: 'Account' }}
					category="standard"
					name="account"
				/>
			}
			onRemove={() => console.log('Pill removed')}
		/>
	),
};

// Pill with avatar
export const WithAvatar = {
	render: () => (
		<Pill
			labels={{ label: 'Pill with Avatar', removeTitle: 'Remove' }}
			avatar={
				<Avatar
					imgSrc="https://lightningdesignsystem.com/assets/images/avatar2.jpg"
					variant="user"
					size="x-small"
				/>
			}
			onRemove={() => console.log('Pill removed')}
		/>
	),
};

// Bare variant
export const BarePill = {
	args: {
		labels: {
			label: 'Bare Pill',
			removeTitle: 'Remove',
		},
		bare: true,
		variant: 'option',
		onRemove: () => console.log('Pill removed'),
	},
};

// Error state
export const ErrorPill = {
	args: {
		labels: {
			label: 'Error Pill',
			removeTitle: 'Remove',
		},
		hasError: true,
		variant: 'option',
		onRemove: () => console.log('Pill removed'),
	},
};

// Truncated pill (long text)
export const TruncatedPill = {
	render: () => (
		<div style={{ width: '200px' }}>
			<Pill
				labels={{
					label: 'This is a very long pill label that should be truncated',
					removeTitle: 'Remove',
				}}
				onRemove={() => console.log('Pill removed')}
			/>
		</div>
	),
};

// Multiple pills
export const MultiplePills = {
	render: () => (
		<div className="slds-pill_container">
			<Pill
				labels={{ label: 'Pill 1', removeTitle: 'Remove' }}
				onRemove={() => console.log('Pill 1 removed')}
			/>
			<Pill
				labels={{ label: 'Pill 2', removeTitle: 'Remove' }}
				onRemove={() => console.log('Pill 2 removed')}
			/>
			<Pill
				labels={{ label: 'Pill 3', removeTitle: 'Remove' }}
				onRemove={() => console.log('Pill 3 removed')}
			/>
		</div>
	),
};
