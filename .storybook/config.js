import { configure } from '@storybook/react';

function loadStories () {
	require('../examples/stories'); // eslint-disable-line global-require
}

configure(loadStories, module);
