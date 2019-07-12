/* eslint-disable react/display-name */ import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';
import Default from '../__examples__/default';
import { RADIO } from '../../../utilities/constants';

import Disabled from '../__examples__/disabled';

class RadioExample extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Default />
			</IconSettings>
		);
	}
}
storiesOf(RADIO, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <RadioExample heading="Base" />)
	.add('Docs site Disabled', () => <Disabled />);
