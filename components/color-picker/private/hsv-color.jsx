import React from 'react';

import Swatch from './swatch';

import KEYS from '../../../utilities/key-code';

const handleClick = (event, rangeIndicator, { onSaturationValueChange }) => {
	const rect = event.currentTarget.getBoundingClientRect();
	rangeIndicator.focus();
	onSaturationValueChange(event, {
		saturation: Math.round((event.clientX - rect.left) / rect.width * 100),
		value: Math.round((rect.bottom - event.clientY) / rect.height * 100),
	});
};

const handleKeyDown = (event, { onSaturationNavigate, onValueNavigate }) => {
	const keyDownCallbacks = {
		[KEYS.LEFT]: (multiplier) => {
			onSaturationNavigate(event, {
				delta: multiplier * -1,
			});
		},
		[KEYS.RIGHT]: (multiplier) => {
			onSaturationNavigate(event, {
				delta: multiplier,
			});
		},
		[KEYS.UP]: (multiplier) => {
			onValueNavigate(event, {
				delta: multiplier,
			});
		},
		[KEYS.DOWN]: (multiplier) => {
			onValueNavigate(event, {
				delta: multiplier * -1,
			});
		},
	};

	if (keyDownCallbacks[event.keyCode]) {
		event.preventDefault();
		keyDownCallbacks[event.keyCode](event.shiftKey ? 10 : 1);
	}
};

class HsvColor extends React.Component {
	static displayName = 'SLDSHsvColor';

	render() {
		return (
			<div>
				<p
					className="slds-assistive-text"
					id={`color-picker-instructions-${this.props.id}`}
				>
					{this.props.assistiveText.saturationValueGrid}
				</p>
				<div
					className="slds-color-picker__custom-range"
					style={{
						background: `hsl(${this.props.color.hsv.hue}, 100%, 50%)`,
					}}
					onClick={(event) => {
						handleClick(event, this.rangeIndicator, {
							onSaturationValueChange: this.props.onSaturationValueChange,
						});
					}}
					role="presentation"
				>
					{/* eslint-disable jsx-a11y/anchor-has-content */}
					<a
						aria-atomic="true"
						aria-describedby={`color-picker-instructions-${this.props.id}`}
						aria-live="assertive"
						className="slds-color-picker__range-indicator"
						onKeyDown={(event) => {
							handleKeyDown(event, { ...this.props });
						}}
						ref={(rangeIndicator) => {
							this.rangeIndicator = rangeIndicator;
						}}
						role="button"
						style={{
							bottom: `${this.props.color.hsv.value}%`,
							left: `${this.props.color.hsv.saturation}%`,
						}}
						tabIndex={0}
					/>
				</div>
				<div className="slds-color-picker__hue-and-preview">
					<label
						className="slds-assistive-text"
						htmlFor={`color-picker-input-range-${this.props.id}`}
					>
						{this.props.assistiveText.hueSlider}
					</label>
					<input
						type="range"
						min="0"
						max="360"
						className="slds-color-picker__hue-slider"
						id={`color-picker-input-range-${this.props.id}`}
						value={this.props.color.hsv.hue}
						onChange={this.props.onHueChange}
					/>
					<Swatch color={this.props.color.hex} />
				</div>
			</div>
		);
	}
}

export default HsvColor;
