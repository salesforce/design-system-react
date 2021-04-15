declare module '@salesforce/design-system-react/components/expression/group' {
	import React from 'react';
	type Props = {
		/**
		 *  **Assistive text for accessibility.**
		 * * `label`: For users of assistive technology, assistive text for the expression group's label.
		 * * `addCondition`: For users of assistive technology, assistive text for the Add Condition button's icon.
		 * * `addGroup`: For users of assistive technology, assistive text for the Add Group button's icon.
		 */
		assistiveText?: Partial<{
			label?: string;
			addCondition?: string;
			addGroup?: string;
		}>;
		/**
		 * HTML id for ExpressionGroup component.
		 */
		id?: string;
		/**
		 * `ExpressionGroup` children, accepts `ExpressionCondition`. (Also accepts sub-`ExpressionGroup` if `isRoot`)
		 */
		children?: React.ReactNode;
		/**
		 * CSS classes to be added to the element with class `.slds-expression__group`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
		 */
		className?: any[] | Record<string, any> | string;
		/**
		 * Callbacks for various expression group events such as trigger change, add condition etc
		 */
		events?: Partial<{
			onChangeTrigger?: (v: any) => any;
			onChangeCustomLogicValue?: (v: any) => any;
			onAddCondition?: (v: any) => any;
			onAddGroup?: (v: any) => any;
		}>;
		/**
		 * If set to true, the component will focus on the first focusable input upon mounting. This is useful for accessibility when adding new groups.
		 */
		focusOnMount?: boolean;
		/**
		 * **Text labels for internationalization**
		 * This object is merged with the default props object on every render.
		 * * `addCondition`: Label for the Add Condition Button. Defaults to "Add Condition"
		 * * `addGroup`: Label for the Add Group Button. Defaults to "Add Group"
		 * * `customLogic`: Label for the text box for inputting `customLogicValue`, if the `triggerType` is `custom`. Defaults to "Custom Logic"
		 * * `label`: Label for the expression group, to indicate condition connectors based on the parent's trigger-type chosen. Defaults to ""
		 * * `takeAction`: Label for the `triggerType` selector. Defaults to "Take Action When"
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
			label?: string;
			takeAction?: string;
			triggerAll?: string;
			triggerAlways?: string;
			triggerAny?: string;
			triggerCustom?: string;
			triggerFormula?: string;
		}>;
		/**
		 * Whether the group is at root level
		 */
		isRoot?: boolean;
		/**
		 * Trigger type for the Group
		 */
		triggerType?: 'all' | 'any' | 'custom' | 'always' | 'formula';
		/**
		 * Sets the input for the custom logic value input box, shown if the `triggerType` is set to `custom`.
		 */
		customLogicValue?: string;
	};
	/**
	 * Expression Group Component
	 */
	function Component(props: Props): JSX.Element;
	export default Component;
}
