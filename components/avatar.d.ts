declare module '@salesforce/design-system-react/components/avatar' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `icon`: Assistive text for accessibility that labels the icon.
		 */
		assistiveText?: Partial<{
			icon?: string;
		}>;
		/**
		 * Alt attribute to be applied to image (base case) element.
		 */
		imgAlt?: string;
		/**
		 * Source attribute to be applied to image (base case) element.
		 */
		imgSrc?: string;
		/**
		 * Initials attribute to optionally pass in initials directly in case of "initials" fallback case.
		 */
		initials?: string;
		/**
		 * Avatar with initials that are dark text on light background
		 */
		inverse?: boolean;
		/**
		 * Label attibute to display inside "initials" fallback case. Will be passed as title prop in `abbr` element to provide more specificity.
		 */
		label?: string;
		/**
		 * Avatar variants to apply relevant styling (circle: user, square: entity) and icon rendering if applicable.
		 */
		variant: 'entity' | 'user' /*.isRequired*/;
		/**
		 * Size of the icon in "icon" fallback case.
		 */
		size: 'x-small' | 'small' | 'medium' | 'large' /*.isRequired*/;
		/**
		 * Title attribute for the avatar container.
		 */
		title?: string;
	};
	/**
 * The avatar component represents an object or entity. An image is the preferred format for an avatar.
 If the `imgSrc` prop is undefined, and if a `label` or `initials` prop is available, the fallback avatar will render with initials. If initals are passed in directly in the `initials` prop, this will render in the fallback avatar. If `initals` prop is unavailable but a `label` prop is available, the fallback avatar will render with built initials of the user name or entity name.

 Intials built from the `label` prop will apply the following logic: If the label name contains two words, like first and last name, the first letter of each will be capitalized and returned. For labels that only have a single word name, the first two letters of that word, using one capital and one lower case letter, will be returned. For labels that contain three or more words, the first character of the first and last words will be capitalized and returned.

 If `initials` or `label` are not available, the fallback avatar will render a standard icon. If `variant='user'`, a user icon will
 render. If `variant='entity'`, an account icon will render.
 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
