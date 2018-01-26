import { configure } from '@storybook/react';

function loadStories() {
	require('../components/storybook-stories-image-snapshots'); // eslint-disable-line global-require
}

configure(loadStories, module);
