// BUTTON VIEW - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ButtonCore from '../../core/button';
import {ButtonObject} from './button';
import {ButtonStatefulObject} from './button-stateful';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

export const ButtonViewObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		text: React.PropTypes.string
	},

	getDefaultProps () {
		return {
			stateful: true
		};
	},

	render () {
		return (
			<span className={this.buttonStatefulViewStyles[this.props.view]}>{this._renderIcon('left')}{this.props.text}{this._renderIcon('right')}{this._renderAssistiveText()}</span>
		);
	}
};

let ButtonView = Lib.merge({}, ButtonCore, ButtonObject, ButtonStatefulObject, ButtonViewObject);

ButtonView = Lib.runHelpers('react', 'ButtonView', ButtonView);
ButtonView = React.createClass(ButtonView);

export default ButtonView;
