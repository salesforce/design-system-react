/* eslint-disable filenames/match-regex */
import * as React from 'react';
import MenuDropdown from '../menu-dropdown.jsx';

export default (
	<MenuDropdown
		uxpId="0"
		iconName="down"
		options={[
			{ "label": "Menu Item One", "value": "A0" },
			{ "label": "Menu Item Two", "value": "B0" },
			{ "label": "Menu Item Three", "value": "C0" },
			{ "type": "divider" },
			{ "label": "Menu Item Four", "value": "D0" }
		]}
	/>
);
