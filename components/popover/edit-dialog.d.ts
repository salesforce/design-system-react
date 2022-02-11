declare module '@salesforce/design-system-react/components/popover/edit-dialog' {
	import React from 'react';
	type Props = {
		/**
		 * Disables the edit dialog and prevents clicking it.
		 */
		disabled?: boolean;
		/**
		 * By default, a unique ID will be created at render to support keyboard navigation, ARIA roles, and connect the popover to the triggering button. This ID will be applied to the triggering element. `${id}-popover`, `${id}-dialog-heading`, `${id}-dialog-body` are also created.
		 */
		id?: string;
		/**
		 * Set to true when inputs within the popover are modified.
		 */
		isModified?: boolean;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `cancel`: text for Cancel button
		 * * `save`: text for Save button
		 *
		 * _Tested with snapshot testing._
		 */
		labels?: Partial<{
			cancel?: string | React.ReactNode;
			save?: string | React.ReactNode;
		}>;
		/**
		 * This function is passed onto the cancel `Button`. Triggered when the trigger button is clicked.
		 */
		onCancel?: (v: any) => any;
		/**
		 * This function is passed onto the save `Button`. Triggered when the trigger button is clicked.
		 */
		onSave?: (v: any) => any;
		/**
		 * Popover of type `~/components/popover`. This popover will be cloned and additional props appended, if passed in.
		 */
		popover?: React.ReactNode;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
