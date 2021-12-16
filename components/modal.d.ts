declare module '@salesforce/design-system-react/components/modal' {
	import React from 'react';
	type Props = {
		/**
		 * Vertical alignment of Modal.
		 */
		align?: 'top' | 'center';
		/**
		 * Boolean indicating if the appElement should be hidden.
		 */
		ariaHideApp?: boolean;
		/**
		 * **Assistive text for accessibility.**
		 * This object is merged with the default props object on every render.
		 * * `dialogLabel`: This is a visually hidden label for the dialog. If not provided, `heading` is used.
		 * * `dialogLabelledBy`: This describes which node labels the dialog. If not provided and dialogLabel is unavailable, `id` is used.
		 * * `closeButton`: This is a visually hidden label for the close button.
		 */
		assistiveText?: Partial<{
			dialogLabel?: string;
			dialogLabelledBy?: string;
			closeButton?: string;
		}>;
		/**
		 * Modal content.
		 */
		children: React.ReactNode /*.isRequired*/;
		/**
		 * Custom CSS classes for the modal `section` node classed `.slds-modal` and the parent of `.slds-modal__container`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Custom CSS classes for the modal's container. This is the child element of `.slds-modal` with class `.slds-modal__container`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		containerClassName?: any[] | Record<string, any> | string;
		/**
		 * Custom CSS classes for the modal's body. This is the element that has overflow rules and should be used to set a static height if desired. Use `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		contentClassName?: any[] | Record<string, any> | string;
		/**
		 * Custom styles for the modal's body. This is the element that has overflow rules and should be used to set a static height if desired.
		 */
		contentStyle?: Record<string, any>;
		/**
		 * If true, modal footer buttons render left and right. An example use case would be for "back" and "next" buttons.
		 */
		directional?: boolean;
		/**
		 * If true, Modals cannot be dismissed by clicking on the close icon or pressing esc key.
		 */
		disableClose?: boolean;
		/**
		 * If true, Modals can be dismissed by clicking outside of modal. If unspecified, defaults to disableClose.
		 */
		dismissOnClickOutside?: boolean;
		/**
		 * Callback to fire with Modal is dismissed
		 */
		onRequestClose?: (v: any) => any;
		/**
		 * Accepts a node or array of nodes that are typically a `Button` or `ProgressIndicator`. If an array, the nodes render on the right side first but are then floated left and right if <code>directional</code> prop is `true`.
		 */
		footer?: any[] | React.ReactNode;
		/**
		 * Allows for a custom modal header that does not scroll with modal content. If this is defined, `heading` and `tagline` will be ignored. The close button will still be present.
		 */
		header?: React.ReactNode;
		/**
		 * Adds CSS classes to the container surrounding the modal header and the close button. Use `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		headerClassName?: any[] | Record<string, any> | string;
		/**
		 * Unique identifier for the modal. The id is automatically generated if not provided
		 */
		id?: string;
		/**
		 * Forces the modal to be open or closed.
		 */
		isOpen: boolean /*.isRequired*/;
		/**
		 * Function whose return value is the mount node to insert the Modal element into. The default is `() => document.body`.
		 */
		parentSelector?: (v: any) => any;
		/**
		 * Custom CSS classes for the portal DOM node. This node is a direct descendant of the `body` and is the parent of `ReactModal__Overlay`. Use `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		portalClassName?: any[] | Record<string, any> | string;
		/**
		 * Styles the modal as a prompt.
		 */
		prompt?: 'success' | 'warning' | 'error' | 'wrench' | 'offline' | 'info';
		/**
		 * Specifies the modal's width. May be deprecated in favor of `width` in the future.
		 */
		size?: 'small' | 'medium' | 'large';
		/**
		 * Content underneath the heading in the modal header.
		 */
		tagline?: React.ReactNode;
		/**
		 * Content underneath the title in the modal header.
		 */
		title?: React.ReactNode;
		/**
		 * Text heading at the top of a modal.
		 */
		heading?: React.ReactNode;
		/**
		 * Allows adding additional notifications within the modal.
		 */
		toast?: React.ReactNode;
	};
	/**
	 * The Modal component is used for the Lightning Design System Modal and Notification > Prompt components. The Modal opens from a state change outside of the component itself (pass this state to the <code>isOpen</code> prop). For more details on the Prompt markup, please review the <a href="http://www.lightningdesignsystem.com/components/notifications#prompt">Notifications > Prompt</a>.
	 *
	 * By default, `Modal` will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies. To prevent this you can add the following to your application with `#mount` being the root node of your application that you would like to hide from assistive technologies when the `Modal` is open.
	 * ```
	 * import settings from 'design-system-react/components/settings';
	 * settings.setAppElement('#mount');
	 * ```
	 * This component uses a portalMount (a disconnected React subtree mount) to create a modal as a child of `body`.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
