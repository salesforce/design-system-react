import React, { CSSProperties } from 'react';

export interface SwatchLabels {
	swatchTabTransparentSwatch?: string;
	customTabTransparentSwatch?: string;
}

export interface SwatchProps {
	/** The color hex value (e.g., "#ff0000"). Empty string for transparent. */
	color: string;
	/** Optional inline styles for the swatch */
	style?: CSSProperties;
	/** Optional label for the swatch */
	label?: string;
	/** Labels for internationalization */
	labels?: SwatchLabels;
}

/**
 * A color swatch display component.
 * Shows a colored square, or a striped pattern for transparent.
 */
const Swatch: React.FC<SwatchProps> = ({ color, style, label, labels }) => {
	const innerStyle: CSSProperties = {
		backgroundColor: color,
		...style,
	};
	let assistiveText = label || color;

	// Falsey values output a transparent swatch
	if (!color) {
		innerStyle.backgroundImage =
			'linear-gradient(-45deg, var(--slds-g-color-surface-1, white) 47%, var(--slds-g-color-error-1, #870500) 0, var(--slds-g-color-error-1, #870500) 53%, var(--slds-g-color-surface-1, white) 0)';
		if (labels?.swatchTabTransparentSwatch) {
			assistiveText = labels.swatchTabTransparentSwatch;
		}
	}

	return (
		<span className="slds-swatch" style={innerStyle}>
			<span className="slds-assistive-text">{assistiveText}</span>
		</span>
	);
};

Swatch.displayName = 'SLDSSwatch';

export default Swatch;
