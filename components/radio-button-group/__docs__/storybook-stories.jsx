/* eslint-disable react/display-name */ import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RadioButtonGroup from '../../radio-button-group';
import Radio from '../../radio-button-group/radio';
import { RADIO_BUTTON_GROUP } from '../../../utilities/constants';

import Base from '../__examples__/base';

class RadioButtonGroupExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: 'Tue',
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.setState({
			checked: event.target.value,
		});
		action('onChange')(event);
	}

	render() {
		const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
		return (
			<div>
				<h1 className="slds-text-title_caps slds-p-vertical_medium">
					{this.props.heading}
				</h1>
				<RadioButtonGroup
					errorId={
						this.props.labels && this.props.labels.error
							? 'error-id'
							: undefined
					}
					labels={this.props.labels}
					name="radio-button-group-name"
					onChange={this.onChange}
					disabled={this.props.disabled}
					required={this.props.required}
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
		);
	}
}
RadioButtonGroupExample.propTypes = {
	labels: PropTypes.shape({
		error: PropTypes.string,
		label: PropTypes.string,
	}),
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	heading: PropTypes.string,
};
RadioButtonGroupExample.defaultProps = {
	labels: {
		label: 'Day of week',
	},
};
storiesOf(RADIO_BUTTON_GROUP, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <RadioButtonGroupExample heading="Base" />)
	.add('Disabled', () => (
		<RadioButtonGroupExample heading="Disabled" disabled />
	))
	.add('Required', () => (
		<RadioButtonGroupExample heading="Required" required />
	))
	.add('Error', () => (
		<RadioButtonGroupExample
			heading="Error"
			labels={{
				label: 'Day of week',
				error: 'There is an error',
			}}
		/>
	))
	.add('Docs site Base', () => <Base name="doc-site-base" />);
