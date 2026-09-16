import Badge from '../../badge';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

export default {
	title: 'Components/Badge',
	component: Badge,
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
		color: {
			control: 'select',
			options: ['default', 'inverse', 'light', 'success', 'warning', 'error'],
		},
		iconAlignment: {
			control: 'radio',
			options: ['left', 'right'],
		},
	},
	tags: ['autodocs'],
};

/**
 * Default badge
 */
export const Default = {
	args: {
		content: 'Badge Label',
	},
};

/**
 * Badge with icon on the left
 */
export const WithIconLeft = {
	args: {
		content: 'Badge Label',
		iconAlignment: 'left',
		icon: (
			<Icon
				category="utility"
				name="moneybag"
				size="xx-small"
				colorVariant="light"
			/>
		),
	},
};

/**
 * Badge with icon on the right
 */
export const WithIconRight = {
	args: {
		content: 'Badge Label',
		iconAlignment: 'right',
		icon: (
			<Icon
				category="utility"
				name="moneybag"
				size="xx-small"
				colorVariant="light"
			/>
		),
	},
};

/**
 * Inverse badge (for dark backgrounds)
 */
export const InverseBadge = {
	args: {
		content: 'Inverse Badge',
		color: 'inverse',
	},
};

/**
 * Light badge
 */
export const LightBadge = {
	args: {
		content: 'Light Badge',
		color: 'light',
	},
};

/**
 * Success badge
 */
export const SuccessBadge = {
	args: {
		content: 'Success',
		color: 'success',
	},
};

/**
 * Warning badge
 */
export const WarningBadge = {
	args: {
		content: 'Warning',
		color: 'warning',
	},
};

/**
 * Error badge
 */
export const ErrorBadge = {
	args: {
		content: 'Error',
		color: 'error',
	},
};

/**
 * All color variants displayed together
 */
export const AllColorVariants = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
			<Badge content="Default" />
			<Badge content="Inverse" color="inverse" />
			<Badge content="Light" color="light" />
			<Badge content="Success" color="success" />
			<Badge content="Warning" color="warning" />
			<Badge content="Error" color="error" />
		</div>
	),
};
