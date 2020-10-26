import React from 'react';

import Slider from '~/components/slider';

function Example() {
	return (
		<Slider
			id="error-id"
			label="Slider Label"
			errorText="There is a problem with this field"
			aria-describedby="slider-error-message"
		/>
	);
}

Example.displayName = 'SliderExample';

export default Example;
