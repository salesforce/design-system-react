// BUTTON CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ButtonCore, {CONTROL} from '../../core/button';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import Svg from '../svg/svg';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

export const ButtonObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		assistiveText: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		iconStyle: React.PropTypes.string,
		size: React.PropTypes.string,
		stateful: React.PropTypes.bool,
		theme: React.PropTypes.string,
		selected: React.PropTypes.bool,
		text: React.PropTypes.string,
		onClick: React.PropTypes.func
	},

	// TODO: We've been moving this into the core in other controls
	_getClassNames () {
		const selectedClasses = {};
		
		if (this.props.stateful) {
			selectedClasses[this.cssClasses.NOT_SELECTED] = !this.props.selected;
			selectedClasses[this.cssClasses.SELECTED] = this.props.selected;
		}
		
		// TODO: Evaluate method of adding classes for size, theme and iconStyle
		return classNames(this.cssClasses.BASE,
			this.cssClasses[this.props.size],
			this.cssClasses[this.props.theme],
			this.cssClasses[this.props.iconStyle],
			selectedClasses);
	},

	_getIconClassNames () {
		let position = null;
		position = this.props.iconPosition ? 'BUTTON_' + this.props.iconPosition.toUpperCase() : 'BUTTON_LEFT';
		return classNames('slds-button__icon', this.cssClasses[position]);
	},

	_renderAssistiveText () {
		if (this.props.assistiveText) {
			return <span className={this.cssClasses.ASSISTIVE_TEXT}>{this.props.assistiveText}</span>;
		}
	},

	_iconLeft () {
		if (this.props.icon && this.props.iconPosition !== 'right') {
			return (<Svg className={this._getIconClassNames()} icon={this.props.icon} />);
		}
	},

	_iconRight () {
		if (this.props.icon && this.props.iconPosition === 'right' ) {
			return (<Svg className={this._getIconClassNames()} icon={this.props.icon} />);
		}
	},

	render () {
		// FIXME: Using this.props.children here only works in the simplest of scenarios
		// TODO: Does the onClick received by the user need a specific payload or is the event alone enough?
		return (
			<button type={this.props.type}
				onClick={this.props.onClick}
				className={this._getClassNames()}
				disabled={this.props.disabled}
aria-live={this.props.stateful ? 'assertive' : null}>{this._iconLeft()}{this.props.text}{this.props.children}{this._renderAssistiveText()}{this._iconRight()}</button>
		);
	}
};

let Button = Lib.merge({}, ButtonCore, ButtonObject);

Button = Lib.runHelpers('react', CONTROL, Button);
Button = React.createClass(Button);

export default Button;
