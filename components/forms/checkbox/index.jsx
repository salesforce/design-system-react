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
		 * The Checkbox is a controlled component, and will always be in this state.
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
		 * The Checkbox will be indeterminate if its state can not be figured out.
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

	getDefaultProps () {
		return {
			id: shortid.generate(),
			checked: false,
			indeterminate: false
		};
	},

	getInitialState () {
		return {
			checked: this.props.checked,
			indeterminate: this.props.indeterminate
		};
	},

	componentDidMount () {
		const checkbox = this.input;
		console.group('[componentDidMount]');
		console.log("this.state.checked", this.state.checked);
		console.log("this.state.indeterminate", this.state.indeterminate);
		console.groupEnd();
		checkbox.checked = this.state.checked;
		checkbox.indeterminate = this.state.indeterminate;
	},

	componentWillReceiveProps (nextProps) {
		console.log("[componentWillReceiveProps] nextProps", nextProps);
		console.log("[componentWillReceiveProps] this.state (before)", this.state);
		this.setState({
			checked: nextProps.checked,
			indeterminate: nextProps.indeterminate
		});
		console.log("[componentWillReceiveProps] this.state (after)", this.state);
	},

	shouldComponentUpdate (nextProps, nextState) {
		let toReturn = true;
		let toReturnIndeterminate = true;
		let toReturnChecked = true;

		console.group('[shouldComponentUpdate]');

			console.group('[shouldComponentUpdate this.props]');
				console.log("this.props.indeterminate", this.props.indeterminate);
				console.log("this.props.checked", this.props.checked);
			console.groupEnd();

			console.group('[shouldComponentUpdate nextProps]');
				console.log("nextProps.indeterminate", nextProps.indeterminate);
				console.log("nextProps.checked", nextProps.checked);
			console.groupEnd();

			console.group('[shouldComponentUpdate this.state]');
				console.log("this.state.indeterminate", this.state.indeterminate);
				console.log("this.state.checked", this.state.checked);
			console.groupEnd();

			console.group('[shouldComponentUpdate nextState]');
				console.log("nextState.indeterminate", nextState.indeterminate);
				console.log("nextState.checked", nextState.checked);
			console.groupEnd();

		if (
			nextProps.indeterminate === this.props.indeterminate
		&&	nextProps.indeterminate === nextState.indeterminate
		&&	nextProps.indeterminate === this.state.indeterminate
		) {
			toReturnIndeterminate = false;
		}
		
		if (
			nextProps.checked === this.props.checked
		&&	nextProps.checked === nextState.checked
		&&	nextProps.checked === this.state.checked
		) {
			toReturnChecked = false;
		}
		
		toReturn = toReturnIndeterminate === true || toReturnChecked === true;
		console.log("toReturnIndeterminate", toReturnIndeterminate);
		console.log("toReturnChecked", toReturnChecked);
		console.group('[shouldComponentUpdate nextState]');
			console.log("nextState", nextState);
		console.groupEnd();

		console.warn("toReturn is being forced to true!");
		toReturn = true;
		console.log("toReturn", toReturn);

		console.groupEnd();
		return toReturn;
	},

	componentWillUpdate (nextProps, nextState) {
		console.group('[componentWillUpdate nextProps]');
			console.log("nextProps", nextProps);
		console.groupEnd();
		console.group('[componentWillUpdate nextState]');
			console.log("nextState", nextState);
		console.groupEnd();
	},

	componentDidUpdate (prevProps, prevState) {
		console.group('[componentDidUpdate prev]');
			console.log("prevProps", prevProps);
			console.log("prevState", prevState);
		console.groupEnd();
		console.group('[componentDidUpdate current]');
			console.log("this.props", this.props);
			console.log("this.state", this.state);
		console.groupEnd();
	},

	// ### Render
	render () {
		const {
			assistiveText,
			checked,
			indeterminate,
			className,
			disabled,
			errorText,
			label,
			name,
			onChange, // eslint-disable-line no-unused-vars
			required,
			id,

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
				onKeyDown={this.handleKeyDown}
			>
				<div className="slds-form-element__control">
					<span className="slds-checkbox">
						{required ? <abbr className="slds-required" title="required">*</abbr> : null}
						<input
							{...props}
							id={id}
							checked={checked}
							indeterminate={indeterminate}
							name={name}
							disabled={disabled}
							onChange={this.handleChange}
							type="checkbox"
							ref={(c) => this.input = c}
						/>
						<label className="slds-checkbox__label" htmlFor={id}>
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

	handleChange (e) {
		if (isFunction(this.props.onChange)) {
			console.log("isFunction(this.props.onChange)", isFunction(this.props.onChange));
			this.props.onChange(!this.props.checked, e);
			this.props.onChange(!this.props.indeterminate, e);
		}
	},

	handleKeyDown (e) {
		if (e.keyCode) {
			if (e.keyCode === KEYS.ENTER ||
					e.keyCode === KEYS.SPACE) {
				EventUtil.trapImmediate(e);
				this.handleChange(e);
			}
		}
	}
});

export default Checkbox;
