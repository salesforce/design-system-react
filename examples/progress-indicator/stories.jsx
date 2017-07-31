import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import ProgressIndicator from '~/components/progress-indicator';
import { PROGRESS_INDICATOR } from '../../utilities/constants';
import Default from './default';
import Modal from './modal';
import StepError from './stepError';

const stepsBasic = [
	{ id: 0, label: <i>tooltip label #1</i>, assistiveText: 'This is custom text in the assistive text key' },
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: <strong>tooltip label #3</strong> },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' }
];

const stepsDisabled = [
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' }
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
	{ id: 'i', label: 'tooltip label #9' }
];

const handleStepEvent = function (event, data) {
	event.preventDefault();
	console.log(event.isDefaultPrevented());
	console.log(data);
};

storiesOf(PROGRESS_INDICATOR, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => (<Default
		steps={stepsBasic}
		selectedStep={stepsBasic[0]}
		onStepClick={handleStepEvent}
		// tooltipIsOpenSteps={stepsBasic.slice(0, 2)}
	/>))
	.add('Base With Many Steps', () => (<Default
		steps={manySteps}
		selectedStep={manySteps[4]}
		completedSteps={manySteps.slice(0, 4)}
		onStepClick={handleStepEvent}
	/>))
	.add('Base With Disabled Steps', () => (<Default
		steps={stepsBasic}
		disabledSteps={stepsDisabled}
		selectedStep={stepsBasic[2]}
		completedSteps={stepsBasic.slice(0, 2)}
		onStepClick={handleStepEvent}
	/>))
	.add('Step Error', () => (<StepError
		steps={stepsBasic}
		selectedStep={stepsBasic[1]}
		completedSteps={stepsBasic.slice(0, 1)}
		errorSteps={stepsBasic.slice(1, 2)}
		onStepClick={handleStepEvent}
	/>))
	.add('On A Gray Background', () => (<Default
		steps={stepsBasic}
		selectedStep={stepsBasic[1]}
		completedSteps={stepsBasic.slice(0, 1)}
		variant="modal"
		onStepClick={handleStepEvent}
	/>))
	.add('In A Modal', () => (<Modal
		steps={stepsBasic}
		selectedStep={stepsBasic[2]}
		completedSteps={stepsBasic.slice(0, 2)}
		onStepClick={handleStepEvent}
	/>))
	.add('In A Modal (With Step Error)', () => (<Modal
		steps={stepsBasic}
		selectedStep={stepsBasic[2]}
		completedSteps={stepsBasic.slice(0, 2)}
		errorSteps={stepsBasic.slice(2, 3)}
		onStepClick={handleStepEvent}
	/>));
