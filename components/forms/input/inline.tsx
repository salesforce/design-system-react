/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Inline Edit Component

// Implements an inline edit component based on the [Input design pattern](https://www.lightningdesignsystem.com/components/forms/#input) in React.

// ## Dependencies

// ### React
import React, { type ReactNode } from 'react';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ## Children
import Button from '../../button';
import Input, { type InputProps, type InputType } from '../../input/index';
import InputIcon from '../../icon/input-icon';

// ### Event Helpers
import KEYS from '../../../utilities/key-code';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './inline-check-props';

// ## Constants
import { FORMS_INLINE_EDIT } from '../../../utilities/constants';

/** Options passed when leaving edit mode. */
interface EndEditOption {
	cancel?: boolean;
}

export interface InlineEditProps {
	/**
	 * Assistive text for the edit trigger button's icon.
	 */
	assistiveText?: string;
	/**
	 * Class names to be added to the outer container of the input.
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Name of the submitted form parameter.
	 */
	name?: string;
	/**
	 * Disables the Inline Edit component and prevents editing the contents.
	 */
	disabled?: boolean;
	/**
	 * Every Inline Edit component must have a unique ID in order to support keyboard navigation and ARIA support.
	 */
	id: string;
	/**
	 * This event fires when the input changes.
	 */
	onChange?: (data: { value: string | null }) => void;
	/**
	 * Function will run when keyup during text edit
	 */
	onKeyUp?: (
		event: React.KeyboardEvent<HTMLInputElement>,
		data: { value: string | null }
	) => void;
	/**
	 * Function will run when we enter edit mode
	 */
	onEnterEditMode?: () => void;
	/**
	 * Function will run when we leave edit mode
	 */
	onLeaveEditMode?: (event?: undefined, option?: EndEditOption) => void;
	/**
	 * Typically an Inline Edit component will be of the type text, but like the Input element it includes support for all HTML5 types.
	 */
	type?: InputType;
	/**
	 * Inline Edit is a controlled component, and will always display this value.
	 */
	value: string;
	/**
	 * Additional properties are passed onto the underlying `Input`.
	 */
	[key: string]: unknown;
}

interface InlineEditState {
	isEditing: boolean;
	value: string | null;
}

const defaultProps: Partial<InlineEditProps> = {
	assistiveText: 'Edit text',
	type: 'text',
};

/**
 * An inline input is rendered as a label by default. When clicked (or tabbed in), it's rendered as an input. When the focus is lost, the current input value is saved and the input is rendered as a label again.
 */
class InlineEdit extends React.Component<InlineEditProps, InlineEditState> {
	static displayName = FORMS_INLINE_EDIT;

	static defaultProps = defaultProps;

	autoFocus?: boolean;

	inputNode: HTMLInputElement | null = null;

	willSave?: ReturnType<typeof setTimeout>;

	constructor(props: InlineEditProps) {
		super(props);
		this.state = {
			isEditing: false,
			value: null,
		};

		(checkProps as (name: string, props: unknown) => void)(
			FORMS_INLINE_EDIT,
			props
		);
	}

	componentDidUpdate() {
		if (this.autoFocus) {
			if (this.inputNode) {
				this.inputNode.focus();
				this.inputNode.select();
			}
			this.autoFocus = false;
		}
	}

	endEditMode = (option?: EndEditOption | React.MouseEvent) => {
		if (this.willSave) {
			clearTimeout(this.willSave);
			delete this.willSave;
		}

		this.setState({
			isEditing: false,
			value: null,
		});

		if (this.props.onLeaveEditMode && isFunction(this.props.onLeaveEditMode)) {
			this.props.onLeaveEditMode(undefined, option as EndEditOption);
		}
	};

	handleBlur = () => {
		if (!this.willSave) {
			this.willSave = setTimeout(this.saveEdits, 200);
		}
		if (this.props.onLeaveEditMode && isFunction(this.props.onLeaveEditMode)) {
			this.props.onLeaveEditMode();
		}
	};

	handleChange = (
		_event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent | React.KeyboardEvent,
		data: { value: string }
	) => {
		this.setState({
			value: data.value,
		});
	};

	handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ESCAPE) {
				this.saveEdits({ cancel: true });
			} else if (event.keyCode === KEYS.ENTER) {
				this.saveEdits();
			}
		}
	};

	handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.keyCode) {
			if (this.props.onKeyUp && isFunction(this.props.onKeyUp)) {
				this.props.onKeyUp(event, {
					value: this.state.value,
				});
			}
		}
	};

	saveEdits = (option?: EndEditOption) => {
		if (!(option && option.cancel === true)) {
			if (isFunction(this.props.onChange)) {
				this.props.onChange({
					value: this.state.value,
				});
			}
		}
		this.endEditMode(option);
	};

	triggerEditMode = () => {
		if (!this.props.disabled) {
			this.autoFocus = true;
			this.setState({
				isEditing: true,
				value: this.props.value,
			});
			if (isFunction(this.props.onEnterEditMode)) {
				this.props.onEnterEditMode();
			}
		}
	};

	// ### Render
	render() {
		const {
			assistiveText,
			disabled,
			value,
			name,

			// ### Additional properties
			// Using [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx) to pass on any properties which are not explicitly defined.
			...rest
		} = this.props;

		const iconRight: ReactNode = this.state.isEditing ? (
			<InputIcon
				category="utility"
				name="close"
				position="right"
				onClick={() => this.endEditMode()}
				tabIndex={-1}
			/>
		) : null;

		return (
			<Input
				{...(rest as unknown as InputProps)}
				iconRight={iconRight}
				disabled={disabled}
				inlineEditTrigger={
					<Button
						assistiveText={{ icon: assistiveText }}
						className="slds-m-left_x-small"
						disabled={disabled}
						iconCategory="utility"
						iconName="edit"
						iconPosition="right"
						iconSize="small"
						variant="icon"
					/>
				}
				onBlur={this.handleBlur}
				onChange={this.handleChange}
				onClick={!this.state.isEditing ? this.triggerEditMode : undefined}
				onKeyDown={this.handleKeyDown}
				onKeyUp={this.handleKeyUp}
				isStatic={!this.state.isEditing}
				name={name}
				value={this.state.isEditing ? this.state.value || '' : value}
				inputRef={(input) => {
					this.inputNode = input;
				}}
			/>
		);
	}
}

export default InlineEdit;
