import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { FORMS_INPUT } from '../../../utilities/constants';
import Input from '../../../components/forms/input';

const iconClicked = action;

storiesOf(FORMS_INPUT, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Standard', () => (
		<Input
			label="Input Label"
			name="standard-input"
			placeholder="Placeholder Text"
		/>
	))
	.add('Assistive Text, No Label', () => (
		<Input
			name="assistive-text-no-label"
			assistiveText="Assistive Text"
			placeholder="Placeholder Text"
		/>
	))
	.add('w/ Left Clickable Icon', () => (
		<Input
			id="unique-id-123"
			name="left-clickable-icon"
			label="Input Label"
			iconName="search"
			iconCategory="utility"
			iconPosition="left"
			iconAssistiveText="Search Icon"
			onIconClick={iconClicked('Search icon clicked')}
			placeholder="Placeholder Text"
		/>
	))
	.add('w/ Right Clickable Icon', () => (
		<Input
			name="right-clickable-icon"
			label="Input Label"
			iconName="close"
			iconCategory="utility"
			iconPosition="right"
			iconAssistiveText="Clear Input Icon"
			onIconClick={iconClicked('Clear icon clicked')}
			placeholder="Placeholder Text"
		/>
	))
	.add('w/ Non-Clickable Icon', () => (
		<Input
			name="non-clickable-icon"
			id="unique-id-123"
			label="Input Label"
			iconName="search"
			iconCategory="utility"
			iconPosition="left"
			placeholder="Placeholder Text"
		/>
	))
	.add('Read Only', () => (
		<Input
			name="read-only"
			label="Input Label"
			readOnly
			value="Read Only Value"
		/>
	))
	.add('Required Input in Error State', () => (
		<Input
			name="required-input-error"
			label="Input Label"
			required
			errorText="Error Message"
			placeholder="Placeholder Text"
		/>
	));
