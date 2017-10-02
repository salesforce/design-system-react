import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '~/components/radio-group'; // `~` is replaced with design-system-react at runtime
import Radio from '~/components/radio-group/radio'; // `~` is replaced with design-system-react at runtime
import { shape } from 'airbnb-prop-types';

class Example extends React.Component {

	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		const values = ['Radio Label One', 'Radio Label Two'];
		const labels = { label: 'Radio Group Label' };
		return (
			<div>
				<RadioGroup
					labels={this.props.labels || labels}
					onChange={(event) => this.setState({ checked: event.target.value })}
					disabled={this.props.disabled}
					required={this.props.required}
					name={this.props.name}
					errorId={this.props.errorId}
				>
					{values.map((value) =>
						<Radio
							key={value}
							id={value}
							label={value}
							value={value}
							checked={this.state.checked === value}
							variant="base"
						/>)}
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
	labels: shape({
		error: PropTypes.string,
		label: PropTypes.string
	})
};

Example.displayName = 'RadioGroupExample';

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
