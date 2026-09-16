import ProgressBar from '../../progress-bar';
import IconSettings from '../../icon-settings';

export default {
	title: 'Components/ProgressBar',
	component: ProgressBar,
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium" style={{ width: '400px' }}>
				<IconSettings iconPath="/assets/icons">
					<Story />
				</IconSettings>
			</div>
		),
	],
	argTypes: {
		value: {
			control: { type: 'range', min: 0, max: 100 },
		},
		thickness: {
			control: 'select',
			options: ['x-small', 'small', 'medium', 'large'],
		},
		orientation: {
			control: 'radio',
			options: ['horizontal', 'vertical'],
		},
		color: {
			control: 'select',
			options: [undefined, 'success'],
		},
		radius: {
			control: 'select',
			options: [undefined, 'circular'],
		},
	},
	tags: ['autodocs'],
};

/**
 * Default progress bar
 */
export const Default = {
	args: {
		value: 50,
	},
};

/**
 * Progress bar with label
 */
export const Descriptive = {
	args: {
		value: 75,
		labels: {
			label: 'Progress',
			complete: 'Complete',
		},
	},
};

/**
 * Success color variant
 */
export const SuccessColor = {
	args: {
		value: 100,
		color: 'success',
		labels: {
			label: 'Upload Complete',
		},
	},
};

/**
 * Circular radius
 */
export const CircularRadius = {
	args: {
		value: 65,
		radius: 'circular',
	},
};

/**
 * Thickness variants
 */
export const ThicknessVariants = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			<div>
				<p style={{ marginBottom: '0.5rem' }}>X-Small</p>
				<ProgressBar value={50} thickness="x-small" />
			</div>
			<div>
				<p style={{ marginBottom: '0.5rem' }}>Small</p>
				<ProgressBar value={50} thickness="small" />
			</div>
			<div>
				<p style={{ marginBottom: '0.5rem' }}>Medium</p>
				<ProgressBar value={50} thickness="medium" />
			</div>
			<div>
				<p style={{ marginBottom: '0.5rem' }}>Large</p>
				<ProgressBar value={50} thickness="large" />
			</div>
		</div>
	),
};

/**
 * Vertical orientation
 */
export const Vertical = {
	render: () => (
		<div style={{ height: '200px', width: '40px' }}>
			<ProgressBar value={60} orientation="vertical" />
		</div>
	),
};

/**
 * Progress values comparison
 */
export const ProgressValues = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<ProgressBar value={0} labels={{ label: 'Not Started' }} />
			<ProgressBar value={25} labels={{ label: 'Getting Started' }} />
			<ProgressBar value={50} labels={{ label: 'Halfway There' }} />
			<ProgressBar value={75} labels={{ label: 'Almost Done' }} />
			<ProgressBar value={100} color="success" labels={{ label: 'Complete!' }} />
		</div>
	),
};
