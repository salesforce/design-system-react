import React, { CSSProperties, forwardRef } from 'react';
import Swatch, { SwatchLabels } from './swatch';
import { WorkingColor } from '../types';

export interface SwatchOptionProps {
	/** The color hex value */
	color: string;
	/** Labels for internationalization */
	labels?: SwatchLabels;
	/** Callback when swatch is selected */
	onSelect: (event: React.MouseEvent, data: { hex: string }) => void;
	/** Ref callback for focus management */
	swatchOptionRef?: (el: HTMLAnchorElement | null) => void;
	/** The currently selected working color */
	workingColor?: WorkingColor;
	/** Tab index for keyboard navigation */
	tabIndex?: number;
}

const selectedStyle: CSSProperties = {
	border: '1px solid #141414',
	borderRadius: '2px',
	margin: '3px',
};

const selectedInnerStyle: CSSProperties = {
	border: '1px solid white',
	borderRadius: '2px',
};

/**
 * Individual swatch option within the swatch picker.
 */
const SwatchOption = forwardRef<HTMLAnchorElement, SwatchOptionProps>(
	(
		{
			color,
			labels,
			onSelect,
			swatchOptionRef,
			workingColor,
			tabIndex = -1,
		},
		_ref
	) => {
		const isSelected = workingColor && workingColor.hex === color;

		const handleClick = (event: React.MouseEvent) => {
			event.preventDefault();
			onSelect(event, { hex: color });
		};

		return (
			<li
				className="slds-color-picker__swatch"
				style={isSelected ? selectedStyle : {}}
				role="presentation"
			>
				<a
					aria-selected={isSelected}
					className="slds-color-picker__swatch-trigger"
					onClick={handleClick}
					ref={swatchOptionRef}
					role="option"
					style={isSelected ? selectedInnerStyle : {}}
					tabIndex={tabIndex}
				>
					<Swatch color={color} labels={labels} />
				</a>
			</li>
		);
	}
);

SwatchOption.displayName = 'SLDSSwatchOption';

export default SwatchOption;



