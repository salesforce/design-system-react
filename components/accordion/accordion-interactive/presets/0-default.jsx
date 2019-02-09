/* eslint-disable filenames/match-regex */
import * as React from 'react';
import AccordionInteractive from '../accordion-interactive';

export default (
	<AccordionInteractive
		uxpId="1"
		style={{ fontFamily: 'Salesforce Sans' }}
		items={[
			{
				id: '1',
				summary: 'Accordion Summary',
				details: 'Accordion details - A',
			},
			{
				id: '2',
				summary: 'Accordion Summary',
				details: 'Accordion details - B',
			},
			{
				id: '3',
				summary: 'Accordion Summary',
				details: 'Accordion details - C',
			},
		]}
	/>
);
