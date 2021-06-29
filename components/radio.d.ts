declare module '@salesforce/design-system-react/components/radio' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
		 */
		assistiveText?: Partial<{
			label?: string;
		}>;
		/**
		 * The ID of an element that describes this radio input. Often used for error messages.
		 */
		'aria-describedby'?: string;
		/**
		 * The aria-labelledby attribute establishes relationships between objects and their label(s), and its value should be one or more element IDs, which refer to elements that have the text needed for labeling. List multiple element IDs in a space delimited fashion.
		 */
		'aria-labelledby'?: string;
		/**
		 * This is a controlled component. This radio is checked according to this value.
		 */
		checked?: boolean;
		/**
		 * Class name to be passed to radio input wrapper ( `span` element)
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * This is the initial value of an uncontrolled form element and is present only to provide compatibility
		 * with hybrid framework applications that are not entirely React. It should only be used in an application
		 * without centralized state (Redux, Flux). "Controlled components" with centralized state is highly recommended.
		 * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
		 */ defaultChecked?: boolean;
		/**
		 * Disable this radio input.
		 */
		disabled?: boolean;
		/**
		 * A unique ID that is used to associating a label to the `input` element. This ID is added to the `input` element.
		 */
		id?: string;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `heading`: Heading for the visual picker variant
		 * * `label`: Label for the radio input
		 */
		labels?: Partial<{
			heading?: string;
			label?: string;
		}>;
		/**
		 * The name of the radio input group.
		 */
		name?: string;
		/**
		 * This event fires when the radio selection changes. Passes in `event, { checked }`.
		 */
		onChange?: (v: any) => any;
		/**
		 * The value of this radio input.
		 */
		value?: string;
		/**
		 * Variant of the Radio button. Base is the default and button-group makes the radio button look like a normal button (should be a child of <RadioButtonGroup>).
		 */
		variant?: 'base' | 'button-group' | 'swatch' | 'visual-picker';
		/**
		 * Determines whether visual picker is coverable when selected (only for visual picker variant)
		 */
		coverable?: boolean;
		/**
		 * Determines whether the visual picker should be vertical or horizontal (only for visual picker variant)
		 */
		vertical?: boolean;
		/**
		 * Allows icon to shown if radio is not selected (only for non-coverable visual picker variant)
		 */
		onRenderVisualPicker?: (v: any) => any;
		/**
		 * Allows icon to shown if radio is not selected (only for visual picker variant)
		 */
		onRenderVisualPickerSelected?: (v: any) => any;
		/**
		 * Allows icon to shown if radio is not selected (only for visual picker variant)
		 */
		onRenderVisualPickerNotSelected?: (v: any) => any;
		/**
		 * Shows description for radio option (only for visual picker variant)
		 */
		description?: string;
		/**
		 * Allows icon to shown if radio is not selected (only for visual picker variant)
		 */
		size?: 'medium' | 'large';
		/**
		 * Ref callback that will pass in the radio's `input` tag
		 */
		refs?: Partial<{
			input?: (v: any) => any;
		}>;
	};
	/**
	 * A radio input that can have a single input checked at any one time. Radios should be wrapped with
	 * a [RadioGroup](/components/radio-group) or [RadioButtonGroup](/components/radio-button-group)
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
