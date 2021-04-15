declare module '@salesforce/design-system-react/components/pill' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `remove`: This is a visually hidden label for the close button.
		 * _Tested with snapshot testing._
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
		/**
		 * This is a way to specify custom contents for the pill in the case a simple text label is not enough.
		 * _Tested with Mocha framework._
		 */
		children?: React.ReactNode;
		/**
		 * CSS classes to be added to tag with `.slds-pill`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 * _Tested with Mocha framework._
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Applies the error style to the component.
		 * _Tested with Mocha framework._
		 */
		hasError?: boolean;
		/**
		 * An href to use if the pill is shown as a link.
		 * _Tested with Mocha framework._
		 */
		href?: string;
		/**
		 * SLDSIcon component to show on the left of the pill.
		 * _Tested with Mocha framework._
		 */
		icon?: React.ReactElement;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `label`: Pill's label.
		 * * `title`: Pill's title.
		 * * `removeTitle`: A title to use for the remove icon.
		 *
		 * _Tested with snapshot testing._
		 */
		labels?: Partial<{
			label?: string;
			title?: string;
			removeTitle?: string;
		}>;
		/**
		 * `onBlur` callback executes when the component loses focus.
		 * _Tested with Mocha framework._
		 */
		onBlur?: (v: any) => any;
		/**
		 * `onClick` callback executes when a user clicks on the pill or presses the Enter key.
		 * _Tested with Mocha framework._
		 */
		onClick?: (v: any) => any;
		/**
		 * `onFocus` callback executes when the component receives focus.
		 * _Tested with Mocha framework._
		 */
		onFocus?: (v: any) => any;
		/**
		 * `onKeyDown` callback executes when a user presses a key.
		 * _Tested with Mocha framework._
		 */
		onKeyDown?: (v: any) => any;
		/**
		 * `onRemove` callback executes when a user clicks on the pill's remove icon or presses the delete or the backspace keys.
		 * _Tested with Mocha framework._
		 */
		onRemove?: (v: any) => any;
		/**
		 * A variant of a pill
		 * _Tested with Mocha framework._
		 */
		variant?: 'link' | 'option';
	};
	/**
	 * A pill displays a label that can contain links and can be removed from view. Use `PillContainer` for a list of pills in a container that resembles an `input` form field. A pill is useful for displaying read-only text that can be added and removed on demand.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
