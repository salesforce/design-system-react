import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	render() {
		return <Slider id="large-id" label="Slider Label" size="large" />;
	}
}

export default Example;
