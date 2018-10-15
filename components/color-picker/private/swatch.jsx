import React from 'react';
import PropTypes from 'prop-types';

const Swatch = ({ color, style }) => {
	const innerStyle = {
		backgroundColor: color,
		border: '1px solid #cccccc',
		...style
	};

	if (!color) {
		innerStyle.backgroundImage =
			'linear-gradient(-45deg, white 47%, red 0, red 53%, white 0)';
	}

	return (
		<span className="slds-swatch" style={innerStyle}>
			<span className="slds-assistive-text">{color}</span>
		</span>
	);
};

Swatch.propTypes = {
	color: PropTypes.string.isRequired,
};

export default Swatch;
