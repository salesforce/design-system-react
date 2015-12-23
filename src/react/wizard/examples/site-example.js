import React from 'react';
import ReactDOM from 'react-dom';
import {Wizard} from 'design-system-react';

export default function (element) {
	// Note that you certainly don't *have* to put content in your collection, but you can!
	const collection = [
		{ text: 'Campaign', content: <h1>Campaign</h1> },
		{ text: 'Recipients', content: <h1>Recipients</h1> },
		{ text: 'Template', content: <h1>Template</h1> }
	];
	
	const WizardExample = React.createClass({
		getInitialState () {
			return {
				step: collection[0]
			};
		},
		
		render () {
			return (
				<Wizard collection={collection} step={this.state.step} onChanged={this._handleStepChange}>
					{this.state.step.content}
				</Wizard>
			);
		},
		
		_handleStepChange (step) {
			this.setState({
				step
			});
		}
	});

	ReactDOM.render(<WizardExample />, element);
}
