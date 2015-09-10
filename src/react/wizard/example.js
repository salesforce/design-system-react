import React from 'react';
import Wizard from './wizard';

export default function (element) {
	const collection = [
		{ text: 'Campaign' },
		{ text: 'Recipients' },
		{ text: 'Template' }
	];
	
	const WizardExample = React.createClass({
		getInitialState () {
			return {
				step: collection[0]
			};
		},
		
		render () {
			return <Wizard collection={collection} step={this.state.step} onChanged={this._handleStepChange} />;
		},
		
		_handleStepChange (step) {
			this.setState({
				step
			});
		},
	});
	
	React.render(<WizardExample />, element);
}
