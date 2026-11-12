import IconSettings from '../../icon-settings';
import ProgressRing from '../';

export default {
	title: 'Components/ProgressRing',
	component: ProgressRing,
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
		value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
		theme: {
			control: { type: 'select' },
			options: ['active', 'warning', 'expired', 'complete'],
		},
		flowDirection: {
			control: { type: 'select' },
			options: ['drain', 'fill'],
		},
		size: {
			control: { type: 'select' },
			options: ['medium', 'large'],
		},
	},
};

// Default progress ring
export const Default = {
	args: {
		value: 75,
	},
};

// Active theme
export const Active = {
	args: {
		value: 50,
		theme: 'active',
		hasIcon: true,
	},
};

// Warning theme
export const Warning = {
	args: {
		value: 80,
		theme: 'warning',
		hasIcon: true,
	},
};

// Expired theme
export const Expired = {
	args: {
		value: 100,
		theme: 'expired',
		hasIcon: true,
	},
};

// Complete theme
export const Complete = {
	args: {
		value: 100,
		theme: 'complete',
		hasIcon: true,
	},
};

// Fill direction
export const FillDirection = {
	args: {
		value: 60,
		flowDirection: 'fill',
		theme: 'active',
	},
};

// Large size
export const Large = {
	args: {
		value: 75,
		size: 'large',
		theme: 'active',
		hasIcon: true,
	},
};

// All themes showcase
export const AllThemes = {
	render: () => (
		<div className="slds-grid slds-wrap slds-gutters">
			<div className="slds-col slds-size_1-of-4 slds-text-align_center">
				<ProgressRing value={50} theme="active" hasIcon />
				<p className="slds-m-top_small">Active (50%)</p>
			</div>
			<div className="slds-col slds-size_1-of-4 slds-text-align_center">
				<ProgressRing value={75} theme="warning" hasIcon />
				<p className="slds-m-top_small">Warning (75%)</p>
			</div>
			<div className="slds-col slds-size_1-of-4 slds-text-align_center">
				<ProgressRing value={100} theme="expired" hasIcon />
				<p className="slds-m-top_small">Expired (100%)</p>
			</div>
			<div className="slds-col slds-size_1-of-4 slds-text-align_center">
				<ProgressRing value={100} theme="complete" hasIcon />
				<p className="slds-m-top_small">Complete (100%)</p>
			</div>
		</div>
	),
};
