import { configure } from '@storybook/react';

function loadStories() {
	require('../components/story-based-tests.js'); // eslint-disable-line global-require
}

configure(loadStories, module);
