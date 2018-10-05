import React from 'react';

import Slider from '~/components/slider';

class DemoSlider extends React.Component {
	static displayName = 'DemoSlider';

	state = {
		value: this.props.value,
	};

	handleChange = (event, { value }) => {
		this.setState({ value });
	};

	render() {
		return (
			<Slider
				{...this.props}
				value={this.state.value}
				onChange={this.handleChange}
			/>
		);
	}
}

class Example extends React.Component {
	static displayName = 'SliderExample';

	render() {
		return (
			<section>
				<ol>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							1. Base Input with label
						</h1>
						<DemoSlider id="base-id" label="My Label" value={0} />
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							2. Base Input with no label (assistive text)
						</h1>
						<DemoSlider
							id="assistiveText-id"
							assistiveText={{ label: 'My Label' }}
							value={0}
						/>
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							3. Base Input with min and max.
						</h1>
						<DemoSlider
							id="min-max-id"
							label="My Label"
							min={0}
							max={400}
							value={200}
						/>
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							4. Base Input with min, max and step.
						</h1>
						<DemoSlider
							id="min-max-step-id"
							label="My Label"
							min={0}
							max={400}
							step={100}
							value={200}
						/>
					</li>
				</ol>
			</section>
		);
	}
}

export default Example;
