import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BuilderHeaderBase from '../__examples__/base';
import BuilderHeaderBaseWithToolbar from '../__examples__/base-with-toolbar';
import { BUILDER_HEADER } from '../../../utilities/constants';

storiesOf(BUILDER_HEADER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <BuilderHeaderBase />)
	.add('Base with Toolbar', () => <BuilderHeaderBaseWithToolbar />);
