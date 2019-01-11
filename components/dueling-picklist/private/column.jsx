import React from 'react';
import PropTypes from 'prop-types';

const Column = ({ children, responsive }) => {
	let className = 'slds-dueling-list__column';
	if (responsive) {
		className += ' slds-dueling-list__column_responsive';
	}

	return <div className={className} children={children} />;
};

Column.propTypes = {
	responsive: PropTypes.bool,
};

Column.defaultProps = {
	responsive: false,
};

export default Column;
