/* eslint-disable filenames/match-regex */
import * as React from 'react';
import ProgressIndicatorInteractive from '../progress-indicator-interactive.jsx';

const steps = [
	{
		id: 0,
		label: 'tooltip label #1',
	},
	{ id: 1, label: 'tooltip label #2' },
	{ id: 2, label: 'tooltip label #3' },
	{ id: 3, label: 'tooltip label #4' },
	{ id: 4, label: 'tooltip label #5' },
];

export default (
	<ProgressIndicatorInteractive
		steps={steps}
	/>
);
