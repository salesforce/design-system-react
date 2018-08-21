import React from 'react';
import createReactClass from 'create-react-class';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';

import ProgressIndicator from '../../../components/progress-indicator';
import { PROGRESS_INDICATOR } from '../../../utilities/constants';
import Default from '../__examples__/default';
import Modal from '../__examples__/modal';
import StepError from '../__examples__/step-error';

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

const stepsDisabled = [
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
];

const manySteps = [
	{ id: 'a', label: 'tooltip label #1' },
	{ id: 'b', label: 'tooltip label #2' },
	{ id: 'c', label: 'tooltip label #3' },
	{ id: 'd', label: 'tooltip label #4' },
	{ id: 'e', label: 'tooltip label #5' },
	{ id: 'f', label: 'tooltip label #6' },
	{ id: 'g', label: 'tooltip label #7' },
	{ id: 'h', label: 'tooltip label #8' },
	{ id: 'i', label: 'tooltip label #9' },
];

const ExampleProgressIndicator = createReactClass({
	displayName: 'ProgressIndicatorDefault',

	render () {
		return (
			<div style={{ padding: '4rem 1rem 0px' }}>
				<ProgressIndicator
					id="example-progress-indicator"
					steps={this.props.steps}
					selectedStep={this.props.selectedStep}
					disabledSteps={this.props.disabledSteps}
					completedSteps={this.props.completedSteps}
					assistiveText={this.props.assistiveText}
					onStepClick={(event, data) => {
						console.log(data);
					}}
				/>
			</div>
		);
	},
});

storiesOf(PROGRESS_INDICATOR, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
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
			steps={steps}
			disabledSteps={stepsDisabled}
			selectedStep={steps[2]}
			completedSteps={steps.slice(0, 2)}
		/>
	))
	.add('Step Error', () => (
		<StepError
			id="example-progress-indicator"
			steps={steps}
			selectedStep={steps[1]}
			completedSteps={steps.slice(0, 1)}
			errorSteps={steps.slice(1, 2)}
		/>
	))
	.add(
		'In A Modal (With Step Error) - Needs DOM',
		() => (typeof document !== 'undefined' ? <Modal /> : null)
	)
	.add('Completed Progress', () => (
		<ExampleProgressIndicator
			steps={steps}
			selectedStep={steps[steps.length - 2]}
			completedSteps={steps.slice(0, steps.length - 2)}
			assistiveText={{
				completedStep: 'Finished this step.',
				disabledStep: 'Unable to proceed on this step.',
			}}
		/>
	));
