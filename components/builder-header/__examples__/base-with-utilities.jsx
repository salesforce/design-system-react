import React from 'react';

import IconSettings from '../../icon-settings';
import BuilderHeader from '../../builder-header';
import BuilderHeaderNav from '../nav';
import BuilderHeaderNavDropdown from '../nav-dropdown';
import BuilderHeaderNavLink from '../nav-link';
import BuilderHeaderUtilities from '../utilities';

const Example = (props) => (
	<IconSettings iconPath="/assets/icons">
		<BuilderHeader
			assistiveText={{
				icon: 'Builder',
				backIcon: 'Back',
				helpIcon: 'Help',
			}}
			events={{
				onClickBack: () => console.log('onClickBack'),
				onClickHelp: () => console.log('onClickHelp'),
			}}
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
					onClick={() => console.log('link/onClick')}
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
					onSelect={() => console.log('dropdown/onSelect')}
				/>
			</BuilderHeaderNav>
			<BuilderHeaderUtilities>
				<BuilderHeaderNavLink
					assistiveText={{ label: 'Back' }}
					iconCategory="utility"
					iconName="back"
					label="Back"
					onClick={() => console.log('link/onClick')}
				/>
				<BuilderHeaderNavDropdown
					assistiveText={{ icon: 'Dropdown' }}
					iconCategory="utility"
					iconName="help"
					id="dropdown"
					label="Help"
					menuPosition="overflowBoundaryElement"
					options={[
						{
							label: 'Builder Help',
							value: 'A0',
							leftIcon: {
								name: 'help',
								category: 'utility',
							},
						},
						{
							label: 'Keyboard Shortcuts',
							value: 'B0',
							leftIcon: {
								name: 'keyboard_dismiss',
								category: 'utility',
							},
						},
					]}
					onSelect={() => console.log('dropdown/onSelect')}
					width="x-small"
				/>
			</BuilderHeaderUtilities>
		</BuilderHeader>
	</IconSettings>
);

Example.displayName = 'BuilderHeaderBaseWithUtilities';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
