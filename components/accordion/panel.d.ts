declare module '@salesforce/design-system-react/components/accordion/panel' {
	import React from 'react';
	type Props = {
		/**
		 * The panel content for the Accordion component. Accordion panels should be added as <AccordionPanel />. Event handler for the accordion panels should be added to `<AccordionPanel />`. Optional `panelContentActions` component may be passed as prop. _Tested with Mocha framework and snapshot testing._
		 */
		children?: React.ReactNode;
		/**
		 * Indicates whether item is expanded or not, which should be handled by `onTogglePanel`. _Tested with Mocha framework and snapshot testing._
		 */
		expanded: boolean /*.isRequired*/;
		/**
		 * Id of the item belonging to this panel. _Tested with snapshot testing._
		 */
		id: number | string /*.isRequired*/;
		/**
		 * Component that can be passed as prop to `<Panel />`. As an example, a menu dropdown could be used here to handle additional actions for each accordion panel. _Tested with Mocha framework._
		 */
		panelContentActions?: React.ReactNode;
		/**
		 * Callback that will run whenever there is a keydown on the panel button. Function doesn't change the state of the component.
		 */
		onKeyDownSummary?: (v: any) => any;
		/**
		 * Callback that will run whenever a panel is toggled. Function should handle state to toggle `expanded` prop. _Tested with Mocha framework._
		 */
		onTogglePanel: (v: any) => any /*.isRequired*/;
		/**
		 * Ref callback that will pass in panel's `input` tag
		 */
		refs?: Partial<{
			summaryButton?: (v: any) => any;
		}>;
		/**
		 * Summary in the span element in the header of this panel. The summary is truncated and so the title element should contain the full text so that it is accessible on hover. _Tested with snapshot testing._
		 */
		summary: string | React.ReactNode /*.isRequired*/;
		/**
		 * HTML title attribute. _Tested with snapshot testing._
		 */
		title?: string;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
