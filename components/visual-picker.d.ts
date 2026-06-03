import React from 'react';
type Props = {
	/**
	 * HTML id for component.
	 */
	id?: string;
	/**
	 * Visual Picker accepts `Checkbox`, `Radio` and `VisualPickerLink` components as children. Please see `Checkbox`, `Radio` and `VisualPickerLink` for props.
	 */
	children?: React.ReactNode;
	/**
	 * CSS classes to be added to tag with `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className?: any[] | Record<string, any> | string;
	/**
	 *  Label for the visual picker
	 */
	label?: string;
	/**
	 *  Whether the visual picker is coverable on selection
	 */
	coverable?: boolean;
	/**
	 *  Whether the visual picker has a vertical layout
	 */
	vertical?: boolean;
	/**
	 * Whether the visual picker has links as children
	 */
	links?: boolean;
	/**
	 *  Size for visual picker
	 */
	size?: 'medium' | 'large';
};
/**
 * Visual Picker Component
 */
declare function Component(props: Props): React.JSX.Element;
export default Component;
