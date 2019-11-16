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
					footerRenderer={Lookup.DefaultFooter}
					hasError={false}
					headerRenderer={Lookup.DefaultHeader}
					iconCategory="standard"
					iconName="account"
					label="Account"
					onChange={(newValue) => {
						console.log('New search term: ', newValue);
					}}
					onSelect={(item) => {
						console.log(item, ' Selected');
					}}
					options={[
						{ label: "Paddy's Pub" },
						{ label: 'Tyrell Corp' },
						{ label: 'Paper St. Soap Company' },
						{ label: 'Nakatomi Investments' },
						{ label: 'Acme Landscaping' },
						{ label: 'Acme Construction' },
					]}
					selectedItem={1}
					silenceDeprecationWarning
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
