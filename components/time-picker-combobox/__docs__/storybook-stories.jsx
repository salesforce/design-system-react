/* eslint-disable indent */
import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';
import { TIME_PICKER_COMBOBOX } from '../../../utilities/constants';

import Base from '../__examples__/base';
import CustomOptions from '../__examples__/base-custom-options';
import SnapshotBaseOpen from '../__examples__/snapshot/base-open';

storiesOf(TIME_PICKER_COMBOBOX, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => <Base />)
	.add('Custom Options', () => <CustomOptions />)
	.add('Snapshot Base Open', () => <SnapshotBaseOpen />);
