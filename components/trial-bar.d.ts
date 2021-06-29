declare module '@salesforce/design-system-react/components/trial-bar' {
	import React from 'react';
	type Props = {
		/**
		 * Provide children of the types `<TrialBarButton />` or `<TrialBarDropdown />` to define the structure of the trial bar.
		 * ```
		 * <TrialBar>
		 *   <TrialBarButton />
		 *   <TrialBarDropdown />
		 * </TrialBar>
		 * ```
		 */
		children?: React.ReactNode;

		/**
		 * CSS classes to be added to the component. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `learnMoreAfter`: Amount of time left in trial, e.g. `30`
		 * * `learnMoreBefore`: Unit of the amount of time left, e.g. `days`
		 * * `timeLeftUnitAfter`: String after `timeLeftUnit`
		 */
		labels?: Partial<{
			timeLeft?: string;
			timeLeftUnit?: string;
			timeLeftUnitAfter?: string;
		}>;
		/**
		 * Renders the actions section of the trial bar.
		 */
		onRenderActions?: (v: any) => any;
		/**
		 * Customs styles to be applied to the component.
		 */
		style?: Record<string, any>;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
