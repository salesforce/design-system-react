import React from 'react';
import Radio from './radio';

export default function (element) {
	const RadioExample = React.createClass({
		getInitialState () {
			return {
				matchesValue: 'value4'
			};
		},

		render () {
			const name = 'radioGroup1';
			const radios = [
				<Radio checkedValue={this.state.matchesValue} disabled={false} highlight={false} inline={true} key="1" name={name} text="Custom radio unchecked on initialization" onCheckedValueChanged={this._handleChange} value="value1" />,
				<Radio checkedValue={this.state.matchesValue} disabled={false} highlight={true} inline={true} key="2" name={name} text="Custom radio highlight unchecked on initialization" onCheckedValueChanged={this._handleChange} value="value2" />,
				<Radio checkedValue={this.state.matchesValue} disabled={false} highlight={false} inline={true} key="3" name={name} text="Custom radio unchecked on initialization" onCheckedValueChanged={this._handleChange} value="value3" />,
				<Radio checkedValue={this.state.matchesValue} disabled={true} highlight={false} inline={true} key="4" name={name} text="Custom radio disabled checked on initialization" onCheckedValueChanged={this._handleChange} value="value4" />
			];
			return (<div>{radios}</div>);
		},

		_handleChange (checkedValue) {
			this.setState({
				matchesValue: checkedValue
			});
		}
	});

	React.render(<RadioExample />, element);
}
