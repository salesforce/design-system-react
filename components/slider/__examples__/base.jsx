import React from 'react';
import createReactClass from 'create-react-class';
import Slider from '~/components/slider';

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
						<Slider
							id="base-id"
							label="My Label"
						/>
					</li>
					<li className="slds-p-bottom--large">
						<h1 className="slds-text-title_caps slds-p-vertical--medium">
							2. Base Input with no label (assistive text)
						</h1>
						<Slider
							id="assistiveText-id"
							assistiveText="My Label"
						/>
					</li>
					<li className="slds-p-bottom--large">
						<h1 className="slds-text-title_caps slds-p-vertical--medium">
							3. Base Input with min and max.
						</h1>
						<Slider
							id="min-max-id"
							label="My Label"
							min={0}
							max={400}
							value={200}
						/>
					</li>
					<li className="slds-p-bottom--large">
						<h1 className="slds-text-title_caps slds-p-vertical--medium">
							4. Base Input with min, max and step.
						</h1>
						<Slider
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
});

export default Example;
