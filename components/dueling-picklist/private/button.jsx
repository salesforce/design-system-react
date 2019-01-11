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

export default Button;
