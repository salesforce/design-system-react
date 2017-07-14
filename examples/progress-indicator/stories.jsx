import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import ProgressIndicator from '~/components/progress-indicator';
import { PROGRESS_INDICATOR } from '../../utilities/constants';
import Default from './default';
import Modal from './modal';
import StepError from './stepError';

const modalStepsBasic = [
	{ description: 'tooltip description #1' },
	{ description: 'tooltip description #2' },
	{ description: 'tooltip description #3' },
	{ description: 'tooltip description #4' },
	{ description: 'tooltip description #5' }
];

const manySteps = [
	{ description: 'tooltip description #1' },
	{ description: 'tooltip description #2' },
	{ description: 'tooltip description #3' },
	{ description: 'tooltip description #4' },
	{ description: 'tooltip description #5' },
	{ description: 'tooltip description #6' },
	{ description: 'tooltip description #7' },
	{ description: 'tooltip description #8' },
	{ description: 'tooltip description #9' }
];

const handleStepEvent = function (event, data) {
	event.preventDefault();
	console.log(event.isDefaultPrevented());
	console.log(data);
};

storiesOf(PROGRESS_INDICATOR, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => (<Default currentStep={0} onStepClick={handleStepEvent} onStepFocus={handleStepEvent} />))
	.add('Base With Many Steps', () => (<Default currentStep={4} steps={manySteps} onStepClick={handleStepEvent} onStepFocus={handleStepEvent} />))
	.add('Step Error', () => (<StepError onStepClick={handleStepEvent} onStepFocus={handleStepEvent} />))
	.add('Next Step', () => (<Default currentStep={1} onStepClick={handleStepEvent} onStepFocus={handleStepEvent} />))
	.add('On A Gray Background', () => (<Default currentStep={1} variant="modal" onStepClick={handleStepEvent} onStepFocus={handleStepEvent} />))
	.add('In A Modal', () => (<Modal steps={modalStepsBasic} onStepClick={handleStepEvent} onStepFocus={handleStepEvent} />))
	.add('In A Modal (With Step Error)', () => (<Modal hasError steps={modalStepsBasic} onStepClick={handleStepEvent} onStepFocus={handleStepEvent} />));
