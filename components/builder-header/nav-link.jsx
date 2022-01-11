import React from 'react';
import PropTypes from 'prop-types';
import EventUtil from '../../utilities/event';

import Icon from '../icon';

import { BUILDER_HEADER_NAV_LINK } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `icon`: Used for the icon next to the link text.
	 * * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		icon: PropTypes.string,
	}),
	/**
	 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
	 */
	iconCategory: PropTypes.oneOf([
		'action',
		'custom',
		'doctype',
		'standard',
		'utility',
	]),
	/**
	 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	/**
	 * Path to the icon. This will override any global icon settings.
	 */
	iconPath: PropTypes.string,
	/**
	 * Text for the link.
	 */
	label: PropTypes.string,
	/**
	 * Triggered when the link is clicked.
	 */
	onClick: PropTypes.func,
};

const defaultProps = {
	assistiveText: {},
	iconCategory: '',
	iconName: '',
	label: '',
};

/**
 * A link within the navigation section of the header.
 */
const BuilderHeaderNavLink = (props) => {
	const assistiveText = {
		...defaultProps.assistiveText,
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
					category={props.iconCategory}
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
BuilderHeaderNavLink.propTypes = propTypes;
export default BuilderHeaderNavLink;
