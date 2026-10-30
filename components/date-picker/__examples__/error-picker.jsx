/* eslint-disable no-console, react/prop-types */
import { useState } from 'react';
import moment from 'moment';

import IconSettings from '~/components/icon-settings';
import Datepicker from '~/components/date-picker';

const Example = () => {
	const [value, setValue] = useState(null);

	return (
		<IconSettings iconPath="/assets/icons">
			<Datepicker
				labels={{
					label: 'Date',
				}}
				formatter={(date) => (date ? moment(date).format('M/D/YYYY') : '')}
				hasError
				onChange={(event, data) => {
					setValue(data.date);
				}}
				parser={(dateString) => moment(dateString, 'MM-DD-YYYY').toDate()}
				value={value}
			/>
		</IconSettings>
	);
};

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
