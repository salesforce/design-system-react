/* eslint-disable no-console, react/prop-types */
import React from 'react';
import moment from 'moment';

import IconSettings from '~/components/icon-settings';
import Datepicker from '~/components/date-picker';

class Example extends React.Component {
	static displayName = 'DatepickerExample';

	constructor() {
		super();
		this.state = {
			value: undefined,
		};
	}

	handleChange = (event, data) => {
		this.setState({ value: data.date });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Datepicker
					labels={{
						label: 'Date',
					}}
					onChange={(event, data) => {
						this.handleChange(event, data);

						if (this.props.action) {
							const dataAsArray = Object.keys(data).map((key) => data[key]);
							this.props.action('onChange')(event, data, ...dataAsArray);
						} else if (console) {
							console.log('onChange', event, data);
						}
					}}
					onCalendarFocus={(event, data) => {
						if (this.props.action) {
							const dataAsArray = Object.keys(data).map((key) => data[key]);
							this.props.action('onCalendarFocus')(event, data, ...dataAsArray);
						} else if (console) {
							console.log('onCalendarFocus', event, data);
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
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
