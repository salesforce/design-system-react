import React from 'react';
import createReactClass from 'create-react-class';
import Slider from '~/components/slider';

const DemoSlider = createReactClass({
	displayName: 'DemoSlider',

	getInitialState () {
		return {
			value: this.props.defaultValue,
		};
	},

	handleChange (event, { value }) {
		this.setState({ value });
	},

	render () {
		return (
			<Slider
				{...this.props}
				value={this.state.value}
				onChange={this.handleChange}
			/>
		);
	},
});

const Example = createReactClass({
	displayName: 'SliderExample',

	render () {
		return (
			<section>
				<ol>
					<li className="slds-p-bottom--large">
						<h1 className="slds-text-title_caps slds-p-vertical--medium">
							1. Base Input with label
						</h1>
						<DemoSlider id="base-id" label="My Label" />
					</li>
					<li className="slds-p-bottom--large">
						<h1 className="slds-text-title_caps slds-p-vertical--medium">
							2. Base Input with no label (assistive text)
						</h1>
						<DemoSlider
							id="assistiveText-id"
							assistiveText={{ label: 'My Label' }}
						/>
					</li>
					<li className="slds-p-bottom--large">
						<h1 className="slds-text-title_caps slds-p-vertical--medium">
							3. Base Input with min and max.
						</h1>
						<DemoSlider
							id="min-max-id"
							label="My Label"
							min={0}
							max={400}
							defaultValue={200}
						/>
					</li>
					<li className="slds-p-bottom--large">
						<h1 className="slds-text-title_caps slds-p-vertical--medium">
							4. Base Input with min, max and step.
						</h1>
						<DemoSlider
							id="min-max-step-id"
							label="My Label"
							min={0}
							max={400}
							step={100}
							defaultValue={200}
						/>
					</li>
				</ol>
			</section>
		);
	},
});

export default Example;
