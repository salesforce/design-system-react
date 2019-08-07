import React from 'react';
import { storiesOf } from '@storybook/react';
import { MAP } from '../../../utilities/constants';
import MultiLocations from '../../map/__examples__/multiple-locations';
import InsideModal from '../../map/__examples__/inside-modal';

storiesOf(MAP, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('w/ Multiple Locations', () => <MultiLocations />)
	.add('w/ Inside Modal', () => <InsideModal />);
