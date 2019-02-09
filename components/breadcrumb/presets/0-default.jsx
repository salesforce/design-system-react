/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Breadcrumb from '../breadcrumb';

export default (
	<Breadcrumb
		uxpId="0"
		style={{"fontFamily": "Salesforce Sans"}}
		items={
			[
				{
				   "label": "Item 1",
				   "href": "#",
				   "id": "breadcrumb1"
				},
				{
				   "label": "Item 2",
				   "href": "#",
				   "id": "breadcrumb2"
				},
				{
				   "label": "Item 3",
				   "href": "#",
				   "id": "breadcrumb3"
				}
			]
		}
	/>
);
