import IconSettings from '../../icon-settings';
import DynamicIcon from '../';

export default {
	title: 'Components/DynamicIcon',
	component: DynamicIcon,
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
			options: ['ellie', 'eq', 'score', 'strength', 'trend', 'typing', 'waffle'],
		},
		isPaused: { control: 'boolean' },
		isStatic: { control: 'boolean' },
	},
};

// Equalizer variant
export const Equalizer = {
	render: () => (
		<DynamicIcon variant="eq" title="Equalizer" />
	),
};

// Score variants
export const ScorePositive = {
	render: () => (
		<DynamicIcon variant="score" title="Score: Positive" scorePolarity="positive" />
	),
};

export const ScoreNegative = {
	render: () => (
		<DynamicIcon variant="score" title="Score: Negative" scorePolarity="negative" />
	),
};

// Strength variants
export const Strength = {
	render: () => (
		<div className="slds-grid slds-grid_vertical slds-grid_vertical-align-start">
			<div className="slds-m-bottom_small">
				<DynamicIcon variant="strength" title="Strength: -3" strengthLevel={-3} />
				<span className="slds-m-left_small">Level -3</span>
			</div>
			<div className="slds-m-bottom_small">
				<DynamicIcon variant="strength" title="Strength: 0" strengthLevel={0} />
				<span className="slds-m-left_small">Level 0</span>
			</div>
			<div className="slds-m-bottom_small">
				<DynamicIcon variant="strength" title="Strength: 3" strengthLevel={3} />
				<span className="slds-m-left_small">Level 3</span>
			</div>
		</div>
	),
};

// Trend variants
export const Trend = {
	render: () => (
		<div className="slds-grid slds-grid_pull-padded">
			<div className="slds-p-horizontal_small">
				<DynamicIcon variant="trend" title="Trend: Up" trendDirection="up" />
				<p className="slds-text-align_center">Up</p>
			</div>
			<div className="slds-p-horizontal_small">
				<DynamicIcon variant="trend" title="Trend: Neutral" trendDirection="neutral" />
				<p className="slds-text-align_center">Neutral</p>
			</div>
			<div className="slds-p-horizontal_small">
				<DynamicIcon variant="trend" title="Trend: Down" trendDirection="down" />
				<p className="slds-text-align_center">Down</p>
			</div>
		</div>
	),
};

// Typing indicator
export const Typing = {
	render: () => (
		<DynamicIcon variant="typing" title="User is typing" />
	),
};

// Waffle (App Launcher)
export const Waffle = {
	render: () => (
		<DynamicIcon variant="waffle" title="Open App Launcher" />
	),
};

// Ellie animation
export const Ellie = {
	render: () => (
		<DynamicIcon variant="ellie" title="Ellie Animation" />
	),
};

// Paused animation
export const Paused = {
	render: () => (
		<DynamicIcon variant="eq" title="Paused Equalizer" isPaused />
	),
};

// Static (no animation)
export const Static = {
	render: () => (
		<DynamicIcon variant="eq" title="Static Equalizer" isStatic />
	),
};
