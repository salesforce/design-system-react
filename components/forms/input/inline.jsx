/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Inline Edit Component

// Implements an inline edit component based on the [Input design pattern](https://www.lightningdesignsystem.com/components/forms/#input) in React.

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import Button from '../../button';
import Input from './index';
import InputIcon from '../../icon/input-icon';

// ### Event Helpers
import KEYS from '../../../utilities/key-code';

// ## Constants
import { FORMS_INLINE_EDIT } from '../../../utilities/constants';

/**
 * An inline input is rendered as a label by default. When clicked (or tabbed in), it's rendered as an input. When the focus is lost, the current input value is saved and the input is rendered as a label again.
 */
const InlineEdit = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: FORMS_INLINE_EDIT,

	// ### Prop Types
	propTypes: {
		/**
		 * Class names to be added to the outer container of the input.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string
		]),
		/**
		 * Name of the submitted form parameter.
		 */
		name: PropTypes.string,
		/**
		 * Disables the Inline Edit component and prevents editing the contents.
		 */
		disabled: PropTypes.bool,
		/**
		 * Every Inline Edit component must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string.isRequired,
		/**
		 * This event fires when the input changes.
		 */
		onChange: PropTypes.func,
		/**
		 * Typically an Inline Edit component will be of the type text, but like the Input element it includes support for all HTML5 types.
		 */
		type: PropTypes.oneOf([
			'text',
			'password',
			'datetime',
			'datetime-local',
			'date',
			'month',
			'time',
			'week',
			'number',
			'email',
			'url',
			'search',
			'tel',
			'color'
		]),
		/**
		 * Inline Edit is a controlled component, and will always display this value.
		 */
		value: PropTypes.string.isRequired
	},

	getDefaultProps () {
		return {
			type: 'text'
		};
	},

	getInitialState () {
		return {
			isEditing: false,
			value: null
		};
	},

	// ### Render
	render () {
		const {
			disabled,
			value,
			name,

			// ### Additional properties
			// Using [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx) to pass on any properties which are not explicitly defined.
			...rest
		} = this.props;

		const inlineEditTrigger = (
			<Button
				assistiveText="Edit"
				disabled={disabled}
				iconName="edit"
				iconPosition="right"
				iconSize="small"
				variant="icon"
			/>
		);

		return (
			<Input
				{...rest}
				iconRight={this.state.isEditing
					? <InputIcon
						category="utility"
						name="close"
						position="right"
						onClick={this.endEditMode}
					/>
					: null}
				disabled={disabled}
				inlineEditTrigger={inlineEditTrigger}
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				onClick={!this.state.isEditing ? this.triggerEditMode : null}
				onKeyDown={this.handleKeyDown}
				readOnly={!this.state.isEditing}
				name={name}
				value={this.state.isEditing ? this.state.value : value}
			/>
		);
	},

	componentDidUpdate () {
		if (this.autoFocus) {
			const input = ReactDOM.findDOMNode(this).getElementsByTagName('input')[0];

			if (input) {
				input.focus();
				input.select();
			}

			this.autoFocus = false;
		}
	},

	triggerEditMode () {
		if (!this.props.disabled) {
			this.autoFocus = true;
			this.setState({
				isEditing: true,
				value: this.props.value
			});
		}
	},

	saveEdits () {
		if (isFunction(this.props.onChange)) {
			this.props.onChange({
				value: this.state.value
			});
		}

		this.endEditMode();
	},

	endEditMode () {
		if (this.willSave) {
			clearTimeout(this.willSave);
			delete this.willSave;
		}

		this.setState({
			isEditing: false,
			value: null
		});
	},

	handleBlur () {
		if (!this.willSave) {
			this.willSave = setTimeout(this.saveEdits, 200);
		}
	},

	handleChange (event) {
		this.setState({
			value: event.target.value
		});
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ESCAPE) {
				this.endEditMode();
			} else if (event.keyCode === KEYS.ENTER) {
				this.saveEdits();
			}
		}
	}
});

module.exports = InlineEdit;
