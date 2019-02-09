/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Accordion from '../accordion';
import AccordionPanel from '../accordion-panel/';

export default (
	<Accordion uxpId="0" style={{ fontFamily: 'Salesforce Sans' }}>
		<AccordionPanel
			uxpId="1"
			expanded
			summary="Panel 1. Merge"
			style={{ fontFamily: 'Salesforce Sans' }}
		>
			Merge is a revolution
		</AccordionPanel>
		<AccordionPanel
			uxpId="2"
			summary="Panel 2. Merge"
			style={{ fontFamily: 'Salesforce Sans' }}
		>
			Merge is a revolution
		</AccordionPanel>
		<AccordionPanel
			uxpId="3"
			summary="Panel 3. Merge"
			style={{ fontFamily: 'Salesforce Sans' }}
		>
			Merge is a revolution
		</AccordionPanel>
	</Accordion>
);
