import React from 'react';
import createReactClass from 'create-react-class';
import Slider from '~/components/slider';

const Example = createReactClass({
	displayName: 'SliderExample',

	render () {
		return <Slider id="small-id" label="Slider Label" size="small" />;
	},
});

export default Example;
