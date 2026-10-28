import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	render() {
		return (
			<Slider id="disabled-id" labels={{ label: 'Slider Label' }} disabled />
		);
	}
}

export default Example;
