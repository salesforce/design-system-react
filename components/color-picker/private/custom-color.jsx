import React from 'react';

import CustomColorForm from './custom-color-form';
import HsvColor from './hsv-color';

// using state to manage everything in here because multiple HSV coordinates
// can map to a single RGB coordinate and we lose that if we're always passing
// in a hex color
class CustomColor extends React.Component {
	static displayName = 'SLDSCustomColor';

	render() {
		return (
			<div className="slds-color-picker__custom">
				<HsvColor
					assistiveText={this.props.assistiveText}
					color={this.props.color}
					previousColor={this.props.previousColor}
					id={this.props.id}
					onHueChange={this.props.onHueChange}
					onSaturationValueChange={this.props.onSaturationValueChange}
					onSaturationNavigate={this.props.onSaturationNavigate}
					onValueNavigate={this.props.onValueNavigate}
					onSwatchChange={this.props.onSwatchChange}
				/>
				<CustomColorForm
					color={this.props.color}
					id={this.props.id}
					labels={this.props.labels}
					onBlueChange={this.props.onBlueChange}
					onGreenChange={this.props.onGreenChange}
					onHexChange={this.props.onHexChange}
					onRedChange={this.props.onRedChange}
				/>
				{this.props.errorTextMenu || this.props.color.errors ? (
					<p
						className="slds-form-error slds-color-picker__input-custom-error"
						id={`color-picker-custom-error-${this.props.id}`}
					>
						{this.props.errorTextMenu ? this.props.errorTextMenu : (
							this.props.color.errors.hex
							? this.props.labels.invalidColor
							: this.props.labels.invalidComponent)}
					</p>
				) : (
						''
					)}
			</div>
		);
	}
}

export default CustomColor;
