import { configure, addDecorator } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';

function loadStories () {
	require('../components/storybook-stories'); // eslint-disable-line global-require
}

addDecorator(checkA11y)

configure(loadStories, module);
