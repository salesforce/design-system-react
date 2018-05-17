import React from 'react';
import createReactClass from 'create-react-class';
import Slider from '~/components/slider';

const Example = createReactClass({
	displayName: 'SliderExample',

	render () {
		return (
			<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<Slider id="x-small-id" label="Slider Label" size="x-small" />
				</div>
				<div className="slds-col--padded">
					<Slider id="small-id" label="Slider Label" size="small" />
				</div>
				<div className="slds-col--padded">
					<Slider id="medium-id" label="Slider Label" size="medium" />
				</div>
				<div className="slds-col--padded">
					<Slider id="large-id" label="Slider Label" size="large" />
				</div>
			</div>
		);
	},
});

export default Example;
