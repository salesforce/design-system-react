import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '~/components/radio-group'; // `~` is replaced with design-system-react at runtime
import Radio from '~/components/radio-group/radio'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const values = ['Radio Label One', 'Radio Label Two'];
		const labels = { label: 'Radio Group Label' };
		if (this.props.errorLabel) {
			labels.error = this.props.errorLabel;
		}
		return (
			<div>
				<RadioGroup
					labels={labels}
					onChange={(event) => this.setState({ checked: event.target.value })}
					disabled={this.props.disabled}
					required={this.props.required}
					name={this.props.name}
					errorId={this.props.errorId}
				>
					{values.map((value) => (
						<Radio
							key={value}
							id={value}
							labels={{ label: value }}
							value={value}
							checked={this.state.checked === value}
							variant="base"
						/>
					))}
				</RadioGroup>
			</div>
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

Example.displayName = 'RadioGroupExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
