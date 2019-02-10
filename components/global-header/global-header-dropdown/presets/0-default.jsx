/* eslint-disable filenames/match-regex */
import * as React from 'react';
import GlobalHeaderDropdown from '../global-header-dropdown';

export default (
	<GlobalHeaderDropdown
		uxpId="0"
		id="global-header-dropdown"
		iconName="add"
		iconCategory="utility"
		options={[{ 'label': 'New Note' }, { 'label': 'Log a Call' }]}
	/>
);
