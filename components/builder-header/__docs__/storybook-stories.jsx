import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BuilderHeaderBase from '../__examples__/base';
import BuilderHeaderBaseWithToolbar from '../__examples__/base-with-toolbar';
import BuilderHeaderSuccessfulSave from '../__examples__/successful-save';
import BuilderHeaderAfterSuccessfulSave from '../__examples__/after-successful-save';
import BuilderHeaderFailedSave from '../__examples__/failed-save';

import { BUILDER_HEADER } from '../../../utilities/constants';

storiesOf(BUILDER_HEADER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <BuilderHeaderBase />)
	.add('Base with Toolbar', () => <BuilderHeaderBaseWithToolbar />)
	.add('Successful Save', () => <BuilderHeaderSuccessfulSave />)
	.add('After Successful Save', () => <BuilderHeaderAfterSuccessfulSave />)
	.add('Failed Save', () => <BuilderHeaderFailedSave />);
