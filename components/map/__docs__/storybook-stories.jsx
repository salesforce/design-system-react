import React from 'react';
import { storiesOf } from '@storybook/react';
import { MAP } from '../../../utilities/constants';
import MultiLocations from '../../map/__examples__/multiple-locations';
import ModalSingle from '../../map/__examples__/modal-single-location';
import ModalMulti from '../../map/__examples__/modal-multi-location';

storiesOf(MAP, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Standalone w/ Multiple Locations', () => <MultiLocations />)
	.add('Inside Modal w/ Single location', () => <ModalSingle />)
	.add('Inside Modal w/ Multiple locations', () => <ModalMulti />);
