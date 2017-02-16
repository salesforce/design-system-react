import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { FORMS_INPUT } from '../../../utilities/constants';
import Input from '../../../components/forms/input';
import InputIcon from '../../../components/icon/input-icon';

const iconClicked = action;

const clearIcon = <InputIcon assistiveText="clear" name="clear" category="utility" />;
const clearIconClickable = <InputIcon assistiveText="clear" name="clear" category="utility" onClick={iconClicked('Clear icon clicked')} />;
const searchIcon = <InputIcon name="search" category="utility" />;
const searchIconClickable = <InputIcon name="search" category="utility" onClick={iconClicked('Search icon clicked')} />;

storiesOf(FORMS_INPUT, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
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
			iconLeft={searchIconClickable}
			placeholder="Placeholder Text"
		/>
	))
	.add('w/ Right Clickable Icon', () => (
		<Input
			name="right-clickable-icon"
			label="Input Label"
			iconRight={clearIconClickable}
			placeholder="Placeholder Text"
		/>
	))
	.add('w/ Left (non-clickable) and Right (non-clickable) Icon', () => (
		<Input
			name="right-clickable-icon"
			label="Input Label"
			iconLeft={searchIcon}
			iconRight={clearIcon}
			placeholder="Placeholder Text"
		/>
	))
	.add('w/ Left (clickable) and Right (non-clickable) Icon', () => (
		<Input
			name="right-clickable-icon"
			label="Input Label"
			iconLeft={searchIconClickable}
			iconRight={clearIcon}
			placeholder="Placeholder Text"
		/>
	))
	.add('w/ Left (non-clickable) and Right (clickable) Icon', () => (
		<Input
			name="right-clickable-icon"
			label="Input Label"
			iconLeft={searchIcon}
			iconRight={clearIconClickable}
			placeholder="Placeholder Text"
		/>
	))
	.add('w/ Left (non-clickable)', () => (
		<Input
			name="non-clickable-icon"
			id="unique-id-123"
			label="Input Label"
			iconLeft={searchIcon}
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
			aria-describedby="error-1"
			name="required-input-error"
			label="Input Label"
			required
			errorText="Error Message"
			placeholder="Placeholder Text"
		/>
	));
