import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	render() {
		return (
			<Slider
				id="error-id"
				label="Slider Label"
				errorText="There is a problem with this field"
				aria-describedby="slider-error-message"
			/>
		);
	}
}

export default Example;
