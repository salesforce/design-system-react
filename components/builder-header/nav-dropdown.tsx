import Button from '../button';
import Icon from '../icon';
import Dropdown from '../menu-dropdown';
import { type MenuDropdownBaseProps } from '../menu-dropdown/menu-dropdown';
import type { IconCategory } from '../../types/common';

import { BUILDER_HEADER_NAV_DROPDOWN } from '../../utilities/constants';

export interface BuilderHeaderNavDropdownProps extends Omit<
	MenuDropdownBaseProps,
	'assistiveText'
> {
	/**
	 * Assistive text for accessibility. `icon` labels the leading icon.
	 */
	assistiveText?: {
		/** Label of the leading icon. */
		icon?: string;
	} & Record<string, unknown>;
	/**
	 * Category of the leading icon.
	 */
	iconCategory?: IconCategory;
	/**
	 * Name of the leading icon.
	 */
	iconName?: string;
	/**
	 * Text label shown next to the icon.
	 */
	label?: string;
	/** Passed to the dropdown; the trigger is built by this component. */
	buttonVariant?: 'base' | 'neutral' | 'brand' | 'destructive' | 'icon';
}

/**
 * A dropdown within the navigation section of the header.
 */
const BuilderHeaderNavDropdown = (props: BuilderHeaderNavDropdownProps) => {
	// Separate props we care about in order to pass others along passively to the dropdown component
	const { iconCategory, iconName, label, assistiveText, ...rest } = props;
	return (
		<Dropdown
			{...(rest as MenuDropdownBaseProps)}
			trigger={
				<Button
					className="slds-builder-header__item-action slds-media slds-media_center"
					variant="base"
				>
					<span className="slds-media__figure">
						<Icon
							assistiveText={{
								label: assistiveText && assistiveText.icon,
							}}
							category={iconCategory}
							containerClassName="slds-icon_container slds-icon-utility-page slds-current-color"
							name={iconName}
							size="x-small"
						/>
					</span>
					<span className="slds-media__body">
						<span className="slds-truncate" title={label}>
							{label}
						</span>
						<Icon
							category="utility"
							containerClassName="slds-icon_container slds-icon-utility-chevrondown slds-current-color slds-m-left_small"
							name="chevrondown"
							size="x-small"
						/>
					</span>
				</Button>
			}
		/>
	);
};

BuilderHeaderNavDropdown.displayName = BUILDER_HEADER_NAV_DROPDOWN;
export default BuilderHeaderNavDropdown;
