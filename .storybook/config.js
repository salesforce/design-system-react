import { configure, addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import axeConfig from '../tests/axe-config';

addDecorator(withA11y);
addParameters({
	a11y: {
		element: '#root',
		// axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
		config: axeConfig,
		// axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
		options: {},
	},
});

// Load all stories based on Webpack and filename
const req = require.context('../components', true, /storybook-stories\.jsx$/);

function loadStories() {
	req.keys().forEach((filename) => {
		return req(filename);
	});
}

configure(loadStories, module);
