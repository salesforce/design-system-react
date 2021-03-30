declare module '@salesforce/design-system-react/components/filter' {
	import React from 'react';
	type Props = {
		/**
		 * Aligns the popover with the respective side of the trigger. That is `left` will place the `Popover` to the left of the Filter.
		 */
		align?: 'left' | 'right';
		/**
		 * **Assistive text for accessibility**
		 * * `removeFilter`: Assistive text for removing a filter. The default is `Remove Filter: this.props.property this.props.predicate`.
		 * * `editFilter`: Assistive text for changing a filter.
		 * * `editFilterHeading`: Assistive text for Popover heading.
		 */
		assistiveText?: Partial<{
			editFilter?: string;
			editFilterHeading?: string;
			removeFilter?: string;
		}>;
		/**
		 * Contents of popover. That is the dropdowns and inputs that set the filter criteria.
		 */
		children?: React.ReactNode;
		/**
		 * Custom CSS classes for `slds-filters__item` node. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Applies error state styling. Per filter error messages are outside this components.
		 */
		isError?: boolean;
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. An `id` will be generated if none is supplied.
		 */
		id?: string;
		/**
		 * If true, the filter will not display an editing popover when clicked.
		 */
		isLocked?: boolean;
		/**
		 * Applies new filter styling.
		 */
		isNew?: boolean;
		/**
		 * If true, the filter will not include a remove button.
		 */
		isPermanent?: boolean;
		/**
		 * Will be triggered when Done within the Popover is clicked. This is the place to update the filter props displayed. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
		 */
		onChange?: (
			e: React.MouseEvent<HTMLElement>,
			option: { id: string }
		) => any;
		/**
		 * Will be triggered when "Remove Filter" button is clicked. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
		 */
		onRemove?: (
			clickEvent: React.MouseEvent<HTMLElement>,
			props: { id: string }
		) => any;
		/**
		 * Will be triggered when Filter is clicked. This is the place to close/open popover if a custom popover is passed in
		 */
		onClick?: (v: any) => any;
		/**
		 * A `Popover` component. The props from this popover will be merged and override any default props. This also allows a Filter's Popover dialog to be a controlled component. _Tested with Mocha framework._
		 */
		popover?: React.ReactElement;
		/**
		 * The criteria you are filtering for. For instance, if "Hair Color is PURPLE" is your filter, "is PURPLE" is your filter predicate.
		 */
		predicate?: React.ReactNode;
		/**
		 * The property you are filtering. For instance, if "Hair Color is PURPLE" is your filter, "Hair Color" is your filter property.
		 */
		property?: React.ReactNode;
	};

	/**
	 * A Filter is a popover with custom trigger. It can be used by [Panel Filtering](/components/panels/). Menus within a Filter Popover will need to not have "portal mounts" and be inline.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
