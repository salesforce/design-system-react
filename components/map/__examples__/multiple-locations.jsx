import React from 'react';

import IconSettings from '~/components/icon-settings';
import Map from '~/components/map';

const data = [
	{
		name: 'Worldwide Corporate Headquarters',
		address: 'The Landmark @ One Market, San Francisco, CA',
	},
	{
		name: 'salesforce.com inc Atlanta',
		address: '950 East Paces Ferry Road NE, Atlanta, GA',
	},
	{
		name: 'salesforce.com inc Bellevue',
		address: '929 108th Ave NE, Bellevue, WA',
	},
	{
		name: 'salesforce.com inc Boston',
		address: '500 Boylston Street 19th Floor, Boston, MA',
	},
	{
		name: 'salesforce.com inc Chicago',
		address: '111 West Illinois Street, Chicago, IL',
	},
	{
		name: 'salesforce.com inc Herndon',
		address: '2550 Wasser Terrace, Herndon, VA',
	},
	{
		name: 'salesforce.com inc Hillsboro',
		address: '2035 NE Cornelius Pass Road, Hillsboro, OR',
	},
	{
		name: 'salesforce.com inc Indy',
		address: '111 Monument Circle, Indianapolis, IN',
	},
	{
		name: 'salesforce.com inc Irvine',
		address: '300 Spectrum Center Drive, Irvine, CA',
	},
];

class Example extends React.Component {
	static displayName = 'StandaloneMapExampleMultipleLocations';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Map
					googleAPIKey="AIzaSyDliLquGXGts9S8YtkWVolSQEJdBL1ZuWc"
					title="Salesforce Locations In United States"
					locations={data}
				/>
			</IconSettings>
		);
	}
}

export default Example;
