import { useState } from 'react';
import IconSettings from '../../icon-settings';
import DockedComposer from '../';

export default {
	title: 'Components/DockedComposer',
	component: DockedComposer,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ minHeight: '300px', position: 'relative' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
};

// Open state
export const Open = {
	render: () => (
		<DockedComposer
			isOpen
			header="New Email"
			body={
				<div className="slds-p-around_medium">
					<p>Email composer content goes here...</p>
				</div>
			}
			events={{
				onRequestMinimize: () => console.log('Minimize clicked'),
				onRequestClose: () => console.log('Close clicked'),
			}}
		/>
	),
};

// Closed state
export const Closed = {
	render: () => (
		<DockedComposer
			isOpen={false}
			header="New Email"
			events={{
				onRequestExpand: () => console.log('Expand clicked'),
				onRequestClose: () => console.log('Close clicked'),
			}}
		/>
	),
};

// Interactive
export const Interactive = {
	render: () => {
		const [isOpen, setIsOpen] = useState(true);

		return (
			<DockedComposer
				isOpen={isOpen}
				header="New Email"
				body={
					<div className="slds-p-around_medium">
						<div className="slds-form-element">
							<label className="slds-form-element__label" htmlFor="to-field">
								To
							</label>
							<div className="slds-form-element__control">
								<input
									type="text"
									id="to-field"
									className="slds-input"
									placeholder="Enter recipient"
								/>
							</div>
						</div>
						<div className="slds-form-element slds-m-top_small">
							<label className="slds-form-element__label" htmlFor="subject-field">
								Subject
							</label>
							<div className="slds-form-element__control">
								<input
									type="text"
									id="subject-field"
									className="slds-input"
									placeholder="Enter subject"
								/>
							</div>
						</div>
						<div className="slds-form-element slds-m-top_small">
							<label className="slds-form-element__label" htmlFor="body-field">
								Body
							</label>
							<div className="slds-form-element__control">
								<textarea
									id="body-field"
									className="slds-textarea"
									placeholder="Enter message"
									rows={4}
								/>
							</div>
						</div>
					</div>
				}
				events={{
					onRequestMinimize: () => setIsOpen(false),
					onRequestExpand: () => setIsOpen(true),
					onRequestClose: () => console.log('Close clicked'),
				}}
			/>
		);
	},
};
