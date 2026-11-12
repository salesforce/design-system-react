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
				id="medium-id"
				labels={{ label: 'Slider Label' }}
				onChange={this.handleChange}
				size="medium"
				value={this.state.value}
			/>
		);
	}
}

export default Example;
