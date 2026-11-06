import React from 'react';
import IconSettings from '~/components/icon-settings';
import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime

// A step is completed before the selected one, and disabled beyond the next one
const getStatus = (index, selectedId) => {
	if (index < selectedId) return 'completed';
	return index > selectedId + 1 ? 'disabled' : undefined;
};

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
			selectedStep: 0,
		};
	}

	handleStepEvent = (event, data) => {
		const { steps } = this.state;
		const hasCompleted = data.step.id > 0;

		if (steps[0].assistiveText) {
			if (hasCompleted) {
				steps[0].assistiveText = `${steps[0].assistiveText} - Completed`;
			} else {
				steps[0].assistiveText = steps[0].assistiveText.replace(
					' - Completed',
					''
				);
			}
		}

		this.setState({
			selectedStep: data.step.id,
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
						onStepClick={this.handleStepEvent}
						steps={this.state.steps.map((step, index) => ({
							...step,
							status: getStatus(index, this.state.selectedStep),
						}))}
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
