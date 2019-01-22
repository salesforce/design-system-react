import React from 'react';
import PropTypes from 'prop-types';
import SLDSButton from '~/components/button';

const Button = ({ onClick, assistiveText, direction, disabled }) => (
	<SLDSButton
		onClick={onClick}
		label={assistiveText}
		iconCategory="utility"
		iconName={direction}
		iconVariant="container"
		variant="icon"
		assistiveText={{
			icon: assistiveText,
		}}
		disabled={disabled}
	/>
);

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	assistiveText: PropTypes.string.isRequired,
	direction: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	disabled: false,
};

export default Button;
