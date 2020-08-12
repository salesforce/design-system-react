/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Avatar Component

// Implements the [Avatar design pattern](https://lightningdesignsystem.com/components/avatar/) in React.

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames) A
// simple javascript utility for conditionally joining classNames together.
import classNames from '../../utilities/class-names';
import { AVATAR } from '../../utilities/constants';
import UtilityIcon from '../icon';
import componentDoc from './component.json';

// ### Display Name Always use the canonical component name as the React display
// name.
const displayName = AVATAR;

// ### Prop Types
const propTypes = {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `icon`: Assistive text for accessibility that labels the icon.
	 */
	assistiveText: PropTypes.shape({
		icon: PropTypes.string,
	}),
	/**
	 * Alt attribute to be applied to image (base case) element.
	 */
	imgAlt: PropTypes.string,
	/**
	 * Source attribute to be applied to image (base case) element.
	 */
	imgSrc: PropTypes.string,
	/**
	 * Initials attribute to optionally pass in initials directly in case of "initials" fallback case.
	 */
	initials: PropTypes.string,
	/**
	 * Avatar with initials that are dark text on light background
	 */
	inverse: PropTypes.bool,
	/**
	 * Label attibute to display inside "initials" fallback case. Will be passed as title prop in `abbr` element to provide more specificity.
	 */
	label: PropTypes.string,
	/**
	 * Avatar variants to apply relevant styling (circle: user, square: entity) and icon rendering if applicable.
	 */
	variant: PropTypes.oneOf(['entity', 'user']).isRequired,
	/**
	 * Size of the icon in "icon" fallback case.
	 */
	size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']).isRequired,
	/**
	 * Title attribute for the avatar container.
	 */
	title: PropTypes.string,
};

const defaultProps = {
	assistiveText: {
		icon: 'User or Account Icon',
	},
	imgAlt: '',
	size: 'medium',
	title: 'user avatar',
	variant: 'user',
};

/**
 * The avatar component represents an object or entity. An image is the preferred format for an avatar.
 If the `imgSrc` prop is undefined, and if a `label` or `initials` prop is available, the fallback avatar will render with initials. If initals are passed in directly in the `initials` prop, this will render in the fallback avatar. If `initals` prop is unavailable but a `label` prop is available, the fallback avatar will render with built initials of the user name or entity name.

 Intials built from the `label` prop will apply the following logic: If the label name contains two words, like first and last name, the first letter of each will be capitalized and returned. For labels that only have a single word name, the first two letters of that word, using one capital and one lower case letter, will be returned. For labels that contain three or more words, the first character of the first and last words will be capitalized and returned.

 If `initials` or `label` are not available, the fallback avatar will render a standard icon. If `variant='user'`, a user icon will
 render. If `variant='entity'`, an account icon will render.
 */

class Avatar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imgLoadError: false,
		};

		checkProps(AVATAR, props, componentDoc);
	}

	buildInitials() {
		const { label } = this.props;
		const name = label.trim();
		const nameParts = name.split(' ');
		if (nameParts.length > 1) {
			return (
				nameParts[0].charAt(0).toUpperCase() +
				nameParts[nameParts.length - 1].charAt(0).toUpperCase()
			);
		}
		return (name[0] || '').toUpperCase() + (name[1] || '').toLowerCase();
	}

	handleImageError() {
		return this.setState(() => ({ imgLoadError: true }));
	}

	renderBaseAvatar() {
		const { imgAlt, imgSrc, title } = this.props;
		return (
			<img
				alt={imgAlt}
				src={imgSrc}
				onError={() => this.handleImageError()}
				title={title}
			/>
		);
	}

	renderIconAvatar() {
		const { variant } = this.props;
		const iconAssistiveText =
			typeof this.props.assistiveText === 'string'
				? this.props.assistiveText
				: {
						...defaultProps.assistiveText,
						...this.props.assistiveText,
				  }.icon;
		return (
			<UtilityIcon
				assistiveText={{ label: iconAssistiveText }}
				category="standard"
				name={variant === 'entity' ? 'account' : 'user'}
			/>
		);
	}

	renderInitialsAvatar() {
		const { initials, inverse, label, variant } = this.props;
		return (
			<abbr
				className={classNames('slds-avatar__initials', {
					'slds-avatar__initials_inverse': inverse,
					'slds-icon-standard-account': variant === 'entity',
					'slds-icon-standard-user': variant === 'user',
				})}
				title={label}
			>
				{initials ? initials : this.buildInitials()}
			</abbr>
		);
	}

	render() {
		const { imgSrc, initials, variant, label, size } = this.props;

		const renderAvatar = () => {
			/* eslint no-unneeded-ternary: */
			if (!this.state.imgLoadError && imgSrc) {
				return this.renderBaseAvatar();
			}
			if (initials || (label && label.trim())) {
				return this.renderInitialsAvatar();
			}
			return this.renderIconAvatar();
		};

		return (
			<div>
				<span
					className={classNames('slds-avatar', {
						'slds-avatar_circle': variant === 'user',
						'slds-avatar_x-small': size === 'x-small',
						'slds-avatar_small': size === 'small',
						'slds-avatar_medium': size === 'medium',
						'slds-avatar_large': size === 'large',
					})}
				>
					{renderAvatar()}
				</span>
			</div>
		);
	}
}

Avatar.defaultProps = defaultProps;
Avatar.displayName = displayName;
Avatar.propTypes = propTypes;

export default Avatar;
