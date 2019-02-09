/* eslint-disable filenames/match-regex */
import * as React from 'react';
import GlobalHeaderDropdown from '../global-header-dropdown';

export default (
	<GlobalHeaderDropdown
		uxpId="0"
		assistiveText="Global Actions"
		iconCategory="utility"
		iconName="add"
		options={[{ label: 'New Note' }, { label: 'Log a Call' }]}
	/>
);
