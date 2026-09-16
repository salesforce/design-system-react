import Avatar from '../../avatar';
import IconSettings from '../../icon-settings';

export default {
	title: 'Components/Avatar',
	component: Avatar,
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
			control: 'select',
			options: ['x-small', 'small', 'medium', 'large'],
		},
		variant: {
			control: 'radio',
			options: ['user', 'entity'],
		},
	},
	tags: ['autodocs'],
};

/**
 * Base avatar with image
 */
export const BaseWithImage = {
	args: {
		imgSrc: 'https://lightningdesignsystem.com/assets/images/avatar2.jpg',
		imgAlt: 'User profile',
		variant: 'user',
		size: 'medium',
	},
};

/**
 * User avatar with initials from label
 */
export const UserInitials = {
	args: {
		label: 'John Smith',
		variant: 'user',
		size: 'medium',
	},
};

/**
 * User avatar with custom initials
 */
export const UserCustomInitials = {
	args: {
		initials: 'AB',
		variant: 'user',
		size: 'medium',
	},
};

/**
 * User avatar with inverse styling (dark text on light background)
 */
export const UserInitialsInverse = {
	args: {
		label: 'Jane Doe',
		variant: 'user',
		size: 'medium',
		inverse: true,
	},
};

/**
 * User icon fallback (when no image or initials)
 */
export const UserIcon = {
	args: {
		variant: 'user',
		size: 'medium',
	},
};

/**
 * Entity avatar with initials
 */
export const EntityInitials = {
	args: {
		label: 'Acme Corporation',
		variant: 'entity',
		size: 'medium',
	},
};

/**
 * Entity icon fallback
 */
export const EntityIcon = {
	args: {
		variant: 'entity',
		size: 'medium',
	},
};

/**
 * All sizes comparison - User variant
 */
export const AllSizes = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
			<div style={{ textAlign: 'center' }}>
				<Avatar label="John Smith" variant="user" size="x-small" />
				<div style={{ marginTop: '0.5rem', fontSize: '12px' }}>x-small</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Avatar label="John Smith" variant="user" size="small" />
				<div style={{ marginTop: '0.5rem', fontSize: '12px' }}>small</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Avatar label="John Smith" variant="user" size="medium" />
				<div style={{ marginTop: '0.5rem', fontSize: '12px' }}>medium</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Avatar label="John Smith" variant="user" size="large" />
				<div style={{ marginTop: '0.5rem', fontSize: '12px' }}>large</div>
			</div>
		</div>
	),
};

/**
 * User vs Entity comparison
 */
export const UserVsEntity = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem' }}>
			<div style={{ textAlign: 'center' }}>
				<Avatar label="John Smith" variant="user" size="large" />
				<div style={{ marginTop: '0.5rem' }}>User (circle)</div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<Avatar label="Acme Corp" variant="entity" size="large" />
				<div style={{ marginTop: '0.5rem' }}>Entity (square)</div>
			</div>
		</div>
	),
};
