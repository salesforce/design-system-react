/* eslint-disable filenames/match-regex */
import * as React from 'react';
import ProgressIndicator from '../progress-indicator.jsx';

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

export default (
	<ProgressIndicator
		steps={steps}
	/>
);
