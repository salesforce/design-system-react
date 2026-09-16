import React from 'react';
import classNames from 'classnames';

import Input, { type InputChangeData } from '../../input';
import { WorkingColor, ColorPickerLabels } from '../types';

type InputChangeHandler = (
	event:
		| React.MouseEvent
		| React.KeyboardEvent
		| React.ChangeEvent<HTMLInputElement>,
	data: InputChangeData
) => void;

export interface CustomColorFormProps {
	/** Current working color object */
	color: WorkingColor;
	/** Unique ID for the form elements */
	id: string;
	/** Error text to display for working color */
	errorTextWorkingColor?: string;
	/** Labels for internationalization */
	labels: ColorPickerLabels;
	/** Callback for blue value change */
	onBlueChange: InputChangeHandler;
	/** Callback for green value change */
	onGreenChange: InputChangeHandler;
	/** Callback for hex value change */
	onHexChange: InputChangeHandler;
	/** Callback for red value change */
	onRedChange: InputChangeHandler;
}

/**
 * Form for entering custom color values (Hex and RGB).
 */
const CustomColorForm: React.FC<CustomColorFormProps> = ({
	color,
	id,
	errorTextWorkingColor,
	labels,
	onBlueChange,
	onGreenChange,
	onHexChange,
	onRedChange,
}) => {
	let describedBy: string | undefined;

	if (errorTextWorkingColor || color.errors) {
		describedBy = `color-picker-custom-error-${id}`;
	}

	return (
		<div className="slds-color-picker__custom-inputs">
			<Input
				aria-describedby={describedBy}
				className={classNames('slds-color-picker__input-custom-hex', {
					'slds-has-error': color.errors?.hex,
				})}
				id={`color-picker-input-hex-${id}`}
				label={labels.hexLabel}
				maxLength="7"
				onChange={onHexChange}
				value={color.hex}
			/>
			<Input
				aria-describedby={describedBy}
				className={classNames('slds-color-picker__input-custom-r', {
					'slds-has-error': color.errors?.red,
				})}
				id={`color-picker-input-r-${id}`}
				label={labels.redAbbreviated}
				onChange={onRedChange}
				maxLength="3"
				value={String(color.rgb.red)}
			/>
			<Input
				aria-describedby={describedBy}
				className={classNames('slds-color-picker__input-custom-g', {
					'slds-has-error': color.errors?.green,
				})}
				id={`color-picker-input-g-${id}`}
				label={labels.greenAbbreviated}
				onChange={onGreenChange}
				maxLength="3"
				value={String(color.rgb.green)}
			/>
			<Input
				aria-describedby={describedBy}
				className={classNames('slds-color-picker__input-custom-b', {
					'slds-has-error': color.errors?.blue,
				})}
				id={`color-picker-input-b-${id}`}
				label={labels.blueAbbreviated}
				onChange={onBlueChange}
				maxLength="3"
				value={String(color.rgb.blue)}
			/>
		</div>
	);
};

CustomColorForm.displayName = 'SLDSCustomColorForm';

export default CustomColorForm;



