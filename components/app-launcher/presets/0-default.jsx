/* eslint-disable filenames/match-regex */
import * as React from 'react';
import AppLauncher from '../app-launcher';
import Section from '../section/section';
import Tile from '../tile/tile';

export default (
	<AppLauncher triggerName="App Name" uxpId="0" style={{"fontFamily": "Salesforce Sans"}}>
		<Section title="Merge" uxpId="1">
			<Tile
				title="Marketing Cloud"
				iconText="MC"
				description="Send emails, track emails, red emails!"
				uxpId="2"
			/>
			<Tile
				title="Call Center"
				iconText="CC"
				description="The uxpId to call center and contact center is not to use too many words!"
				uxpId="3"
			/>
		</Section>
	</AppLauncher>
);
