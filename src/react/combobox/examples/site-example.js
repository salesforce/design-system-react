import React from 'react';
import {Lib, Combobox} from 'design-system-react';
import {sampleData, ExampleEvents} from 'design-system-utilities';

export default React.createClass({
	propTypes: {
		modal: React.PropTypes.bool,
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	componentDidMount () {
		ExampleEvents.registerEventListener(this, 'combobox', 'exampleMethod');
	},

	getInitialState () {
		console.log("[site-example.js:16] sampleData.combobox.default.collection:", sampleData.combobox.default.collection);
		return {
			model: {
				collection: sampleData.combobox.default.collection,
				selection: sampleData.combobox.default.collection[1],
				resize: 'auto'
			}
		};
	},

	render () {
		return (
			<div>
				<Combobox
					{...this.state.model}
					modalMenu={this.props.modal}
					onChange={this._handleModelChange}/>
			</div>
		);
	},

	_handleModelChange (selection) {
		const model = this.state.model;
		model.selection = selection;
		this.setState({model});
	},

	logSelectedItem () {
		Lib.log(this.state.model.selection);
	},

	setSelection () {
		const model = this.state.model;
		model.selection = sampleData.combobox.default.collection[5];
		this.setState({model});
	},

	enable () {
		const model = this.state.model;
		model.disabled = false;
		this.setState({model});
	},

	disable () {
		const model = this.state.model;
		model.disabled = true;
		this.setState({model});
	}
});
