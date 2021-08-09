declare module '@salesforce/design-system-react/components/global-navigation-bar/link' {
	import React from 'react';
	type Props = {
		/**
		 * Whether the item is active or not.
		 */
		active?: boolean;
		/**
		 * Allows alignment of active item with active application background color. If application background is dark, text color may need to be `#fff`. This can be done with the style prop.
		 */
		activeBackgroundColor?: string;
		/**
		 * **Assistive text for accessibility.**
		 * * `activeDescriptor`: The text that appears alongside a link that is currently active.
		 */
		assistiveText?: Partial<{
			activeDescriptor?: string;
		}>;
		/**
		 * Class names to be added to the anchor element
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Determines position of separating bar.
		 */
		dividerPosition?: 'left' | 'right';
		/**
		 * The `href` attribute of the link. Please pass in bookmarkable URLs from your routing library. Use `GlobalNavigationBarButton` if a "real URL" is not desired. If the `onClick` callback is specified this URL will still be prevented from changing the browser's location.
		 */
		href?: string;
		/**
		 * The `id` attribute is applied to the `li` tag. _This was recently changed from being on the anchor tag._
		 */
		id?: string;
		/**
		 * Text to show for link item.
		 */
		label?: string;
		/**
		 * Triggered when focus is removed.
		 */
		onBlur?: (v: any) => any;
		/**
		 * `function (event, href)` - fires when the link is clicked. If set, the browser location change to the `href` specified will be ignored, but the `href` will be included in an additional parameter passed to the callback.
		 */
		onClick?: (v: any) => any;
		/**
		 * Triggered when component is focused.
		 */
		onFocus?: (v: any) => any;
		/**
		 * Triggered when a key is pressed down
		 */
		onKeyDown?: (v: any) => any;
		/**
		 * Triggered when a key is pressed and released
		 */
		onKeyPress?: (v: any) => any;
		/**
		 * Triggered when a key is released
		 */
		onKeyUp?: (v: any) => any;
		/**
		 * Triggered when a mouse arrow hovers
		 */
		onMouseEnter?: (v: any) => any;
		/**
		 * Triggered when a mouse arrow no longer hovers
		 */
		onMouseLeave?: (v: any) => any;
		/**
		 * Write "-1" if you don't want the user to tab to the button.
		 */
		tabIndex?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
