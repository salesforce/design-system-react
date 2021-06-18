import React from 'react';

import IconSettings from '~/components/icon-settings';
import LocationMap from '~/components/location-map';
import Button from '~/components/button';
import Modal from '~/components/modal';

const locations = [
	{
		id: '1',
		name: 'Worldwide Corporate Headquarters',
		address: 'The Landmark @ One Market, San Francisco, CA',
	},
];

class Example extends React.Component {
	static displayName = 'MapExampleSingleLocation';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Modal
					isOpen
					size="medium"
					heading='Geo Code: 37°48&#x27;08.3"N 122°15&#x27;55.2W'
					footer={
						<Button
							title="Go to Google Maps"
							label="Go to Google Maps"
							variant="brand"
						/>
					}
				>
					<LocationMap
						defaultLocation={locations[0]}
						id="map-single-location-example"
						googleAPIKey="AIzaSyDliLquGXGts9S8YtkWVolSQEJdBL1ZuWc"
						labels={{
							title: 'Geo Code: 37°48&#x27;08.3&quot;N 122°15&#x27;55.2W',
						}}
						locations={locations}
					/>
				</Modal>
			</IconSettings>
		);
	}
}

export default Example;
