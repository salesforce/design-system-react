import React from 'react';

import IconSettings from '~/components/icon-settings';
import Map from '~/components/map';
import Button from '~/components/button';
import Modal from '~/components/modal';

class Example extends React.Component {
	static displayName = 'MapExampleSingleLocation';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Modal
					isOpen
					size="medium"
					heading="Geo Code: 37°48&#x27;08.3&quot;N 122°15&#x27;55.2W"
					footer={
						<Button
							title="Go to Google Maps"
							label="Go to Google Maps"
							variant="brand"
						/>
					}
				>
					<Map
						id="map-single-location-example"
						googleAPIKey="AIzaSyDliLquGXGts9S8YtkWVolSQEJdBL1ZuWc"
						labels={{
							title: 'Geo Code: 37°48&#x27;08.3&quot;N 122°15&#x27;55.2W',
						}}
						locations={[
							{
								name: 'Worldwide Corporate Headquarters',
								address: 'The Landmark @ One Market, San Francisco, CA',
							},
						]}
					/>
				</Modal>
			</IconSettings>
		);
	}
}

export default Example;
