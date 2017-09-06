import React from 'react';
import PropTypes from 'prop-types';
// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from '../../utilities/class-names';
import AVATAR from '../../utilities/constants';
import UtilityIcon from '../icon';


const Avatar = ({
	assistiveText,
	baseImgSrc,
	iconCategory,
	iconName,
	size,
	title,
	type,
	label,
	variant
}) => {
	const avatarContents = {
		base: () => (<img alt="Person name" src={baseImgSrc} title={title} />),
		initials: () => (
			<abbr
				className={classNames('slds-avatar__initials', {
					'slds-icon-standard-account': type === 'entity',
					'slds-icon-standard-user': type === 'user'
				})} title={title}
			>{label}</abbr>
		),
		icon: () => (
			<UtilityIcon
				assistiveText={assistiveText}
				category={iconCategory}
				name={iconName}
				title={title}
			/>
		)
	};

	return (
		<div>
			<span
				className={classNames('slds-avatar', {
					'slds-avatar_circle': type === 'user',
					'slds-avatar_x-small': size === 'x-small',
					'slds-avatar_small': size === 'small',
					'slds-avatar_medium': size === 'medium',
					'slds-avatar_large': size === 'large'
				})}
			>
				{avatarContents[variant] && avatarContents[variant]()}
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
 * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
 * Naked icons must have assistive text, however, if you also have visible descriptive text with the icon,
 * declare this prop as <code>assistiveText=''</code>.
 */
	assistiveText: PropTypes.string,
	baseImgSrc: PropTypes.string,
	/**
 * CSS classes that are applied to the SVG.
 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	iconCategory: PropTypes.string,
	iconName: PropTypes.string,
	size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']).isRequired,
	/**
 * Title attribute for the icon container
 */
	title: PropTypes.string,
	type: PropTypes.string,
	/**
* Label attibute to display inside variant: 'initial' avatars
*/
	label: PropTypes.string,
	variant: PropTypes.string.isRequired
};

Avatar.defaultProps = {
	variant: 'base',
	size: 'medium'
};

module.exports = Avatar;
