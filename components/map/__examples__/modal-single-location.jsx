import React from 'react';

import IconSettings from '~/components/icon-settings';
import Map from '~/components/map';
import Button from '~/components/button';

class Example extends React.Component {
	static displayName = 'ModalMapExampleSingleLocation';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Map
					googleAPIKey="AIzaSyDliLquGXGts9S8YtkWVolSQEJdBL1ZuWc"
					title="Geo Code: 37°48&#x27;08.3&quot;N 122°15&#x27;55.2W"
					variant="modal"
					isModalOpen
					modalFooter={
						<Button
							title="Go to Google Maps"
							label="Go to Google Maps"
							variant="brand"
						/>
					}
					location="The Landmark @ One Market, San Francisco, CA"
				/>
			</IconSettings>
		);
	}
}

export default Example;
