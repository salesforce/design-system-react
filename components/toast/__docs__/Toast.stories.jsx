import IconSettings from '../../icon-settings';
import Toast from '../';

export default {
	title: 'Components/Toast',
	component: Toast,
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
			options: ['info', 'success', 'warning', 'error'],
		},
		isDismissible: {
			control: 'boolean',
		},
	},
};

// Default info toast
export const Info = {
	args: {
		isDismissible: true,
		variant: 'info',
		labels: {
			heading: 'Info Toast',
			details: 'This is an informational message.',
		},
	},
};

// Success toast
export const Success = {
	args: {
		isDismissible: true,
		variant: 'success',
		labels: {
			heading: 'Success Toast',
			details: 'Your changes have been saved successfully.',
		},
	},
};

// Warning toast
export const Warning = {
	args: {
		isDismissible: true,
		variant: 'warning',
		labels: {
			heading: 'Warning Toast',
			details: 'Please review your input before proceeding.',
		},
	},
};

// Error toast
export const Error = {
	args: {
		isDismissible: true,
		variant: 'error',
		labels: {
			heading: 'Error Toast',
			details: 'An error occurred while processing your request.',
		},
	},
};

// Toast with heading link
export const WithHeadingLink = {
	args: {
		isDismissible: true,
		variant: 'info',
		labels: {
			heading: 'Click the link:',
			headingLink: 'View Details',
		},
		onClickHeadingLink: () => console.log('Heading link clicked'),
	},
};

// Toast with details
export const ErrorWithDetails = {
	args: {
		isDismissible: true,
		variant: 'error',
		labels: {
			heading: 'Cannot Save Record',
			details: 'The following fields are required: Name, Email, Phone.',
		},
	},
};

// Toast with close callback
export const WithCloseCallback = {
	args: {
		isDismissible: true,
		variant: 'success',
		labels: {
			heading: 'Closable Toast',
			details: 'Click the X to trigger onRequestClose callback.',
		},
		onRequestClose: () => console.log('Toast close requested'),
	},
};

// Toast with auto-dismiss
export const WithDuration = {
	args: {
		isDismissible: true,
		variant: 'info',
		labels: {
			heading: 'Auto-dismiss Toast',
			details: 'This toast will disappear after 5 seconds.',
		},
		duration: 5000,
		onRequestClose: () => console.log('Toast dismissed by duration'),
	},
};

// All variants showcase
export const AllVariants = {
	render: () => (
		<div className="slds-grid slds-grid_vertical slds-gutters">
			<Toast
				isDismissible
				variant="info"
				labels={{ heading: 'Info', details: 'Information message' }}
			/>
			<Toast
				isDismissible
				variant="success"
				labels={{ heading: 'Success', details: 'Success message' }}
			/>
			<Toast
				isDismissible
				variant="warning"
				labels={{ heading: 'Warning', details: 'Warning message' }}
			/>
			<Toast
				isDismissible
				variant="error"
				labels={{ heading: 'Error', details: 'Error message' }}
			/>
		</div>
	),
};
