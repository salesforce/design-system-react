import React from 'react';
import {Lib, Picklist} from 'design-system-react';
import {sampleData} from 'design-system-utilities';

export default React.createClass({
	propTypes: {
		modal: React.PropTypes.bool
	},

	getInitialState () {
		return {
			models: [
				{
					collection: sampleData.picklist.defaultArray,
					disabled: false,
					selection: sampleData.picklist.defaultArray[1]
				}
			]
		};
	},

	render () {
		const picklists = this.state.models.map((model, index) => {
			return (
				<div key={index}>
					<div className="slds-col example">
						<Picklist
							{...model}
							modalMenu={this.props.modal}
							onChange={this._handleModelChange.bind(this, index)} />
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
				{picklists}
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
		models[index].selection = sampleData.picklist.defaultArray[5];
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
