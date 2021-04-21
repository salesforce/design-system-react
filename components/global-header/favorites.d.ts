declare module '@salesforce/design-system-react/components/global-header/favorites' {
	import React from 'react';
	type Props = {
		/**
		 * **Assistive text for accessibility**
		 * * `action`: Description of star button. Default is "Toggle Favorite."
		 * * `more`: Description of dropdown menu. Default is "View Favorites."
		 */
		assistiveText?: Partial<{
			action?: string;
			more?: string;
		}>;
		/**
		 * Disables the favorites action (star) button and not the related Popover."
		 */
		actionDisabled?: boolean;
		/**
		 * Controls whether the favorites action (star) button is selected or not
		 */
		actionSelected?: boolean;
		/**
		 * This event fires when the favorites action (star) button is toggled. Passes in `event, { actionSelected }`.
		 */
		onToggleActionSelected?: (v: any) => any;
		/**
		 * A `Popover` component applied to the favorites more button. The props from this popover will be merged and override any default props. The `children` prop will be ignored.
		 */
		popover?: React.ReactNode;
	};
	/**
	 * A GlobalHeaderFavorites component. The favorites action is used to "favorite" a commonly used page within a user's experience. When a user "favorites" a page by pressing the favorites action, the button icon changes color with a small animation to confirm your selection.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
