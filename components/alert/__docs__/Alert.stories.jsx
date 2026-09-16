import { useState } from 'react';
import Alert from '../../alert';
import IconSettings from '../../icon-settings';

export default {
	title: 'Components/Alert',
	component: Alert,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium slds-p-top_xx-large">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		variant: {
			control: 'select',
			options: ['info', 'warning', 'error', 'offline'],
		},
		dismissible: {
			control: 'boolean',
		},
	},
	tags: ['autodocs'],
};

/**
 * Info alert for neutral information
 */
export const Info = {
	args: {
		variant: 'info',
		labels: {
			heading: 'Scheduled Maintenance: Sunday March 15, 8:00 AM-10:00 AM PST',
		},
	},
};

/**
 * Warning alert for important notices
 */
export const Warning = {
	args: {
		variant: 'warning',
		labels: {
			heading: 'Your browser is outdated. Please update to the latest version.',
		},
	},
};

/**
 * Error alert for critical issues
 */
export const ErrorAlert = {
	args: {
		variant: 'error',
		labels: {
			heading: 'Your browser has critical security vulnerabilities.',
			headingLink: 'Learn more',
		},
		onClickHeadingLink: () => alert('Link clicked!'),
	},
};

/**
 * Offline alert for connectivity issues
 */
export const Offline = {
	args: {
		variant: 'offline',
		labels: {
			heading: "You're offline. Check your connection and try again.",
		},
	},
};

/**
 * Dismissible alert with close button
 */
export const Dismissible = {
	args: {
		variant: 'info',
		dismissible: true,
		labels: {
			heading: 'This alert can be dismissed.',
		},
		onRequestClose: () => alert('Close button clicked!'),
	},
};

/**
 * Interactive dismissible alert
 */
export const DismissibleInteractive = {
	render: function DismissibleAlertStory() {
		const [isOpen, setIsOpen] = useState(true);

		if (!isOpen) {
			return (
				<button
					className="slds-button slds-button_neutral"
					onClick={() => setIsOpen(true)}
				>
					Show Alert
				</button>
			);
		}

		return (
			<Alert
				variant="warning"
				dismissible
				labels={{
					heading: 'Click the X to dismiss this alert, then click the button to bring it back.',
				}}
				onRequestClose={() => setIsOpen(false)}
			/>
		);
	},
};

/**
 * Alert with heading link
 */
export const WithHeadingLink = {
	args: {
		variant: 'info',
		labels: {
			heading: 'A new version is available.',
			headingLink: 'Update now',
		},
		onClickHeadingLink: () => alert('Update link clicked!'),
	},
};

/**
 * All variants comparison
 */
export const AllVariants = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<Alert
				variant="info"
				labels={{ heading: 'Info: Neutral information message' }}
			/>
			<Alert
				variant="warning"
				labels={{ heading: 'Warning: Please pay attention to this' }}
			/>
			<Alert
				variant="error"
				labels={{ heading: 'Error: Something went wrong' }}
			/>
			<Alert
				variant="offline"
				labels={{ heading: 'Offline: No internet connection' }}
			/>
		</div>
	),
};
