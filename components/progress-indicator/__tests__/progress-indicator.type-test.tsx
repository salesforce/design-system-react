/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import ProgressIndicator, { type ProgressStep } from '../index';

const steps: ProgressStep[] = [
	{ id: 0, label: 'One' },
	{ id: 1, label: 'Two' },
];

export const base = (
	<ProgressIndicator steps={steps} selectedStep={steps[0]} variant="modal" />
);

export const vertical = (
	<ProgressIndicator
		steps={steps}
		selectedStep={steps[0]}
		orientation="vertical"
	/>
);

export const setupAssistant = (
	<ProgressIndicator
		steps={steps}
		selectedStep={steps[0]}
		variant="setup-assistant"
		orientation="vertical"
	/>
);

export const path = (
	<ProgressIndicator steps={steps} selectedStep={steps[0]} type="path" />
);

export const horizontalSetupAssistant = (
	// @ts-expect-error Setup Assistant is always vertical
	<ProgressIndicator
		steps={steps}
		selectedStep={steps[0]}
		variant="setup-assistant"
		orientation="horizontal"
	/>
);

export const pathWithErrors = (
	// @ts-expect-error `errorSteps` is not used by the path
	<ProgressIndicator
		steps={steps}
		selectedStep={steps[0]}
		type="path"
		errorSteps={[steps[1]]}
	/>
);

export const pathWithVariant = (
	<ProgressIndicator
		steps={steps}
		selectedStep={steps[0]}
		type="path"
		// @ts-expect-error `variant` is not used by the path
		variant="modal"
	/>
);

export const statusAndIdSelection = (
	<ProgressIndicator
		steps={[
			{ id: 0, label: 'One', status: 'completed' },
			{ id: 1, label: 'Two', status: 'error' },
		]}
		selectedStep={1}
	/>
);

export const unknownStatus = (
	<ProgressIndicator
		// @ts-expect-error `status` is `completed`, `disabled` or `error`
		steps={[{ id: 0, label: 'One', status: 'done' }]}
		selectedStep={0}
	/>
);
