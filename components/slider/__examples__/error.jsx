import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	state = { value: 0 };

	handleChange = (event, data) => {
		this.setState({ value: data.value });
	};

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
				onChange={this.handleChange}
				value={this.state.value}
			/>
		);
	}
}

export default Example;
