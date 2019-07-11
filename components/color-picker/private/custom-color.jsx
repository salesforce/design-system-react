import React from 'react';

import CustomColorForm from './custom-color-form';
import HsvColor from './hsv-color';

// using state to manage everything in here because multiple HSV coordinates
// can map to a single RGB coordinate and we lose that if we're always passing
// in a hex color
class CustomColor extends React.Component {
	static displayName = 'SLDSCustomColor';

	render() {
		let errorText;

		if (this.props.errorTextWorkingColor) {
			errorText = this.props.errorTextWorkingColor;
		} else if (this.props.color.errors && this.props.color.errors.hex) {
			errorText = this.props.labels.invalidColor;
		} else {
			errorText = this.props.labels.invalidComponent;
		}

		return (
			<div className="slds-color-picker__custom">
				<HsvColor
					assistiveText={this.props.assistiveText}
					color={this.props.color}
					id={this.props.id}
					labels={this.props.labels}
					onHueChange={this.props.onHueChange}
					onSaturationValueChange={this.props.onSaturationValueChange}
					onSaturationNavigate={this.props.onSaturationNavigate}
					onValueNavigate={this.props.onValueNavigate}
					onSwatchChange={this.props.onSwatchChange}
					previousColor={this.props.previousColor}
				/>
				<CustomColorForm
					color={this.props.color}
					id={this.props.id}
					errorTextWorkingColor={this.props.errorTextWorkingColor}
					labels={this.props.labels}
					onBlueChange={this.props.onBlueChange}
					onGreenChange={this.props.onGreenChange}
					onHexChange={this.props.onHexChange}
					onRedChange={this.props.onRedChange}
				/>
				{this.props.errorTextWorkingColor || this.props.color.errors ? (
					<p
						className="slds-form-error slds-color-picker__input-custom-error"
						id={`color-picker-custom-error-${this.props.id}`}
					>
						{errorText}
					</p>
				) : (
					''
				)}
			</div>
		);
	}
}

export default CustomColor;
