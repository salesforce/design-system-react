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
		this.state = {
			steps,
			selectedStep: 0,
		};
	}

	handleStepEvent = (event, data) => {
		this.setState({
			selectedStep: data.step.id,
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
						onStepClick={this.handleStepEvent}
						orientation="vertical"
						steps={this.state.steps.map((step, index) => ({
							...step,
							status: getStatus(index, this.state.selectedStep),
						}))}
						selectedStep={this.state.selectedStep}
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressIndicatorVertical';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
