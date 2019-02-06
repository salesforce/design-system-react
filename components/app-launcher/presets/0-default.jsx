/* eslint-disable filenames/match-regex */
import * as React from 'react';
import AppLauncher from '../app-launcher';
import Section from '../section/section';
import Tile from '../tile/tile';

export default (
	<AppLauncher triggerName="App Name" key="0">
		<Section title="Merge" key="1">
			<Tile
				title="Marketing Cloud"
				iconText="MC"
				description="Send emails, track emails, red emails!"
				key="2"
			/>
			<Tile
				title="Call Center"
				iconText="CC"
				description="The key to call center and contact center is not to use too many words!"
				key="3"
			/>
		</Section>
	</AppLauncher>
);
