import { configure } from '@kadira/storybook';

function loadStories () {
	require('../examples/stories'); // eslint-disable-line global-require
}

configure(loadStories, module);
