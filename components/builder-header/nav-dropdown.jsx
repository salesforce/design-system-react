import React from 'react';

import Button from '../button';
import Icon from '../icon';
import Dropdown from '../menu-dropdown';
import DropdownTrigger from '../menu-dropdown/button-trigger';
import MenuDropdown from '../menu-dropdown/menu-dropdown';

import { BUILDER_HEADER_NAV_DROPDOWN } from '../../utilities/constants';

// This component accepts the same props as MenuDropdown.
// eslint-disable-next-line react/forbid-foreign-prop-types
const { propTypes } = MenuDropdown;

/**
 * A dropdown within the navigation section of the header.
 */
const BuilderHeaderNavDropdown = (props) => {
	// Separate props we care about in order to pass others along passively to the dropdown component
	const { iconCategory, iconName, label, assistiveText, ...rest } = props;
	return (
		<Dropdown {...rest}>
			<DropdownTrigger>
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
			</DropdownTrigger>
		</Dropdown>
	);
};

BuilderHeaderNavDropdown.displayName = BUILDER_HEADER_NAV_DROPDOWN;
BuilderHeaderNavDropdown.propTypes = propTypes;
export default BuilderHeaderNavDropdown;
