/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useRef, useId, useCallback, type ChangeEvent, type FocusEvent, type KeyboardEvent, type CSSProperties } from 'react';
import classNames from 'classnames';
import KEYS from '../../utilities/key-code';
import { RADIO } from '../../utilities/constants';
import getAriaProps from '../../utilities/get-aria-props';
import getDataProps from '../../utilities/get-data-props';
import Swatch from '../../components/color-picker/private/swatch';
import Icon from '../icon';

/**
 * Radio variant types
 */
export type RadioVariant = 'base' | 'button-group' | 'swatch' | 'visual-picker';
export type RadioSize = 'medium' | 'large';

/**
 * Assistive text for Radio
 */
export interface RadioAssistiveText {
	/** Visually hidden label */
	label?: string;
}

/**
 * Labels for Radio
 */
export interface RadioLabels {
	/** Heading for visual picker variant */
	heading?: string;
	/** Label for the radio input */
	label?: string;
}

/**
 * Refs for Radio
 */
export interface RadioRefs {
	/** Ref callback for input element */
	input?: (input: HTMLInputElement | null) => void;
}

/**
 * Props for the Radio component
 */
export interface RadioProps {
	/** Assistive text for accessibility */
	assistiveText?: RadioAssistiveText;
	/** ARIA describedby attribute */
	'aria-describedby'?: string;
	/** ARIA labelledby attribute */
	'aria-labelledby'?: string;
	/** Whether radio is checked (controlled) */
	checked?: boolean;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Default checked state (uncontrolled) */
	defaultChecked?: boolean;
	/** Whether radio can be deselected */
	deselectable?: boolean;
	/** Whether radio is disabled */
	disabled?: boolean;
	/** Unique ID for the input */
	id?: string;
	/** ID for the label element */
	labelId?: string;
	/** Text labels */
	labels?: RadioLabels;
	/** @deprecated Use labels.label instead */
	label?: string;
	/** Input name attribute */
	name?: string;
	/** Change handler */
	onChange?: (event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>, data: { checked: boolean }) => void;
	/** Focus handler */
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
	/** Request focus callback */
	onRequestFocus?: (input: HTMLInputElement) => void;
	/** Whether to request focus */
	requestFocus?: boolean;
	/** Tab index */
	tabIndex?: string;
	/** Input value */
	value?: string;
	/** Radio variant */
	variant?: RadioVariant;
	/** Visual picker: coverable when selected */
	coverable?: boolean;
	/** Visual picker: vertical layout */
	vertical?: boolean;
	/** Visual picker: render content */
	onRenderVisualPicker?: () => React.ReactNode;
	/** Visual picker: render selected state */
	onRenderVisualPickerSelected?: () => React.ReactNode;
	/** Visual picker: render not selected state */
	onRenderVisualPickerNotSelected?: () => React.ReactNode;
	/** Visual picker: description text */
	description?: string;
	/** Visual picker: size */
	size?: RadioSize;
	/** Ref callbacks */
	refs?: RadioRefs;
	/** Custom styles (for swatch variant) */
	style?: CSSProperties;
}

const defaultAssistiveText: RadioAssistiveText = {};
const defaultLabels: RadioLabels = {};

/**
 * A radio input that can have a single input checked at any one time.
 * Radios should be wrapped with a RadioGroup or RadioButtonGroup.
 */
const Radio = ({
	assistiveText: propAssistiveText,
	'aria-describedby': ariaDescribedBy,
	'aria-labelledby': ariaLabelledBy,
	checked,
	className,
	defaultChecked,
	deselectable,
	disabled,
	id: propId,
	labelId,
	labels: propLabels,
	label: deprecatedLabel,
	name,
	onChange,
	onFocus,
	onRequestFocus,
	requestFocus,
	tabIndex,
	value,
	variant = 'base',
	coverable = false,
	vertical,
	onRenderVisualPicker,
	onRenderVisualPickerSelected,
	onRenderVisualPickerNotSelected,
	size,
	refs,
	style,
	...rest
}: RadioProps): React.ReactElement => {
	const generatedId = useId();
	const preventDuplicateRef = useRef(false);

	const id = propId || generatedId;
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const labels = {
		...defaultLabels,
		...(deprecatedLabel ? { label: deprecatedLabel } : {}),
		...propLabels,
	};

	const ariaProps = getAriaProps(rest);
	const dataProps = getDataProps(rest);

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>, preventDuplicate?: boolean) => {
			if (!preventDuplicateRef.current) {
				preventDuplicateRef.current = Boolean(preventDuplicate);
				onChange?.(event, { checked: !checked });
			} else {
				preventDuplicateRef.current = false;
			}
		},
		[checked, onChange]
	);

	const handleInputRef = useCallback(
		(input: HTMLInputElement | null) => {
			refs?.input?.(input);
			if (input && requestFocus && onRequestFocus) {
				onRequestFocus(input);
			}
		},
		[refs, requestFocus, onRequestFocus]
	);

	// Render the label based on variant
	let radioLabel: React.ReactNode;

	if (variant === 'swatch') {
		radioLabel = (
			<label
				style={{ border: '1px' }}
				className="slds-radio_button__label"
				htmlFor={id}
			>
				<span>
					<Swatch label={labels.label} style={style} color={value ?? ''} />
				</span>
			</label>
		);
	} else if (variant === 'button-group') {
		radioLabel = (
			<label className="slds-radio_button__label" htmlFor={id}>
				<span className="slds-radio_faux">{labels.label}</span>
			</label>
		);
	} else if (variant === 'visual-picker') {
		radioLabel = (
			<label htmlFor={id}>
				{coverable ? (
					<div className="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
						<span className="slds-is-selected">
							{onRenderVisualPickerSelected?.()}
						</span>
						<span className="slds-is-not-selected">
							{onRenderVisualPickerNotSelected?.()}
						</span>
					</div>
				) : (
					<span className="slds-visual-picker__figure slds-visual-picker__text slds-align_absolute-center">
						{onRenderVisualPicker?.()}
					</span>
				)}
				{!vertical && (
					<span className="slds-visual-picker__body">
						{labels.heading && (
							<span className="slds-text-heading_small">{labels.heading}</span>
						)}
						<span className="slds-text-title">{labels.label}</span>
					</span>
				)}
				{!coverable && (
					<span className="slds-icon_container slds-visual-picker__text-check">
						<Icon
							assistiveText={assistiveText}
							category="utility"
							name="check"
							colorVariant="base"
							size="x-small"
						/>
					</span>
				)}
			</label>
		);
	} else {
		// Base variant
		radioLabel = (
			<label className="slds-radio__label" htmlFor={id} id={labelId}>
				<span className="slds-radio_faux" />
				<span className="slds-form-element__label">{labels.label}</span>
				{assistiveText.label && (
					<span className="slds-assistive-text">{assistiveText.label}</span>
				)}
			</label>
		);
	}

	return (
		<span
			className={classNames(
				variant === 'visual-picker' ? `slds-visual-picker_${size}` : null,
				{
					'slds-radio': variant === 'base' || variant === 'swatch',
					'slds-button slds-radio_button': variant === 'button-group',
					'slds-visual-picker': variant === 'visual-picker',
					'slds-visual-picker_vertical': variant === 'visual-picker' && vertical,
				},
				className as string
			)}
		>
			<input
				type="radio"
				id={id}
				name={name}
				value={value}
				{...(checked !== undefined ? { checked } : { defaultChecked })}
				onFocus={onFocus}
				onChange={(event) => handleChange(event)}
				onClick={(event) => {
					if (checked && deselectable) {
						handleChange(event as unknown as ChangeEvent<HTMLInputElement>);
					}
				}}
				onKeyPress={(event) => {
					const { charCode } = event;
					if (charCode === KEYS.SPACE && checked && deselectable) {
						handleChange(event, true);
					} else if (
						(charCode === KEYS.ENTER && checked && deselectable) ||
						!checked
					) {
						handleChange(event);
					}
				}}
				disabled={disabled}
				tabIndex={tabIndex ? parseInt(tabIndex, 10) : undefined}
				aria-describedby={ariaDescribedBy}
				aria-labelledby={ariaLabelledBy}
				{...ariaProps}
				{...dataProps}
				ref={handleInputRef}
			/>
			{radioLabel}
		</span>
	);
};

Radio.displayName = RADIO;

export default Radio;















