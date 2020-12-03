import { addParameters } from '@storybook/react';
import axeConfig from '../tests/axe-config';

addParameters({
	a11y: {
		element: '#root',
		// axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
		config: axeConfig,
		// axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
		options: {},
	},
});
