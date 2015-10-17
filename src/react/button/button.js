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

	_renderAssistiveText () {
		if (this.props.assistiveText) {
			return <span className={this.cssClasses.ASSISTIVE_TEXT}>{this.props.assistiveText}</span>;
		}
	},

	_renderIcon (position) {
		if (this.props.icon && this.props.iconPosition === position) {
			return (<Svg className={this._getIconClassNames()} icon={this.props.icon} />);
		}
	}
};

const renderObject = {
	render () {
		// FIXME: Using this.props.children here only works in the simplest of scenarios
		// TODO: Does the onClick received by the user need a specific payload or is the event alone enough?
		return (
			<button type="button"
				onClick={this.props.onClick}
				className={this._getClassNames()}
				disabled={this.props.disabled}>{this._renderIcon('left')}{this.props.text}{this.props.children}{this._renderAssistiveText()}{this._renderIcon('right')}</button>
		);
	}
};

let Button = Lib.merge({}, ButtonCore, ButtonObject, renderObject);

Button = Lib.runHelpers('react', CONTROL, Button);
Button = React.createClass(Button);

export default Button;
