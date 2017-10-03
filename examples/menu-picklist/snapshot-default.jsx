/* eslint-disable no-console, react/prop-types */
import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/iconSettings';

// Higher Order Components such as `react-onclickoutside` use the DOM and Jest snapshot testing must be DOMless
import MenuPicklist from '~/components/menu-picklist';

const Example = createReactClass({
	displayName: 'MenuPicklistExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<MenuPicklist
					id="sample-menu-picklist"
					isInline
					label="Contacts"
					onSelect={(value) => { console.log('selected: ', value); }}
					options={[
						{ label: 'Option A', value: 'A0' },
						{ label: 'Option B', value: 'B0' },
						{ label: 'Option C', value: 'C0' },
						{ label: 'Option D', value: 'D0' },
						{ label: 'Option E', value: 'E0' },
						{ label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' }
					]}
					placeholder="Select a contact"
					value="C0"
				/>
			</IconSettings>
		);
	}
});

export default Example;
