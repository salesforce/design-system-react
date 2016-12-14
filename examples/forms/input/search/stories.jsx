import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { FORMS_SEARCH } from '../../../../utilities/constants';
import Search from '../../../../components/forms/input/search';

storiesOf(FORMS_SEARCH, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Standard', () => <Search
		assistiveText="Search"
		placeholder="Search"
		name="search-input"
		onChange={action('change')}
		onSearch={action('search')}
	/>);
