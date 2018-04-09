import React from 'react';
import createReactClass from 'create-react-class';
import Slider from '~/components/slider';

const Example = createReactClass({
	displayName: 'SliderExample',

	render () {
		return (
			<Slider
				id="error-id"
				label="Slider Label"
				errorText="There is a problem with this field"
				aria-describedby="error message"
			/>
		);
	},
});

export default Example;
