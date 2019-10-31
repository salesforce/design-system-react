import React from 'react';
import classNames from 'classnames';

import Input from '../../input';

class CustomColorForm extends React.Component {
	static displayName = 'SLDSCustomColorForm';

	render() {
		let describedBy;

		if (this.props.errorTextWorkingColor || this.props.color.errors) {
			describedBy = `color-picker-custom-error-${this.props.id}`;
		}

		return (
			<div className="slds-color-picker__custom-inputs">
				<Input
					aria-describedby={describedBy}
					className={classNames('slds-color-picker__input-custom-hex', {
						'slds-has-error':
							this.props.color.errors && this.props.color.errors.hex,
					})}
					id={`color-picker-input-hex-${this.props.id}`}
					label={this.props.labels.hexLabel}
					maxLength="7"
					onChange={this.props.onHexChange}
					value={this.props.color.hex}
				/>
				<Input
					aria-describedby={describedBy}
					className={classNames('slds-color-picker__input-custom-r', {
						'slds-has-error':
							this.props.color.errors && this.props.color.errors.red,
					})}
					id={`color-picker-input-r-${this.props.id}`}
					label={this.props.labels.redAbbreviated}
					onChange={this.props.onRedChange}
					maxLength="3"
					value={String(this.props.color.rgb.red)}
				/>
				<Input
					aria-describedby={describedBy}
					className={classNames('slds-color-picker__input-custom-g', {
						'slds-has-error':
							this.props.color.errors && this.props.color.errors.green,
					})}
					id={`color-picker-input-g-${this.props.id}`}
					label={this.props.labels.greenAbbreviated}
					onChange={this.props.onGreenChange}
					maxLength="3"
					value={String(this.props.color.rgb.green)}
				/>
				<Input
					aria-describedby={describedBy}
					className={classNames('slds-color-picker__input-custom-b', {
						'slds-has-error':
							this.props.color.errors && this.props.color.errors.blue,
					})}
					id={`color-picker-input-b-${this.props.id}`}
					label={this.props.labels.blueAbbreviated}
					onChange={this.props.onBlueChange}
					maxLength="3"
					value={String(this.props.color.rgb.blue)}
				/>
			</div>
		);
	}
}

export default CustomColorForm;
