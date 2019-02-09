/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Section from '../section';
import Tile from '../../tile/tile';

export default (
	<Section title="Merge" uxpId="0" style={{"fontFamily": "Salesforce Sans"}}>
		<Tile
			title="Marketing Cloud"
			iconText="MC"
			description="Send emails, track emails, red emails!"
			uxpId="1"
			style={{"fontFamily": "Salesforce Sans"}}
		/>
		<Tile
			title="Call Center"
			iconText="CC"
			description="The uxpId to call center and contact center is not to use too many words!"
			uxpId="2"
			style={{"fontFamily": "Salesforce Sans"}}
		/>
	</Section>
);
