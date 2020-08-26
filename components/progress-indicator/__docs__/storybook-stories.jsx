import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';

import ProgressIndicator from '../../../components/progress-indicator';
import { PROGRESS_INDICATOR } from '../../../utilities/constants';
import Default from '../__examples__/default';
import Modal from '../__examples__/modal';
import StepError from '../__examples__/step-error';
import VerticalProgressIndicator from '../__examples__/vertical';
import SetupAssistant from '../__examples__/setup-assistant';

import log from '../../../utilities/log';

const exampleSteps = [
	{
		id: 0,
		label: <i>tooltip label #1</i>,
		assistiveText: 'This is custom text in the assistive text key - Completed',
	},
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: <strong>tooltip label #3</strong> },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
];

const manySteps = [
	{ id: 0, label: 'tooltip label #1' },
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: 'tooltip label #3' },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
	{ id: 5, label: 'tooltip label #6' },
	{ id: 6, label: 'tooltip label #7' },
	{ id: 7, label: 'tooltip label #8' },
	{ id: 8, label: 'tooltip label #9' },
];

const manyStepsVertical = [
	{ id: 0, label: 'label #1' },
	{ id: 1, label: 'label #2' },
	{ id: 2, label: 'label #3' },
	{ id: 3, label: 'label #4' },
	{ id: 4, label: 'label #5' },
	{ id: 5, label: 'label #6' },
	{ id: 6, label: 'label #7' },
	{ id: 7, label: 'label #8' },
	{ id: 8, label: 'label #9' },
];

class ExampleProgressIndicator extends React.Component {
	static displayName = 'ProgressIndicatorDefault';

	constructor(props) {
		super(props);

		const steps = props.steps || exampleSteps;

		this.state = {
			completedSteps: props.completedSteps,
			selectedStep: props.selectedStep,
			steps,
		};
	}

	render() {
		return (
			<div style={{ padding: '4rem 1rem 0px' }}>
				<ProgressIndicator
					id="example-progress-indicator"
					steps={this.state.steps}
					selectedStep={this.state.selectedStep}
					disabledSteps={this.props.disabledSteps}
					completedSteps={this.state.completedSteps}
					orientation={this.props.orientation}
					assistiveText={this.props.assistiveText}
					onStepClick={(event, data) => {
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
							selectedStep: data.step,
							steps,
						});

						log({
							action,
							event,
							eventName: 'On Step Click',
							data,
						});
					}}
				/>
			</div>
		);
	}
}

storiesOf(PROGRESS_INDICATOR, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => <Default />)
	.add('Base With Many Steps', () => (
		<ExampleProgressIndicator
			steps={manySteps}
			selectedStep={manySteps[4]}
			completedSteps={manySteps.slice(0, 4)}
			// tooltipIsOpenSteps={stepsBasic.slice(0, 2)}
		/>
	))
	.add('Base With Disabled Steps', () => (
		<ExampleProgressIndicator
			steps={exampleSteps}
			disabledSteps={[exampleSteps[3], exampleSteps[4]]}
			selectedStep={exampleSteps[2]}
			completedSteps={exampleSteps.slice(0, 2)}
		/>
	))
	.add('Step Error', () => (
		<StepError
			id="example-progress-indicator"
			steps={exampleSteps}
			selectedStep={exampleSteps[1]}
			completedSteps={exampleSteps.slice(0, 1)}
			disabledSteps={exampleSteps.slice(2, 5)}
			errorSteps={exampleSteps.slice(1, 2)}
		/>
	))
	.add('In A Modal (With Step Error) - Needs DOM', () =>
		typeof document !== 'undefined' ? <Modal /> : null
	)
	.add('Completed Progress', () => (
		<ExampleProgressIndicator
			steps={exampleSteps}
			selectedStep={exampleSteps[exampleSteps.length - 2]}
			completedSteps={exampleSteps.slice(0, exampleSteps.length - 2)}
			assistiveText={{
				completedStep: 'Finished this step.',
				disabledStep: 'Unable to proceed on this step.',
			}}
		/>
	))
	.add('Vertical', () => <VerticalProgressIndicator />)
	.add('VerticalStepError', () => (
		<StepError
			id="example-progress-indicator"
			steps={manyStepsVertical}
			completedSteps={manyStepsVertical.slice(0, 4)}
			errorSteps={manyStepsVertical.slice(4, 5)}
			orientation="vertical"
		/>
	))
	.add('SetupAssistant', () => <SetupAssistant />);
