/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useState, useCallback } from 'react';
import classNames from '../../utilities/class-names';
import { AVATAR } from '../../utilities/constants';
import Icon from '../icon';

/**
 * Avatar size options
 */
export type AvatarSize = 'x-small' | 'small' | 'medium' | 'large';

/**
 * Avatar variant - determines shape and default icon
 */
export type AvatarVariant = 'entity' | 'user';

/**
 * Assistive text for Avatar
 */
export interface AvatarAssistiveText {
	/** Assistive text for the fallback icon */
	icon?: string;
}

/**
 * Props for the Avatar component
 */
export interface AvatarProps {
	/** Assistive text for accessibility */
	assistiveText?: AvatarAssistiveText | string;
	/** Alt text for the image */
	imgAlt?: string;
	/** Source URL for the image */
	imgSrc?: string;
	/** Initials to display (overrides built initials from label) */
	initials?: string;
	/** Use dark text on light background for initials */
	inverse?: boolean;
	/** Label used to build initials and as title for abbr element */
	label?: string;
	/** Size of the avatar */
	size?: AvatarSize;
	/** Title attribute for the avatar container */
	title?: string;
	/** Variant determines shape (circle for user, square for entity) */
	variant?: AvatarVariant;
}

const defaultAssistiveText: AvatarAssistiveText = {
	icon: 'User or Account Icon',
};

/**
 * Build initials from a label/name string.
 * - Two words: first letter of each, capitalized
 * - One word: first two letters (first capitalized, second lowercase)
 * - Three+ words: first letter of first and last words, capitalized
 */
const buildInitials = (label: string): string => {
	const name = label.trim();
	const nameParts = name.split(' ');
	if (nameParts.length > 1) {
		return (
			nameParts[0].charAt(0).toUpperCase() +
			nameParts[nameParts.length - 1].charAt(0).toUpperCase()
		);
	}
	return (name[0] || '').toUpperCase() + (name[1] || '').toLowerCase();
};

/**
 * The Avatar component represents an object or entity.
 *
 * An image is the preferred format. If `imgSrc` is undefined and `label` or `initials`
 * is available, initials will be shown. Otherwise, a default icon is displayed.
 */
const Avatar = ({
	assistiveText: propAssistiveText,
	imgAlt = '',
	imgSrc,
	initials,
	inverse,
	label,
	size = 'medium',
	title = 'user avatar',
	variant = 'user',
}: AvatarProps): React.ReactElement => {
	const [imgLoadError, setImgLoadError] = useState(false);

	const handleImageError = useCallback(() => {
		setImgLoadError(true);
	}, []);

	// Merge assistive text
	const iconAssistiveText =
		typeof propAssistiveText === 'string'
			? propAssistiveText
			: {
					...defaultAssistiveText,
					...propAssistiveText,
			  }.icon;

	// Render functions for different avatar states
	const renderBaseAvatar = () => (
		<img alt={imgAlt} src={imgSrc} onError={handleImageError} title={title} />
	);

	const renderIconAvatar = () => (
		<Icon
			assistiveText={{ label: iconAssistiveText }}
			category="standard"
			name={variant === 'entity' ? 'account' : 'user'}
		/>
	);

	const renderInitialsAvatar = () => (
		<abbr
			className={classNames('slds-avatar__initials', {
				'slds-avatar__initials_inverse': inverse,
				'slds-icon-standard-account': variant === 'entity',
				'slds-icon-standard-user': variant === 'user',
			})}
			title={label}
		>
			{initials || (label ? buildInitials(label) : '')}
		</abbr>
	);

	// Determine which avatar to render
	const renderAvatar = () => {
		if (!imgLoadError && imgSrc) {
			return renderBaseAvatar();
		}
		if (initials || (label && label.trim())) {
			return renderInitialsAvatar();
		}
		return renderIconAvatar();
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
};

Avatar.displayName = AVATAR;

export default Avatar;















