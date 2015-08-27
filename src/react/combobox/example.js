import * as Lib from '../../core/lib';
import React from 'react';
import Combobox from './combobox';

export default function (element) {
	const collection = [
		{ _itemType: 'header', text: 'One thing' },
		{ id: 0, text: 'One', value: '1' },
		{ _itemType: 'divider' },
		{ _itemType: 'header', text: 'All the things' },
		{ id: 1, text: 'Two', value: '2' },
		{ id: 6, text: 'Taste', value: '2' },
		{ id: 2, text: 'Three', value: '3'  },
		{ id: 3, text: 'Buzz', value: '4'  },
		{ id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
		{ id: 5, text: 'A Disabled Item', disabled: true, value: 'disabled' }
	];

	const ComboboxExample = React.createClass({
		propTypes: {
			models: React.PropTypes.arrayOf(React.PropTypes.object)
		},

		getInitialState () {
			return {
				models: [
					{
						collection: collection,
						disabled: false,
						selection: collection[1],
						resize: 'auto'
					},
					{
						collection: collection,
						disabled: false,
						selection: collection[6]
					},
					{
						collection: collection,
						disabled: false
					},
					{
						collection: collection,
						disabled: true
					}
				]
			};
		},

		render () {
			const comboboxen = this.state.models.map((model, index) => {
				return (
					<section className="example-group" key={index}>
						<h1>Combobox example (combobox{index + 1})</h1>

						<div className="example" style={{ width: 200 }}>
							<Combobox {...model} onChanged={this._handleModelChange.bind(this, index)}/>
						</div>

						<div className="btn-panel action">
							<button className="btn btn-default" onClick={this.logSelectedItem.bind(this, index)}>log selected item</button>
							<button className="btn btn-default" onClick={this.setSelection.bind(this, index)}>set by object</button>
							<button className="btn btn-default" onClick={this.enable.bind(this, index)}>enable</button>
							<button className="btn btn-default" onClick={this.disable.bind(this, index)}>disable</button>
						</div>
					</section>
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
			models[index].selection = collection[5];
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

	React.render(<ComboboxExample />, element);
}
