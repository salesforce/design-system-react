import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	render() {
		return (
			<Slider id="medium-id" labels={{ label: 'Slider Label' }} size="medium" />
		);
	}
}

export default Example;
