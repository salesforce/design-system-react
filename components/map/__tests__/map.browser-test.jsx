import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import IconSettings from '../../icon-settings';
import Settings from '../../settings';
import SLDSMap from '../../map';

chai.use(chaiEnzyme());

describe('SLDSMap: ', function() {
	let container;
	let renderedNode;

	// set "app node" fixture, so no warnings are triggered.
	let appNode = document.createElement('span');
	appNode.id = 'app';
	document.body.appendChild(appNode);
	Settings.setAppElement('#app');

	after(() => {
		document.body.removeChild(appNode);
		appNode = null;
	});

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(container);
		document.body.removeChild(container);
		container = null;
	});

	const renderMap = (mapInstance) => {
		container = document.createElement('div');

		const opener = (
			<IconSettings iconPath="/assets/icons">{mapInstance}</IconSettings>
		);
		document.body.appendChild(container);
		renderedNode = ReactDOM.render(opener, container);
		return renderedNode;
	};

	const defaultProps = {
		googleAPIKey: 'AIzaSyDliLquGXGts9S8YtkWVolSQEJdBL1ZuWc',
	};
	const createMap = (props) =>
		React.createElement(SLDSMap, assign({}, defaultProps, props));

	const getMap = (props) => renderMap(createMap(props));

	const getMapNode = (dom) => dom.querySelector('.slds-grid');

	describe('Single Location', () => {
		beforeEach(() => {
			const locations = [
				{
					id: '1',
					name: 'Worldwide Corporate Headquarters',
					address: 'The Landmark @ One Market, San Francisco, CA',
				},
			];

			getMap({
				defaultLocation: locations[0],
				locations,
				labels: {
					title: 'Geo Code: 37°48&#x27;08.3&quot;N 122°15&#x27;55.2W',
				},
				id: 'map-test',
			});
		});
		it('renders map correctly', () => {
			const Container = getMapNode(document.body);
			expect(Container.childElementCount).to.equal(1);
			const MapContainer = Container.querySelector('.slds-map');
			expect(MapContainer).to.exist;
			expect(MapContainer.querySelector('iframe').title).to.equal(
				'Geo Code: 37°48&#x27;08.3&quot;N 122°15&#x27;55.2W'
			);
		});
	});

	describe('Multiple Locations', () => {
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
		];

		beforeEach(() => {
			getMap({
				defaultLocation: locations[0],
				locations,
				labels: {
					title: 'Salesforce Locations In United States',
				},
				selection: locations[2],
				id: 'map-test',
			});
		});
		it('renders map correctly', () => {
			const MapContainer = getMapNode(document.body).querySelector('.slds-map');
			expect(MapContainer).to.exist;
			expect(MapContainer.querySelector('iframe').title).to.equal(
				'Salesforce Locations In United States'
			);
		});
		it('renders map coordinates correctly', () => {
			const MapCoordinates = getMapNode(document.body).querySelector(
				'.slds-coordinates'
			);
			expect(MapCoordinates).to.exist;
			expect(
				MapCoordinates.querySelector('.slds-coordinates__title').textContent
			).to.equal('Salesforce Locations In United States (5)');
			const loc = MapCoordinates.querySelector('.slds-coordinates__list')
				.children;
			expect(loc.length).to.equal(5);
			expect(loc[0].querySelector('.slds-text-link').textContent).to.equal(
				'Worldwide Corporate Headquarters'
			);
			expect(
				loc[0].querySelectorAll('.slds-media__body span')[1].textContent
			).to.equal('The Landmark @ One Market, San Francisco, CA');
		});
	});
});
