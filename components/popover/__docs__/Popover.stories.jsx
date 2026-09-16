import { useState } from 'react';
import IconSettings from '../../icon-settings';
import Popover from '../';
import Button from '../../button';

export default {
	title: 'Components/Popover',
	component: Popover,
	decorators: [
		(Story) => (
			<div className="slds-p-around_large" style={{ minHeight: '300px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		align: {
			control: { type: 'select' },
			options: [
				'top',
				'top left',
				'top right',
				'right',
				'right top',
				'right bottom',
				'bottom',
				'bottom left',
				'bottom right',
				'left',
				'left top',
				'left bottom',
			],
		},
		variant: {
			control: { type: 'select' },
			options: ['base', 'error', 'warning', 'feature', 'walkthrough', 'walkthrough-action'],
		},
	},
};

// Default popover
export const Default = {
	render: () => (
		<Popover
			body="This is a default popover with some helpful information."
			heading="Popover Title"
			id="default-popover"
		>
			<Button label="Click to open" />
		</Popover>
	),
};

// Controlled popover
export const Controlled = {
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div>
				<div className="slds-m-bottom_small">
					Popover is: {isOpen ? 'Open' : 'Closed'}
				</div>
				<Popover
					body="This is a controlled popover. Use the button or close icon to toggle."
					heading="Controlled Popover"
					id="controlled-popover"
					isOpen={isOpen}
					onClick={() => setIsOpen(!isOpen)}
					onRequestClose={() => setIsOpen(false)}
				>
					<Button label={isOpen ? 'Click to close' : 'Click to open'} />
				</Popover>
			</div>
		);
	},
};

// Different alignments
export const Alignments = {
	render: () => (
		<div className="slds-grid slds-wrap slds-grid_pull-padded">
			<div className="slds-p-around_medium">
				<Popover
					body="Top aligned popover"
					heading="Top"
					align="top"
					id="top-popover"
				>
					<Button label="Top" />
				</Popover>
			</div>
			<div className="slds-p-around_medium">
				<Popover
					body="Bottom aligned popover"
					heading="Bottom"
					align="bottom"
					id="bottom-popover"
				>
					<Button label="Bottom" />
				</Popover>
			</div>
			<div className="slds-p-around_medium">
				<Popover
					body="Left aligned popover"
					heading="Left"
					align="left"
					id="left-popover"
				>
					<Button label="Left" />
				</Popover>
			</div>
			<div className="slds-p-around_medium">
				<Popover
					body="Right aligned popover"
					heading="Right"
					align="right"
					id="right-popover"
				>
					<Button label="Right" />
				</Popover>
			</div>
		</div>
	),
};

// Error variant
export const ErrorVariant = {
	render: () => (
		<Popover
			body="There was an error processing your request. Please try again."
			heading="Error"
			variant="error"
			id="error-popover"
		>
			<Button label="Show Error" variant="destructive" />
		</Popover>
	),
};

// Warning variant
export const WarningVariant = {
	render: () => (
		<Popover
			body="This action may have unintended consequences. Please review before continuing."
			heading="Warning"
			variant="warning"
			id="warning-popover"
		>
			<Button label="Show Warning" />
		</Popover>
	),
};

// Feature variant
export const FeatureVariant = {
	render: () => (
		<Popover
			body="Check out this exciting new feature that will help you be more productive!"
			heading="New Feature"
			variant="feature"
			icon={<span className="slds-icon_container">✨</span>}
			id="feature-popover"
		>
			<Button label="Learn More" variant="brand" />
		</Popover>
	),
};

// Walkthrough variant
export const WalkthroughVariant = {
	render: () => (
		<Popover
			body="This is where you can find all your recent activities and notifications."
			heading="Welcome!"
			variant="walkthrough"
			stepText="Step 1 of 3"
			footerWalkthroughActions={
				<>
					<Button label="Skip" variant="neutral" />
					<Button label="Next" variant="brand" className="slds-m-left_x-small" />
				</>
			}
			id="walkthrough-popover"
		>
			<Button label="Start Tour" variant="brand" />
		</Popover>
	),
};

// Walkthrough action variant
export const WalkthroughActionVariant = {
	render: () => (
		<Popover
			body="Click this button to create a new record."
			heading="Create New"
			variant="walkthrough-action"
			stepText="Step 2 of 3"
			id="walkthrough-action-popover"
		>
			<Button label="Show Action" variant="brand" />
		</Popover>
	),
};

// With footer
export const WithFooter = {
	render: () => (
		<Popover
			body="This popover has a custom footer with action buttons."
			heading="Popover with Footer"
			footer={
				<div className="slds-grid slds-grid_align-end">
					<Button label="Cancel" variant="neutral" />
					<Button label="Save" variant="brand" className="slds-m-left_x-small" />
				</div>
			}
			id="footer-popover"
		>
			<Button label="Open" />
		</Popover>
	),
};

// No nubbin
export const NoNubbin = {
	render: () => (
		<Popover
			body="This popover has no nubbin (arrow pointer)."
			heading="No Nubbin"
			hasNoNubbin
			id="no-nubbin-popover"
		>
			<Button label="Open" />
		</Popover>
	),
};

// No close button
export const NoCloseButton = {
	render: () => (
		<Popover
			body="This popover has no close button. Click outside or press Escape to close."
			heading="No Close Button"
			hasNoCloseButton
			id="no-close-popover"
		>
			<Button label="Open" />
		</Popover>
	),
};
