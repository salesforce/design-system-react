declare module '@salesforce/design-system-react/components/expression' {
	import React from 'react';
	type Props = {
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * `Expression` children, accepts `ExpressionCondition` & `ExpressionGroup`
		 */
		children?: React.ReactNode;
		/**
		 * Callbacks for various expression events such as trigger change, add group etc
		 */
		events?: Partial<{
			onChangeTrigger?: (v: any) => any;
			onAddGroup?: (v: any) => any;
			onAddCondition?: (v: any) => any;
			onChangeCustomLogicValue?: (v: any) => any;
		}>;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `addCondition`: Label for the Add Condition Button. Defaults to "Add Condition"
		 * * `addGroup`: Label for the Add Group Button. Defaults to "Add Group"
		 * * `customLogic`: Label for the text box for inputting `customLogicValue`, if the `triggerType` is `custom`. Defaults to "Custom Logic"
		 * * `takeAction`: Label for the `triggerType` selector. Defaults to "Take Action When"
		 * * `title` : Title for the Expression. Defaults to "Conditions"
		 * * `triggerAll`: Label for the `all` value within the trigger selector
		 * * `triggerAlways`: Label for the `always` value within the trigger selector
		 * * `triggerAny`: Label for the `any` value within the trigger selector
		 * * `triggerCustom`: Label for the `custom` value within the trigger selector
		 * * `triggerFormula`: Label for the `formula` value within the trigger selector
		 */
		labels?: Partial<{
			addCondition?: string;
			addGroup?: string;
			customLogic?: string;
			takeAction?: string;
			title?: string;
			triggerAll?: string;
			triggerAlways?: string;
			triggerAny?: string;
			triggerCustom?: string;
			triggerFormula?: string;
		}>;
		/**
		 * CSS classes to be added to the element with class `.slds-expression`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Sets the trigger type for the expression.
		 */
		triggerType?: 'all' | 'any' | 'custom' | 'always' | 'formula';
		/**
		 * Sets the input for the custom logic value input box, shown if the `triggerType` is set to `custom`.
		 */
		customLogicValue?: string;
	};
	/**
	 * Expression builders help users declaratively construct logical expressions.
	 * These expressions can be used when querying for a filtered set of records,
	 * creating rules to control when something executes, or any other conditional logic.
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
