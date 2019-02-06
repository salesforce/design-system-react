/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Section from '../section';
import Tile from '../tile/tile';

export default (
	<Section title="Merge" key="0">
		<Tile
			title="Marketing Cloud"
			iconText="MC"
			description="Send emails, track emails, red emails!"
			key="1"
		/>
		<Tile
			title="Call Center"
			iconText="CC"
			description="The key to call center and contact center is not to use too many words!"
			key="2"
		/>
	</Section>
);
