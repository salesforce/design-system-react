import React from 'react';
import createReactClass from 'create-react-class';
import { storiesOf, action } from '@storybook/react';
import IconSettings from '../../../icon-settings';

import { FORMS_CHECKBOX } from '../../../../utilities/constants';
import Checkbox from '../';
import Button from '../../../button';

const CheckboxIndeterminate = createReactClass({
	displayName: `${FORMS_CHECKBOX}_INDETERMINATE`,

	getInitialState () {
		return {
			indeterminate: true,
			checked: true,
			currentStateHelper: 'Indeterminate',
		};
	},

	handleChange (checked, event, data) {
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
	},

	changeToIndeterminate (event) {
		this.setState({
			currentStateHelper: 'Indeterminate',
			checked: true,
			indeterminate: true,
		});
		action('changeToIndeterminate')(
			event,
			'checked: true, indeterminate: true'
		);
	},

	changeToCheck (event) {
		this.setState({
			currentStateHelper: 'Checked',
			checked: true,
			indeterminate: false,
		});
		action('changeToCheck')(event, 'checked: true, indeterminate: false');
	},

	changeToUnChecked (event) {
		this.setState({
			currentStateHelper: 'Unchecked',
			checked: false,
			indeterminate: false,
		});
		action('changeToUnChecked')(event, 'checked: false, indeterminate: false');
	},

	render () {
		return (
			<div>
				<Button onClick={this.changeToIndeterminate} label="Indeterminate" />
				<Button onClick={this.changeToCheck} label="Check" />
				<Button onClick={this.changeToUnChecked} label="Uncheck" />
				<p>
					<strong>Current State:</strong> {this.state.currentStateHelper}
				</p>
				<Checkbox
					assistiveText="Checkbox (indeterminate)"
					label="Checkbox Label"
					name="checkbox-example-standard-indeterminate"
					checked={this.state.checked}
					indeterminate={this.state.indeterminate}
					onChange={this.handleChange}
				/>
				<div className="slds-box slds-text-longform slds-m-top--large">
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
	},
});

storiesOf(FORMS_CHECKBOX, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around--medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Checkbox', () => (
		<Checkbox
			label="Checkbox Label"
			name="checkbox-example-base"
			onChange={action('change')}
			onBlur={(e) => {
				console.log('bluring ', e.target);
			}}
		/>
	))
	.add('Checkbox (with error)', () => (
		<Checkbox
			label="Checkbox Label"
			name="checkbox-example-base-error"
			errorText="This field has an error."
			onChange={action('change')}
			onBlur={(e) => {
				console.log('bluring ', e.target);
			}}
		/>
	))
	.add('Checkbox (required)', () => (
		<Checkbox
			label="Checkbox Label"
			name="checkbox-example-base-required"
			onChange={action('change')}
			required
		/>
	))
	.add('Checkbox (disabled)', () => (
		<Checkbox
			label="Checkbox Label"
			name="checkbox-example-base-disabled"
			onChange={action('change')}
			disabled
		/>
	))
	.add('Checkbox (assistive text)', () => (
		<div>
			<Checkbox
				assistiveText="This is my checkbox.
							There are many like it, but this one is mine.
							My checkbox is my best friend.
							It is my life.
							I must master it as I must master my life.
							Without me, my checkbox is useless. Without my checkbox, I am useless.
							I must make my checkbox true.
							I must make it truer than my radio button who is trying to... "
				label="Checkbox Label"
				name="checkbox-example-base-assistiveText"
				onChange={action('change')}
			/>
			<div className="slds-box slds-text-longform slds-m-top--large">
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
			label="Checkbox Label"
			name="checkbox-example-base-checked"
			onChange={action('change')}
		/>
	))
	.add('Checkbox (indeterminate)', () => <CheckboxIndeterminate />)
	.add('Checkbox Toggle', () => (
		<Checkbox
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
				assistiveText="This is my checkbox.
							There are many like it, but this one is mine.
							My checkbox is my best friend.
							It is my life.
							I must master it as I must master my life.
							Without me, my checkbox is useless. Without my checkbox, I am useless.
							I must make my checkbox true.
							I must make it truer than my radio button who is trying to... "
				label="Checkbox Label"
				name="checkbox-example-base-assistiveText"
				onChange={action('change')}
				variant="toggle"
			/>
			<div className="slds-box slds-text-longform slds-m-top--large">
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
			checked
			label="Checkbox Label"
			name="checkbox-example-toggle-checked"
			onChange={action('change')}
			variant="toggle"
		/>
	));
