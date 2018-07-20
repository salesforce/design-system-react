import React from 'react';
import createReactClass from 'create-react-class';
import Slider from '~/components/slider';

const Example = createReactClass({
	displayName: 'SliderExample',

	render () {
		return <Slider id="vertical-id" label="Slider Label" vertical />;
	},
});

export default Example;
