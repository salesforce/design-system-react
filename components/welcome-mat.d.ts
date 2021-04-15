declare module '@salesforce/design-system-react/components/welcome-mat' {
	import React from 'react';
	type Props = {
		/**
		 * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * Whether the modal is open
		 */
		isOpen?: boolean;
		/**
		 * **Weclome Mat labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `title`: Title for the Welcome Mat
		 * * `description`: Label for the radio input
		 * * `unitsCompletedAfter`: Label for the radio input
		 */
		labels?: Partial<{
			title?: string;
			description?: string;
			unitsCompletedAfter?: string;
		}>;
		/**
		 *	Variant of the WelcomeMat
		 */
		variant?: 'steps' | 'info-only' | 'splash' | 'trailhead-connected';
		/**
		 * Link to learn more button
		 */
		onRenderInfoActions?: (v: any) => any;
		/**
		 * Callback to fire when modal is dismissed
		 */
		onRequestClose?: (v: any) => any;
		/**
		 *  Accepts a single WelcomeMatInfoBadge component, to be used with the trailhead variant
		 */
		infoBadge?: React.ReactNode;
		/**
		 *  Do not show again checkbox for info-only variant
		 */
		doNotShowAgainCheckbox?: React.ReactNode;
	};
	/**
	 * A Welcome Mat provides a series of unordered items a user can click to learn about a thematic topic.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
