declare module '@salesforce/design-system-react/components/input/private/inner-input' {
	import React from 'react';
	type Props = {
		'aria-activedescendant'?: string;
		'aria-autocomplete'?: string;
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the
		 * `aria-controls` attribute in order to relate the input with
		 * another region of the page. An example would be a select box
		 * that shows or hides a panel.
		 */
		'aria-controls'?: string;
		'aria-describedby'?: string;
		'aria-expanded'?: boolean;
		'aria-haspopup'?: boolean | string;
		'aria-labelledby'?: string;
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the
		 * `aria-controls` attribute in order to relate the input with
		 * another region of the page. An example would be a search field
		 * that shows search results.
		 */
		'aria-owns'?: string;
		'aria-required'?: boolean;
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `spinner`: Assistive text on the spinner.
		 */
		assistiveText?: Partial<{
			spinner?: string;
		}>;
		/**
		 * Disabled brower's autocomplete when "off" is used.
		 */
		autoComplete?: string;
		/**
		 * Class names to be added to the `input` element.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Class names to be added to the outer container `div` of the input.
		 */
		containerClassName?: any[] | Record<string, any> | string;
		/**
		 * Props to be added to the outer container `div` of the input (excluding `containerClassName`).
		 */
		containerProps?: Record<string, any>;
		/**
		 * Disables the input and prevents editing the contents.
		 */
		disabled?: boolean;
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
		 * Left aligned icon, must be instance of `design-system-react/components/icon/input-icon`
		 */
		iconLeft?: React.ReactNode;
		/**
		 * Right aligned icon, must be instance of `design-system-react/components/icon/input-icon`
		 */
		iconRight?: React.ReactNode;
		/**
		 * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: string /*.isRequired*/;
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
		onBlur?: (v: any) => any;
		/**
		 * This callback fires when the input changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
		 */
		onChange?: (v: any) => any;
		/**
		 * This event fires when the input is clicked.
		 */
		onClick?: (v: any) => any;
		onFocus?: (v: any) => any;
		onInput?: (v: any) => any;
		onInvalid?: (v: any) => any;
		onKeyDown?: (v: any) => any;
		onKeyPress?: (v: any) => any;
		onKeyUp?: (v: any) => any;
		onSelect?: (v: any) => any;
		onSubmit?: (v: any) => any;
		/**
		 * Text that will appear in an empty input.
		 */
		placeholder?: string;
		minLength?: string;
		/**
		 * Specifies minimum accepted value for an input of type "number"
		 */
		minValue?: number;
		maxLength?: string;
		/**
		 * Specifies maximum accepted value for an input of type "number"
		 */
		maxValue?: number;
		/**
		 * Name of the submitted form parameter.
		 */
		name?: string;
		/**
		 * Specifies `readOnly` for `input` node.
		 */
		readOnly?: boolean;
		/**
		 * Highlights the input as a required field (does not perform any validation).
		 */
		required?: boolean;
		/**
		 * `role` to be added to `input` node
		 */
		role?: string;
		/**
		 * Determines the step size upon increment or decrement. Can be set to decimal values.
		 */
		step?: number;
		/**
		 * Style object to be added to `input` node
		 */
		style?: Record<string, any>;
		/**
		 * Specifies `tabIndex` for `input` node
		 */
		tabIndex?: string;
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
		/**
		 * This is the initial value of an uncontrolled form element and is present only to provide
		 * compatibility with hybrid framework applications that are not entirely React. It should only
		 * be used in an application without centralized state (Redux, Flux). "Controlled components"
		 * with centralized state is highly recommended.
		 * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
		 */
		defaultValue?: number | string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
