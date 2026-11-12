import React from 'react';

import Slider from '~/components/slider';

class Example extends React.Component {
	static displayName = 'SliderExample';

	state = { large: 0, medium: 0, small: 0, xSmall: 0 };

	handleChange = (key) => (event, data) => {
		this.setState({ [key]: data.value });
	};

	render() {
		return (
			<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
				<div className="slds-col_padded">
					<Slider
						id="x-small-id"
						labels={{ label: 'Slider Label' }}
						onChange={this.handleChange('xSmall')}
						size="x-small"
						value={this.state.xSmall}
					/>
				</div>
				<div className="slds-col_padded">
					<Slider
						id="small-id"
						labels={{ label: 'Slider Label' }}
						onChange={this.handleChange('small')}
						size="small"
						value={this.state.small}
					/>
				</div>
				<div className="slds-col_padded">
					<Slider
						id="medium-id"
						labels={{ label: 'Slider Label' }}
						onChange={this.handleChange('medium')}
						size="medium"
						value={this.state.medium}
					/>
				</div>
				<div className="slds-col_padded">
					<Slider
						id="large-id"
						labels={{ label: 'Slider Label' }}
						onChange={this.handleChange('large')}
						size="large"
						value={this.state.large}
					/>
				</div>
			</div>
		);
	}
}

export default Example;
