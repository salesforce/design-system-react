import React from 'react';
import PropTypes from 'prop-types';

const Swatch = ({ color, style, label, labels }) => {
	const innerStyle = {
		backgroundColor: color,
		border: '1px solid #cccccc',
		...style,
	};
	let assistiveText;
	// falsey values output a transparent swatch
	if (!color) {
		innerStyle.backgroundImage =
			'linear-gradient(-45deg, white 47%, #870500 0, #870500 53%, white 0)';
		assistiveText = labels && labels.swatchTabTransparentSwatch;
	} else {
		assistiveText = label || color;
	}

	return (
		<span className="slds-swatch" style={innerStyle}>
			<span className="slds-assistive-text">{assistiveText}</span>
		</span>
	);
};

Swatch.propTypes = {
	color: PropTypes.string.isRequired,
};

export default Swatch;
