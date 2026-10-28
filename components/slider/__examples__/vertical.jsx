import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	render() {
		return (
			<Slider id="vertical-id" labels={{ label: 'Slider Label' }} vertical />
		);
	}
}

export default Example;
