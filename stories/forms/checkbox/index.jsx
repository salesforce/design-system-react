import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { FORMS_CHECKBOX } from '../../../utilities/constants';
import Checkbox from '../../../components/forms/checkbox';
import Button from '../../../components/button';

const CheckboxIndeterminate = React.createClass({
	displayName: `${FORMS_CHECKBOX}_INDETERMINATE`,

	getInitialState () {
		return {
			indeterminate: true,
			checked: false
		};
	},


	changeToIndeterminate () {
		console.group('[changeToIndeterminate] (before)');
			console.log("this.state", this.state);
		console.groupEnd();
		this.setState({ indeterminate: true, checked: false });
		console.group('[changeToIndeterminate] (after)');
			console.log("this.state", this.state);
		console.groupEnd();
	},

	changeToCheck () {
		console.group('[changeToCheck] (before)');
			console.log("this.state", this.state);
		console.groupEnd();
		this.setState({ checked: true, indeterminate: false });
		console.group('[changeToCheck] (after)');
			console.log("this.state", this.state);
		console.groupEnd();
	},

	changeToUnChecked () {
		console.group('[changeToUnChecked] (before)');
			console.log("this.state", this.state);
		console.groupEnd();
		this.setState({ checked: false, indeterminate: false });
		console.group('[changeToUnChecked] (after)');
			console.log("this.state", this.state);
		console.groupEnd();
	},

	render () {
		return (
			<div>
				<Button onClick={this.changeToIndeterminate} label="Inderterminate" />
				<Button onClick={this.changeToCheck} label="Check" />
				<Button onClick={this.changeToUnChecked} label="Uncheck" />

				<Checkbox
					assistiveText="Checkbox (indeterminate)"
					label="Checkbox Label"
					name="checkbox-example-standard-indeterminate"
					checked={this.state.checked}
					indeterminate={this.state.indeterminate}
				/>
				<div className="slds-box slds-text-longform slds-m-top--large">
					<p>
						This example has an <em>indeterminate</em> checkbox.
					</p>
					<p>
						It is set by providing the <code>indeterminate</code> prop as <code><strong>true</strong></code>.
					</p>
					<p>
						Once it is clicked, there is no way to make it go <em>back</em> to the indeterminate state, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate#Checkbox_radio_button">it must be done programatically, through JavaScript</a>.
					</p>
				</div>
			</div>
		);
	}

});

storiesOf(FORMS_CHECKBOX, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Checkbox', () => (
		<Checkbox
			assistiveText="Checkbox"
			label="Checkbox Label"
			name="checkbox-example-standard"
		/>
	))
	.add('Checkbox (indeterminate)', () => (
		<CheckboxIndeterminate />
	))
	.add('Checkbox (required)', () => (
		<Checkbox
			assistiveText="Checkbox (required)"
			label="Checkbox Label"
			name="checkbox-example-standard-required"
			required
		/>
	))
	.add('Checkbox (assistive text)', () => (
		<div>
			<Checkbox
				assistiveText="Checkbox (assistiveText)"
				label="Checkbox Label"
				name="checkbox-example-standard-assistiveText"
				assistiveText={`This is my checkbox. 
								There are many like it, but this one is mine.
								My checkbox is my best friend. 
								It is my life.
								I must master it as I must master my life.
								Without me, my checkbox is useless. Without my checkbox, I am useless.
								I must make my checkbox true.
								I must make it truer than my radio button who is trying to... `}
			/>
			<div className="slds-box slds-text-longform slds-m-top--large">
				<p>
					This example has assistive text. In Safari on Mac you can
					turn assistive text on by using the keyboard combination:
					<strong>Command + F5</strong>.
				</p>
				<p>
					Once you have enabled it, use your tab key to focus on the
					checkbox input, and the system should read you what is
					supplied to the checkbox as the <code>assistiveText</code>
					property.
				</p>
			</div>
		</div>
	))
	.add('Checkbox (checked)', () => (
		<Checkbox
			assistiveText="Checkbox (checked)"
			label="Checkbox Label"
			name="checkbox-example-standard-checked"
			checked
		/>
	))
;
