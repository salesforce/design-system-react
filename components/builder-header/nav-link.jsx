import React from 'react';

import Icon from '../icon';

import { BUILDER_HEADER_NAV_LINK } from '../../utilities/constants';

// TODO COMPARE WITH BUTTON PROPS, AND UPDATE GITHUB ISSUE; PROBABLY WANT TO ADD TARGET

const defaultProps = {
	assistiveText: {},
};

const BuilderHeaderNavLink = (props) => {
	const assistiveText = {
		...defaultProps.assistiveText,
		...props.assistiveText,
	};
	return (
		<li className="slds-builder-header__nav-item">
			<a
				href={props.href}
				className="slds-builder-header__item-action slds-media slds-media_center"
			>
				<span className="slds-media__figure">
					<Icon
						assistiveText={{ label: assistiveText.label }}
						category={props.iconCategory}
						containerClassName="slds-icon_container slds-icon-utility-settings slds-current-color"
						name={props.iconName}
						size="x-small"
					/>
				</span>
				<span className="slds-media__body">
					<span className="slds-truncate" title={props.label}>
						{props.label}
					</span>
				</span>
			</a>
		</li>
	);
};

BuilderHeaderNavLink.displayName = BUILDER_HEADER_NAV_LINK;
export default BuilderHeaderNavLink;
