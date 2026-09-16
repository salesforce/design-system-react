import React from 'react';

import CustomColorForm from './custom-color-form';
import HsvColor from './hsv-color';
import { type InputChangeData } from '../../input';
import { WorkingColor, ColorPickerAssistiveText, ColorPickerLabels } from '../types';

type InputChangeHandler = (
	event:
		| React.MouseEvent
		| React.KeyboardEvent
		| React.ChangeEvent<HTMLInputElement>,
	data: InputChangeData
) => void;

export interface CustomColorProps {
	/** Assistive text for accessibility */
	assistiveText: ColorPickerAssistiveText;
	/** Unique ID for the component */
	id: string;
	/** Current working color object */
	color: WorkingColor;
	/** Error text to display for working color */
	errorTextWorkingColor?: string;
	/** Previous working color (fallback when transparent) */
	previousColor: WorkingColor;
	/** Labels for internationalization */
	labels: ColorPickerLabels;
	/** Callback for blue value change */
	onBlueChange: InputChangeHandler;
	/** Callback for green value change */
	onGreenChange: InputChangeHandler;
	/** Callback for hex value change */
	onHexChange: InputChangeHandler;
	/** Callback for hue slider change */
	onHueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/** Callback for red value change */
	onRedChange: InputChangeHandler;
	/** Callback for swatch toggle */
	onSwatchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/** Callback for saturation/value change */
	onSaturationValueChange: (
		event: React.MouseEvent | React.KeyboardEvent,
		data: { saturation: number; value: number }
	) => void;
	/** Callback for saturation navigation */
	onSaturationNavigate: (
		event: React.KeyboardEvent,
		data: { delta: number }
	) => void;
	/** Callback for value navigation */
	onValueNavigate: (
		event: React.KeyboardEvent,
		data: { delta: number }
	) => void;
}

/**
 * Custom color tab content with HSV picker and RGB/Hex inputs.
 */
const CustomColor: React.FC<CustomColorProps> = ({
	assistiveText,
	id,
	color,
	errorTextWorkingColor,
	previousColor,
	labels,
	onBlueChange,
	onGreenChange,
	onHexChange,
	onHueChange,
	onRedChange,
	onSwatchChange,
	onSaturationValueChange,
	onSaturationNavigate,
	onValueNavigate,
}) => {
	let errorText: string | undefined;

	if (errorTextWorkingColor) {
		errorText = errorTextWorkingColor;
	} else if (color.errors?.hex) {
		errorText = labels.invalidColor;
	} else if (color.errors) {
		errorText = labels.invalidComponent;
	}

	return (
		<div className="slds-color-picker__custom">
			<HsvColor
				assistiveText={assistiveText}
				color={color}
				id={id}
				labels={labels}
				onHueChange={onHueChange}
				onSaturationValueChange={onSaturationValueChange}
				onSaturationNavigate={onSaturationNavigate}
				onValueNavigate={onValueNavigate}
				onSwatchChange={onSwatchChange}
				previousColor={previousColor}
			/>
			<CustomColorForm
				color={color}
				id={id}
				errorTextWorkingColor={errorTextWorkingColor}
				labels={labels}
				onBlueChange={onBlueChange}
				onGreenChange={onGreenChange}
				onHexChange={onHexChange}
				onRedChange={onRedChange}
			/>
			{(errorTextWorkingColor || color.errors) && (
				<p
					className="slds-form-error slds-color-picker__input-custom-error"
					id={`color-picker-custom-error-${id}`}
				>
					{errorText}
				</p>
			)}
		</div>
	);
};

CustomColor.displayName = 'SLDSCustomColor';

export default CustomColor;



