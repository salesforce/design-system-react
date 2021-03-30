declare module '@salesforce/design-system-react/components/expression/condition' {
	import React from 'react';
	type Props = {
		/**
		 *  **Assistive text for accessibility.**
		 * * `title`: For users of assistive technology, title for the condition fieldset. Defaults to 'Condition'
		 * * `deleteIcon`: For users of assistive technology, assistive text for the Delete Condition button's icon. Defaults to 'Delete Condition'
		 */
		assistiveText?: Partial<{
			title?: string;
			deleteIcon?: string;
		}>;
		/**
		 * HTML id for component.
		 */
		id?: string;
		/**
		 * CSS classes to be added to the element with class `.slds-expression__row`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Callbacks for various expression condition events such as value change, delete etc
		 */
		events?: Partial<{
			onChangeResource?: (v: any) => any;
			onChangeOperator?: (v: any) => any;
			onChangeValue?: (v: any) => any;
			onDelete?: (v: any) => any;
		}> /*.isRequired*/;
		/**
		 * If set to true, the component will focus on the first focusable input upon mounting. This is useful for accessibility when adding new conditions.
		 */
		focusOnMount?: boolean;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every
		 * * `deleteCondition`: Title for the delete condition button. Defaults to "Delete Condition".
		 * * `label`: Label for the condition, shown left-most in the row. Left empty on default.
		 * * `operator`: Label for the operator selection dropdown. Defaults to "Operator"
		 * * `resource`: Label for the resource selection dropdown. Defaults to "Resource"
		 * * `value`: Label for the value input box. Defaults to "Value"
		 */
		labels?: Partial<{
			deleteCondition?: string;
			label?: string;
			operator?: string;
			resource?: string;
			value?: string;
		}>;
		/**
		 * Controls whether the condition is a sub-condition inside a ExpressionGroup
		 */
		isSubCondition?: boolean;
		/**
		 * **Array of item objects that are options in the resource selection dropdown menu.**
		 * Each object can contain:
		 * * `id`: A unique identifier string.
		 * * `label`: A primary string of text for a menu item.
		 * ```
		 * {
		 * 	id: '1',
		 * 	label: 'Resource 1',
		 * },
		 * ```
		 * Note: The dropdown uses the Combobox Component, and `resourcesList` is
		 * passed as `options` props to it, and hence shall also support more
		 * custom objects. Please refer to the Combobox documentation.
		 */
		resourcesList?: Record<string, any>[];
		/**
		 *  Accepts an object from the `resourcesList` which needs to be selected
		 *  for the resource dropdown menu,
		 */
		resourceSelected?: Record<string, any>;
		/**
		 * **Array of item objects that are options in the operator selection dropdown menu.**
		 * Each object can contain:
		 * * `id`: A unique identifier string.
		 * * `label`: A primary string of text for a menu item.
		 * ```
		 * {
		 * 	id: '1',
		 * 	label: 'Operator 1',
		 * },
		 * ```
		 * Note: The dropdown uses the Combobox Component, and `operatorList` is
		 * passed as `options` props to it, and hence shall also support more
		 * custom objects. Please refer to the Combobox documentation.
		 */
		operatorsList?: Record<string, any>[];
		/**
		 *  Accepts an object from the `operatorSelected` which needs to be selected
		 *  for the operator dropdown menu,
		 */
		operatorSelected?: Record<string, any>;
		/**
		 *  Sets the input value for the Value input field.
		 */
		value?: string;
	};
	/**
	 * Expression Condition Component
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
