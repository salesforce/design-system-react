declare module '@salesforce/design-system-react/components/textarea' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility.**
		 * * `label`: If present, the label associated with this `textarea` is overwritten by this text and is visually not shown.
		 */
		assistiveText?: Partial<{
			label?: string;
		}>;
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
		 * Specifies is the textarea should automatically get focus when the page loads. This is typically a poor user experience.
		 */
		autoFocus?: boolean;
		/**
		 * Elements are added after the `textarea`.
		 */
		children?: React.ReactNode;
		/**
		 * Class names to be added to the textarea component.
		 */
		className?: any[] | Record<string, any> | string;
		/** Allows for ability to apply classNames to outer textarea div.
		 */
		classNameContainer?: any[] | Record<string, any> | string;
		/**
		 * Disables the textarea and prevents editing the contents.
		 */
		disabled?: boolean;
		/**
		 * Message to display when the textarea is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText?: string;
		/**
		 * Every textarea must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id?: string;
		/**
		 * This callback exposes the textarea reference / DOM node to parent components. `<Parent textareaRef={(textareaComponent) => this.textarea = textareaComponent} />
		 */
		textareaRef?: (v: any) => any;
		/**
		 * This label appears above the textarea.
		 */
		label?: string;
		/**
		 * Triggered when focus is removed.
		 */
		onBlur?: (v: any) => any;
		/**
		 * This callback fires when the textarea changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
		 */
		onChange?: (v: any) => any;
		/**
		 * This event fires when the textarea is clicked.
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
		 * Triggered when a submittable <input> element is invalid.
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
		 * Maximum number of characters allowed.
		 */
		maxLength?: string;
		/**
		 * Name of the submitted form parameter.
		 */
		name?: string;
		/**
		 * Text that will appear in an empty textarea.
		 */
		placeholder?: string;
		/**
		 * Highlights the textarea as a required field (does not perform any validation).
		 */
		required?: boolean;
		/**
		 * The textarea is a controlled component, and will always display this value.
		 */
		value?: string;
		/**
		 * The textarea is a uncontrolled component, and this will be the initial value.
		 */
		defaultValue?: string;
		/**
		 * Specifies how the text in a text area is to be wrapped when submitted in a form.
		 */
		wrap?: 'soft' | 'hard';
	};
	/**
	 * A multi-line plain-text editing control.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
