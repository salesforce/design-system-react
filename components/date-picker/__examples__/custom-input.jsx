/* eslint-disable no-console, react/prop-types */
import React from 'react';
import moment from 'moment';

import Datepicker from '~/components/date-picker';
import Input from '~/components/input';

class Example extends React.Component {
	static displayName = 'DatepickerExample';

	state = {
		isOpen: false,
		value: null,
	};

	render() {
		return (
			<Datepicker
				labels={{
					label: 'Date',
				}}
				input={<Input placeholder="With custom Input" />}
				isOpen={this.state.isOpen}
				onRequestClose={(event, data) => {
					if (this.props.action) {
						this.props.action('onRequestClose')(event, data);
					} else if (console) {
						console.log('onRequestClose', event, data);
					}
					this.setState({ isOpen: false });
				}}
				onRequestOpen={(event, data) => {
					if (this.props.action) {
						this.props.action('onRequestOpen')(event, data);
					} else if (console) {
						console.log('onRequestOpen', event, data);
					}
					this.setState({ isOpen: true });
				}}
				onChange={(event, data) => {
					this.setState({ value: data.date });
					if (this.props.action) {
						const dataAsArray = Object.keys(data).map((key) => data[key]);
						this.props.action('onChange')(event, data, ...dataAsArray);
					} else if (console) {
						console.log('onChange', event, data);
					}
				}}
				formatter={(date) => {
					return date ? moment(date).format('M/D/YYYY') : '';
				}}
				parser={(dateString) => {
					return moment(dateString, 'MM-DD-YYYY').toDate();
				}}
				value={this.state.value}
			/>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
