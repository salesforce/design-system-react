import React, { useState } from 'react';
import IconSettings from '~/components/icon-settings';
import ProgressIndicator from '~/components/progress-indicator'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import Checkbox from '~/components/checkbox';

// Checkbox is controlled, so the toggle action keeps its own state.
const ToggleAction = () => {
	const [checked, setChecked] = useState(false);
	return (
		<Checkbox
			checked={checked}
			id="checkbox-toggle-example--error"
			onChange={(event, data) => setChecked(data.checked)}
			variant="toggle"
		/>
	);
};

const steps = [
	{
		id: 0,
		label: 'label #1',
		setupAssistantAction: <Button label="Brand" variant="brand" />,
		setupAssistantEstimatedTime: '4 min',
	},
	{
		id: 1,
		label: 'label #2',
		setupAssistantAction: <Button disabled label="Disabled" variant="brand" />,
		setupAssistantEstimatedTime: '40 min',
	},
	{
		id: 2,
		label: 'label #3',
		setupAssistantAction: (
			<Button
				iconCategory="utility"
				iconName="download"
				iconPosition="left"
				label="Download"
			/>
		),
	},
	{
		id: 3,
		label: 'label #4',
		setupAssistantAction: <ToggleAction />,
	},
	{
		id: 4,
		label: 'label #5',
		setupAssistantAction: <Button label="Done" />,
		setupAssistantEstimatedTime: '14 min',
	},
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
						id="setup-assistant-progress-indicator"
						onStepClick={this.handleStepEvent}
						orientation="vertical"
						steps={this.state.steps.map((step, index) => ({
							...step,
							status: getStatus(index, this.state.selectedStep),
						}))}
						selectedStep={this.state.selectedStep}
						variant="setup-assistant"
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'ProgressIndicatorSetupAssistant';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
