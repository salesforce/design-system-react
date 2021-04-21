declare module '@salesforce/design-system-react/components/toast' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `closeButton`: This is a visually hidden label for the close button.
		 * * `error`: This is a visually hidden label to mark the toast as an error variant
		 * * `info`: This is a visually hidden label to mark the toast as an info variant
		 * * `success`: This is a visually hidden label to mark the toast as an success variant
		 * * `warning`: This is a visually hidden label to mark the toast as an warning variant
		 * _Tested with snapshot testing._
		 */
		assistiveText?: Partial<{
			closeButton?: string | React.ReactNode;
		}>;
		/**
		 * CSS classes to be added to tag with `.slds-notify_toast`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 * _Tested with snapshot testing._
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * If duration exists, the Toast will disappear after that amount of time. Time in milliseconds. _Tested with Mocha testing._
		 */
		duration?: number;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `details`: Secondary text below heading
		 * * `heading`: text within heading tag
		 * * `headingLink`: Text of link that triggers `onClickHeadingLink`. Inline links should pass a keyed array of React components into `labels.heading`.
		 *
		 * _Tested with snapshot testing._
		 */
		labels?: Partial<{
			details?: string | React.ReactNode;
			heading?: string | React.ReactNode;
			headingLink?: string | React.ReactNode;
		}>;
		/**
		 * Triggered by link. _Tested with Mocha testing._
		 */
		onClickHeadingLink?: (v: any) => any;
		/**
		 * Icon of type `~/components/icon`. This icon will be cloned and additional props appended. The default icons are:
		 * * info variant: `utility:info`
		 * * error variant: `utility:error`
		 * * success variant: `utility:success`
		 * * warning variant: `utility:warning`
		 *
		 * _Tested with snapshot testing._
		 */
		icon?: React.ReactNode;
		/**
		 * Triggered by close button. _Tested with Mocha testing._
		 */
		onRequestClose?: (v: any) => any;
		/**
		 * Custom styles to be passed to the component. _Tested with Mocha testing._
		 */
		style?: Record<string, any>;
		/**
		 * The type of Toast. _Tested with snapshot testing._
		 */
		variant: 'error' | 'info' | 'success' | 'warning' /*.isRequired*/;
	};
	/**
	 * Toast serves as a feedback & confirmation mechanism after the user takes an action. View [banner guidelines](https://www.lightningdesignsystem.com/guidelines/messaging/components/banners/).
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
