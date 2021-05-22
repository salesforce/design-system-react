import React from 'react';
import IconSettings from '../../icon-settings';
import BuilderHeader from '..';
import BuilderHeaderNav from '../nav';
import BuilderHeaderNavDropdown from '../nav-dropdown';
import BuilderHeaderNavLink from '../nav-link';

const Example = (props) => (
	<IconSettings iconPath="/assets/icons">
		<BuilderHeader
			assistiveText={{
				icon: 'Builder',
				backIcon: 'Back',
				helpIcon: 'Help',
			}}
			iconName="world"
			labels={{
				back: 'Back',
				help: 'Help',
				pageType: 'Page Type',
				title: 'App Name',
			}}
			style={{ position: 'relative' }}
		>
			<BuilderHeaderNav>
				<BuilderHeaderNavLink
					assistiveText={{ label: 'Link' }}
					iconCategory="utility"
					iconName="settings"
					label="Link"
				/>
				<BuilderHeaderNavDropdown
					assistiveText={{ icon: 'Dropdown' }}
					iconCategory="utility"
					iconName="page"
					id="dropdown"
					label="Dropdown"
					options={[
						{ label: 'Menu Item One', value: 'A0' },
						{ label: 'Menu Item Two', value: 'B0' },
					]}
				/>
			</BuilderHeaderNav>
		</BuilderHeader>
	</IconSettings>
);

Example.displayName = 'BuilderHeaderBase';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
