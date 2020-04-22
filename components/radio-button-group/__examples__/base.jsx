import React from 'react';
import PropTypes from 'prop-types';
import IconSettings from '~/components/icon-settings';
import RadioButtonGroup from '~/components/radio-button-group'; // `~` is replaced with design-system-react at runtime
import Radio from '~/components/radio-button-group/radio'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = { checked: 'Tue' };
	}

	render() {
		const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
		const labels = { label: 'Day of week' };
		if (this.props.errorLabel) {
			labels.error = this.props.errorLabel;
		}
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<RadioButtonGroup
						labels={labels}
						onChange={(event) => this.setState({ checked: event.target.value })}
						disabled={this.props.disabled}
						required={this.props.required}
						name={this.props.name}
						errorId={this.props.errorId}
					>
						{days.map((day) => (
							<Radio
								key={day}
								id={day}
								labels={{ label: day }}
								value={day}
								checked={this.state.checked === day}
								variant="button-group"
							/>
						))}
					</RadioButtonGroup>
				</div>
			</IconSettings>
		);
	}
}

Example.propTypes = {
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	name: PropTypes.string,
	errorId: PropTypes.string,
	errorLabel: PropTypes.string,
};

Example.displayName = 'RadioButtonGroupExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
