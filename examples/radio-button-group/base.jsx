import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonGroup from '~/components/radio-button-group'; // `~` is replaced with design-system-react at runtime
import Radio from '~/components/radio-button-group/radio'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {

	constructor (props) {
		super(props);
		this.state = { checked: 'Tue' };
	}

	render () {
		const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
		const labels = { label: 'Day of week' };
		return (
			<div>
				<RadioButtonGroup
					labels={labels}
					onChange={(event) => this.setState({ checked: event.target.value })}
					disabled={this.props.disabled}
					required={this.props.required}
					name={this.props.name}
					errorId={this.props.errorId}
				>
					{days.map((day) => <Radio key={day} id={day} label={day} value={day} checked={this.state.checked === day} variant="button-group" />)}
				</RadioButtonGroup>
			</div>
		);
	}

}

Example.propTypes = {
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	name: PropTypes.string,
	errorId: PropTypes.string
};

Example.displayName = 'RadioButtonGroupExample';

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
