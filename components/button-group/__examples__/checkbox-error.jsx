import React from 'react';

import ButtonGroup from '~/components/button-group';
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
	static displayName = 'ButtonGroupExample';

	render() {
		return (
			<ButtonGroup
				labels={{
					error: 'This field is required',
					label: 'Scheduled Day(s)',
				}}
				variant="checkbox"
			>
				<Checkbox id="ButtonGroupExampleMon" label="Mon" />
				<Checkbox id="ButtonGroupExampleTue" label="Tue" />
				<Checkbox id="ButtonGroupExampleWed" label="Wed" />
				<Checkbox id="ButtonGroupExampleThu" label="Thu" />
				<Checkbox id="ButtonGroupExampleFri" label="Fri" />
			</ButtonGroup>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
