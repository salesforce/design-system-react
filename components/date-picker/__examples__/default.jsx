/* eslint-disable no-console, react/prop-types */
import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Datepicker from '~/components/date-picker';

const Example = createReactClass({
	displayName: 'DatepickerExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<Datepicker
					onChange={(event, data) => {
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
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
