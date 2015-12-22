import * as Lib from '../../../lib/lib';
import React from 'react';
import {Combobox} from '../../dist';

// utilities
import {sampleData} from 'design-system-facades-utilities';
import {ExampleEvents} from 'design-system-facades-utilities';

export default React.createClass({
	propTypes: {
		modal: React.PropTypes.bool,
		models: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	componentDidMount () {
		ExampleEvents.registerEventListener(this, 'combobox', 'exampleMethod');
	},

	getInitialState () {
		return {
			model: {
				collection: sampleData.picklist.defaultArray,
				selection: sampleData.picklist.defaultArray[1],
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
					onChanged={this._handleModelChange}/>
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
		model.selection = sampleData.picklist.defaultArray[5];
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
