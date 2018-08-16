import React from 'react';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../icon-settings';

import { FORMS_INPUT } from '../../../utilities/constants';
import Button from '../../button';
import Input from '../';
import InputIcon from '../../icon/input-icon';

const iconClicked = action;

const clearIcon = (
	<InputIcon
		assistiveText={{ icon: 'clear' }}
		name="clear"
		category="utility"
	/>
);
const clearIconClickable = (
	<InputIcon
		assistiveText={{ icon: 'clear' }}
		name="clear"
		category="utility"
		onClick={iconClicked('Clear icon clicked')}
	/>
);
const searchIcon = <InputIcon name="search" category="utility" />;
const searchIconClickable = (
	<InputIcon
		assistiveText={{ icon: 'Search' }}
		name="search"
		category="utility"
		onClick={iconClicked('Search icon clicked')}
	/>
);

storiesOf(FORMS_INPUT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Base', () => (
		<section>
			<ol>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">
						1. Base Input with visible label
					</h1>
					<Input id="base-id" label="My Label" placeholder="My placeholder" />
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">
						2. Base Input with hidden label (assistive text)
					</h1>
					<Input
						assistiveText={{ label: 'My label' }}
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
					<h1 className="slds-text-title_caps slds-p-vertical--medium">
						1. Base Input with left icon
					</h1>
					<Input
						id="with-left-icon"
						label="My label"
						iconLeft={searchIcon}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">
						2. Base Input with Clickable left icon
					</h1>
					<Input
						id="with-left-clickable-icon"
						label="My Label"
						iconLeft={searchIconClickable}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">
						3. Base Input with right icon
					</h1>
					<Input
						id="with-right-icon"
						label="My Label"
						iconRight={searchIcon}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">
						4. Base Input with Clickable right icon
					</h1>
					<Input
						id="with-right-clickable-icon"
						label="My Label"
						iconRight={clearIconClickable}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">
						5. Base Input with left and right icons
					</h1>
					<Input
						label="My Label"
						iconLeft={searchIcon}
						iconRight={clearIcon}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">
						6. Base Input with Clickable left and right icon
					</h1>
					<Input
						label="My label"
						iconLeft={searchIconClickable}
						iconRight={clearIcon}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">
						7. Base Input with left and clickable right icon
					</h1>
					<Input
						label="My Label"
						iconLeft={searchIcon}
						iconRight={clearIconClickable}
						placeholder="My placeholder"
					/>
				</li>
				<li className="slds-p-bottom--large">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">
						8. Base Input with left, clickable right icon, and loading spinner
					</h1>
					<Input
						assistiveText={{ spinner: 'Field data is loading' }}
						hasSpinner
						iconLeft={searchIcon}
						iconRight={clearIconClickable}
						label="My Label"
						name="right-clickable-icon"
						placeholder="My placeholder"
					/>
				</li>
			</ol>
		</section>
	))
	.add('Fixed Text', () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical--medium">
				Input with Fixed Text
			</h1>
			<Input
				assistiveText={{ label: 'My Label' }}
				name="fixed-text"
				label="My Label"
				fixedTextLeft="$"
				placeholder="My placeholder"
			/>
		</section>
	))
	.add('Read Only', () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical--medium">
				Read only Input
			</h1>
			<Input
				name="read-only"
				label="My Label"
				readOnly
				value="Read Only Value"
			/>
		</section>
	))
	.add('Static Input', () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical--medium">
				Static Input
			</h1>
			<Input
				name="static-input"
				label="My Label"
				isStatic
				value="Static value"
			/>
		</section>
	))
	.add('Disabled Input', () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical--medium">
				Disabled Input
			</h1>
			<Input
				name="disabled-input"
				label="My Label"
				disabled
				value="Disabled value"
			/>
		</section>
	))
	.add('Required Input in Error State', () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical--medium">
				Example Button
			</h1>
			<Button label="Test" />

			<h1 className="slds-text-title_caps slds-p-vertical--medium">
				Required Input with Error
			</h1>
			<Input
				aria-describedby="error-1"
				name="required-input-error"
				label="My Label"
				required
				errorText="This field is required."
				placeholder="My placeholder"
			/>
		</section>
	));
