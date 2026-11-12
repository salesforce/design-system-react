import React from 'react';
import IconSettings from '~/components/icon-settings';
import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime

const stages = [
	{ id: 0, label: 'Contacted' },
	{ id: 1, label: 'Open' },
	{ id: 2, label: 'Unqualified' },
	{ id: 3, label: 'Nurturing' },
	{ id: 4, label: 'Closed' },
];

/*
 * With `type="path"`, the steps render as the stages of a path. Clicking a stage makes it the current stage, and the stages before it complete. The path is a single tab stop; the arrow keys move between stages.
 */
class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedStep: stages[1],
		};
	}

	handleStepClick = (event, data) => {
		this.setState({ selectedStep: data.step });
	};

	render() {
		const { selectedStep } = this.state;

		return (
			<IconSettings iconPath="/assets/icons">
				<ProgressIndicator
					id="path-progress-indicator"
					completedSteps={stages.slice(0, selectedStep.id)}
					onStepClick={this.handleStepClick}
					selectedStep={selectedStep}
					steps={stages}
					type="path"
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressIndicatorPath';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
