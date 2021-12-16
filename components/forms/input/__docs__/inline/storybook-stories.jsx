/* eslint-disable indent */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../../../../components/icon-settings';

import { FORMS_INLINE_EDIT } from '../../../../../utilities/constants';
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

storiesOf(FORMS_INLINE_EDIT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical_medium">
				Base Inline Edit Input
			</h1>
			<DemoInlineEdit name="inline-edit-standard" id="inline-edit-standard" />
		</section>
	))
	.add('Disabled', () => (
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
	));
