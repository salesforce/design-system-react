import IconSettings from '../../icon-settings';
import Panel from '../';

export default {
	title: 'Components/Panel',
	component: Panel,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ maxWidth: '400px', height: '400px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['filters'],
		},
	},
};

// Default panel
export const Default = {
	render: () => (
		<Panel>
			<div className="slds-p-around_medium">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Panel Content</h2>
				<p>This is a basic panel that can contain any content.</p>
			</div>
		</Panel>
	),
};

// Filters variant
export const FiltersVariant = {
	render: () => (
		<Panel variant="filters">
			<div className="slds-panel__section">
				<h3 className="slds-text-heading_small slds-m-bottom_medium">Filters</h3>
				<div className="slds-form-element slds-m-bottom_small">
					<label className="slds-form-element__label">Status</label>
					<div className="slds-form-element__control">
						<select className="slds-select">
							<option>All</option>
							<option>Active</option>
							<option>Inactive</option>
						</select>
					</div>
				</div>
				<div className="slds-form-element slds-m-bottom_small">
					<label className="slds-form-element__label">Type</label>
					<div className="slds-form-element__control">
						<select className="slds-select">
							<option>All Types</option>
							<option>Type A</option>
							<option>Type B</option>
						</select>
					</div>
				</div>
			</div>
		</Panel>
	),
};

// With scrollable content
export const ScrollableContent = {
	render: () => (
		<Panel>
			<div className="slds-p-around_medium">
				<h2 className="slds-text-heading_small slds-m-bottom_small">Scrollable Panel</h2>
				{Array.from({ length: 20 }, (_, i) => (
					<p key={i} className="slds-m-bottom_small">
						Item {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</p>
				))}
			</div>
		</Panel>
	),
};
