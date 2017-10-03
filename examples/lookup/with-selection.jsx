import React from 'react';
import createReactClass from 'create-react-class';
import Lookup from '~/components/lookup'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'LookupExample',

	render () {
		return (
			<Lookup
				emptyMessage="No items found"
				footerRenderer={Lookup.DefaultFooter}
				hasError={false}
				headerRenderer={Lookup.DefaultHeader}
				iconCategory="standard"
				iconName="account"
				label="Account"
				onChange={(newValue) => { console.log('New search term: ', newValue); }}
				onSelect={(item) => { console.log(item, ' Selected'); }}
				options={[
					{ label: 'Paddy\'s Pub' },
					{ label: 'Tyrell Corp' },
					{ label: 'Paper St. Soap Company' },
					{ label: 'Nakatomi Investments' },
					{ label: 'Acme Landscaping' },
					{ label: 'Acme Construction' }
				]}
				selectedItem={1}
			/>
		);
	}
});


export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
