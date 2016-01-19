import React from 'react';
import {Lib, Dropdown} from 'design-system-react';
import {sampleData} from 'design-system-utilities';

export default React.createClass({
	propTypes: {
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState () {
		return {
			models: [
				{
					collection: sampleData.dropdown.default.collection,
					disabled: false,
					selection: sampleData.dropdown.default.collection[1]
				}
			]
		};
	},

	render () {
		const dropdowns = this.state.models.map((model, index) => {
			return (
				<div key={index}>
					<div className="slds-col example">
						<Dropdown {...model} onChange={this._handleModelChange.bind(this, index)} />
					</div>
					<div className="slds-col demo-controls">
						<div className="slds-button-group" role="group">
							<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this.logSelectedItem.bind(this, index)}>Log selected item</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--small" disabled>Set by index</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this.setSelection.bind(this, index)}>Set by object</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this.enable.bind(this, index)}>Enable</button>
							<button type="button" className="slds-button slds-button--neutral slds-button--small" onClick={this.disable.bind(this, index)}>Disable</button>
						</div>
					</div>
				</div>
			);
		});

		return (
			<div>
				{dropdowns}
			</div>
		);
	},

	_handleModelChange (index, selection) {
		const models = this.state.models;
		models[index].selection = selection;
		this.setState({models});
	},

	toggleSelectlistsEnabled () {
		this.setState({
			models: this.state.models.map(model => {
				model.disabled = !model.disabled;
				return model;
			})
		});
	},

	logSelectedItem (index) {
		Lib.log(this.state.models[index].selection);
	},

	setSelection (index) {
		const models = this.state.models;
		models[index].selection = sampleData.default.Array[5];
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
