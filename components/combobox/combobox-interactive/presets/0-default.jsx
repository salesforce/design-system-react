/* eslint-disable filenames/match-regex */
import * as React from 'react';
import ComboboxInteractive from '../combobox-interactive';

export default (
	<ComboboxInteractive
		uxpId="0"
		style={{
			"fontFamily": "Salesforce Sans"
		}}
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
	/>
);
