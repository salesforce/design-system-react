declare module '@salesforce/design-system-react/components/app-launcher/tile' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * * `dragIconText`: Text that describes the purpose of the drag handle icon.
		 */
		assistiveText?: Partial<{
			dragIconText?: string;
		}>;
		/**
		 * Class names to be added to the tile.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * The description of the app. Not visible on small tiles.
		 */
		description?: string;
		/**
		 * Heading for app description. NOTE: this prop is DEPRECATED and use should be avoided
		 */
		descriptionHeading?: string;
		/**
		 * The `href` attribute of the tile. Please pass in bookmarkable URLs from your routing library. If the `onClick` callback is specified this URL will be prevented from changing the browser's location.
		 */
		href?: string;
		/**
		 * Background color to be used on the icon. Only applied if iconNode is undefined
		 */
		iconBackgroundColor?: string;
		/**
		 * Icon node for app tile. Takes priority over `iconText`
		 */
		iconNode?: React.ReactNode;
		/**
		 * Text to be used as an icon. Only renders if iconNode is undefined
		 */
		iconText?: string;
		/**
		 * Open the More Tooltip
		 */
		isOpenTooltip?: boolean;
		/**
		 * The localized text for the "More information" tooltip.
		 */
		moreLabel?: string;
		/**
		 * Function that will be executed when clicking on a tile
		 */
		onClick?: (v: any) => any;
		/**
		 * Text used to highlight content in app tiles
		 */
		search?: string;
		/**
		 * App name for the tile's title.
		 */
		title: string /*.isRequired*/;

		// Future feature: add Highlighter to Truncate text (https://github.com/ShinyChang/React-Text-Truncate/issues/32)
	};
	/**
	 * App Launcher Tiles provide information and links to a user's apps
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
