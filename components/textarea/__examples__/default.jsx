import React from 'react';

import IconSettings from '~/components/icon-settings';
import Textarea from '~/components/textarea'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'TextareaExample';

	state = { value: '' };

	handleChange = (event, data) => {
		this.setState({ value: data.value });
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Textarea
					id="unique-id-1"
					labels={{ label: 'Textarea Label' }}
					onChange={this.handleChange}
					value={this.state.value}
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
