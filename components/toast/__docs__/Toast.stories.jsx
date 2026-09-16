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
	},
};

// Default info toast
export const Info = {
	args: {
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
				variant="info"
				labels={{ heading: 'Info', details: 'Information message' }}
			/>
			<Toast
				variant="success"
				labels={{ heading: 'Success', details: 'Success message' }}
			/>
			<Toast
				variant="warning"
				labels={{ heading: 'Warning', details: 'Warning message' }}
			/>
			<Toast
				variant="error"
				labels={{ heading: 'Error', details: 'Error message' }}
			/>
		</div>
	),
};
