import React, { type MouseEvent } from 'react';
import EventUtil from '../../utilities/event';

import Icon from '../icon';
import type { IconCategory } from '../../types/common';

import { BUILDER_HEADER_NAV_LINK } from '../../utilities/constants';

export interface BuilderHeaderNavLinkAssistiveText {
	/** Used for the icon next to the link text. */
	icon?: string;
}

export interface BuilderHeaderNavLinkProps {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `icon`: Used for the icon next to the link text.
	 * * _Tested with snapshot testing._
	 */
	assistiveText?: BuilderHeaderNavLinkAssistiveText;
	/**
	 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
	 */
	iconCategory?: 'action' | 'custom' | 'doctype' | 'standard' | 'utility';
	/**
	 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
	 */
	iconName?: string;
	/**
	 * Path to the icon. This will override any global icon settings.
	 */
	iconPath?: string;
	/**
	 * Text for the link.
	 */
	label?: string;
	/**
	 * Triggered when the link is clicked.
	 */
	onClick?: (event: MouseEvent) => void;
}

const defaultAssistiveText: BuilderHeaderNavLinkAssistiveText = {};

/**
 * A link within the navigation section of the header.
 */
const BuilderHeaderNavLink = (
	props: BuilderHeaderNavLinkProps
): React.ReactElement => {
	const assistiveText = {
		...defaultAssistiveText,
		...props.assistiveText,
	};

	return (
		<a
			className="slds-builder-header__item-action slds-media slds-media_center"
			href="#"
			onClick={EventUtil.trappedHandler(props.onClick)}
		>
			<span className="slds-media__figure">
				<Icon
					assistiveText={{ label: assistiveText.icon }}
					category={props.iconCategory as IconCategory}
					containerClassName="slds-icon_container slds-icon-utility-settings slds-current-color"
					name={props.iconName}
					path={props.iconPath}
					size="x-small"
				/>
			</span>
			<span className="slds-media__body">
				<span className="slds-truncate" title={props.label}>
					{props.label}
				</span>
			</span>
		</a>
	);
};

BuilderHeaderNavLink.displayName = BUILDER_HEADER_NAV_LINK;

BuilderHeaderNavLink.defaultProps = {
	assistiveText: {},
	iconCategory: '' as BuilderHeaderNavLinkProps['iconCategory'],
	iconName: '',
	label: '',
};

export default BuilderHeaderNavLink;
