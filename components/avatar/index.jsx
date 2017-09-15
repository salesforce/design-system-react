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
	 * CSS classes that are applied to the SVG.
	 */
	className: PropTypes.string,
	imgAlt: PropTypes.string,

	imgSrc: PropTypes.string,
	/**
	 * Label attibute to display inside variant: 'initial' avatars. Will be passed as title prop in initials
	 */
	label: PropTypes.string,
	variant: PropTypes.oneOf(['entity', 'user']).isRequired,
	size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']).isRequired,
	/**
	 * Title attribute for the icon container
	 */
	title: PropTypes.string
};

const defaultProps = {
	size: 'medium',
	title: 'user avatar',
	variant: 'user'
};

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
