import React from 'react';

import IconSettings from '~/components/icon-settings';
import LocationMap from '~/components/location-map';
import Button from '~/components/button';
import Modal from '~/components/modal';

import log from '~/utilities/log';

const locations = [
	{
		id: '1',
		name: 'Worldwide Corporate Headquarters',
		address: 'The Landmark @ One Market, San Francisco, CA',
	},
	{
		id: '2',
		name: 'salesforce.com inc Atlanta',
		address: '950 East Paces Ferry Road NE, Atlanta, GA',
	},
	{
		id: '3',
		name: 'salesforce.com inc Bellevue',
		address: '929 108th Ave NE, Bellevue, WA',
	},
	{
		id: '4',
		name: 'salesforce.com inc Boston',
		address: '500 Boylston Street 19th Floor, Boston, MA',
	},
	{
		id: '5',
		name: 'salesforce.com inc Chicago',
		address: '111 West Illinois Street, Chicago, IL',
	},
	{
		id: '6',
		name: 'salesforce.com inc Herndon',
		address: '2550 Wasser Terrace, Herndon, VA',
	},
	{
		id: '7',
		name: 'salesforce.com inc Hillsboro',
		address: '2035 NE Cornelius Pass Road, Hillsboro, OR',
	},
	{
		id: '8',
		name: 'salesforce.com inc Indy',
		address: '111 Monument Circle, Indianapolis, IN',
	},
	{
		id: '9',
		name: 'salesforce.com inc Irvine',
		address: '300 Spectrum Center Drive, Irvine, CA',
	},
];

class Example extends React.Component {
	static displayName = 'LocationMapExampleMultipleLocations';

	constructor(props) {
		super(props);
		this.state = {
			selection: this.props.selection || undefined,
		};
	}

	render() {
		const locationMap = (
			<LocationMap
				defaultLocation={locations[0]}
				id="location-map-multiple-locations-example"
				googleAPIKey="AIzaSyDliLquGXGts9S8YtkWVolSQEJdBL1ZuWc"
				labels={{ title: 'Salesforce Locations In United States' }}
				locations={locations}
				onClickLocation={(event, data) => {
					log({
						action: this.props.action,
						event,
						eventName: 'Location is selected',
						data,
					});
					this.setState({ selection: data });
				}}
				selection={this.state.selection}
			/>
		);

		return (
			<IconSettings iconPath="/assets/icons">
				{this.props.isModal ? (
					<Modal
						isOpen
						size="medium"
						heading="Salesforce Locations In United States (9)"
						footer={
							<Button
								title="Go to Google Maps"
								label="Go to Google Maps"
								variant="brand"
							/>
						}
					>
						{locationMap}
					</Modal>
				) : (
					<React.Fragment>{locationMap}</React.Fragment>
				)}
			</IconSettings>
		);
	}
}

export default Example;
