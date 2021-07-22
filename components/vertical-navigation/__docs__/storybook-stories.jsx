import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { VERTICAL_NAVIGATION } from '../../../utilities/constants';

import Default, {
	sampleReportCategories,
	sampleReportWitchIconsCategories,
	sampleReportWitchNotificationCategories,
} from '../__examples__/default';
import SnaphotDefault from '../__examples__/snapshot-default';

storiesOf(VERTICAL_NAVIGATION, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Default', () => (
		<Default categories={sampleReportCategories} action={action} />
	))
	.add('With icons', () => (
		<Default categories={sampleReportWitchIconsCategories} action={action} />
	))
	.add('With notifications', () => (
		<Default
			categories={sampleReportWitchNotificationCategories}
			action={action}
		/>
	))
	.add('DOM Snapshot', () => <SnaphotDefault />);
