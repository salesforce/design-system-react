import React from 'react';

import ButtonGroup from '~/components/button-group';
import Checkbox from '~/components/checkbox';

function Example() {
	return (
		<ButtonGroup
			labels={{
				error: 'This field is required',
				label: 'Scheduled Day(s)',
			}}
			id="button-group-checkbox-error"
			variant="checkbox"
		>
			<Checkbox id="ButtonGroupExampleMon" labels={{ label: 'Mon' }} />
			<Checkbox id="ButtonGroupExampleTue" labels={{ label: 'Tue' }} />
			<Checkbox id="ButtonGroupExampleWed" labels={{ label: 'Wed' }} />
			<Checkbox id="ButtonGroupExampleThu" labels={{ label: 'Thu' }} />
			<Checkbox id="ButtonGroupExampleFri" labels={{ label: 'Fri' }} />
		</ButtonGroup>
	);
}

Example.displayName = 'ButtonGroupExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
