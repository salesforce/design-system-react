import { action } from 'storybook/actions';
import IconSettings from '../../../icon-settings';

import Search from '../../search';

export default {
	title: 'Components/Input/Search',
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">{Story()}</IconSettings>
			</div>
		),
	],
};

export const Standard = {
	render: () => (
		<Search
			assistiveText={{ label: 'Search' }}
			id="search-standard"
			placeholder="Search"
			name="search-input"
			onChange={action('change')}
			onSearch={action('search')}
		/>
	),
};
