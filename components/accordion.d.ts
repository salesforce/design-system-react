declare module '@salesforce/design-system-react/components/accordion' {
	import React from 'react';
	type Props = {
		/**
		 * CSS class names to be added to the accordion component. _Tested with snapshot testing._
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * HTML id for accordion component. _Tested with snapshot testing._
		 */
		id?: number | string;
		/**
		 * The panel content for the Accordion component. Accordion panels should be added as <AccordionPanel />. Event handler for the accordion panels should be added to `<AccordionPanel />`. Optional `panelContentActions` component may be passed as prop. _Tested with Mocha framework and snapshot testing._
		 *
		 * Example:
		 * ```
		 * <SLDSAccordion>
		 *   <SLDSAccordionpanel />
		 *   <SLDSAccordionpanel />
		 *   <SLDSAccordionpanel />
		 * </SLDSAccordion>
		 * ```
		 */
		children: React.ReactNode /*.isRequired*/;
	};

	function Component(props: Props): JSX.Element;
	export default Component;
}
