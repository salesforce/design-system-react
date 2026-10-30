/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useEffect,
	useId,
	useMemo,
	type ReactNode,
	type ReactElement,
	type CSSProperties,
	type ChangeEvent,
} from 'react';
import classNames from 'classnames';
import { RADIO_GROUP } from '../../utilities/constants';
import type {
	RadioChangeData,
	RadioChangeHandler,
	RadioGroupItemProps,
} from '../radio/index';
import checkProps from './check-props';
import componentDoc from './component.json';

/**
 * Radio group variant types
 */
export type RadioGroupVariant = 'base' | 'button-group';

/**
 * Assistive text for RadioGroup
 */
export interface RadioGroupAssistiveText {
	/** Label for the group (shown in legend) */
	label?: string;
	/** Text for required indicator */
	required?: string;
}

/**
 * Labels for RadioGroup
 */
export interface RadioGroupLabels {
	/** Error message to display */
	error?: string;
	/** Label above the radio group */
	label?: string;
}

/**
 * Change event data for RadioGroup
 */
export interface RadioGroupChangeData {
	/**
	 * The requested selection: the `value` of the radio the user selected, or
	 * `null` when a `deselectable` radio is deselected.
	 */
	value: string | null;
	/**
	 * Requested checked state of the radio that changed.
	 * @deprecated Read `value` instead.
	 */
	checked: boolean;
}

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps {
	/** Assistive text for accessibility */
	assistiveText?: RadioGroupAssistiveText;
	/**
	 * `Radio` components (from `radio-group/radio`) as children. The group
	 * injects `name`, `onChange`, `aria-describedby`, `disabled` and, when
	 * `value` is set, `checked`.
	 */
	children: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Disable all radio inputs */
	disabled?: boolean;
	/** ID for error message element */
	errorId?: string;
	/** Text labels */
	labels?: RadioGroupLabels;
	/** Name attribute for all radios */
	name?: string;
	/**
	 * Called when the user selects a radio, with the requested selection in
	 * `data.value`. The rendered selection only changes when `value` is updated.
	 */
	onChange?: (
		event: ChangeEvent<HTMLInputElement>,
		data: RadioGroupChangeData
	) => void;
	/** Whether the field is required */
	required?: boolean;
	/** Custom styles for button-group variant */
	style?: CSSProperties;
	/**
	 * The `value` of the selected radio, or `null` for no selection. The group
	 * is controlled: each child radio is checked when its `value` equals this.
	 * Leaving it `undefined` falls back to each `Radio`'s own `checked`
	 * (deprecated).
	 */
	value: string | null;
	/** Group variant */
	variant?: RadioGroupVariant;
}

const defaultAssistiveText: RadioGroupAssistiveText = {
	required: 'Required',
};

const defaultLabels: RadioGroupLabels = {};

/**
 * A styled select list that can have a single entry checked at any one time.
 * The RadioGroup component wraps Radio components, which should be used as children.
 */
const RadioGroup = ({
	assistiveText: propAssistiveText,
	children,
	className,
	disabled,
	errorId: propErrorId,
	labels: propLabels,
	name: propName,
	onChange,
	required,
	style,
	value,
	variant = 'base',
}: RadioGroupProps): React.ReactElement => {
	const generatedName = useId();
	const generatedErrorId = useId();

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const labels = { ...defaultLabels, ...propLabels };

	const name = propName || generatedName;
	const hasError = Boolean(labels.error);
	const errorId = hasError ? propErrorId || generatedErrorId : undefined;

	const isControlled = value !== undefined;

	useEffect(() => {
		checkProps(RADIO_GROUP, { value }, componentDoc);
	}, [value]);

	// Clone children with group props. With a group `value`, each radio's
	// `checked` is derived from it; without one (deprecated), the radio keeps
	// the `checked` it was given.
	const enhancedChildren = useMemo(() => {
		return React.Children.map(children, (child) => {
			if (React.isValidElement(child)) {
				const childProps = child.props as RadioGroupItemProps;
				const childValue = childProps.value ?? null;
				const handleChange: RadioChangeHandler = (
					event,
					data: RadioChangeData
				) => {
					onChange?.(event as ChangeEvent<HTMLInputElement>, {
						checked: data.checked,
						value: data.checked ? childValue : null,
					});
				};
				return React.cloneElement(child as ReactElement<RadioGroupItemProps>, {
					name,
					onChange: handleChange,
					'aria-describedby': errorId,
					disabled: disabled || childProps.disabled,
					...(isControlled
						? { checked: childValue !== null && childValue === value }
						: {}),
				});
			}
			return child;
		});
	}, [children, name, onChange, errorId, disabled, isControlled, value]);

	return (
		<fieldset
			className={classNames('slds-form-element', {
				'slds-has-error': hasError,
			})}
		>
			<legend
				className={classNames(
					'slds-form-element__legend',
					'slds-form-element__label',
					{ 'slds-assistive-text': assistiveText.label }
				)}
			>
				{required && (
					<abbr className="slds-required" title="required">
						*
						<div className="slds-assistive-text">{assistiveText.required} </div>
					</abbr>
				)}
				{assistiveText.label || labels.label}
			</legend>
			<div
				className={classNames(
					'slds-form-element__control',
					className as string
				)}
			>
				{variant === 'button-group' ? (
					<div style={style} className="slds-radio_button-group">
						{enhancedChildren}
					</div>
				) : (
					enhancedChildren
				)}

				{labels.error && (
					<div id={errorId} className="slds-form-element__help">
						{labels.error}
					</div>
				)}
			</div>
		</fieldset>
	);
};

RadioGroup.displayName = RADIO_GROUP;

export default RadioGroup;
