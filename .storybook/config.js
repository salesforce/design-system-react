import { configure, addDecorator } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';

const req = require.context('../components', true, /storybook-stories\.jsx$/);

function loadStories() {
	req.keys().forEach((filename) => req(filename));
}

addDecorator(checkA11y);

configure(loadStories, module);
