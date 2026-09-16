import Dropdown from '../menu-dropdown';
import DropdownTrigger from '../menu-dropdown/button-trigger';
import { type MenuDropdownProps } from '../menu-dropdown/menu-dropdown';
import Button from '../button';

import { TRIAL_BAR_DROPDOWN } from '../../utilities/constants';

export interface TrialBarDropdownProps extends MenuDropdownProps {
	/**
	 * Label rendered on the dropdown trigger button.
	 */
	label?: string;
}

/**
 *  A [Dropdown](/components/menu-dropdowns/) within the Trial Bar.
 */
const TrialBarDropdown = (props: TrialBarDropdownProps) => {
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

TrialBarDropdown.displayName = TRIAL_BAR_DROPDOWN;
export default TrialBarDropdown;
