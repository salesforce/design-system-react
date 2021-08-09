declare module '@salesforce/design-system-react/components/vertical-navigation' {
	import React from 'react';
	type Props = {
		/**
		 * HTML id for component. _Tested with snapshot testing._
		 */
		id?: string;
		/**
		 * CSS class names to be added to the container element. _Tested with snapshot testing._
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Array of categories. The required shape is: `{id: string, label: string, items: array}`. The required shape of an item is `{id: string, label: string, url: string}`. All item ids are expected to be unique. _Tested with snapshot testing._
		 */
		categories?: any[];
		/**
		 * The ID of the item that is currently selected. Defaults to the ID of the first item. _Tested with Mocha framework._
		 */
		selectedId?: string;
		/**
		 * Triggered when the selection changes. It receives an event and an item object in the shape: `event, {item: [object] }`. _Tested with Mocha framework._
		 */
		onSelect?: (v: any) => any;
	};
	/**
	 * Vertical Navigation represents a list of links that either take the user to another page or parts of the page the user is in.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
