import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	render() {
		return <Slider id="small-id" label="Slider Label" size="small" />;
	}
}

export default Example;
