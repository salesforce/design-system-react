import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	render() {
		return (
			<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
				<div className="slds-col_padded">
					<Slider
						id="x-small-id"
						labels={{ label: 'Slider Label' }}
						size="x-small"
					/>
				</div>
				<div className="slds-col_padded">
					<Slider
						id="small-id"
						labels={{ label: 'Slider Label' }}
						size="small"
					/>
				</div>
				<div className="slds-col_padded">
					<Slider
						id="medium-id"
						labels={{ label: 'Slider Label' }}
						size="medium"
					/>
				</div>
				<div className="slds-col_padded">
					<Slider
						id="large-id"
						labels={{ label: 'Slider Label' }}
						size="large"
					/>
				</div>
			</div>
		);
	}
}

export default Example;
