/* eslint-disable no-console, react/prop-types */
import React from 'react';
import createReactClass from 'create-react-class';
import Datepicker from '~/components/date-picker';

const Example = createReactClass({
	displayName: 'DatepickerExample',

	render () {
		return (
			<Datepicker
				isIsoWeekday
				onChange={(event, data) => {
					if (this.props.action) {
						const dataAsArray = Object.keys(data).map((key) => data[key]);
						this.props.action('onChange')(event, data, ...dataAsArray);
					} else if (console) {
						console.log('onChange', event, data);
					}
				}}
			/>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
