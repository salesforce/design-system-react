declare module '@salesforce/design-system-react/components/checkbox' {
	import React from 'react';
	type Props = {
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
		 * The aria-labelledby attribute establishes relationships between objects and their label(s), and its value should be one or more element IDs, which refer to elements that have the text needed for labeling. List multiple element IDs in a space delimited fashion.
		 */
		'aria-labelledby'?: string;
		/**
		 * `aria-owns` indicate that an element depends on the current one when the relation can't be determined by the hierarchy structure.
		 */
		'aria-owns'?: string;
		/**
		 * The `aria-required` attribute is used to indicate that user input is required on an element before a form can be submitted.
		 */
		'aria-required'?: boolean;
		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `heading`: This is used as a visually hidden label if, no `labels.heading` is provided.
		 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
		 */
		assistiveText?: Partial<{
			heading?: string;
			label?: string;
		}>;
		/**
		 * The Checkbox should be a controlled component, and will always be in the state specified. If checked is not defined, the state of the uncontrolled native `input` component will be used.
		 */
		checked?: boolean;
		/**
		 * This is the initial value of an uncontrolled form element and is present only
		 * to provide compatibility with hybrid framework applications that are not
		 * entirely React. It should only be used in an application without centralized
		 * state (Redux, Flux). "Controlled components" with centralized state is highly recommended. See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
		 */
		defaultChecked?: boolean;
		/**
		 * Class names to be added to the outer container of the Checkbox.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Disables the Checkbox and prevents clicking it.
		 */
		disabled?: boolean;
		/**
		 * Message to display when the Checkbox is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText?: string;
		/**
		 * A unique ID is needed in order to support keyboard navigation and ARIA support. This ID is added to the `input` element
		 */
		id?: string;
		/**
		 * The Checkbox will be indeterminate if its state can not be figured out or is partially checked. Once a checkbox is indeterminate, a click should cause it to be checked. Since a user cannot put a checkbox into an indeterminate state, it is assumed you are controlling the value of `checked` with the parent, also, and that this is a controlled component. **Note:** `indeterminate` proptype does nothing in the `toggle` variant, as [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).
		 */
		indeterminate?: boolean;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `heading`: Heading for the visual picker variant
		 * * `label`: Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
		 * * `toggleDisabled`: Label for the _disabled_ state of the Toggle variant. Defaults to "Disabled". Note that this uses SLDS language, and meaning, of "Enabled" and "Disabled"; referring to the state of whatever the checkbox is _toggling_, not whether the checkbox itself is enabled or disabled.
		 * * `toggleEnabled`: Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
		 */
		labels?: Partial<{
			heading?: string;
			label?: string;
			toggleDisabled?: string;
			toggleEnabled?: string;
		}>;
		/**
		 * Name of the submitted form parameter.
		 */
		name?: string;
		/**
		 * This event fires when the Checkbox looses focus. It passes in `{ event }`.
		 */
		onBlur?: (v: any) => any;
		/**
		 * This event fires when the Checkbox changes. Passes in `event, { checked }`. This used to be `checked, event, { checked }`.
		 */
		onChange?: (v: any) => any;
		/**
		 * This event fires when the Checkbox is focused. It passes in `{ event }`.
		 */
		onFocus?: (v: any) => any;
		/**
		 * This event fires when a key is pressed down. It passes in `{ event }`.
		 */
		onKeyDown?: (v: any) => any;
		/**
		 * This event fires when a character is typed. See [this article](http://www.bloggingdeveloper.com/post/KeyPress-KeyDown-KeyUp-The-Difference-Between-Javascript-Key-Events.aspx) for more information. It passes in `{ event }`.
		 */
		onKeyPress?: (v: any) => any;
		/**
		 * This event fires when a pressed key is released. It passes in `{ event }`.
		 */
		onKeyUp?: (v: any) => any;
		/**
		 * Displays the value of the input, but does not allow changes.
		 */
		readOnly?: boolean;
		/**
		 * Highlights the Checkbox as a required field (does not perform any validation).
		 */
		required?: boolean;
		/**
		 * The aria-role of the checkbox.
		 */
		role?: string;
		/**
		 * Which UX pattern of checkbox? The default is `base` while other option is `toggle`. (**Note:** `toggle` variant does not support the `indeterminate` feature, because [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).)
		 */
		variant?: 'base' | 'toggle' | 'button-group' | 'visual-picker';
		/**
		 * Determines whether visual picker is coverable when selected (only for visual picker variant)
		 */
		coverable?: boolean;
		/**
		 * Determines whether the visual picker should be vertical or horizontal (only for visual picker variant)
		 */
		vertical?: boolean;
		/**
		 * Allows icon to shown with checkbox (only for non-coverable visual picker variant)
		 */
		onRenderVisualPicker?: (v: any) => any;
		/**
		 * Allows icon to shown if checkbox is not selected (only for visual picker variant)
		 */
		onRenderVisualPickerSelected?: (v: any) => any;
		/**
		 * Allows icon to shown if checkbox is not selected (only for visual picker variant)
		 */
		onRenderVisualPickerNotSelected?: (v: any) => any;
		/**
		 * Size of checkbox in case of visual composer variant
		 */
		size?: 'medium' | 'large';
	};
	/**
	 * The ability to style checkboxes with CSS varies across browsers. Using this component ensures checkboxes look the same everywhere.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
