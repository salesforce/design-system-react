import React from 'react';

import CustomColorForm from './custom-color-form';
import HsvColor from './hsv-color';

function CustomColor(props) {
	let errorText;

	if (props.errorTextWorkingColor) {
		errorText = props.errorTextWorkingColor;
	} else if (props.color.errors && props.color.errors.hex) {
		errorText = props.labels.invalidColor;
	} else {
		errorText = props.labels.invalidComponent;
	}

	return (
		<div className="slds-color-picker__custom">
			<HsvColor
				assistiveText={props.assistiveText}
				color={props.color}
				id={props.id}
				labels={props.labels}
				onHueChange={props.onHueChange}
				onSaturationValueChange={props.onSaturationValueChange}
				onSaturationNavigate={props.onSaturationNavigate}
				onValueNavigate={props.onValueNavigate}
				onSwatchChange={props.onSwatchChange}
				previousColor={props.previousColor}
			/>
			<CustomColorForm
				color={props.color}
				id={props.id}
				errorTextWorkingColor={props.errorTextWorkingColor}
				labels={props.labels}
				onBlueChange={props.onBlueChange}
				onGreenChange={props.onGreenChange}
				onHexChange={props.onHexChange}
				onRedChange={props.onRedChange}
			/>
			{props.errorTextWorkingColor || props.color.errors ? (
				<p
					className="slds-form-error slds-color-picker__input-custom-error"
					id={`color-picker-custom-error-${props.id}`}
				>
					{errorText}
				</p>
			) : (
				''
			)}
		</div>
	);
}

CustomColor.displayName = 'SLDSCustomColor';

export default CustomColor;
