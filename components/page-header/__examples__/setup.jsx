import React from 'react';

import Button from '~/components/button';
import ButtonGroup from '~/components/button-group';
import Dropdown from '~/components/menu-dropdown';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';
import PageHeader from '~/components/page-header';
import PageHeaderControl from '~/components/page-header/control';

class Example extends React.Component {
	static displayName = 'SetupPageHeaderExample';

	render() {
		const actions = () => (
			<PageHeaderControl>
				<ButtonGroup
					className="slds-align-middle"
					variant="list"
					id="button-group-page-header-actions"
				>
					<Button label="Create" />
					<Dropdown
						align="right"
						assistiveText={{ icon: 'More Options' }}
						iconCategory="utility"
						iconName="down"
						iconVariant="border-filled"
						id="page-header-setup-dropdown-actions"
						options={[
							{ label: 'Menu Item One', value: 'A0' },
							{ label: 'Menu Item Two', value: 'B0' },
							{ label: 'Menu Item Three', value: 'C0' },
							{ type: 'divider' },
							{ label: 'Menu Item Four', value: 'D0' },
						]}
					/>
				</ButtonGroup>
			</PageHeaderControl>
		);

		return (
			<IconSettings iconPath="/assets/icons">
				<PageHeader
					icon={
						<Icon
							assistiveText={{
								label: 'Home',
							}}
							category="standard"
							name="home"
							style={{
								backgroundColor: '#ea7600',
								fill: '#ffffff',
							}}
							title="Home"
						/>
					}
					onRenderActions={actions}
					title="Home"
					trail={[<a href="#setup">Setup</a>]}
					truncate
					variant="object-home"
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
