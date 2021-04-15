declare module '@salesforce/design-system-react/components/builder-header' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `backIcon`: Used for the back icon.
		 * * `helpIcon`: Used for the help icon.
		 * * `icon`: Used for the main icon next to the header title.
		 * * _Tested with snapshot testing._
		 */
		assistiveText?: Partial<{
			backIcon?: string;
			helpIcon?: string;
			icon?: string;
		}>;
		/**
		 * Provide children of the types `<BuilderHeaderNav />`, `<BuilderHeaderToolbar />`, or `<BuilderHeaderMisc />` to define the structure of the header.
		 * ```
		 * <BuilderHeader>
		 *   <BuilderHeaderNav />
		 *   <BuilderHeaderToolbar />
		 *   <BuilderHeaderMisc />
		 * </BuilderHeader>
		 * ```
		 */
		children?: React.ReactNode;
		/**
		 * CSS classes to be added to tag with `.slds-builder-header_container`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Event Callbacks
		 * * `onClickBack`: Called when the Back link is clicked.
		 * * `onClickHelp`: Called when the Help link is clicked.
		 * _Tested with Mocha testing._
		 */
		events?: Partial<{
			onClickBack?: (v: any) => any;
			onClickHelp?: (v: any) => any;
		}>;
		/**
		 * Category of the title icon from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
		 */
		iconCategory?: string;
		/**
		 * CSS classes that are applied to the title icon.
		 */
		iconClassName?: any[] | Record<string, any> | string;
		/**
		 * Name of the title icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
		 */
		iconName?: string;
		/**
		 * Path to the title icon. This will override any global icon settings.
		 */
		iconPath?: string;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `back`: The label for the Back link.
		 * * `help`: The label for the Help link.
		 * * `pageType`: The label that describes the page type.
		 * * `title`: The label for the page title.
		 * _Tested with snapshot testing._
		 */
		labels?: Partial<{
			back?: string;
			help?: string;
			pageType?: string;
			title?: string;
		}>;
		/**
		 * Custom styles applied to the `.slds-builder-header_container` element.
		 */
		style?: Record<string, any>;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
