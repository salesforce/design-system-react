import React from 'react';
import PropTypes from 'prop-types';
// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from '../../utilities/class-names';
import AVATAR from '../../utilities/constants';
import UtilityIcon from '../icon';

// if an image is passed, then render the image
// if no image, check record name (or initials prop)to apply initials
// if no record name or initials are passed, render fallback icons.

const Avatar = ({
	iconCategory,
	iconName,
	imgAlt,
	imgSrc,
	modifier,
	label,
	size,
	title
}) => {
	const avatarContents = {
		base: () => (<img alt={imgAlt} src={imgSrc} title={title} />),
		initials: () => {
			const handleInitials = (name) => {
				const nameArray = name.split(' ');
				let initials = nameArray[0].substring(0, 1).toUpperCase();
				if (nameArray.length === 1) {
					initials += nameArray[0].charAt(1);
				}
				if (nameArray.length > 1) {
					initials += nameArray[nameArray.length - 1].substring(0, 1).toUpperCase();
				}
				return initials;
			};
			return (<abbr
				className={classNames('slds-avatar__initials', {
					'slds-icon-standard-account': modifier === 'entity',
					'slds-icon-standard-user': modifier === 'user'
				})}
				title={title}
			>{handleInitials(label)}</abbr>
			);
		},
		icon: () => {
			if (!imgSrc || !label) {
				console.log('fallback case....?');
			}
			return (
				<UtilityIcon
					assistiveText={title}
					category={iconCategory}
					name={iconName}
				/>
			);
		}
	};

	const avatarVariant = () => {
		if (imgSrc && imgSrc.length > 0) {
			return 'base';
		}
		if (label && label.length > 0) {
			return 'initials';
		}
		return 'icon';
	};


	return (
		<div>
			<span
				className={classNames('slds-avatar', {
					'slds-avatar_circle': modifier === 'user',
					'slds-avatar_x-small': size === 'x-small',
					'slds-avatar_small': size === 'small',
					'slds-avatar_medium': size === 'medium',
					'slds-avatar_large': size === 'large'
				})}
			>
				{avatarContents[avatarVariant()]()}
			</span>
		</div>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Avatar.displayName = AVATAR;

// ### Prop Types
Avatar.propTypes = {
	/**
 * CSS classes that are applied to the SVG.
 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	iconCategory: PropTypes.string,
	iconName: PropTypes.string,
	imgAlt: PropTypes.string,
	imgSrc: PropTypes.string,
	/**
	* Label attibute to display inside variant: 'initial' avatars
	*/
	label: PropTypes.string,
	modifier: PropTypes.string,
	size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']).isRequired,
	/**
 * Title attribute for the icon container
 */
	title: PropTypes.string
};

Avatar.defaultProps = {
	iconCategory: 'standard',
	iconName: 'user',
	size: 'medium'
};

module.exports = Avatar;
