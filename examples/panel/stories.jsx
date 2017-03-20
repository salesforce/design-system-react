import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { PANEL } from '../../utilities/constants';
import Filtering from './filtering';
import FilteringLocked from './filtering-locked';
import FilteringError from './filtering-error';

storiesOf(PANEL, module)
	.addDecorator((getStory) => (
		<div className="slds-grid" style={{ backgroundColor: '#ccc', padding: '20px' }}>
			<div
				className="slds-col--bump-left"
				style={{ width: '420px' }}
			>
				{getStory()}
			</div>
		</div>
	))
	.add('Filters', () => <Filtering />)
	.add('Filters Locked', () => <FilteringLocked />)
	.add('Filters Error', () => <FilteringError />);
