import React from 'react';

import Button from '../button';
import Icon from '../icon';
import Dropdown from '../menu-dropdown';
import DropdownTrigger from '../menu-dropdown/button-trigger';

import {
	BUILDER_HEADER_NAV,
	BUILDER_HEADER_NAV_LINK,
	MENU_DROPDOWN,
} from '../../utilities/constants';

const renderDropdownNavItem = (props) => {
	// Remove props that are custom rendered, and forward remaining props to the dropdown
	const dropdownProps = { ...props };
	['iconCategory', 'iconName', 'label'].forEach(
		(key) => delete dropdownProps[key]
	);
	return (
		<li className="slds-builder-header__nav-item">
			<Dropdown {...dropdownProps}>
				<DropdownTrigger>
					<Button
						className="slds-builder-header__item-action slds-media slds-media_center"
						variant="base"
					>
						<span className="slds-media__figure">
							<Icon
								assistiveText={{
									label:
										(props.assistiveText && props.assistiveText.icon) ||
										props.label,
								}}
								category={props.iconCategory}
								containerClassName="slds-icon_container slds-icon-utility-page slds-current-color"
								name={props.iconName}
								size="x-small"
							/>
						</span>
						<span className="slds-media__body">
							<span className="slds-truncate" title={props.label}>
								{props.label}
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
		</li>
	);
};

const BuilderHeaderNav = (props) => (
	<nav className="slds-builder-header__item slds-builder-header__nav">
		<ul className="slds-builder-header__nav-list">
			{React.Children.map(props.children, (child) => {
				if (child.type.displayName === BUILDER_HEADER_NAV_LINK) {
					return child;
				} else if (child.type.displayName.indexOf(MENU_DROPDOWN) !== -1) {
					return renderDropdownNavItem(child.props);
				}
				return null;
			})}
		</ul>
	</nav>
);

BuilderHeaderNav.displayName = BUILDER_HEADER_NAV;
export default BuilderHeaderNav;
