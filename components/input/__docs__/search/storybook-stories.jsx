import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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
			id="search-standard"
			placeholder="Search"
			name="search-input"
			onChange={action('change')}
			onSearch={action('search')}
		/>
	));
