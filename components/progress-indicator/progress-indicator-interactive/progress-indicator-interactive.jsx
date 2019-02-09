import React from 'react';
import PropTypes from 'prop-types';
import ProgressIndicator from '../progress-indicator';

export default class ProgressIndicatorInteractive extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			steps: this.props.steps,
			completedSteps: [],
			disabledSteps: this.props.steps.slice(2, this.props.steps.length),
			selectedStep: this.props.steps[0],
		};
	}

	componentDidMount = () => {
		this.setState({
			selectedSteps: this.props.steps[0]
		})
	}

	handleStepEvent = (event, data) => {
		this.setState({
			completedSteps: this.props.steps.slice(0, data.step.id),
			disabledSteps:
				data.step.id < this.props.steps.length
					? this.props.steps.slice(data.step.id + 2, this.props.steps.length)
					: [],
			selectedStep: data.step,
		});
	};

	render() {
		return (
			<ProgressIndicator
				completedSteps={this.state.completedSteps}
				disabledSteps={this.state.disabledSteps}
				onStepClick={this.handleStepEvent}
				steps={this.state.steps}
				selectedStep={this.state.selectedStep}
			/>
		);
	}
}

ProgressIndicatorInteractive.propTypes = {
	steps: PropTypes.object,
};
