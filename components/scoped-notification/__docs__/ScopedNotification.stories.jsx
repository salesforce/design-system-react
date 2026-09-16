import IconSettings from '../../icon-settings';
import Icon from '../../icon';
import ScopedNotification from '../';

export default {
	title: 'Components/ScopedNotification',
	component: ScopedNotification,
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
		theme: {
			control: { type: 'select' },
			options: [undefined, 'dark', 'light'],
		},
	},
};

// Default notification
export const Default = {
	render: () => (
		<ScopedNotification>
			<p>
				It looks as if duplicates exist for this lead.{' '}
				<a href="#">View Duplicates.</a>
			</p>
		</ScopedNotification>
	),
};

// Light theme
export const Light = {
	render: () => (
		<ScopedNotification theme="light">
			<p>
				It looks as if duplicates exist for this lead.{' '}
				<a href="#">View Duplicates.</a>
			</p>
		</ScopedNotification>
	),
};

// Dark theme
export const Dark = {
	render: () => (
		<ScopedNotification theme="dark">
			<p>
				It looks as if duplicates exist for this lead.{' '}
				<a href="#">View Duplicates.</a>
			</p>
		</ScopedNotification>
	),
};

// With custom icon
export const WithCustomIcon = {
	render: () => (
		<ScopedNotification
			icon={
				<Icon
					assistiveText={{ label: 'Warning' }}
					category="utility"
					name="warning"
					size="small"
				/>
			}
		>
			<p>This is a warning notification with a custom icon.</p>
		</ScopedNotification>
	),
};

// With custom icon name
export const WithIconName = {
	render: () => (
		<ScopedNotification iconName="announcement">
			<p>This notification uses a different icon name.</p>
		</ScopedNotification>
	),
};

// Multiple notifications
export const MultipleNotifications = {
	render: () => (
		<div className="slds-grid slds-grid_vertical slds-gutters">
			<ScopedNotification>
				<p>Default notification style.</p>
			</ScopedNotification>
			<ScopedNotification theme="light">
				<p>Light theme notification.</p>
			</ScopedNotification>
			<ScopedNotification theme="dark">
				<p>Dark theme notification.</p>
			</ScopedNotification>
		</div>
	),
};
