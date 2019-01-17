import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Column = ({ children, responsive }) => (
	<div
		className={classNames('slds-dueling-list__column', {
			'slds-dueling-list__column_responsive': responsive,
		})}
		children={children}
	/>
);

Column.propTypes = {
	responsive: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

Column.defaultProps = {
	responsive: false,
};

export default Column;
