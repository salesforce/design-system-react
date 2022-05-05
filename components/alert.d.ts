declare module '@salesforce/design-system-react/components/alert' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `closeButton`: This is a visually hidden label for the close button.
		 * _Tested with snapshot testing._
		 */
		assistiveText?: Partial<{
			closeButton?: string | React.ReactNode;
		}>;
		/**
		 * CSS classes to be added to tag with `.slds-notify_alert`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 * _Tested with snapshot testing._
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Allows user to click a close button. Banners should be dismissible only if they communicate future impact to the system,
		 * _Tested with snapshot testing._
		 */
		dismissible?: boolean;
		/**
		 * Icon of type `~/components/icon`. This icon will be cloned and additional props appended. The default icons are:
		 * * info variant: `utility:info`
		 * * error variant: `utility:error`
		 * * offline variant: `utility:offline`
		 * * warning variant: `utility:warning`
		 *
		 * _Tested with snapshot testing._
		 */
		icon?: React.ReactNode;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `heading`: text within heading tag
		 * * `headingLink`: Text of link that triggers `onClickHeadingLink`. Inline links should pass a keyed array of React components into `labels.heading`.
		 *
		 * _Tested with snapshot testing._
		 */
		labels?: Partial<{
			heading?: string | React.ReactNode;
			headingLink?: string | React.ReactNode;
		}>;
		/**
		 * Triggered by link. _Tested with Mocha testing._
		 */
		onClickHeadingLink?: (v: any) => any;
		/**
		 * Triggered by close button. This is a controlled component. _Tested with Mocha testing._
		 */
		onRequestClose?: (v: any) => any;
		/**
		 * Custom styles to be passed to the component. _Tested with Mocha testing._
		 */
		style?: Record<string, any>;
		/**
		 * The type of alert. _Tested with snapshot testing._
		 */
		variant: 'error' | 'info' | 'offline' | 'warning' /*.isRequired*/;
	};
	/**
	 * Alert banners communicate a state that affects the entire system, not just a feature or page. It persists over a session and appears without the user initiating the action. View [banner guidelines](https://www.lightningdesignsystem.com/guidelines/messaging/components/banners/).
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
