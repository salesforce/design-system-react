import React from 'react';
import * as Lib from 'slds-for-js-core/lib';
import Combobox from './index';
import { ExampleEvents } from 'utilities';

// SAMPLE CONTROL CODE -->

const ComboboxExample = React.createClass({
	propTypes: {
		modal: React.PropTypes.bool,
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	componentDidMount () {
		ExampleEvents.registerEventListener(this, 'combobox', 'exampleMethod');
	},

	getInitialState () {
		const resize = 'auto';
		const selection = {
			value: '1'
		};
		const collection = [
			{
				_itemType: 'header', text: 'One thing'
			}, {
				id: 0, text: 'One', value: '1', icon: 'utility.apps'
			}, {
				_itemType: 'divider'
			}, {
				_itemType: 'header', text: 'All the things'
			}, {
				id: 1, text: 'Two', value: '2', icon: 'utility.email'
			}, {
				id: 2, text: 'Three', value: '3'
			}, {
				id: 3, text: 'Buzz', value: '4'
			}, {
				id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'
			}, {
				id: 5, text: 'A Disabled Item', disabled: true,
				value: 'disabled'
			}
		];

		const comboboxSampleData = {
			collection: collection,
			resize: resize,
			selection: selection
		};

		return {
			model: {
				collection: comboboxSampleData.collection,
				selection: comboboxSampleData.selection,
				resize: comboboxSampleData.resize
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
		model.selection = model.collection[5];
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

// <-- SAMPLE CONTROL CODE

export default ComboboxExample;
