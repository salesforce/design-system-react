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

const defaultProps = {
	iconCategory: 'standard',
	iconName: 'user',
	size: 'medium'
};

// if an image is passed, then render the image, if no image, check record name
// (or initials prop)to apply initials if no record name or initials are passed,
// render fallback icons. PROPS iconCategory, iconName, imgAlt, imgSrc,
// modifier, label, size,

class Avatar extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			imgLoadError: false
		};
	}

	handleImageError () {
		console.log('error happened');
		this.setState(() => ({ imgLoadError: true }));
	}

	render () {
		const {
			iconCategory,
			iconName,
			imgAlt,
			imgSrc,
			modifier,
			label,
			size,
			title
		} = this.props;

		const renderBaseAvatar = () => (
			<img alt={imgAlt} src={imgSrc} onError={() => this.handleImageError()} title={title} />
		);

		const renderIconAvatar = () => (
			<UtilityIcon
				assistiveText={title}
				category={iconCategory}
				name={iconName}
			/>
		);

		const renderInitialsAvatar = () => {
			const buildInitials = () => {
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
			};

			return (
				<abbr
					className={classNames(
						'slds-avatar__initials', {
							'slds-icon-standard-account': modifier === 'entity',
							'slds-icon-standard-user': modifier === 'user'
						}
					)}
					title={title}
				>
					{buildInitials()}
				</abbr>
			);
		};

		const renderAvatar = () => {
			console.log('label', label.length, label, 'imageError', this.state.imgLoadError);
			if (!this.state.imgLoadError && imgSrc && imgSrc.length > 0) {
				return renderBaseAvatar();
			}
			if (label && label.length > 0) {
				console.log('initials avatar rendered?');
				const initialsTest = renderInitialsAvatar();
				console.log(initialsTest);
				return initialsTest;
			}
			return renderIconAvatar();
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
