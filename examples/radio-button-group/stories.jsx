/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@kadira/storybook';
import { shape } from 'airbnb-prop-types';

import RadioButtonGroup from '../../components/radio-button-group';
import Radio from '../../components/radio-button-group/radio';
import Icon from '../../components/icon';

import { RADIO_BUTTON_GROUP } from '../../utilities/constants';

class RadioButtonGroupExample extends React.Component {

	constructor (props) {
		super(props);
		this.state = { checked: 'Tue' };
	}

	render () {
		const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
		return (
			<div>
				<h1 className="slds-text-title_caps slds-p-vertical--medium">
					{this.props.heading}
				</h1>
				<RadioButtonGroup
					labels={this.props.labels}
					onChange={(event) => this.setState({ checked: event.target.value })}
					disabled={this.props.disabled}
					required={this.props.required}
				>
					{days.map((day) => <Radio key={day} label={day} value={day} checked={this.state.checked === day} variant="button-group" />)}
				</RadioButtonGroup>
			</div>
		);
	}

}

RadioButtonGroupExample.propTypes = {
	labels: shape({
		error: PropTypes.string,
		label: PropTypes.string
	}),
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	heading: PropTypes.string
};

RadioButtonGroupExample.defaultProps = {
	labels: { label: 'Day of week' }
};

storiesOf(RADIO_BUTTON_GROUP, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => <RadioButtonGroupExample heading="Base" />)
	.add('Disabled', () => <RadioButtonGroupExample heading="Disabled" disabled />)
	.add('Required', () => <RadioButtonGroupExample heading="Required" required />)
	.add('Error', () => <RadioButtonGroupExample heading="Error" labels={{ label: 'Day of week', error: 'There is an error' }} />);

