import * as Lib from '../../lib/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import Combobox from './combobox';
import sampleData from '../../../sample-data/picklist';

export default function () {
	const ComboboxExample = React.createClass({
		propTypes: {
			models: React.PropTypes.arrayOf(React.PropTypes.object)
		},

		getInitialState () {
			return {
				models: [
					{
						collection: sampleData.defaultArray,
						disabled: false,
						selection: sampleData.defaultArray[1],
						resize: 'auto'
					}
				]
			};
		},

		render () {
			const comboboxen = this.state.models.map((model, index) => {
				return (
					<div key={index}>
						<div className="slds-col example">
							<div>
								<Combobox {...model} onChanged={this._handleModelChange.bind(this, index)}/>
							</div>
						</div>
						<div className="slds-col demo-controls">
							<div className="slds-button-group" role="group">
								<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this.logSelectedItem.bind(this, index)}>Log selected item</button>
								<button type="button" className="slds-button slds-button--neutral slds-button--x-small" disabled>Set by index</button>
								<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this.setSelection.bind(this, index)}>Set by object</button>
								<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this.enable.bind(this, index)}>Enable</button>
								<button type="button" className="slds-button slds-button--neutral slds-button--x-small" onClick={this.disable.bind(this, index)}>Disable</button>
							</div>
						</div>
					</div>
				);
			});

			return (
				<div>
					{comboboxen}
				</div>
			);
		},

		_handleModelChange (index, selection) {
			const models = this.state.models;
			models[index].selection = selection;
			this.setState({models});
		},

		logSelectedItem (index) {
			Lib.log(this.state.models[index].selection);
		},

		setSelection (index) {
			const models = this.state.models;
			models[index].selection = sampleData.defaultArray[5];
			this.setState({models});
		},

		enable (index) {
			const models = this.state.models;
			models[index].disabled = false;
			this.setState({models});
		},

		disable (index) {
			const models = this.state.models;
			models[index].disabled = true;
			this.setState({models});
		}
	});

	ReactDOM.render(<ComboboxExample />, document.getElementById('combobox-react-control'));
}
