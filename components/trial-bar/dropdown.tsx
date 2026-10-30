import classNames from 'classnames';

import Dropdown from '../menu-dropdown';
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
	const { label, triggerClassName, ...rest } = props;
	return (
		<Dropdown
			{...rest}
			inverse
			triggerClassName={classNames('slds-grid', triggerClassName)}
			trigger={
				<Button
					inverse
					style={{ border: 0, height: '100%', padding: 0 }}
					iconCategory="utility"
					iconName="right"
					iconPosition="left"
					label={label}
				/>
			}
		/>
	);
};

TrialBarDropdown.displayName = TRIAL_BAR_DROPDOWN;
export default TrialBarDropdown;
