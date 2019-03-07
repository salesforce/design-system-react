import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconSettings from '../../icon-settings';

import { CHECKBOX } from '../../../utilities/constants';
import Checkbox from '../';
import Button from '../../button';

import DefaultCheckbox from '../__examples__/default';
import Error from '../__examples__/error';
import SnapshotBase from '../__examples__/snapshot-base';
import SnapshotToggle from '../__examples__/snapshot-toggle';
import Toggle from '../__examples__/toggle';

class CheckboxIndeterminate extends React.Component {
	static displayName = `${CHECKBOX}_INDETERMINATE`;

	state = {
		indeterminate: true,
		checked: true,
		currentStateHelper: 'Indeterminate',
	};

	handleChange = (checked, event, data) => {
		const checkedLabel = data.checked ? 'Checked' : 'Unchecked';
		this.setState({
			checked: data.checked,
			currentStateHelper: data.indeterminate ? 'Indeterminate' : checkedLabel,
			indeterminate: data.indeterminate,
		});

		action('handleChange')(
			checked,
			event,
			`checked: ${data.checked},
			indeterminate: ${data.indeterminate}`
		);
	};

	changeToIndeterminate = (event) => {
		this.setState({
			currentStateHelper: 'Indeterminate',
			checked: true,
			indeterminate: true,
		});
		action('changeToIndeterminate')(
			event,
			'checked: true, indeterminate: true'
		);
	};

	changeToCheck = (event) => {
		this.setState({
			currentStateHelper: 'Checked',
			checked: true,
			indeterminate: false,
		});
		action('changeToCheck')(event, 'checked: true, indeterminate: false');
	};

	changeToUnChecked = (event) => {
		this.setState({
			currentStateHelper: 'Unchecked',
			checked: false,
			indeterminate: false,
		});
		action('changeToUnChecked')(event, 'checked: false, indeterminate: false');
	};

	render() {
		return (
			<div>
				<Button onClick={this.changeToIndeterminate} label="Indeterminate" />
				<Button onClick={this.changeToCheck} label="Check" />
				<Button onClick={this.changeToUnChecked} label="Uncheck" />
				<p>
					<strong>Current State:</strong> {this.state.currentStateHelper}
				</p>
				<Checkbox
					assistiveText={{
						label: 'Checkbox (indeterminate)',
					}}
					id="checkbox-example-standard-indeterminate"
					label="Checkbox Label"
					name="checkbox-example-standard-indeterminate"
					checked={this.state.checked}
					indeterminate={this.state.indeterminate}
					onChange={this.handleChange}
				/>
				<div className="slds-box slds-text-longform slds-m-top_large">
					<p>
						This example has an <em>indeterminate</em> checkbox.
					</p>
					<p>
						It is set by providing the <code>indeterminate</code> prop as{' '}
						<code>
							<strong>true</strong>
						</code>.
					</p>
					<p>
						Once it is clicked, there is no way to make it go <em>back</em> to
						the indeterminate state,{' '}
						<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate#Checkbox_radio_button">
							it must be done programatically, through JavaScript
						</a>.
					</p>
				</div>
			</div>
		);
	}
}

storiesOf(CHECKBOX, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Checkbox (default, indeterminate, required, disabled', () => (
		<DefaultCheckbox />
	))
	.add('Checkbox (assistive text)', () => (
		<div>
			<Checkbox
				assistiveText={{
					label: `This is my checkbox.
							There are many like it, but this one is mine.
							My checkbox is my best friend.
							It is my life.
							I must master it as I must master my life.
							Without me, my checkbox is useless. Without my checkbox, I am useless.
							I must make my checkbox true.
							I must make it truer than my radio button who is trying to... `,
				}}
				id="checkbox-example-base-assistiveText"
				label="Checkbox Label"
				name="checkbox-example-base-assistiveText"
				onChange={action('change')}
			/>
			<div className="slds-box slds-text-longform slds-m-top_large">
				<p>
					This example has assistive text. In Safari on Mac you can turn
					assistive text on by using the keyboard combination:
					<strong>Command + F5</strong>.
				</p>
				<p>
					Once you have enabled it, use your tab key to focus on the checkbox
					input, and the system should read you what is supplied to the checkbox
					as the <code>assistiveText</code>
					property.
				</p>
			</div>
		</div>
	))
	.add('Checkbox (checked)', () => (
		<Checkbox
			checked
			id="checkbox-example-base-checked"
			label="Checkbox Label"
			name="checkbox-example-base-checked"
			onChange={action('change')}
		/>
	))
	.add('Checkbox (indeterminate)', () => <CheckboxIndeterminate />)
	.add('Checkbox Toggle', () => (
		<Checkbox
			aria-describedby="checkbox-example-toggle-desc"
			id="checkbox-example-toggle"
			label="Checkbox Toggle Label"
			name="checkbox-example-toggle"
			onChange={action('change')}
			onBlur={(e) => {
				console.log('bluring ', e.target);
			}}
			variant="toggle"
		/>
	))
	.add('Checkbox Toggle (with error)', () => (
		<Checkbox
			aria-describedby="checkbox-example-toggle-error-desc"
			id="checkbox-example-toggle-error"
			label="Checkbox Toggle Label"
			name="checkbox-example-toggle-error"
			errorText="This field has an error."
			onChange={action('change')}
			onBlur={(e) => {
				console.log('bluring ', e.target);
			}}
			variant="toggle"
		/>
	))
	.add('Checkbox Toggle (required)', () => (
		<Checkbox
			aria-describedby="checkbox-example-toggle-required-desc"
			id="checkbox-example-toggle-required"
			label="Checkbox Toggle Label"
			name="checkbox-example-toggle-required"
			onChange={action('change')}
			onBlur={(e) => {
				console.log('bluring ', e.target);
			}}
			variant="toggle"
			required
		/>
	))
	.add('Checkbox Toggle (disabled)', () => (
		<Checkbox
			aria-describedby="checkbox-example-toggle-disabled-desc"
			id="checkbox-example-toggle-disabled"
			label="Checkbox Toggle Label"
			name="checkbox-example-toggle-disabled"
			onChange={action('change')}
			onBlur={(e) => {
				console.log('bluring ', e.target);
			}}
			variant="toggle"
			disabled
		/>
	))
	.add('Checkbox Toggle (assistive text)', () => (
		<div>
			<Checkbox
				assistiveText={{
					label: `This is my checkbox.
							There are many like it, but this one is mine.
							My checkbox is my best friend.
							It is my life.
							I must master it as I must master my life.
							Without me, my checkbox is useless. Without my checkbox, I am useless.
							I must make my checkbox true.
							I must make it truer than my radio button who is trying to... `,
				}}
				aria-describedby="checkbox-example-base-assistiveText-desc"
				id="checkbox-example-base-assistiveText"
				label="Checkbox Label"
				name="checkbox-example-base-assistiveText"
				onChange={action('change')}
				variant="toggle"
			/>
			<div className="slds-box slds-text-longform slds-m-top_large">
				<p>
					This example has assistive text. In Safari on Mac you can turn
					assistive text on by using the keyboard combination:
					<strong>Command + F5</strong>.
				</p>
				<p>
					Once you have enabled it, use your tab key to focus on the checkbox
					input, and the system should read you what is supplied to the checkbox
					as the <code>assistiveText</code>
					property.
				</p>
			</div>
		</div>
	))
	.add('Checkbox Toggle (checked)', () => (
		<Checkbox
			aria-describedby="checkbox-example-toggle-checked-desc"
			checked
			id="checkbox-example-toggle-checked"
			label="Checkbox Label"
			name="checkbox-example-toggle-checked"
			onChange={action('change')}
			variant="toggle"
		/>
	))
	.add('Doc site Error', () => <Error />)
	.add('Doc site Snapshot Base', () => <SnapshotBase />)
	.add('Doc site Snapshot Toggle', () => <SnapshotToggle />)
	.add('Doc site Toggle', () => <Toggle />);
