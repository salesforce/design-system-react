import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../../icon-settings';

import { SEARCH } from '../../../../utilities/constants';
import Search from '../../search';

storiesOf(SEARCH, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Standard', () => (
		<Search
			assistiveText={{ label: 'Search' }}
			placeholder="Search"
			name="search-input"
			onChange={action('change')}
			onSearch={action('search')}
		/>
	));
