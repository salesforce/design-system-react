import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import IconSettings from '../../../components/iconSettings';

import { FORMS_INPUT } from '../../../utilities/constants';
import Input from '../../../components/forms/input';
import InputIcon from '../../../components/icon/input-icon';

const iconClicked = action;

const clearIcon = <InputIcon assistiveText="clear" name="clear" category="utility" />;
const clearIconClickable = <InputIcon assistiveText="clear" name="clear" category="utility" onClick={iconClicked('Clear icon clicked')} />;
const searchIcon = <InputIcon name="search" category="utility" />;
const searchIconClickable = <InputIcon assistiveText="Search" name="search" category="utility" onClick={iconClicked('Search icon clicked')} />;

storiesOf(FORMS_INPUT, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium"><IconSettings iconPath="/assets/icons">{getStory()}</IconSettings></div>)
	.add('Base', () => (
		<section>
			<ol>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">1. Base Input with visible label</h1>
					<Input
						id="base-id"
						label="My Label"
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">2. Base Input with hidden label (assistive text)</h1>
					<Input
						assistiveText="My label"
						id="assistiveLabel-id"
						placeholder="My placeholder"
					/>
				</li>
			</ol>
		</section>
	))
	.add('Base with Icons', () => (
		<section>
			<ol>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with left icon</h1>
					<Input
						id="with-left-icon"
						label="My label"
						iconLeft={searchIcon}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with Clickable left icon</h1>
					<Input
						id="with-left-clickable-icon"
						label="My Label"
						iconLeft={searchIconClickable}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with right icon</h1>
					<Input
						id="with-right-icon"
						label="My Label"
						iconRight={searchIcon}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with Clickable right icon</h1>
					<Input
						id="with-right-clickable-icon"
						label="My Label"
						iconRight={clearIconClickable}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with left and right icons</h1>
					<Input
						label="My Label"
						iconLeft={searchIcon}
						iconRight={clearIcon}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with Clickable left and right icon</h1>
					<Input
						label="My label"
						iconLeft={searchIconClickable}
						iconRight={clearIcon}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with left and clickable right icon</h1>
					<Input
						label="My Label"
						iconLeft={searchIcon}
						iconRight={clearIconClickable}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with left, clickable right icon, and loading spinner</h1>
					<Input
						name="right-clickable-icon"
						label="My Label"
						hasSpinner
						iconLeft={searchIcon}
						iconRight={clearIconClickable}
						placeholder="My placeholder"
					/>
				</li>
			</ol>
		</section>
	))
	.add('Fixed Text', () => (
		<Input
			name="fixed-text"
			label="My Label"
			fixedTextLeft="$"
			placeholder="My placeholder"
		/>
	))
	.add('Read Only', () => (
		<Input
			name="read-only"
			label="My Label"
			readOnly
			value="Read Only Value"
		/>
	))
	.add('Static Input', () => (
		<Input
			name="static-input"
			label="My Label"
			isStatic
			value="Static value"
		/>
	))
	.add('Disabled Input', () => (
		<Input
			name="disabled-input"
			label="My Label"
			disabled
			value="Disabled value"
		/>
	))
	.add('Required Input in Error State', () => (
		<Input
			aria-describedby="error-1"
			name="required-input-error"
			label="My Label"
			required
			errorText="Error Message"
			placeholder="My placeholder"
		/>
	));
