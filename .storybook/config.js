import { configure, addDecorator } from '@storybook/react';
import React from 'react';
// import { checkA11y } from '@storybook/addon-a11y';

function loadStories() {
	require('../components/storybook-stories'); // eslint-disable-line global-require
}

// addDecorator(checkA11y);
const ReactStrictModeDecorator = (storyFn) => (
	<React.StrictMode>{storyFn()}</React.StrictMode>
);
addDecorator(ReactStrictModeDecorator);

configure(loadStories, module);
