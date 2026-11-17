import { useState } from 'react';
import Modal from '../index';
import Button from '../../button';
import IconSettings from '../../icon-settings';

export default {
	title: 'Components/Modal',
	component: Modal,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				component: `The Modal component is used for the Lightning Design System Modal and Notification > Prompt components. 
				The Modal opens from a state change outside of the component itself (pass this state to the \`isOpen\` prop).`,
			},
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
		prompt: {
			control: 'select',
			options: [
				undefined,
				'success',
				'warning',
				'error',
				'wrench',
				'offline',
				'info',
			],
		},
		align: {
			control: 'radio',
			options: ['center', 'top'],
		},
	},
};

// Sample modal content
const SampleContent = () => (
	<section className="slds-p-around_large">
		<div className="slds-form-element slds-m-bottom_large">
			<label className="slds-form-element__label" htmlFor="opptyName">
				Opportunity Name
			</label>
			<div className="slds-form-element__control">
				<input
					id="opptyName"
					className="slds-input"
					type="text"
					placeholder="Enter name"
				/>
			</div>
		</div>
		<div className="slds-form-element slds-m-bottom_large">
			<label className="slds-form-element__label" htmlFor="description">
				Opportunity Description
			</label>
			<div className="slds-form-element__control">
				<textarea
					id="description"
					className="slds-textarea"
					placeholder="Enter description"
				/>
			</div>
		</div>
		<div className="slds-form-element slds-m-bottom_large">
			<label className="slds-form-element__label" htmlFor="amount">
				Amount
			</label>
			<div className="slds-form-element__control">
				<input
					id="amount"
					className="slds-input"
					type="text"
					placeholder="Enter Amount"
				/>
			</div>
		</div>
	</section>
);

// Interactive modal with trigger button. The parent owns `isOpen`: Escape and the close
// button request a close, and `footer` receives `close` so its buttons can close the modal.
const ModalWithTrigger = ({ buttonLabel, footer, ...modalProps }) => {
	const [isOpen, setIsOpen] = useState(false);
	const close = () => setIsOpen(false);
	return (
		<>
			<Button
				label={buttonLabel || 'Open Modal'}
				onClick={() => setIsOpen(true)}
			/>
			<Modal
				{...modalProps}
				footer={typeof footer === 'function' ? footer(close) : footer}
				isOpen={isOpen}
				onRequestClose={close}
			/>
		</>
	);
};

// Default story
export const Default = {
	render: () => (
		<ModalWithTrigger
			heading="New Opportunity"
			tagline="Enter in details below"
			buttonLabel="Open Modal"
		>
			<SampleContent />
		</ModalWithTrigger>
	),
};

// With footer buttons
export const WithFooter = {
	render: () => (
		<ModalWithTrigger
			heading="New Opportunity"
			tagline="Enter in details below"
			buttonLabel="Open with Footer"
			footer={(close) => [
				<Button key="cancel" label="Cancel" onClick={close} />,
				<Button key="save" label="Save" variant="brand" onClick={close} />,
			]}
		>
			<SampleContent />
		</ModalWithTrigger>
	),
};

// Directional footer (back/next buttons)
export const DirectionalFooter = {
	render: () => (
		<ModalWithTrigger
			heading="Step 2 of 3"
			tagline="Configure your settings"
			buttonLabel="Open Directional Footer"
			directional
			footer={(close) => [
				<Button key="back" label="Back" onClick={close} />,
				<Button key="next" label="Next" variant="brand" onClick={close} />,
			]}
		>
			<SampleContent />
		</ModalWithTrigger>
	),
};

// Large size
export const Large = {
	render: () => (
		<ModalWithTrigger
			heading="Large Modal"
			size="large"
			buttonLabel="Open Large Modal"
			footer={(close) => [
				<Button key="cancel" label="Cancel" onClick={close} />,
				<Button key="save" label="Save" variant="brand" onClick={close} />,
			]}
		>
			<SampleContent />
		</ModalWithTrigger>
	),
};

// Medium size
export const Medium = {
	render: () => (
		<ModalWithTrigger
			heading="Medium Modal"
			size="medium"
			buttonLabel="Open Medium Modal"
			footer={(close) => [
				<Button key="cancel" label="Cancel" onClick={close} />,
				<Button key="save" label="Save" variant="brand" onClick={close} />,
			]}
		>
			<SampleContent />
		</ModalWithTrigger>
	),
};

// Small size
export const Small = {
	render: () => (
		<ModalWithTrigger
			heading="Small Modal"
			size="small"
			buttonLabel="Open Small Modal"
			footer={(close) => [
				<Button key="cancel" label="Cancel" onClick={close} />,
				<Button key="save" label="Save" variant="brand" onClick={close} />,
			]}
		>
			<SampleContent />
		</ModalWithTrigger>
	),
};

// No header
export const NoHeader = {
	render: () => (
		<ModalWithTrigger
			assistiveText={{ dialogLabel: 'Modal without header' }}
			buttonLabel="Open No Header Modal"
		>
			<section className="slds-p-around_large">
				<p>
					This modal has no visible header, but includes an assistive text label
					for screen readers.
				</p>
				<p className="slds-m-top_medium">
					Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco
					deserunt aute id consequat veniam incididunt duis in sint irure nisi.
				</p>
			</section>
		</ModalWithTrigger>
	),
};

// Prompt - Error
export const PromptError = {
	render: () => (
		<ModalWithTrigger
			heading="Delete Record"
			prompt="error"
			buttonLabel="Open Error Prompt"
			footer={(close) => [
				<Button
					key="cancel"
					label="Cancel"
					variant="neutral"
					onClick={close}
				/>,
				<Button
					key="delete"
					label="Delete"
					variant="destructive"
					onClick={close}
				/>,
			]}
		>
			<div className="slds-p-around_medium">
				<p>
					Are you sure you want to delete this record? This action cannot be
					undone.
				</p>
			</div>
		</ModalWithTrigger>
	),
};

// Prompt - Warning
export const PromptWarning = {
	render: () => (
		<ModalWithTrigger
			heading="Warning"
			prompt="warning"
			buttonLabel="Open Warning Prompt"
			footer={(close) => (
				<Button key="ok" label="Got it" variant="neutral" onClick={close} />
			)}
		>
			<div className="slds-p-around_medium">
				<p>
					You are about to leave this page. Any unsaved changes will be lost.
				</p>
			</div>
		</ModalWithTrigger>
	),
};

// Prompt - Success
export const PromptSuccess = {
	render: () => (
		<ModalWithTrigger
			heading="Success!"
			prompt="success"
			buttonLabel="Open Success Prompt"
			footer={(close) => (
				<Button key="ok" label="Continue" variant="neutral" onClick={close} />
			)}
		>
			<div className="slds-p-around_medium">
				<p>Your changes have been saved successfully.</p>
			</div>
		</ModalWithTrigger>
	),
};

// Prompt - Info
export const PromptInfo = {
	render: () => (
		<ModalWithTrigger
			heading="Information"
			prompt="info"
			buttonLabel="Open Info Prompt"
			footer={(close) => (
				<Button key="ok" label="OK" variant="neutral" onClick={close} />
			)}
		>
			<div className="slds-p-around_medium">
				<p>
					This feature requires additional configuration. Please contact your
					administrator for assistance.
				</p>
			</div>
		</ModalWithTrigger>
	),
};

// Not dismissible
export const NotDismissible = {
	render: () => {
		const [isOpen, setIsOpen] = useState(false);
		return (
			<>
				<Button
					label="Open Non-Dismissible Modal"
					onClick={() => setIsOpen(true)}
				/>
				<Modal
					heading="Required Action"
					isOpen={isOpen}
					disableClose
					onRequestClose={() => setIsOpen(false)}
					footer={
						<Button
							key="accept"
							label="I Accept"
							variant="brand"
							onClick={() => setIsOpen(false)}
						/>
					}
				>
					<div className="slds-p-around_medium">
						<p>
							You must accept the terms and conditions to continue. This modal
							cannot be dismissed by clicking outside or pressing Escape.
						</p>
					</div>
				</Modal>
			</>
		);
	},
};

// Top aligned
export const TopAligned = {
	render: () => (
		<ModalWithTrigger
			heading="Top Aligned Modal"
			align="top"
			buttonLabel="Open Top Aligned"
			footer={(close) => [
				<Button key="cancel" label="Cancel" onClick={close} />,
				<Button key="save" label="Save" variant="brand" onClick={close} />,
			]}
		>
			<SampleContent />
		</ModalWithTrigger>
	),
};

// Custom header
export const CustomHeader = {
	render: () => (
		<ModalWithTrigger
			buttonLabel="Open Custom Header"
			header={
				<div className="slds-grid slds-grid_align-spread slds-p-around_medium">
					<div>
						<span className="slds-badge slds-theme_success">New</span>
						<span className="slds-m-left_x-small slds-text-heading_medium">
							Custom Header Content
						</span>
					</div>
				</div>
			}
			footer={(close) => (
				<Button key="close" label="Close" variant="neutral" onClick={close} />
			)}
		>
			<section className="slds-p-around_large">
				<p>
					This modal has a completely custom header with a badge and custom
					layout.
				</p>
			</section>
		</ModalWithTrigger>
	),
};

// Always open (for testing/documentation)
export const AlwaysOpen = {
	render: () => (
		<Modal
			heading="Always Open Modal"
			tagline="This modal is always visible for documentation"
			isOpen
			onRequestClose={() => {}}
			footer={[
				<Button key="cancel" label="Cancel" />,
				<Button key="save" label="Save" variant="brand" />,
			]}
		>
			<SampleContent />
		</Modal>
	),
	parameters: {
		docs: {
			description: {
				story:
					'This modal is always open for documentation purposes. In real usage, control the `isOpen` prop with state.',
			},
		},
	},
};
