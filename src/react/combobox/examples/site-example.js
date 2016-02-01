import React from 'react';
import {Lib, Combobox} from 'design-system-react';
import {sampleData, ExampleEvents} from 'design-system-utilities';

const SAMPLE_DATA_ACCESSOR = 'combobox';
const SAMPLE_DATA = sampleData[SAMPLE_DATA_ACCESSOR];
const SAMPLE_DATA_DEFAULT = SAMPLE_DATA.default;

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
				collection: SAMPLE_DATA_DEFAULT.collection,
				selection: SAMPLE_DATA_DEFAULT.collection[1],
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
		model.selection = SAMPLE_DATA_DEFAULT.collection[5];
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
