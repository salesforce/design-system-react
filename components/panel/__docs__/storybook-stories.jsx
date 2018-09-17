import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { PANEL } from '../../../utilities/constants';
import Filtering from '../__examples__/filtering';
import FilteringLocked from '../__examples__/filtering-locked';
import FilteringError from '../__examples__/filtering-error';

storiesOf(PANEL, module)
	.addDecorator((getStory) => (
		<div
			className="slds-grid"
			style={{ backgroundColor: '#ccc', padding: '20px' }}
		>
			<div className="slds-col_bump-left" style={{ width: '420px' }}>
				<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
			</div>
		</div>
	))
	.add('Filters', () => <Filtering />)
	.add('Filters Locked', () => <FilteringLocked />)
	.add('Filters Error', () => <FilteringError />);
