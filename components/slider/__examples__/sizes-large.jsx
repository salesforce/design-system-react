import React from 'react';
import createReactClass from 'create-react-class';
import Slider from '~/components/slider';

const Example = createReactClass({
	displayName: 'SliderExample',

	render () {
		return <Slider id="large-id" label="Slider Label" size="large" />;
	},
});

export default Example;
