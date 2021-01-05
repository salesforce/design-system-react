import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { INPUT } from '../../../utilities/constants';
import IconSettings from '../../icon-settings';
import Input from '../';
import InputIcon from '../../icon/input-icon';
import CounterInput from '../__examples__/counter-input';
import CounterStaticInput from '../__examples__/counter-static-input';
import InlineHelpInput from '../__examples__/inline-help';
import FieldLevelHelpInput from '../__examples__/field-level-help';
import Default from '../__examples__/default';
import Error from '../__examples__/error';
import Icons from '../__examples__/icons';
import InactiveInputs from '../__examples__/inactiveInputs';

const iconClicked = action;
const clearIcon = (
	<InputIcon
		assistiveText={{
			icon: 'clear',
		}}
		name="clear"
		category="utility"
	/>
);
const clearIconClickable = (
	<InputIcon
		assistiveText={{
			icon: 'clear',
		}}
		name="clear"
		category="utility"
		onClick={iconClicked('Clear icon clicked')}
	/>
);
const searchIcon = <InputIcon name="search" category="utility" />;
const searchIconClickable = (
	<InputIcon
		assistiveText={{
			icon: 'Search',
		}}
		name="search"
		category="utility"
		onClick={iconClicked('Search icon clicked')}
	/>
);
const errorIcon = <InputIcon name="error" category="utility" />;

storiesOf(INPUT, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => (
		<IconSettings iconPath="/assets/icons">
			<section>
				<ol>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							1. Base Input with visible label
						</h1>
						<Input id="base-id" label="My Label" placeholder="My placeholder" />
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							2. Base Input with hidden label (assistive text)
						</h1>
						<Input
							assistiveText={{
								label: 'My label',
							}}
							id="assistiveLabel-id"
							placeholder="My placeholder"
						/>
					</li>
				</ol>
			</section>
		</IconSettings>
	))
	.add('Custom style and autocomplete', () => (
		<IconSettings iconPath="/assets/icons">
			<section>
				<ol>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							Input with custom style
						</h1>
						<Input
							autoComplete="off"
							styleInput={{
								width: 130,
								height: 30,
								background: '#efffff',
							}}
							id="custom-style"
							label="My Label"
							placeholder="My placeholder"
						/>
					</li>
				</ol>
			</section>
		</IconSettings>
	))
	.add('Base with Icons', () => (
		<IconSettings iconPath="/assets/icons">
			<section>
				<ol>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							1. Base Input with left icon
						</h1>
						<Input
							id="with-left-icon"
							label="My label"
							iconLeft={searchIcon}
							placeholder="My placeholder"
						/>
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							2. Base Input with Clickable left icon
						</h1>
						<Input
							id="with-left-clickable-icon"
							label="My Label"
							iconLeft={searchIconClickable}
							placeholder="My placeholder"
						/>
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							3. Base Input with right icon
						</h1>
						<Input
							id="with-right-icon"
							label="My Label"
							iconRight={searchIcon}
							placeholder="My placeholder"
						/>
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							4. Base Input with Clickable right icon
						</h1>
						<Input
							id="with-right-clickable-icon"
							label="My Label"
							iconRight={clearIconClickable}
							placeholder="My placeholder"
						/>
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							5. Base Input with left and right icons
						</h1>
						<Input
							id="with-left-and-right-icons"
							label="My Label"
							iconLeft={searchIcon}
							iconRight={clearIcon}
							placeholder="My placeholder"
						/>
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							6. Base Input with Clickable left and right icon
						</h1>
						<Input
							id="with-clickable-left-and-right-icon"
							label="My label"
							iconLeft={searchIconClickable}
							iconRight={clearIconClickable}
							placeholder="My placeholder"
						/>
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							7. Base Input with left and clickable right icon
						</h1>
						<Input
							id="with-left-and-clickable-right-icon"
							label="My Label"
							iconLeft={searchIcon}
							iconRight={clearIconClickable}
							placeholder="My placeholder"
						/>
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							8. Base Input with left, clickable right icon, and loading spinner
						</h1>
						<Input
							id="with-left-clickable-right-and-spinner"
							assistiveText={{
								spinner: 'Field data is loading',
							}}
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
		</IconSettings>
	))
	.add('Fixed Text', () => (
		<IconSettings iconPath="/assets/icons">
			<section>
				<h1 className="slds-text-title_caps slds-p-vertical_medium">
					Input with Fixed Text
				</h1>
				<Input
					id="fixed-text"
					assistiveText={{
						label: 'My Label',
					}}
					name="fixed-text"
					label="My Label"
					fixedTextLeft="$"
					placeholder="My placeholder"
				/>
			</section>
		</IconSettings>
	))
	.add('Read Only', () => (
		<IconSettings iconPath="/assets/icons">
			<section>
				<h1 className="slds-text-title_caps slds-p-vertical_medium">
					Read only Input
				</h1>
				<Input
					id="read-only"
					name="read-only"
					label="My Label"
					readOnly
					value="Read Only Value"
				/>
			</section>
		</IconSettings>
	))
	.add('Static Input', () => (
		<IconSettings iconPath="/assets/icons">
			<section>
				<h1 className="slds-text-title_caps slds-p-vertical_medium">
					Static Input
				</h1>
				<Input
					id="static-input"
					name="static-input"
					label="My Label"
					isStatic
					value="Static value"
				/>
			</section>
		</IconSettings>
	))
	.add('Disabled Input', () => (
		<IconSettings iconPath="/assets/icons">
			<section>
				<h1 className="slds-text-title_caps slds-p-vertical_medium">
					Disabled Input
				</h1>
				<Input
					id="disabled-input"
					name="disabled-input"
					label="My Label"
					disabled
					value="Disabled value"
				/>
			</section>
		</IconSettings>
	))
	.add('Required Input in Error State', () => (
		<IconSettings iconPath="/assets/icons">
			<section>
				<ol>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							Required Input with Error Text
						</h1>
						<Input
							id="required-input-error"
							aria-describedby="error-1"
							name="required-input-error"
							label="My Label"
							required
							errorText="This field is required."
							placeholder="My placeholder"
						/>
					</li>
					<li className="slds-p-bottom_large">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							Required Input with Error Text and Icon
						</h1>
						<Input
							id="required-input-error-with-icon"
							aria-describedby="error-2"
							name="required-input-error-with-icon"
							label="My Label"
							required
							errorText="This field is required."
							placeholder="My placeholder"
							iconLeft={errorIcon}
						/>
					</li>
				</ol>
			</section>
		</IconSettings>
	))
	.add('Inline Help', () => <InlineHelpInput />)
	.add('Field Level Help', () => <FieldLevelHelpInput />)
	.add('Field Level Help, Tooltip Open', () => (
		<FieldLevelHelpInput tooltipOpen />
	))
	.add('Counter Input', () => <CounterInput />)
	.add('Counter Static Input', () => <CounterStaticInput />)
	.add('Docs site Default', () => <Default />)
	.add('Docs site Error', () => <Error />)
	.add('Docs site Icons', () => <Icons />)
	.add('Docs site InactiveInputs', () => <InactiveInputs />);
