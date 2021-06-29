import React from 'react';
import { storiesOf } from '@storybook/react';

import BuilderHeaderBase from '../__examples__/base';
import BuilderHeaderBaseWithToolbar from '../__examples__/base-with-toolbar';
import BuilderHeaderBaseWithUtilities from '../__examples__/base-with-utilities';
import BuilderHeaderCustomIcon from '../__examples__/custom-icon';
import BuilderHeaderSuccessfulSave from '../__examples__/successful-save';
import BuilderHeaderAfterSuccessfulSave from '../__examples__/after-successful-save';
import BuilderHeaderFailedSave from '../__examples__/failed-save';
import BuilderHeaderWithPageTypeEditable from '../__examples__/base-with-page-type-editable';

import { BUILDER_HEADER } from '../../../utilities/constants';

storiesOf(BUILDER_HEADER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <BuilderHeaderBase />)
	.add('Base with Toolbar', () => <BuilderHeaderBaseWithToolbar />)
	.add('Base with Utilities', () => <BuilderHeaderBaseWithUtilities />)
	.add('Custom Icon', () => <BuilderHeaderCustomIcon />)
	.add('Successful Save', () => <BuilderHeaderSuccessfulSave />)
	.add('After Successful Save', () => <BuilderHeaderAfterSuccessfulSave />)
	.add('Failed Save', () => <BuilderHeaderFailedSave />)
	.add('Base with Page Type Editable', () => (
		<BuilderHeaderWithPageTypeEditable />
	));
