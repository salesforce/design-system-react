/* eslint-disable no-console, react/prop-types */
import React from 'react';
import createReactClass from 'create-react-class';
import Datepicker from '~/components/date-picker';
import Input from '~/components/input';

const Example = createReactClass({
	displayName: 'DatepickerExample',

	getInitialState () {
		return {
			isOpen: false,
		};
	},

	render () {
		return (
			<Datepicker
				isOpen={this.state.isOpen}
				onRequestClose={() => {
					this.setState({ isOpen: false });
				}}
				onRequestOpen={() => {
					this.setState({ isOpen: true });
				}}
				onChange={(event, data) => {
					if (this.props.action) {
						const dataAsArray = Object.keys(data).map((key) => data[key]);
						this.props.action('onChange')(event, data, ...dataAsArray);
					} else if (console) {
						console.log('onChange', event, data);
					}
				}}
			>
				<Input placeholder="With custom Input" value="" />
			</Datepicker>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
