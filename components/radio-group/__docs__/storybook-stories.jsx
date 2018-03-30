/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf, action } from '@storybook/react';

import RadioGroup from '../../radio-group';
import Radio from '../../radio-group/radio';

import { RADIO_GROUP } from '../../../utilities/constants';

class RadioGroupExample extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}

	onChange (event) {
		this.setState({ checked: event.target.value });
		action('onChange')(event);
	}

	render () {
		const values = ['Radio Label One', 'Radio Label Two'];
		return (
			<div>
				<h1 className="slds-text-title_caps slds-p-vertical--medium">
					{this.props.heading}
				</h1>
				<RadioGroup
					labels={this.props.labels}
					onChange={this.onChange}
					disabled={this.props.disabled}
					required={this.props.required}
				>
					{values.map((value) => (
						<Radio
							key={value}
							id={value}
							label={value}
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

RadioGroupExample.propTypes = {
	labels: PropTypes.shape({
		error: PropTypes.string,
		label: PropTypes.string,
	}),
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	heading: PropTypes.string,
};

RadioGroupExample.defaultProps = {
	labels: { label: 'Radio Group Label' },
};

storiesOf(RADIO_GROUP, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">{getStory()}</div>
	))
	.add('Base', () => <RadioGroupExample heading="Base" />)
	.add('Disabled', () => <RadioGroupExample heading="Disabled" disabled />)
	.add('Required', () => <RadioGroupExample heading="Required" required />)
	.add('Error', () => (
		<RadioGroupExample
			heading="Error"
			labels={{ label: 'Radio Group Label', error: 'There is an error' }}
		/>
	));
