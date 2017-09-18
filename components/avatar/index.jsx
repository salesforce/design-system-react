/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Avatar Component

// Implements the [Avatar design pattern](https://lightningdesignsystem.com/components/avatar/) in React.

// ### React
import React from 'react';
import PropTypes from 'prop-types';
// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames) A
// simple javascript utility for conditionally joining classNames together.
import classNames from '../../utilities/class-names';
import AVATAR from '../../utilities/constants';
import UtilityIcon from '../icon';

// ### Display Name Always use the canonical component name as the React display
// name.
const displayName = AVATAR;

// ### Prop Types
const propTypes = {
	/**
	 * Class names to be applied to Avatar component.
	 */
	className: PropTypes.string,
	/**
	 * Alt attribute to be applied to image (base case) avatar element.
	 */
	imgAlt: PropTypes.string,
	/**
	 * Source attribute to be applied to image (base case) avatar element.
	 */
	imgSrc: PropTypes.string,
	/**
	 * Label attibute to display inside "initial" fallback avatar case. Will be passed as title prop in `abbr` element to provide more specificity.
	 */
	label: PropTypes.string,
	/**
	 * Avatar variants to apply relevant styling (circle: user, square: entity) and icon rendering if applicable.
	 */
	variant: PropTypes.oneOf(['entity', 'user']).isRequired,
	/**
	 * Size of the icon in "icon" fallback avatar case.
	 */
	size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']).isRequired,
	/**
	 * Title attribute for the avatar container.
	 */
	title: PropTypes.string
};

const defaultProps = {
	size: 'medium',
	title: 'user avatar',
	variant: 'user'
};

/**
 * The avatar component represents an object or entity. An image is the preferred format for an avatar.
 If an image is unavailble, and if a `label` prop is available, the fallback avatar will render with initials of the user name or entity name.
 If no label is available, the fallback avatar will render a standard icon. If `variant='user'`, a user icon will
 render. If `variant='entity'`, an account icon will render.
 */

class Avatar extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			imgLoadError: false
		};
	}

	handleImageError () {
		return this.setState(() => ({ imgLoadError: true }));
	}

	buildInitials () {
		const { label } = this.props;
		const name = label.trim();
		let firstChar = '';
		let secondChar = '';
		const nameArray = name.split(' '); // ["Victor", "Brouk"]

		if (nameArray.length === 1) {
			firstChar = name[0].toUpperCase();
			secondChar = name[1]
				? name[1].toLowerCase()
				: '';
		}

		if (nameArray.length > 1) {
			const first = () => nameArray[0].charAt(0);
			const last = () => nameArray[nameArray.length - 1].charAt(0);
			firstChar = first(nameArray).toUpperCase();
			secondChar = last(nameArray).toUpperCase();
		}

		return firstChar + secondChar;
	}

	renderBaseAvatar () {
		const { imgAlt, imgSrc, title } = this.props;
		return <img alt={imgAlt} src={imgSrc} onError={() => this.handleImageError()} title={title} />;
	}

	renderIconAvatar () {
		const { variant } = this.props;
		return (
			<UtilityIcon
				assistiveText={`${variant} icon avatar`}
				category={'standard'}
				name={variant === 'entity' ? 'account' : 'user'}
			/>
		);
	}

	renderInitialsAvatar () {
		const { label, variant } = this.props;
		return (
			<abbr
				className={classNames(
					'slds-avatar__initials', {
						'slds-icon-standard-account': variant === 'entity',
						'slds-icon-standard-user': variant === 'user'
					}
				)}
				title={label}
			>
				{this.buildInitials()}
			</abbr>
		);
	}

	render () {
		const {
			imgSrc,
			variant,
			label,
			size
		} = this.props;


		const renderAvatar = () => {
			if (!this.state.imgLoadError && imgSrc && imgSrc.length > 0) {
				return this.renderBaseAvatar();
			}
			if (label && label.length > 0) {
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
						'slds-avatar_large': size === 'large'
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

module.exports = Avatar;
