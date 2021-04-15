declare module '@salesforce/design-system-react/components/color-picker' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * * `label`: Visually hidden label but read out loud by screen readers.
		 * * `hueSlider`: Instructions for hue selection input
		 * * `saturationValueGrid`: Instructions for using the grid for saturation
		 * and value selection
		 */
		assistiveText?: Partial<{
			label?: string;
			hueSlider?: string;
			saturationValueGrid?: string;
		}>;
		/**
		 * CSS classes to be added to tag with `.slds-color-picker`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * CSS classes to be added to tag with `.slds-popover`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
		 */
		classNameMenu?: any[] | Record<string, any> | string;
		/**
		 * Unique ID for component.
		 */
		id?: string;
		/**
		 * Disables the input and button.
		 */
		disabled?: boolean;
		/**
		 * Message to display when the outer input is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText?: string;
		/**
		 * Message to display when the custom tab input is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorTextWorkingColor?: string;
		/**
		 * Event Callbacks
		 * * `onChange`: This function is triggered when done is clicked. This function returns `{event, { color: [string] }}`, which is a hex representation of the color.
		 * * `onClose`: This function is triggered when the menu is closed. This function returns `{event, { trigger, componentWillUnmount }}`. Trigger can have the values `cancel`, `clickOutside`, or `newPopover`.
		 * * `onOpen`: This function is triggered when the color-picker menu is mounted and added to the DOM. The parameters are `event, { portal: }`. `portal` can be used as a React tree root node.
		 * * `onRequestClose`:  This function is triggered when the user clicks outside the menu or clicks the close button. You will want to define this if color-picker is to be a controlled component. Most of the time you will want to set `isOpen` to `false` when this is triggered unless you need to validate something.
		 * 						This function returns `{event, {trigger: [string]}}` where `trigger` is either `cancel` or `clickOutside`.
		 * * `onRequestOpen`: Function called when the color-picker menu would like show.
		 * * `onValidateColor`: Function that overwrites default color validator and called when validating HEX color on outer input change. If callback returns false, errorText is shown if set.
		 * * `onValidateWorkingColor`: Function that overwrites default color validator and called when validating HEX color on custom tab inner input change. If callback returns false, errorTextWorkingColor is shown if set.
		 * * `onWorkingColorChange`: This function is triggered when working color changes (color inside the custom tab). This function returns `{event, { color: [string] }}`, which is a hex representation of the color.
		 * _Tested with Mocha framework._
		 */
		events?: Partial<{
			onChange?: (v: any) => any;
			onClose?: (v: any) => any;
			onOpen?: (v: any) => any;
			onRequestClose?: (v: any) => any;
			onRequestOpen?: (v: any) => any;
			onValidateColor?: (v: any) => any;
			onValidateWorkingColor?: (v: any) => any;
			onWorkingColorChange?: (v: any) => any;
		}>;
		/**
		 * By default, dialogs will flip their alignment (such as bottom to top) if they extend beyond a boundary element such as a scrolling parent or a window/viewpoint. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
		 */
		hasStaticAlignment?: boolean;
		/**
		 * Hides the text input
		 */
		hideInput?: boolean;
		/**
		 * Popover open state
		 */
		isOpen?: boolean;
		/**
		 * **Text labels for internationalization**
		 * * `blueAbbreviated`: One letter abbreviation of blue color component
		 * * `cancelButton`: Text for cancel button on popover
		 * * `customTab`: Text for custom tab of popover
		 * * `customTabActiveWorkingColorSwatch`: Label for custom tab active working color swatch
		 * * `customTabTransparentSwatch`: Label for custom tab active transparent swatch
		 * * `greenAbbreviated`: One letter abbreviation of green color component
		 * * `hexLabel`: Label for input of hexadecimal color
		 * * `invalidColor`: Error message when hex color input is invalid
		 * * `invalidComponent`: Error message when a component input is invalid
		 * * `label`: An `input` label as for a `form`
		 * * `redAbbreviated`: One letter abbreviation of red color component
		 * * `swatchTab`: Label for swatch tab of popover
		 * * `submitButton`: Text for submit/done button of popover
		 */
		labels?: Partial<{
			blueAbbreviated?: string;
			cancelButton?: string;
			customTab?: string;
			customTabActiveWorkingColorSwatch?: string;
			customTabTransparentSwatch?: string;
			greenAbbreviated?: string;
			hexLabel?: string;
			invalidColor?: string;
			invalidComponent?: string;
			label?: string;
			redAbbreviated?: string;
			swatchTab?: string;
			swatchTabTransparentSwatch?: string;
			submitButton?: string;
		}>;
		/**
		 * Please select one of the following:
		 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
		 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
		 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
		 */
		menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
		/**
		 * An array of hex color values which is used to set the options of the
		 * swatch tab of the colorpicker popover.
		 * To specify transparent, use empty string as a value.
		 */
		swatchColors?: string[];
		/**
		 * Determines which tab is visible when dialog opens. Use this prop with `base` variant only.
		 * Defaults to `swatch` tab.
		 */
		defaultSelectedTab?: 'swatches' | 'custom';
		/**
		 * Selects which tabs are present for the colorpicker.
		 * * `base`: both swatches and custom tabs are present
		 * * `swatches`: only swatch tab is present
		 * * `custom`: only custom tab is present
		 * _Tested with snapshot testing._
		 */
		variant?: 'base' | 'swatches' | 'custom';
		/**
		 * Current color in hexadecimal string, including # sign (eg: "#000000")
		 */
		value?: string;
		/**
		 * Current working color in hexadecimal string, including # sign (eg: "#000000")
		 */
		valueWorking?: string;
	};
	/**
	 * The Unified Color Picker component allows for a fully accessible and configurable color picker, allowing the user to pick from a set of predefined colors (swatches), or to pick a custom color using a HSB selection interface. It can be configured to show one or both of those color selection interfaces. View [component blueprint guidelines](https://lightningdesignsystem.com/components/color-picker/).
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
