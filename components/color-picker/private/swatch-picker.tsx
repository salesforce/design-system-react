import React, { useRef, useCallback } from 'react';
import findIndex from 'lodash.findindex';

import SwatchOption from './swatch-option';
import KEYS from '../../../utilities/key-code';
import EventUtil from '../../../utilities/event';
import { WorkingColor, ColorPickerLabels } from '../types';

import { DIRECTIONS } from '../../utilities/UNSAFE_direction';
import LanguageDirection from '../../utilities/UNSAFE_direction/private/language-direction';

export interface SwatchPickerProps {
	/** Current working color object */
	color: WorkingColor;
	/** Labels for internationalization */
	labels?: ColorPickerLabels;
	/** Callback when a swatch is selected */
	onSelect: (event: React.MouseEvent | React.KeyboardEvent, data: { hex: string }) => void;
	/** Array of hex color values for the swatch options */
	swatchColors: string[];
	/** Text direction (from LanguageDirection HOC) */
	direction?: string;
}

/**
 * SwatchPicker displays a grid of color swatches for selection.
 */
const SwatchPicker: React.FC<SwatchPickerProps> = ({
	color,
	labels,
	onSelect,
	swatchColors,
	direction,
}) => {
	const swatchColorRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

	const selectPreviousColor = useCallback(
		(event: React.KeyboardEvent) => {
			const index = findIndex(
				swatchColors,
				(item: string) => item === color.hex
			);
			const nextIndex =
				index === -1 || index === swatchColors.length - 1 ? 0 : index + 1;
			const prevColor = swatchColors[nextIndex];
			onSelect(event, { hex: prevColor });
			swatchColorRefs.current[prevColor]?.focus();
		},
		[color.hex, onSelect, swatchColors]
	);

	const selectNextColor = useCallback(
		(event: React.KeyboardEvent) => {
			const index = findIndex(
				swatchColors,
				(item: string) => item === color.hex
			);
			let prevIndex: number;
			if (index === 0) {
				prevIndex = swatchColors.length - 1;
			} else if (index === -1) {
				prevIndex = 0;
			} else {
				prevIndex = index - 1;
			}
			const nextColor = swatchColors[prevIndex];
			onSelect(event, { hex: nextColor });
			swatchColorRefs.current[nextColor]?.focus();
		},
		[color.hex, onSelect, swatchColors]
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			const keyDownCallbacks: Record<number, () => void> = {
				[KEYS.RIGHT]: () => {
					if (direction === DIRECTIONS.RTL) {
						selectNextColor(event);
					} else {
						selectPreviousColor(event);
					}
				},
				[KEYS.DOWN]: () => {
					selectPreviousColor(event);
				},
				[KEYS.LEFT]: () => {
					if (direction === DIRECTIONS.RTL) {
						selectPreviousColor(event);
					} else {
						selectNextColor(event);
					}
				},
				[KEYS.UP]: () => {
					selectNextColor(event);
				},
			};

			if (event.keyCode && keyDownCallbacks[event.keyCode]) {
				EventUtil.trapEvent(event);
				keyDownCallbacks[event.keyCode]();
			}
		},
		[direction, selectNextColor, selectPreviousColor]
	);

	const addRef = useCallback(
		(swatchColor: string) => (el: HTMLAnchorElement | null) => {
			swatchColorRefs.current[swatchColor] = el;
		},
		[]
	);

	const isSelectedColorInSwatch = swatchColors.includes(color.hex);

	return (
		<ul
			className="slds-color-picker__swatches"
			role="listbox"
			onKeyDown={handleKeyDown}
		>
			{swatchColors.map((swatchColor, index) => (
				<SwatchOption
					color={swatchColor}
					key={swatchColor || `transparent-${index}`}
					labels={labels}
					onSelect={onSelect}
					swatchOptionRef={addRef(swatchColor)}
					workingColor={color}
					tabIndex={
						(color && color.hex === swatchColor) ||
						(index === 0 && !isSelectedColorInSwatch)
							? 0
							: -1
					}
				/>
			))}
		</ul>
	);
};

SwatchPicker.displayName = 'SLDSSwatchPicker';

export default LanguageDirection(SwatchPicker);



