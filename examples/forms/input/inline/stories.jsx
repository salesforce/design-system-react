/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { FORMS_INLINE_EDIT } from '../../../../utilities/constants';
import InlineEdit from '../../../../components/forms/input/inline';

const DemoInlineEdit = React.createClass({
	displayName: 'DemoInlineEdit',

	getInitialState () {
		return {
			value: 'Edit me inline'
		};
	},

	handleChange (eventProps, ...rest) {
		action('change')(rest);

		if (eventProps.value === '') {
			this.setState({ value: 'Edit me inline' });
		} else {
			this.setState({ value: eventProps.value });
		}
	},

	render () {
		return (
			<InlineEdit
				{...this.props}
				value={this.state.value}
				onChange={this.handleChange}
			/>
		);
	}
});

storiesOf(FORMS_INLINE_EDIT, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Standard', () => <DemoInlineEdit name="inline-edit-standard" id="inline-edit-standard" />)
	.add('Disabled', () => <DemoInlineEdit name="inline-edit-disabled" id="inline-edit-disabled" disabled />);
