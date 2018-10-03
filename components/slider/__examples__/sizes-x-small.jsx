import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	render() {
		return <Slider id="x-small-id" label="Slider Label" size="x-small" />;
	}
}

export default Example;
