import React from 'react';
import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime
import DropdownTrigger from '~/components/menu-dropdown/button-trigger';
import Button from '~/components/button';

export default class TrialBarDropdown extends React.Component {
	render() {
		return (
			<Dropdown {...this.props} className="trial-bar-dropdown">
				<DropdownTrigger>
					<Button
						inverse
						style={{ border: 0, height: '100%', padding: 0 }}
						iconCategory="utility"
						iconName="right"
						iconPosition="left"
						label={this.props.label}
					/>
				</DropdownTrigger>
			</Dropdown>
		);
	}
}
