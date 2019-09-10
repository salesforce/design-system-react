import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { MAP } from '../../../utilities/constants';
import MultiLocations from '../../map/__examples__/multiple-locations';
import SingleLocation from '../../map/__examples__/single-location';

storiesOf(MAP, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Multi Locations', () => <MultiLocations action={action} />)
	.add('Multi Locations pre-selected', () => (
		<MultiLocations isPreSelected action={action} />
	))
	.add('Multi locations inside Modal', () => (
		<MultiLocations isModal action={action} />
	))
	.add('Single location inside Modal', () => <SingleLocation />);
