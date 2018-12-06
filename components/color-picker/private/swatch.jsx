import React from 'react';
import PropTypes from 'prop-types';

const Swatch = ({ color, style, label }) => {
	const innerStyle = {
		backgroundColor: color,
		border: '1px solid #cccccc',
		...style,
	};

	if (!color) {
		innerStyle.backgroundImage =
			'linear-gradient(-45deg, white 47%, #870500 0, #870500 53%, white 0)';
	}

	return (
		<span className="slds-swatch" style={innerStyle}>
			<span className="slds-assistive-text">
				{label || color || 'transparent'}
			</span>
		</span>
	);
};

Swatch.propTypes = {
	color: PropTypes.string.isRequired,
};

export default Swatch;
