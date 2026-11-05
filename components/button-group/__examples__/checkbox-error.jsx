import React from 'react';

import ButtonGroup from '~/components/button-group';
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
	static displayName = 'ButtonGroupExample';

	state = { checked: {} };

	handleChange = (id) => (event, data) => {
		this.setState((previous) => ({
			checked: { ...previous.checked, [id]: data.checked },
		}));
	};

	render() {
		return (
			<ButtonGroup
				labels={{
					error: 'This field is required',
					label: 'Scheduled Day(s)',
				}}
				id="button-group-checkbox-error"
				variant="checkbox"
			>
				<Checkbox
					checked={!!this.state.checked.ButtonGroupExampleMon}
					id="ButtonGroupExampleMon"
					labels={{ label: 'Mon' }}
					onChange={this.handleChange('ButtonGroupExampleMon')}
				/>
				<Checkbox
					checked={!!this.state.checked.ButtonGroupExampleTue}
					id="ButtonGroupExampleTue"
					labels={{ label: 'Tue' }}
					onChange={this.handleChange('ButtonGroupExampleTue')}
				/>
				<Checkbox
					checked={!!this.state.checked.ButtonGroupExampleWed}
					id="ButtonGroupExampleWed"
					labels={{ label: 'Wed' }}
					onChange={this.handleChange('ButtonGroupExampleWed')}
				/>
				<Checkbox
					checked={!!this.state.checked.ButtonGroupExampleThu}
					id="ButtonGroupExampleThu"
					labels={{ label: 'Thu' }}
					onChange={this.handleChange('ButtonGroupExampleThu')}
				/>
				<Checkbox
					checked={!!this.state.checked.ButtonGroupExampleFri}
					id="ButtonGroupExampleFri"
					labels={{ label: 'Fri' }}
					onChange={this.handleChange('ButtonGroupExampleFri')}
				/>
			</ButtonGroup>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
