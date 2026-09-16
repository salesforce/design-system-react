import { useState } from 'react';
import IconSettings from '../../icon-settings';
import SplitView from '../';
import Card from '../../card';

const sampleMasterContent = (
	<div className="slds-p-around_medium">
		<h2 className="slds-text-heading_small slds-m-bottom_small">Master Panel</h2>
		<ul className="slds-list_dotted">
			<li className="slds-m-bottom_x-small">Item 1</li>
			<li className="slds-m-bottom_x-small">Item 2</li>
			<li className="slds-m-bottom_x-small">Item 3</li>
			<li className="slds-m-bottom_x-small">Item 4</li>
			<li className="slds-m-bottom_x-small">Item 5</li>
		</ul>
	</div>
);

const sampleDetailContent = (
	<div className="slds-p-around_medium">
		<h2 className="slds-text-heading_medium slds-m-bottom_medium">Detail Panel</h2>
		<p className="slds-m-bottom_medium">
			This is the detail panel. Click the toggle button to show or hide the master panel.
		</p>
		<Card heading="Sample Card" bodyClassName="slds-p-around_medium">
			<p>Card content goes here.</p>
		</Card>
	</div>
);

export default {
	title: 'Components/SplitView',
	component: SplitView,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ height: '400px', border: '1px solid #d8dde6' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// Default split view
export const Default = {
	render: () => (
		<SplitView
			master={sampleMasterContent}
			detail={sampleDetailContent}
		/>
	),
};

// Initially closed
export const InitiallyClosed = {
	render: () => (
		<SplitView
			master={sampleMasterContent}
			detail={sampleDetailContent}
			isOpen={false}
		/>
	),
};

// Controlled component
export const Controlled = {
	render: () => {
		const [isOpen, setIsOpen] = useState(true);

		return (
			<div>
				<div className="slds-m-bottom_medium">
					<button
						className="slds-button slds-button_neutral"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? 'Close Panel' : 'Open Panel'}
					</button>
					<span className="slds-m-left_medium">
						State: {isOpen ? 'Open' : 'Closed'}
					</span>
				</div>
				<div style={{ height: '300px', border: '1px solid #d8dde6' }}>
					<SplitView
						master={sampleMasterContent}
						detail={sampleDetailContent}
						isOpen={isOpen}
						events={{
							onOpen: () => setIsOpen(true),
							onClose: () => setIsOpen(false),
						}}
					/>
				</div>
			</div>
		);
	},
};

// Custom width
export const CustomWidth = {
	render: () => (
		<SplitView
			master={sampleMasterContent}
			detail={sampleDetailContent}
			masterWidth="30rem"
		/>
	),
};

// With event handlers
export const WithEventHandlers = {
	render: () => {
		const handleOpen = () => {
			console.log('Split view opened');
		};

		const handleClose = () => {
			console.log('Split view closed');
		};

		return (
			<SplitView
				master={sampleMasterContent}
				detail={sampleDetailContent}
				events={{
					onOpen: handleOpen,
					onClose: handleClose,
				}}
			/>
		);
	},
};
