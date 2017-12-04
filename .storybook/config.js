import { configure } from '@storybook/react';

function loadStories () {
	require('../components/storybook-stories'); // eslint-disable-line global-require
}

configure(loadStories, module);
