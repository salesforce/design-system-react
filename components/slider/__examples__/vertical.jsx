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
				id="vertical-id"
				labels={{ label: 'Slider Label' }}
				onChange={this.handleChange}
				value={this.state.value}
				vertical
			/>
		);
	}
}

export default Example;
