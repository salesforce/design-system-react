import Lib from '../../core/lib';
import React from 'react';
import Combobox from './combobox';

export default function (element) {
	var collection = [
		{ id: 0, text: 'One', value: '1' },
		{ id: 1, text: 'Two', value: '2' },
		{ id: 2, text: 'Three', value: '3' },
		{ id: 3, text: 'Buzz', value: '4' },
		{ id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar' },
		{ id: 5, text: 'A Disabled Item', disabled: true, value: 'disabled' }
	];
	
	// TO-DO: Rewrite this to a sample that is more real-life
	// For example, this could be a collection of people and their food preference rather than a perfect set of models
	const models = {
		combobox1: {
			collection: collection,
			disabled: false,
			selection: collection[0],
			resize: 'auto'
		},
		combobox2: {
			collection: collection,
			disabled: false,
			selection: { text: 'Buzz' }
		},
		combobox3: {
			collection: collection,
			disabled: false
		},
		combobox4: {
			collection: collection,
			disabled: true
		}
	};
	
	var ComboboxExample = React.createClass({
		getSelectionHandler (model) {
			return function selectionHandler (selection) {
				model.selection = selection;
			};
		},
	
		render () {
			var comboboxen = [];
			
			// TO-DO: This isn't the most "React-y" example
			Object.keys(this.props.models).forEach(key => {
				var self = this;
				var model = this.props.models[key];
				model.onSelected = this.getSelectionHandler(model);
				model.ref = key;
				
				comboboxen.push(
					<section className="example-group" key={key}>
						<h1>Combobox example ({key})</h1>
						
						<div className="example">{React.createElement(Combobox, model)}</div>
						
						<div className="btn-panel action">
							<button className="btn btn-default" onClick={self.logSelectedItem.bind(this, key)}>log selected item</button>
							<button className="btn btn-default" onClick={self.setSelection.bind(this, key)}>set by value ('2')</button>
							<button className="btn btn-default" onClick={self.enable.bind(this, key)}>enable</button>
							<button className="btn btn-default" onClick={self.disable.bind(this, key)}>disable</button>
						</div>
					</section>
				);
			});
	
			return (
				<div>
					{comboboxen}
					<button className="action btn btn-primary" onClick={this.changeCollection}>Toggle Enabled / Disabled</button>
				</div>
			);
		},
		
		changeCollection () {
			const props = this.props;
			
			Object.keys(props.models).forEach(key => {
				props.models[key].disabled = !props.models[key].disabled;
			});
	
			this.setProps({
				models: props.models
			});
		},
	
		logSelectedItem (key) {
			// Okay, probably wouldn't do this in React but just demonstrating
			Lib.log(this.refs[key].getSelection());
		},
		
		setSelection (key) {
			models[key].selection = { value: '2' };
			this.forceUpdate();
		},
		
		enable (key) {
			models[key].disabled = false;
			this.forceUpdate();
		},
		
		disable (key) {
			models[key].disabled = true;
			this.forceUpdate();
		}
	});
	
	React.render(<ComboboxExample key={'ComboboxExample'} models={models}/>, element);
}
