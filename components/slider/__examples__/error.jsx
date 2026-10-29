import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	render() {
		return (
			<Slider
				id="error-id"
				hasError
				labels={{
					label: 'Slider Label',
					error: 'There is a problem with this field',
				}}
				aria-describedby="slider-error-message"
			/>
		);
	}
}

export default Example;
