declare module '@salesforce/design-system-react/components/expression/formula' {
	import React from 'react';
	type Props = {
		/**
		 *  **Assistive text for accessibility.**
		 * * `help`: Assistive text for help icon
		 */
		assistiveText?: Partial<{
			help?: string;
		}>;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * CSS classes to be added to the element with class `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Callbacks for various expression formula events such as text editor change, check syntax etc
		 */
		events?: Partial<{
			onChangeTextEditor?: (v: any) => any;
			onClickHelp?: (v: any) => any;
			onClickCheckSyntax?: (v: any) => any;
		}>;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `label`: Label for the Expression Formula group.Defaults to "Formula"
		 * * `checkSyntax`: Label for the Check Syntax Button. Defaults to "Check Syntax"
		 * * `textArea`: Label for the `triggerType` selector. Defaults to "Take Action When"
		 */
		labels?: Partial<{
			label?: string;
			checkSyntax?: string;
			textArea?: string;
		}>;
		/**
		 *  Accepts a single combobox component, to select resource in the expression formula editor
		 */
		resourceCombobox?: React.ReactNode;
		/**
		 *  Accepts a single combobox component, to select function in the expression formula editor
		 */
		functionCombobox?: React.ReactNode;
		/**
		 *  Accepts a single input component, to enter operator in the expression formula editor
		 */
		operatorInput?: React.ReactNode;
		/**
		 *  Value for the text editor in expression formula editor
		 */
		textEditorValue?: React.ReactNode;
	};
	/**
	 * Expression Formula Component
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
