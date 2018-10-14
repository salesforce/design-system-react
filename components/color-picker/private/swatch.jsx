import React from 'react';
import PropTypes from 'prop-types';

const Swatch = ({ color }) => {
	const style = {
		backgroundColor: color,
	};

	if (!color) {
		style.backgroundImage =
			'linear-gradient(-45deg, white 47%, red 0, red 53%, white 0)';
		style.border = '1px solid #cccccc';
	}

	return (
		<span className="slds-swatch" style={style}>
			<span className="slds-assistive-text">{color}</span>
		</span>
	);
};

Swatch.propTypes = {
	color: PropTypes.string.isRequired,
};

export default Swatch;
