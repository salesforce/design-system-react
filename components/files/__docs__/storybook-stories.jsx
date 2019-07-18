import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { FILES } from '../../../utilities/constants';
import Default from '../__examples__/default';
import NoImage from '../__examples__/no-image';
import NoTitle from '../__examples__/no-title';
import Actions from '../__examples__/actions';
import ExternalIcon from '../__examples__/with-external-icon';
import Loading from '../__examples__/loading';
import Cropped from '../__examples__/crops';

storiesOf(FILES, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Default', () => <Default />)
	.add('w/o Image', () => <NoImage />)
	.add('w/o Title', () => <NoTitle action={action} />)
	.add('w/ External Icon', () => <ExternalIcon />)
	.add('w/ Actions', () => <Actions />)
	.add('Loading', () => <Loading />)
	.add('Cropped', () => <Cropped />);
