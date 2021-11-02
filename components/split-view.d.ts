declare module '@salesforce/design-system-react/components/split-view' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * * `toggleButtonOpen`: The button used to open the split view.
		 * * `toggleButtonClose`: The button used to close the split view.
		 */
		assistiveText?: Partial<{
			toggleButtonOpen?: string;
			toggleButtonClose?: string;
		}>;
		/**
		 * HTML Id for the component.
		 */
		id?: string;
		/**
		 * CSS classes to be added to the root `div` tag. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Sets the split view to be open or closed.
		 */
		isOpen?: boolean;
		/**
		 * Event Callbacks
		 * * `onClose`: Triggered when the split view has closed.
		 * * `onOpen`: Triggered when the split view has opened.
		 */
		events?: Partial<{
			onClose?: (v: any) => any;
			onOpen?: (v: any) => any;
		}>;
		/**
		 * The React component that is rendered in the master section.
		 * You need to pass in an array of elements in order for the scrolling to in the SplitViewList to work correctly.
		 * React requires that you also supply a unique `key` for each element [React Lists and Keys](https://reactjs.org/docs/lists-and-keys.html#keys).
		 */
		master: React.ReactElement[] | React.ReactElement /*.isRequired*/;
		/**
		 * The width of the master section.
		 */
		masterWidth?: string;
		/**
		 * The React component that is rendered in the detail section.
		 */
		detail: React.ReactElement[] | React.ReactElement /*.isRequired*/;
	};
	/**
	 * Split view is used to navigate between records in a list while staying on the same screen.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
