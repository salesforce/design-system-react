import React from 'react';
import classNames from 'classnames';

import Input from '../../input';

function CustomColorForm(props) {
	let describedBy;

	if (props.errorTextWorkingColor || props.color.errors) {
		describedBy = `color-picker-custom-error-${props.id}`;
	}

	return (
		<div className="slds-color-picker__custom-inputs">
			<Input
				aria-describedby={describedBy}
				className={classNames('slds-color-picker__input-custom-hex', {
					'slds-has-error': props.color.errors && props.color.errors.hex,
				})}
				id={`color-picker-input-hex-${props.id}`}
				label={props.labels.hexLabel}
				maxLength="7"
				onChange={props.onHexChange}
				value={props.color.hex}
			/>
			<Input
				aria-describedby={describedBy}
				className={classNames('slds-color-picker__input-custom-r', {
					'slds-has-error': props.color.errors && props.color.errors.red,
				})}
				id={`color-picker-input-r-${props.id}`}
				label={props.labels.redAbbreviated}
				onChange={props.onRedChange}
				maxLength="3"
				value={String(props.color.rgb.red)}
			/>
			<Input
				aria-describedby={describedBy}
				className={classNames('slds-color-picker__input-custom-g', {
					'slds-has-error': props.color.errors && props.color.errors.green,
				})}
				id={`color-picker-input-g-${props.id}`}
				label={props.labels.greenAbbreviated}
				onChange={props.onGreenChange}
				maxLength="3"
				value={String(props.color.rgb.green)}
			/>
			<Input
				aria-describedby={describedBy}
				className={classNames('slds-color-picker__input-custom-b', {
					'slds-has-error': props.color.errors && props.color.errors.blue,
				})}
				id={`color-picker-input-b-${props.id}`}
				label={props.labels.blueAbbreviated}
				onChange={props.onBlueChange}
				maxLength="3"
				value={String(props.color.rgb.blue)}
			/>
		</div>
	);
}

CustomColorForm.displayName = 'SLDSCustomColorForm';

export default CustomColorForm;
