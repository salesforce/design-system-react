/* eslint-disable indent */

import React from 'react';

import { action } from 'storybook/actions';
import IconSettings from '../../../../../components/icon-settings';

import InlineEdit from '../../inline';

class DemoInlineEdit extends React.Component {
	static displayName = 'DemoInlineEdit';

	state = {
		value: 'Edit me inline',
	};

	handleChange = (eventProps, ...rest) => {
		action('change')(rest);

		if (eventProps.value === '') {
			this.setState({ value: 'Edit me inline' });
		} else {
			this.setState({ value: eventProps.value });
		}
	};

	render() {
		return (
			<InlineEdit
				{...this.props}
				value={this.state.value}
				onChange={this.handleChange}
				silenceDeprecationWarning
			/>
		);
	}
}

export default {
	title: 'Components/Forms/InlineEdit',
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">{Story()}</IconSettings>
			</div>
		),
	],
};

export const Base = {
	render: () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical_medium">
				Base Inline Edit Input
			</h1>
			<DemoInlineEdit name="inline-edit-standard" id="inline-edit-standard" />
		</section>
	),
};

export const Disabled = {
	render: () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical_medium">
				Disabled Inline Edit Input
			</h1>
			<DemoInlineEdit
				name="inline-edit-disabled"
				id="inline-edit-disabled"
				disabled
			/>
		</section>
	),
};
