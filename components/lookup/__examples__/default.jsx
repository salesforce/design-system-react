import React from 'react';

import IconSettings from '~/components/icon-settings';
import Lookup from '~/components/lookup'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'LookupExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Lookup
					emptyMessage="No items found"
					hasError={false}
					label="Account"
					onChange={(newValue) => {
						console.log('New search term: ', newValue);
					}}
					onSelect={(item) => {
						console.log(item, ' Selected');
					}}
					options={[
						{ type: 'section', label: 'SECTION 1' },
						{ label: "Paddy's Pub" },
						{ label: 'Tyrell Corp' },
						{ type: 'section', label: 'SECTION 2' },
						{ label: 'Paper St. Soap Company' },
						{ label: 'Nakatomi Investments' },
						{ label: 'Acme Landscaping' },
						{ type: 'section', label: 'SECTION 3' },
						{ label: 'Acme Construction' },
					]}
					sectionDividerRenderer={Lookup.DefaultSectionDivider}
					silenceDeprecationWarning
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
