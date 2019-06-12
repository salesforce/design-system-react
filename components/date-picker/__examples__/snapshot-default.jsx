/* eslint-disable no-console, react/prop-types */
import React from 'react';

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
					{...this.props}
				/>
			</IconSettings>
		);
	}
}

export default Example;
