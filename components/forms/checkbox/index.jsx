/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Checkbox Component

// Implements the [Checkbox design pattern](https://www.lightningdesignsystem.com/components/forms/#checkbox) in React.

// ### React
import React from 'react';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ### Event Helpers
import { KEYS, EventUtil } from '../../../utilities';

// ### classNames
import classNames from 'classnames';

// Remove the need for `React.PropTypes`
const { PropTypes } = React;

import { FORMS_CHECKBOX } from '../../../utilities/constants';

/**
 * The ability to style checkboxes with CSS varies across browsers. Using this component ensures checkboxes look the same everywhere.
 */
const Checkbox = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: FORMS_CHECKBOX,

	// ### Prop Types
	propTypes: {
		/**
		 * Text that is visually hidden but read aloud by screenreaders to tell the user what the Checkbox is for.
		 * If the Checkbox has a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
		 */
		assistiveText: React.PropTypes.string,
		/**
		 * The Checkbox is a controlled component, and will always be in this state. If checked is not defined, the state of the uncontrolled native `input` component will be used.
		 */
		checked: React.PropTypes.bool,
		/**
		 * Class names to be added to the outer container of the Checkbox.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string
		]),
		/**
		 * Disables the Checkbox and prevents clicking it.
		 */
		disabled: PropTypes.bool,
		/**
		 * Message to display when the Checkbox is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText: React.PropTypes.string,
		/**
		 * A unique ID is needed in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string,
		/**
		 * The Checkbox will be indeterminate if its state can not be figured out or is partially checked. Once a checkbox is indeterminate, a click should cause it to be checked. Since a user cannot put a checkbox into an indeterminate state, it is assumed you are controlling the value of `checked` with the parent, also, and that this is a controlled component.
		 */
		indeterminate: React.PropTypes.bool,
		/**
		 * An optional label for the Checkbox.
		 */
		label: React.PropTypes.string,
		/**
		 * Name of the submitted form parameter.
		 */
		name: PropTypes.string,
		/**
		 * This event fires when the Checkbox changes.
		 */
		onChange: PropTypes.func,
		/**
		 * Highlights the Checkbox as a required field (does not perform any validation).
		 */
		required: PropTypes.bool
	},

	componentWillMount () {
		this.generatedId = shortid.generate();
	},

	// ### Render
	render () {
		const {
			ariaControls,
			ariaDescribedby,
			ariaOwns,
			ariaRequired,
			assistiveText,
			checked,
			className,
			disabled,
			id,
			errorText,
			indeterminate,
			label,
			name,
			onBlur,
			onChange, // eslint-disable-line no-unused-vars
			onFocus,
			onKeyDown,
			onKeyPress,
			onKeyUp,
			readOnly,
			required,
			role,


			// ### Additional properties
			// Using [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx) to pass on any properties which are not explicitly defined.
			...props
		} = this.props;

		return (
			<div
				className={classNames('slds-form-element', {
					'is-required': required,
					'slds-has-error': errorText
				},
				className)}
			>
				<div className="slds-form-element__control">
					<span className="slds-checkbox">
						{required ? <abbr className="slds-required" title="required">*</abbr> : null}
						<input
							aria-controls={ariaControls}
							aria-describedby={ariaDescribedby}
							aria-owns={ariaOwns}
							aria-required={ariaRequired}
							disabled={disabled}
							checked={checked}
							id={id || this.generatedId}
							name={name}
							onBlur={onBlur}
							onChange={this.handleChange}
							onFocus={onFocus}
							onKeyDown={onKeyDown}
							onKeyPress={onKeyPress}
							onKeyUp={onKeyUp}
							ref={
								(component) => {
									if (component) {
										component.indeterminate = indeterminate;
									}
									this.input = component;
								}}
								role={role}
								required={required}
								type="checkbox"
							/>
						<label className="slds-checkbox__label" htmlFor={id || this.generatedId}>
							<span className="slds-checkbox--faux"></span>
							{label
								? <span className="slds-form-element__label">
									{label}
								</span>
							: null}
							{assistiveText
								? <span className="slds-assistive-text">
									{assistiveText}
								</span>
							: null}
						</label>
					</span>
				</div>
				{errorText ? <div className="slds-form-element__help">{errorText}</div> : null}
			</div>
		);
	},

	handleChange (event) {
		const value = event.target.checked;
		const {
			checked,
			indeterminate,
			onChange
		} = this.props;

		if (isFunction(onChange)) {
			// `checked` is present twice to maintain backwards compatibility. Please remove first parameter `value` on the next breaking change.
			onChange(value, event, {
				checked: indeterminate ? true : !checked,
				indeterminate: false
			});
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ENTER ||
					event.keyCode === KEYS.SPACE) {
				EventUtil.trapImmediate(event);
				this.handleChange(event);
			}
		}
	}
});

export default Checkbox;
