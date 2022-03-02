declare module '@salesforce/design-system-react/components/slider' {
	import React from 'react';
	type Props = {
		/**
		 * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them. This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need.
		 */
		'aria-describedby'?: string;
		/**
		 * Assistive text for accessibility**
		 * `disabled`: Read by screen readers to indicate a disabled slider
		 * `label`: Visually hidden label but read out loud by screen readers.
		 */
		assistiveText?: Partial<{
			disabled?: string;
			label?: string;
		}>;
		/**
		 * Class names to be added to the outer container of the Slider.
		 */
		classNameContainer?: any[] | Record<string, any> | string;
		/**
		 * This is the initial value of an uncontrolled form element and is present
		 * only to provide compatibility with hybrid framework applications that
		 * are not entirely React. It should only be used in an application without
		 * centralized state (Redux, Flux). "Controlled components" with centralized
		 * state is highly recommended. See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
		 */
		defaultValue?: number;
		/**
		 * Disables the Slider and prevents clicking it. Only available on the horizontal view.
		 */
		disabled?: boolean;
		/**
		 * Message to display when the Slider is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText?: string;
		/**
		 * Set the HTML `id` of the slider.
		 */
		id?: string;
		/**
		 * This label appears above the Slider.
		 */
		label?: string;
		/**
		 * Maximum value of a specified range. Defaults to 100.
		 */
		max?: number;
		/**
		 * Minimum value of a specified range. Defaults to 0.
		 */
		min?: number;
		/**
		 * Name of the submitted form parameter.
		 */
		name?: string;
		/**
		 * This event fires whenever the user has modified the data of the control. This callback recieves the following parameters `event, { value: number }`.
		 */
		onChange?: (
			event: React.ChangeEvent<HTMLInputElement>,
			{ value: number }
		) => void;
		/**
		 * This event fires when the value is committed. This callback recieves the following parameters `event, { value: number }`.
		 */
		onInput?: (
			event: React.ChangeEvent<HTMLInputElement>,
			{ value: number }
		) => void;
		/**
		 * Size of the slider.
		 */
		size?: 'x-small' | 'small' | 'medium' | 'large';
		/**
		 * By default, the granularity is 1 and the value is always an integer. For example, If you need a value between 5 and 10, accurate to two decimal places, you should set the value of step to 0.01
		 */
		step?: number;
		/**
		 * The Slider should be a controlled component, and will always display this value. This should always be used if you are using a Flux/Redux framework.
		 */
		value?: number;
		/**
		 * Modifier that makes the slider vertical
		 */
		vertical?: boolean;
	};
	/**
	 * The ability to style sliders with CSS varies across browsers. Using this component ensures sliders look the same everywhere.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
