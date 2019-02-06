/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Accordion from '../accordion';
import AccordionPanel from '../accordion-panel';

export default (
	<Accordion uxpId="0">
		<AccordionPanel expanded summary="Panel 1. Merge" uxpId="1">
			Merge is a revolution
		</AccordionPanel>
		<AccordionPanel summary="Panel 2. Merge" uxpId="2">
			Merge is a revolution
		</AccordionPanel>
		<AccordionPanel summary="Panel 3. Merge" uxpId="3">
			Merge is a revolution
		</AccordionPanel>
	</Accordion>
);
