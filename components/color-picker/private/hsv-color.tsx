import React, { useRef, useCallback } from 'react';

import KEYS from '../../../utilities/key-code';
import RadioButtonGroup from '../../../components/radio-button-group';
import Radio from '../../../components/radio-button-group/radio';
import ColorUtils from '../../../utilities/color';
import { WorkingColor, ColorPickerAssistiveText, ColorPickerLabels } from '../types';

export interface HsvColorProps {
	/** Assistive text for accessibility */
	assistiveText: ColorPickerAssistiveText;
	/** Current working color object */
	color: WorkingColor;
	/** Unique ID for the component */
	id: string;
	/** Labels for internationalization */
	labels: ColorPickerLabels;
	/** Callback for hue slider change */
	onHueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/** Callback for saturation/value change from grid click */
	onSaturationValueChange: (
		event: React.MouseEvent | React.KeyboardEvent,
		data: { saturation: number; value: number }
	) => void;
	/** Callback for saturation navigation via keyboard */
	onSaturationNavigate: (
		event: React.KeyboardEvent,
		data: { delta: number }
	) => void;
	/** Callback for value navigation via keyboard */
	onValueNavigate: (
		event: React.KeyboardEvent,
		data: { delta: number }
	) => void;
	/** Callback for swatch toggle (working color vs transparent) */
	onSwatchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/** Previous working color (fallback when transparent) */
	previousColor: WorkingColor;
}

const selectedStyle = {
	border: '1px solid #9e9e9e',
	boxShadow: 'rgb(117, 112, 112) 1px 1px 1px',
	marginRight: '2px',
};

const unselectedStyle = {
	border: '1px solid #9e9e9e',
	marginRight: '2px',
};

/**
 * HSV color selection component with saturation/value grid and hue slider.
 */
const HsvColor: React.FC<HsvColorProps> = ({
	assistiveText,
	color,
	id,
	labels,
	onHueChange,
	onSaturationValueChange,
	onSaturationNavigate,
	onValueNavigate,
	onSwatchChange,
	previousColor,
}) => {
	const rangeIndicatorRef = useRef<HTMLAnchorElement>(null);

	const isTransparent = useCallback(() => color.hex === '', [color.hex]);

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const rect = event.currentTarget.getBoundingClientRect();
			rangeIndicatorRef.current?.focus();
			onSaturationValueChange(event, {
				saturation: Math.round(((event.clientX - rect.left) / rect.width) * 100),
				value: Math.round(((rect.bottom - event.clientY) / rect.height) * 100),
			});
		},
		[onSaturationValueChange]
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			const keyDownCallbacks: Record<number, (multiplier: number) => void> = {
				[KEYS.LEFT]: (multiplier) => {
					onSaturationNavigate(event, { delta: multiplier * -1 });
				},
				[KEYS.RIGHT]: (multiplier) => {
					onSaturationNavigate(event, { delta: multiplier });
				},
				[KEYS.UP]: (multiplier) => {
					onValueNavigate(event, { delta: multiplier });
				},
				[KEYS.DOWN]: (multiplier) => {
					onValueNavigate(event, { delta: multiplier * -1 });
				},
			};

			if (keyDownCallbacks[event.keyCode]) {
				event.preventDefault();
				keyDownCallbacks[event.keyCode](event.shiftKey ? 10 : 1);
			}
		},
		[onSaturationNavigate, onValueNavigate]
	);

	const handleSwatchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onSwatchChange(event);
		},
		[onSwatchChange]
	);

	// When working color is transparent: either use the previous color or default to black
	const fallbackWorkingColor = previousColor.hex
		? previousColor
		: (ColorUtils.getNewColor({ hex: '#000000' }) as WorkingColor);
	const workingColor = isTransparent() ? fallbackWorkingColor : color;

	const style = { border: 'none', borderRadius: 'unset' };
	const swatchStyle = isTransparent() ? { ...unselectedStyle } : { ...selectedStyle };
	const transparentSwatchStyle = isTransparent()
		? { ...selectedStyle }
		: { ...unselectedStyle };

	return (
		<div>
			<p
				className="slds-assistive-text"
				id={`color-picker-instructions-${id}`}
			>
				{assistiveText.saturationValueGrid}
			</p>
			<div
				className="slds-color-picker__custom-range"
				style={{
					background: `hsl(${workingColor.hsv.hue}, 100%, 50%)`,
				}}
				onClick={handleClick}
				role="presentation"
			>
				{/* eslint-disable jsx-a11y/anchor-has-content */}
				<a
					aria-atomic="true"
					aria-describedby={`color-picker-instructions-${id}`}
					aria-live="assertive"
					className="slds-color-picker__range-indicator"
					onKeyDown={handleKeyDown}
					ref={rangeIndicatorRef}
					role="button"
					style={{
						bottom: `${workingColor.hsv.value}%`,
						left: `${workingColor.hsv.saturation}%`,
					}}
					tabIndex={0}
				>
					<span className="slds-assistive-text">
						{`Saturation ${workingColor.hsv.saturation}% Brightness: ${workingColor.hsv.value}%`}
					</span>
				</a>
			</div>
			<div className="slds-color-picker__hue-and-preview">
				<label
					className="slds-assistive-text"
					htmlFor={`color-picker-input-range-${id}`}
				>
					{assistiveText.hueSlider}
				</label>
				<input
					type="range"
					min="0"
					max="360"
					className="slds-color-picker__hue-slider"
					id={`color-picker-input-range-${id}`}
					value={workingColor.hsv.hue}
					onChange={onHueChange}
				/>
				<RadioButtonGroup
					name={`${id}-color-picker-swatch-toggle-button-group`}
					assistiveText={{ label: 'Toggle Transparency' }}
					style={style}
					onChange={handleSwatchChange}
				>
					<Radio
						checked={!isTransparent()}
						id={`color-picker-active-working-color-swatch-${id}`}
						key="working-color"
						labels={{
							label: labels.customTabActiveWorkingColorSwatch,
						}}
						style={swatchStyle}
						value={workingColor.hex}
						variant="swatch"
					/>
					<Radio
						checked={isTransparent()}
						id={`color-picker-transparent-swatch-${id}`}
						key="transparent"
						labels={{ label: labels.customTabTransparentSwatch }}
						style={transparentSwatchStyle}
						value="" // transparent
						variant="swatch"
					/>
				</RadioButtonGroup>
			</div>
		</div>
	);
};

HsvColor.displayName = 'SLDSHsvColor';

export default HsvColor;

