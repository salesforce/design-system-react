/* eslint-disable no-console, react/prop-types */
import React from 'react';

// Higher Order Components such as `react-onclickoutside` use the DOM and Jest snapshot testing must be DOMless
import Datepicker from '~/components/date-picker/date-picker';

const Example = React.createClass({
	displayName: 'DatepickerExample',

	render () {
		return (
			<Datepicker
				id="sample-datepicker"
				isInline
				isOpen
				value={new Date(2014, 6, 23)}
				{...this.props}
			/>
		);
	}
});

export default Example;
