declare module '@salesforce/design-system-react/components/location-map' {
	import React from 'react';
	type Props = {
		/**
		 * CSS class names to be added with `slds-map` class. `array`, `object`, or `string` are accepted.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
		 */
		classNameContainer?: any[] | Record<string, any> | string;
		/**
		 *  Accepts location object that will be shown if no location has been selected. Required
		 *  * `id` : A unique identifier string for the location
		 *  * `name` : Name of the location
		 *  * `address` : Address of the location
		 */
		defaultLocation?: Partial<{
			id: string /*.isRequired*/;
			name: string /*.isRequired*/;
			address: string /*.isRequired*/;
		}> /*.isRequired*/;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 *  Labels
		 *  * `title` - Title for the LocationMap component.
		 */
		labels?: Partial<{
			title?: string;
		}>;
		/**
		 * Array of locations objects for the LocationMap component.**
		 * Each location object can contain:
		 *  * `id` : A unique identifier string for the location
		 *  * `name` : Name of the location
		 *  * `address` : Address of the location
		 */
		locations?: Partial<{
			id: string /*.isRequired*/;
			name: string /*.isRequired*/;
			address: string /*.isRequired*/;
		}>[] /*.isRequired*/;
		/**
		 * Callback function triggered when a location is selected
		 */
		onClickLocation?: (v: any) => any;
		/**
		 * Accepts a Google Map API Key that will be used for showing the map
		 */
		googleAPIKey: string /*.isRequired*/;
		/**
		 *  Accepts location object that will be shown when selected
		 *  * `id` : A unique identifier string for the location
		 *  * `name` : Name of the location
		 *  * `address` : Address of the location
		 */
		selection?: Partial<{
			id: string /*.isRequired*/;
			name: string /*.isRequired*/;
			address: string /*.isRequired*/;
		}>;
	};
	/**
	 * A location map component is used to find and show locations
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
