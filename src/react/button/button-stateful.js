// BUTTON STATEFUL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ButtonCore, {CONTROL} from '../../core/button';
import {ButtonObject} from './button';

// Framework specific
import React from 'react';

export const ButtonStatefulObject = {
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

	getDefaultProps () {
		return {
			stateful: true
		};
	},

	render () {
		// TODO: Does the onClick received by the user need a specific payload or is the event alone enough?
		return (
			<button type="button"
				onClick={this.props.onClick}
				className={this._getClassNames()}
				disabled={this.props.disabled}
				aria-live="assertive">{this._renderNotSelectedState()}{this.props.children}
				</button>
		);
	},

	_renderNotSelectedState () {
		return (
				<span className="slds-text-not-selected">{this._renderIcon('left')}{this.props.text}{this._renderIcon('right')}{this._renderAssistiveText()}</span>
		);
	}

};

let ButtonStateful = Lib.merge({}, ButtonCore, ButtonObject, ButtonStatefulObject);

ButtonStateful = Lib.runHelpers('react', CONTROL, ButtonStateful);
ButtonStateful = React.createClass(ButtonStateful);

export default ButtonStateful;
