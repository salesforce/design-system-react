/* eslint-disable filenames/match-regex */
import * as React from 'react';
import GlobalHeaderSearch from '../global-header-search';

export default (
	<GlobalHeaderSearch
		uxpId="0"
		placeholder="Search Salesforce"
		options={[{ label: 'Email' }, { label: 'Mobile' }]}
	/>
);
