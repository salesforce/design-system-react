/* eslint-disable react/display-name */ import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RadioGroup from '../../radio-group';
import Radio from '../../radio-group/radio';
import { RADIO_GROUP } from '../../../utilities/constants';

import Base from '../__examples__/base';

class RadioGroupExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.setState({
			checked: event.target.value,
		});
		action('onChange')(event);
	}

	render() {
		const values = ['Radio Label One', 'Radio Label Two'];
		return (
			<div>
				<h1 className="slds-text-title_caps slds-p-vertical_medium">
					{this.props.heading}
				</h1>
				<RadioGroup
					errorId={
						this.props.labels && this.props.labels.error
							? 'error-id'
							: undefined
					}
					labels={this.props.labels}
					name="radio-group-example"
					onChange={this.onChange}
					disabled={this.props.disabled}
					required={this.props.required}
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
	labels: {
		label: 'Radio Group Label',
	},
};
storiesOf(RADIO_GROUP, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <RadioGroupExample heading="Base" />)
	.add('Disabled', () => <RadioGroupExample heading="Disabled" disabled />)
	.add('Required', () => <RadioGroupExample heading="Required" required />)
	.add('Error', () => (
		<RadioGroupExample
			heading="Error"
			labels={{
				label: 'Radio Group Label',
				error: 'There is an error',
			}}
		/>
	))
	.add('Docs site Base', () => <Base name="base-doc-site" />);
