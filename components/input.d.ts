declare module '@salesforce/design-system-react/components/input' {
	import * as React from 'react';
	type Props = {
		/**
		 * The aria-activedescendant attribute contains the ID of the currently active child object that is part of a composite widget within the Document Object Model. It makes do with the overhead of having all or more than one child focusable. As the name specifies, it helps in managing the current active child of the composite widget.
		 */
		'aria-activedescendant'?: string;
		/**
		 * Indicates if the suggestions in a composite widget are values that complete the current textbox input.
		 */
		'aria-autocomplete'?: string;
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the
		 * `aria-controls` attribute in order to relate the input with
		 * another region of the page. An example would be a select box
		 * that shows or hides a panel.
		 */
		'aria-controls'?: string;
		/**
		 * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them. This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need.
		 */
		'aria-describedby'?: string;
		/**
		 * Use the `aria-expanded` state to indicate whether regions of the content are collapsible, and to expose whether a region is currently expanded or collapsed.
		 */
		'aria-expanded'?: boolean;
		/**
		 * Indicates that the element has a popup context menu or sub-level menu.
		 */
		'aria-haspopup'?: boolean;
		/**
		 * The aria-labelledby attribute contains the element IDs of labels in objects such as input elements, widgets, and groups. The attribute establishes relationships between objects and their labels. Assistive technology, such as screen readers, use this attribute to catalog the objects in a document so that users can navigate between them. Without an element ID, the assistive technology cannot catalog the object.
		 */
		'aria-labelledby'?: string;
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the
		 * `aria-controls` attribute in order to relate the input with
		 * another region of the page. An example would be a search field
		 * that shows search results.
		 */
		'aria-owns'?: string;
		/**
		 * The `aria-required` attribute is used to indicate that user input is required on an element before a form can be submitted.
		 */
		'aria-required'?: boolean;
		/**
		 * **Assistive text for accessibility**
		 * * `label`: Visually hidden label but read out loud by screen readers.
		 * * `spinner`: Text for loading spinner icon.
		 */
		assistiveText?: Partial<{
			label?: string;
			spinner?: string;
		}>;
		/**
		 * Disabled brower's autocomplete when "off" is used.
		 */
		autoComplete?: string;
		/**
		 * Elements are added after the `input`.
		 */
		children?: React.ReactNode;
		/**
		 * Class names to be added to the outer container of the input.
		 */
		className?: Record<string, boolean>[] | Record<string, boolean> | string;
		/**
		 * This is the initial value of an uncontrolled form element and
		 * is present only to provide compatibility with hybrid framework
		 * applications that are not entirely React. It should only be used
		 * in an application without centralized state (Redux, Flux).
		 * "Controlled components" with centralized state is highly recommended.
		 * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
		 */
		defaultValue?: number | string;
		/**
		 * Disables the input and prevents editing the contents.
		 */
		disabled?: boolean;
		/**
		 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText?: React.ReactNode | string;
		/**
		 * A [Tooltip](https://react.lightningdesignsystem.com/components/tooltips/) component that is displayed next to the label.
		 */
		fieldLevelHelpTooltip?: React.ReactNode;
		/**
		 * Displays text or node to the left of the input. This follows the fixed text input UX pattern.
		 */
		fixedTextLeft?: React.ReactNode | string;
		/**
		 * Displays text or node to the right of the input. This follows the fixed text input UX pattern.
		 */
		fixedTextRight?: React.ReactNode | string;
		/**
		 * If true, loading spinner appears inside input on right hand side.
		 */
		hasSpinner?: boolean;
		/**
		 * Left aligned icon, must be instace of `design-system-react/components/icon/input-icon`
		 */
		iconLeft?: React.ReactNode;
		/**
		 * Right aligned icon, must be instace of `design-system-react/components/icon/input-icon`
		 */
		iconRight?: React.ReactNode;
		/**
		 * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id?: string;
		/**
		 * Displays help text under the input.
		 */
		inlineHelpText?: React.ReactNode | string;
		/**
		 * This callback exposes the input reference / DOM node to parent components. `<Parent inputRef={(inputComponent) => this.input = inputComponent} />
		 */
		inputRef?: (v: any) => any;
		/**
		 * Displays the value of the input statically. This follows the static input UX pattern.
		 */
		isStatic?: boolean;
		/**
		 * This label appears above the input.
		 */
		label?: string;
		/**
		 * Triggered when focus is removed.
		 */
		onBlur?: (v: any) => any;
		/**
		 * This callback fires when the input changes. Passes in `event, { value }`.
		 */
		onChange?: (
			e: React.KeyboardEvent<HTMLInputElement>,
			value: { value: any }
		) => any;
		/**
		 * This event fires when the input is clicked.
		 */
		onClick?: (v: any) => any;
		/**
		 * Triggered when component is focused.
		 */
		onFocus?: (v: any) => any;
		/**
		 * Similar to `onchange`. Triggered when an element gets user input.
		 */
		onInput?: (v: any) => any;
		/**
		 * Triggered when a submittable `<input>` element is invalid.
		 */
		onInvalid?: (v: any) => any;
		/**
		 * Triggered when a key is pressed down
		 */
		onKeyDown?: (v: any) => any;
		/**
		 * Triggered when a key is pressed and released
		 */
		onKeyPress?: (v: any) => any;
		/**
		 * Triggered when a key is released
		 */
		onKeyUp?: (v: any) => any;
		/**
		 * Triggered after some text has been selected in an element.
		 */
		onSelect?: (v: any) => any;
		/**
		 * Fires when a form is submitted.
		 */
		onSubmit?: (v: any) => any;
		/**
		 * Text that will appear in an empty input.
		 */
		placeholder?: string;
		/**
		 * Sets the minimum number of characters that an `<input>` can accept.
		 */
		minLength?: string;
		/**
		 * Specifies minimum accepted value for a counter input
		 */
		minValue?: number;
		/**
		 * Sets the maximum number of characters that an `<input>` can accept.
		 */
		maxLength?: string;
		/**
		 * Specifies maximum accepted value for a counter input
		 */
		maxValue?: number;
		/**
		 * Name of the submitted form parameter.
		 */
		name?: string;
		/**
		 * Displays the value of the input as read-only. This is used in the inline edit UX pattern.
		 */
		readOnly?: boolean;
		/**
		 * Highlights the input as a required field (does not perform any validation).
		 */
		required?: boolean;
		/**
		 * ARIA role
		 */
		role?: string;
		/**
		 * Determines the step size upon increment or decrement. Can be set to decimal values.
		 */
		step?: number;
		/**
		 * styles to be added to input
		 */
		styleInput?: Record<string, any>;
		/**
		 * Custom styles to be passed to the component container
		 */
		styleContainer?: Record<string, any>;
		/**
		 * The `<Input>` element includes support for all HTML5 types.
		 */
		type?:
			| 'text'
			| 'password'
			| 'datetime'
			| 'datetime-local'
			| 'date'
			| 'month'
			| 'time'
			| 'week'
			| 'number'
			| 'email'
			| 'url'
			| 'search'
			| 'tel'
			| 'color';
		/**
		 * The input is a controlled component, and will always display this value.
		 */
		value?: number | string;
		/**
		 * Which UX pattern of input? The default is `base` while other option is `counter`
		 */
		variant?: 'base' | COUNTER;
	};
	/**
	 * The HTML `input` with a label and error messaging.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
