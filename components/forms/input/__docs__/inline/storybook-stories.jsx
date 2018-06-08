/* eslint-disable indent */

import React from 'react';
import createReactClass from 'create-react-class';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../../../../components/icon-settings';

import { FORMS_INLINE_EDIT } from '../../../../../utilities/constants';
import InlineEdit from '../../inline';

const DemoInlineEdit = createReactClass({
	displayName: 'DemoInlineEdit',

	getInitialState () {
		return {
			value: 'Edit me inline',
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
	},
});

storiesOf(FORMS_INLINE_EDIT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical--medium">
				Base Inline Edit Input
			</h1>
			<DemoInlineEdit name="inline-edit-standard" id="inline-edit-standard" />
		</section>
	))
	.add('Disabled', () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical--medium">
				Disabled Inline Edit Input
			</h1>
			<DemoInlineEdit
				name="inline-edit-disabled"
				id="inline-edit-disabled"
				disabled
			/>
		</section>
	));
