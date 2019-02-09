/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Combobox from '../combobox.jsx';

export default (
	<Combobox
		uxpId="0"
		options={
			[
			{
				"id": "1",
				"label": "Merge 1",
				"type": "account"

			},
			{
				"id": "2",
				"label": "Merge 2",
				"type": "account"

			}
		]
		}
		style={{
			"fontFamily": "Salesforce Sans"
		}}
	/>
);
