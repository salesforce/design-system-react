/* eslint-disable no-console, react/prop-types */
import React from 'react';

import IconSettings from '~/components/icon-settings';
import Datepicker from '~/components/date-picker';

const Example = () => (
	<IconSettings iconPath="/assets/icons">
		<Datepicker
			labels={{
				label: 'Date',
			}}
			formatter={(date) => date}
			hasError
			value="This is an invalid value"
		/>
	</IconSettings>
);

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
