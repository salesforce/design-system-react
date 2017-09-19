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
					{days.map((day) => <Radio key={day} label={day} value={day} checked={this.state.checked === day} />)}
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
	.add('Error', () => <RadioButtonGroupExample heading="Error" labels={{ label: 'Day of week', error: 'There is an error' }} />)
	.add('Report Builder', () =>
		<RadioButtonGroup
			labels={{ label: 'Data types' }}
			onChange={(event) => console.log(event.target.value)}
		>
			<Radio label={<span style={{ fontSize: '18px', position: 'relative', top: '3px' }}>All</span>} value="all" />
			<Radio label={<Icon assistiveText="Text" name="type_tool" variant="border-filled" category="utility" size="x-small" style={{ fill: 'currentColor' }} />} value="text" />
			<Radio label={<span style={{ fontSize: '22px', position: 'relative', top: '1px' }}>#<span className="slds-assistive-text">Number</span></span>} value="number" />
			<Radio label={<Icon assistiveText="Boolean" name="check" variant="border-filled" category="utility" size="x-small" style={{ fill: 'currentColor' }} />} value="boolean" />
			<Radio label={<Icon assistiveText="Date" name="event" variant="border-filled" category="utility" size="x-small" style={{ fill: 'currentColor' }} />} value="date" />
			<Radio label={<Icon assistiveText="Picklist" name="list" variant="border-filled" category="utility" size="x-small" style={{ fill: 'currentColor' }} />} value="picklist" />
		</RadioButtonGroup>
	);

