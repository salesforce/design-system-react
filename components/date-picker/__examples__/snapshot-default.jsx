/* eslint-disable no-console, react/prop-types */
import React from 'react';
import moment from 'moment';

// Higher Order Components such as `react-onclickoutside` use the DOM and Jest snapshot testing must be DOMless
import Datepicker from '~/components/date-picker/date-picker';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
	static displayName = 'DatepickerExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Datepicker
					labels={{
						label: 'Date',
					}}
					id="sample-datepicker"
					isOpen
					menuPosition="relative"
					value={new Date(2014, 6, 23)}
					formatter={(date) => {
						return date ? moment(date).format('M/D/YYYY') : '';
					}}
					parser={(date) => {
						return moment(date, 'MM-DD-YYYY').toDate();
					}}
					{...this.props}
				/>
			</IconSettings>
		);
	}
}

export default Example;
