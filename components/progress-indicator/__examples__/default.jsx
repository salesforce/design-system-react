import React from 'react';
import IconSettings from '~/components/icon-settings';
import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime

/*
 * This example allows you to select the next step and only the next step. Typically, Progress Indicator should be paired with a modal and form errors should be explained outside of this component.
 */
class Example extends React.Component {
	constructor(props) {
		super(props);

		const steps = [
			{
				id: 0,
				label: <i>tooltip label #1</i>,
				assistiveText: 'This is custom text in the assistive text key',
			},
			{ id: 1, label: 'tooltip label #2' },
			{ id: 2, label: <strong>tooltip label #3</strong> },
			{ id: 3, label: 'tooltip label #4' },
			{ id: 4, label: 'tooltip label #5' },
		];

		this.state = {
			steps,
			completedSteps: [],
			disabledSteps: steps.slice(2, steps.length),
			selectedStep: steps[0],
		};
	}

	handleStepEvent = (event, data) => {
		const { steps } = this.state;
		const completedSteps = steps.slice(0, data.step.id);

		if (steps[0].assistiveText) {
			if (completedSteps.length > 0) {
				steps[0].assistiveText = `${steps[0].assistiveText} - Completed`;
			} else {
				steps[0].assistiveText = steps[0].assistiveText.replace(
					' - Completed',
					''
				);
			}
		}

		this.setState({
			completedSteps,
			disabledSteps:
				data.step.id < steps.length
					? steps.slice(data.step.id + 2, steps.length)
					: [],
			selectedStep: data.step,
			steps,
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
						id="example-progress-indicator"
						completedSteps={this.state.completedSteps}
						disabledSteps={this.state.disabledSteps}
						onStepClick={this.handleStepEvent}
						steps={this.state.steps}
						selectedStep={this.state.selectedStep}
						// tooltipIsOpenSteps={stepsBasic.slice(0, 2)}
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressIndicatorDefault';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
