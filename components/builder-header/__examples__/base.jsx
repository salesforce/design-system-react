import React from 'react';
import { actions, action } from '@storybook/addon-actions';

import IconSettings from '../../icon-settings';
import BuilderHeader from '../../builder-header';
import BuilderHeaderNav from '../../builder-header/nav';
import BuilderHeaderNavDropdown from '../../builder-header/nav-dropdown';
import BuilderHeaderNavLink from '../../builder-header/nav-link';

const Example = (props) => (
	<IconSettings iconPath="/assets/icons">
		<BuilderHeader
			assistiveText={{
				icon: 'Builder',
				backIcon: 'Back',
				helpIcon: 'Help',
			}}
			events={actions('onClickBack', 'onClickHelp')}
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
					onClick={action('link/onClick')}
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
					onSelect={action('dropdown/onSelect')}
				/>
			</BuilderHeaderNav>
		</BuilderHeader>
	</IconSettings>
);

Example.displayName = 'BuilderHeaderBase';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
