import React from 'react';
import { renderDOM, renderMarkup } from '../snapshot-helpers';

import Default from '../../examples/scheduler/default';

test('Scheduler Base Snapshot', () => {
	expect().toMatchSnapshot();
});

test('Scheduler Base with custom className Snapshot', () => {
	expect(renderMarkup(Default,
		{ className: 'MY_CUSTOM_CLASS_NAME' })).toMatchSnapshot();
});

test('AssistiveText Scheduler HTML Snapshot', () => {
	// expect(renderMarkup(Default)).toMatchSnapshot();
});
