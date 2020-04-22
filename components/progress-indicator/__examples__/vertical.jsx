import React from 'react';
import IconSettings from '~/components/icon-settings';
import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime

const steps = [
	{
		id: 0,
		label: 'label #1',
	},
	{ id: 1, label: 'label #2' },
	{ id: 2, label: 'label #3' },
	{ id: 3, label: 'label #4' },
	{ id: 4, label: 'label #5' },
];

/*
 * This example allows you to select the next step and only the next step. Typically, Progress Indicator should be paired with a modal and form errors should be explained outside of this component.
 */
class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			steps,
			completedSteps: [],
			disabledSteps: steps.slice(2, steps.length),
			selectedStep: steps[0],
		};
	}

	handleStepEvent = (event, data) => {
		this.setState({
			completedSteps: steps.slice(0, data.step.id),
			disabledSteps:
				data.step.id < steps.length
					? steps.slice(data.step.id + 2, steps.length)
					: [],
			selectedStep: data.step,
		});
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div
					style={{
						padding: '4rem 1rem 0px',
						background:
							this.props.variant === 'modal' ? 'rgb(244, 246, 249)' : undefined,
					}}
				>
					<ProgressIndicator
						id="vertical-progress-indicator"
						completedSteps={this.state.completedSteps}
						disabledSteps={this.state.disabledSteps}
						onStepClick={this.handleStepEvent}
						orientation="vertical"
						steps={this.state.steps}
						selectedStep={this.state.selectedStep}
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressIndicatorVertical';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
