/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Inline Edit Component

// Implements an inline edit component based on the [Input design pattern](https://www.lightningdesignsystem.com/components/forms/#input) in React.

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

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


// ### Prop Types
const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * Text that is visually hidden but read aloud on the Edit Icon button
	 */
	assistiveText: PropTypes.string,
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
};

const defaultProps = {
	assistiveText: 'Edit text',
	type: 'text'
};

/**
 * An inline input is rendered as a label by default. When clicked (or tabbed in), it's rendered as an input. When the focus is lost, the current input value is saved and the input is rendered as a label again.
 */
class InlineEdit extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isEditing: false,
			value: null
		};
	}

	componentDidUpdate () {
		if (this.autoFocus) {
			if (this.inputNode) {
				this.inputNode.focus();
				this.inputNode.select();
			}
			this.autoFocus = false;
		}
	}

	triggerEditMode = () => {
		if (!this.props.disabled) {
			this.autoFocus = true;
			this.setState({
				isEditing: true,
				value: this.props.value
			});
		}
	}

	saveEdits = () => {
		if (isFunction(this.props.onChange)) {
			this.props.onChange({
				value: this.state.value
			});
		}

		this.endEditMode();
	}

	endEditMode = () => {
		if (this.willSave) {
			clearTimeout(this.willSave);
			delete this.willSave;
		}

		this.setState({
			isEditing: false,
			value: null
		});
	}

	handleBlur = () => {
		if (!this.willSave) {
			this.willSave = setTimeout(this.saveEdits, 200);
		}
	}

	handleChange = (event) => {
		this.setState({
			value: event.target.value
		});
	}

	handleKeyDown = (event) => {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ESCAPE) {
				this.endEditMode();
			} else if (event.keyCode === KEYS.ENTER) {
				this.saveEdits();
			}
		}
	}

	// ### Render
	render () {
		const {
			assistiveText,
			disabled,
			value,
			name,

			// ### Additional properties
			// Using [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx) to pass on any properties which are not explicitly defined.
			...rest
		} = this.props;

		const inlineEditTrigger = (
			<Button
				assistiveText={assistiveText}
				className="slds-m-left_x-small"
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
						tabIndex="-1"
					/>
					: null}
				disabled={disabled}
				inlineEditTrigger={inlineEditTrigger}
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				onClick={!this.state.isEditing ? this.triggerEditMode : null}
				onKeyDown={this.handleKeyDown}
				isStatic={!this.state.isEditing}
				name={name}
				value={this.state.isEditing ? this.state.value : value}
				inputRef={(input) => { this.inputNode = input; }}
			/>
		);
	}
}

InlineEdit.displayName = FORMS_INLINE_EDIT;
InlineEdit.propTypes = propTypes;
InlineEdit.defaultProps = defaultProps;

export default InlineEdit;

