declare module '@salesforce/design-system-react/components/utilities/pill' {
	import React from 'react';
	type Props = {
		/**
		 * Pill is the actively focused pill within a pill container. This will request focus on the DOM node.
		 */
		active?: boolean;
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `pressDeleteOrBackspace`: Informs user of keyboard keys to press in order to remove a pill
		 */
		assistiveText?: Partial<{
			remove?: string;
		}>;
		/**
		 * SLDSAvatar component to show on the left of the pill.
		 * _Tested with Mocha framework._
		 */
		avatar?: React.ReactElement;
		/**
		 * Applies the bare style to the component.
		 * _Tested with Mocha framework._
		 */
		bare?: boolean;
		/*
		 * Pills are often used for selection of a type of entity such as days in a daypicker. This prop allows you to pass in data that will be passed back to the event handler.
		 */
		eventData?: Record<string, any>;
		/*
		 * Callbacks for various pill events such as click, focus, etc
		 */
		events?: Partial<{
			onClick?: (v: any) => any;
			onFocus?: (v: any) => any;
			onRequestFocus: (v: any) => any /*.isRequired*/;
			onRequestFocusOnNextPill: (v: any) => any /*.isRequired*/;
			onRequestFocusOnPreviousPill: (v: any) => any /*.isRequired*/;
			onRequestRemove: (v: any) => any /*.isRequired*/;
		}>;
		/**
		 * Applies the error style to the component.
		 * _Tested with Mocha framework._
		 */
		hasError?: boolean;
		/*
		 * The icon next to the pill label.
		 */
		icon?: React.ReactElement;
		/*
		 * Pill Label
		 */
		labels?: Partial<{
			label: string /*.isRequired*/;
			removeTitle?: string;
		}>;
		/*
		 * If true and is active pill in listbox, will trigger `events.onRequestFocus`
		 */
		requestFocus?: boolean;
		/*
		 * Pill Title
		 */
		title?: string;
		/*
		 * Allows the user to tab to the node
		 */
		tabIndex?: number;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
