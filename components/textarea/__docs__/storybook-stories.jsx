import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { FORMS_TEXTAREA } from '../../../utilities/constants';
import Textarea from '../';

storiesOf(FORMS_TEXTAREA, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Standard', () => (
		<Textarea
			label="Textarea Label"
			name="standard-textarea"
			placeholder="Placeholder Text"
		/>
	))
	.add('Disabled', () => (
		<Textarea
			name="disabled"
			label="Textarea Label"
			disabled
			placeholder="Placeholder Text"
		/>
	))
	.add('Required', () => (
		<Textarea
			aria-describedby="required-1"
			name="required-textarea"
			assistiveText={{ label: 'Textarea Label' }}
			required
			placeholder="Placeholder Text"
		/>
	))
	.add('Error', () => (
		<Textarea
			aria-describedby="error-1"
			name="required-textarea-error"
			label="Textarea Label"
			required
			errorText="Error Message"
			placeholder="Placeholder Text"
		/>
	));
