import React from 'react';

import Dropdown from '../menu-dropdown';
import DropdownTrigger from '../menu-dropdown/button-trigger';
import MenuDropdown from '../menu-dropdown/menu-dropdown';
import Button from '../button';

import { TRIAL_BAR_DROPDOWN } from '../../utilities/constants';

// This component accepts the same props as MenuDropdown.
// eslint-disable-next-line react/forbid-foreign-prop-types
const { propTypes } = MenuDropdown;

/**
 *  A [Dropdown](/components/menu-dropdowns/) within the Trial Bar.
 */
const TrialBarDropdown = (props) => {
	const { label, ...rest } = props;
	return (
		<Dropdown {...rest} inverse>
			<DropdownTrigger triggerClassName="slds-grid">
				<Button
					inverse
					style={{ border: 0, height: '100%', padding: 0 }}
					iconCategory="utility"
					iconName="right"
					iconPosition="left"
					label={label}
				/>
			</DropdownTrigger>
		</Dropdown>
	);
};

TrialBarDropdown.propTypes = propTypes;
TrialBarDropdown.displayName = TRIAL_BAR_DROPDOWN;
export default TrialBarDropdown;
