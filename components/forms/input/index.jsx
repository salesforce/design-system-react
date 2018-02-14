/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Input Component

// Implements the [Input design pattern](https://lightningdesignsystem.com/components/forms/#flavor-input) in React. Does not yet implement [fixed text](https://lightningdesignsystem.com/components/forms/#flavor-input-input-fixed-text).
// Based on SLDS v2.2.1
//

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
// Allows objects with undefined values to merge with default
import { shape } from 'airbnb-prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ## Children
import InputIcon from '../../icon/input-icon';
import InnerInput from './private/inner-input';
import Label from '../private/label';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import { FORMS_INPUT } from '../../../utilities/constants';

// ## InputDefinition
const Input = createReactClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: FORMS_INPUT,
	// ### Prop Types
	propTypes: {
		'aria-activedescendant': PropTypes.string,
		'aria-autocomplete': PropTypes.string,
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the
		 * `aria-controls` attribute in order to relate the input with
		 * another region of the page. An example would be a select box
		 * that shows or hides a panel.
		 */
		'aria-controls': PropTypes.string,
		'aria-describedby': PropTypes.string,
		'aria-expanded': PropTypes.bool,
		'aria-haspopup': PropTypes.bool,
		'aria-labelledby': PropTypes.string,
		/**
		 * An HTML ID that is shared with ARIA-supported devices with the
		 * `aria-controls` attribute in order to relate the input with
		 * another region of the page. An example would be a search field
		 * that shows search results.
		 */
		'aria-owns': PropTypes.string,
		'aria-required': PropTypes.bool,
		/**
		 * **Assistive text for accessibility**
		 * * `label`: Visually hidden label but read out loud by screen readers.
		 * * `spinner`: Text for loading spinner icon.
		 */
		assistiveText: shape({
			label: PropTypes.string,
			spinner: PropTypes.string,
		}),
		children: PropTypes.node,
		/**
		 * Class names to be added to the outer container of the input.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Disables the input and prevents editing the contents.
		 */
		disabled: PropTypes.bool,
		/**
		 * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
		 */
		errorText: PropTypes.string,
		/**
		 * Displays text or node to the left of the input. This follows the fixed text input UX pattern.
		 */
		fixedTextLeft: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		/**
		 * Displays text or node to the right of the input. This follows the fixed text input UX pattern.
		 */
		fixedTextRight: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		/**
		 * If true, loading spinner appears inside input on right hand side.
		 */
		hasSpinner: PropTypes.bool,
		/**
		 * Left aligned icon, must be instace of `design-system-react/components/icon/input-icon`
		 */
		iconLeft: PropTypes.node,
		/**
		 * Right aligned icon, must be instace of `design-system-react/components/icon/input-icon`
		 */
		iconRight: PropTypes.node,
		/**
		 * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
		 */
		id: PropTypes.string,
		/**
		 * This callback exposes the input reference / DOM node to parent components. `<Parent inputRef={(inputComponent) => this.input = inputComponent} />
		 */
		inputRef: PropTypes.func,
		/**
		 * Displays the value of the input statically. This follows the static input UX pattern.
		 */
		isStatic: PropTypes.bool,
		/**
		 * This label appears above the input.
		 */
		label: PropTypes.string,
		onBlur: PropTypes.func,
		/**
		 * This callback fires when the input changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
		 */
		onChange: PropTypes.func,
		/**
		 * This event fires when the input is clicked.
		 */
		onClick: PropTypes.func,
		onFocus: PropTypes.func,
		onInput: PropTypes.func,
		onInvalid: PropTypes.func,
		onKeyDown: PropTypes.func,
		onKeyPress: PropTypes.func,
		onKeyUp: PropTypes.func,
		onSelect: PropTypes.func,
		onSubmit: PropTypes.func,
		/**
		 * Text that will appear in an empty input.
		 */
		placeholder: PropTypes.string,
		minLength: PropTypes.string,
		maxLength: PropTypes.string,
		/**
		 * Name of the submitted form parameter.
		 */
		name: PropTypes.string,
		/**
		 * Displays the value of the input as readOnly.
		 */
		readOnly: PropTypes.bool,
		/**
		 * Highlights the input as a required field (does not perform any validation).
		 */
		required: PropTypes.bool,
		/**
		 * The `<Input>` element includes support for all HTML5 types.
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
			'color',
		]),
		/**
		 * The input is a controlled component, and will always display this value.
		 */
		value: PropTypes.string,
		iconPosition: PropTypes.string,
		inlineEditTrigger: PropTypes.node,
		role: PropTypes.string,
	},

	getDefaultProps () {
		return {
			type: 'text',
		};
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(FORMS_INPUT, this.props);

		this.generatedId = shortid.generate();
		if (this.props.errorText) {
			this.generatedErrorId = shortid.generate();
		}
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getErrorId () {
		return this.props['aria-describedby'] || this.generatedErrorId;
	},

	// This is convuluted to maintain backwards compatibility. Please remove deprecatedProps on next breaking change.
	getIconRender (position, iconPositionProp) {
		let icon;

		/* eslint-disable react/prop-types */
		const deprecatedProps = {
			assistiveText:
				(this.props[iconPositionProp] &&
					this.props[iconPositionProp].props.assistiveText) ||
				this.props.iconAssistiveText,
			category:
				(this.props[iconPositionProp] &&
					this.props[iconPositionProp].props.category) ||
				this.props.iconCategory,
			name:
				(this.props[iconPositionProp] &&
					this.props[iconPositionProp].props.name) ||
				this.props.iconName,
			onClick:
				(this.props[iconPositionProp] &&
					this.props[iconPositionProp].props.onClick) ||
				this.props.onIconClick,
		};
		/* eslint-enable react/prop-types */

		if (
			this.props[iconPositionProp] &&
			position &&
			this.props[iconPositionProp]
		) {
			icon = React.cloneElement(this.props[iconPositionProp], {
				iconPosition: `${position}`,
			});
		} else if (deprecatedProps.name) {
			icon = <InputIcon iconPosition={position} {...deprecatedProps} />;
		}

		return icon;
	},

	// ### Render
	render () {
		// this is a hack to make left the default prop unless overwritten by `iconPosition="right"`
		const hasLeftIcon =
			!!this.props.iconLeft ||
			((this.props.iconPosition === 'left' ||
				this.props.iconPosition === undefined) &&
				!!this.props.iconName);
		const hasRightIcon =
			!!this.props.iconRight ||
			(this.props.iconPosition === 'right' && !!this.props.iconName);

		return (
			<div
				className={classNames(
					'slds-form-element',
					{
						'slds-has-error': this.props.errorText,
					},
					this.props.className
				)}
			>
				<Label
					assistiveText={this.props.assistiveText}
					htmlFor={this.props.isStatic ? undefined : this.getId()}
					label={this.props.label}
					required={this.props.required}
					variant={this.props.isStatic ? 'static' : 'base'}
				/>
				<InnerInput
					aria-activedescendant={this.props['aria-activedescendant']}
					aria-autocomplete={this.props['aria-autocomplete']}
					aria-controls={this.props['aria-controls']}
					aria-labelledby={this.props['aria-labelledby']}
					aria-describedby={this.getErrorId()}
					aria-expanded={this.props['aria-expanded']}
					aria-owns={this.props['aria-owns']}
					aria-required={this.props['aria-required']}
					containerProps={{
						className: 'slds-form-element__control',
					}}
					disabled={this.props.disabled}
					fixedTextLeft={this.props.fixedTextLeft}
					fixedTextRight={this.props.fixedTextRight}
					hasSpinner={this.props.hasSpinner}
					id={this.getId()}
					iconLeft={hasLeftIcon ? this.getIconRender('left', 'iconLeft') : null}
					iconRight={
						hasRightIcon ? this.getIconRender('right', 'iconRight') : null
					}
					inlineEditTrigger={this.props.inlineEditTrigger}
					isStatic={this.props.isStatic}
					minLength={this.props.minLength}
					maxLength={this.props.maxLength}
					name={this.props.name}
					onBlur={this.props.onBlur}
					onChange={this.props.onChange}
					onClick={this.props.onClick}
					onFocus={this.props.onFocus}
					onInput={this.props.onInput}
					onInvalid={this.props.onInvalid}
					onKeyDown={this.props.onKeyDown}
					onKeyPress={this.props.onKeyPress}
					onKeyUp={this.props.onKeyUp}
					onSelect={this.props.onSelect}
					onSubmit={this.props.onSubmit}
					placeholder={this.props.placeholder}
					inputRef={this.props.inputRef}
					readOnly={this.props.readOnly}
					required={this.props.required}
					role={this.props.role}
					spinnerAssistiveText={
						this.props.assistiveText && this.props.assistiveText.spinner
					}
					type={this.props.type}
					value={this.props.value}
				/>
				{this.props.errorText && (
					<div id={this.getErrorId()} className="slds-form-element__help">
						{this.props.errorText}
					</div>
				)}
				{this.props.children}
			</div>
		);
	},
});

export default Input;
