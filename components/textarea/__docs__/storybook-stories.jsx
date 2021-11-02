import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';
import { TEXTAREA } from '../../../utilities/constants';
import Textarea from '../';
import Default from '../__examples__/default';
import Disabled from '../__examples__/disabled';
import Error from '../__examples__/error';

storiesOf(TEXTAREA, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Standard', () => (
		<Textarea
			id="text-area-standard"
			label="Textarea Label"
			name="standard-textarea"
			placeholder="Placeholder Text"
		/>
	))
	.add('Disabled', () => (
		<Textarea
			id="text-area-disabled"
			name="disabled"
			label="Textarea Label"
			disabled
			placeholder="Placeholder Text"
		/>
	))
	.add('Required', () => (
		<Textarea
			id="text-area-required"
			name="required-textarea"
			label="Textarea Label"
			required
			placeholder="Placeholder Text"
		/>
	))
	.add('Error', () => (
		<Textarea
			aria-describedby="error-1"
			id="text-area-error"
			name="required-textarea-error"
			label="Textarea Label"
			required
			errorText="This field is required"
			placeholder="Placeholder Text"
		/>
	))
	.add('Docs site Default', () => <Default />)
	.add('Docs site Disabled', () => <Disabled />)
	.add('Docs site Error', () => <Error />);
