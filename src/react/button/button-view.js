// BUTTON VIEW - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import {CONTROL} from '../../core/button';

// Framework specific
import React from 'react';
import Svg from '../svg/svg';

// Third party
import classNames from 'classnames';

// TODO: Make this a real Facades control with Base and a Core
const ButtonViewCore = {
	cssClasses: {
		ICON: CONTROL + '__icon',
		STATEFUL_ICON: CONTROL + '__icon--stateful',
		ASSISTIVE_TEXT: 'slds-assistive-text'
	},
	
	buttonStatefulViewStyles: {
		notSelected: 'slds-text-not-selected',
		selected: 'slds-text-selected',
		selectedHover: 'slds-text-selected-focus'
	},
	
	iconPositions: {
		'left': CONTROL + '__icon--left',
		'right': CONTROL + '__icon--right'
	}
};

export const ButtonView = React.createClass(Lib.merge(ButtonViewCore, {
	propTypes: {
		assistiveText: React.PropTypes.string,
		icon: React.PropTypes.string,
		text: React.PropTypes.string,
		view: React.PropTypes.oneOf(Object.keys(ButtonViewCore.buttonStatefulViewStyles)),
		iconPosition: React.PropTypes.oneOf(Object.keys(ButtonViewCore.iconPositions))
	},
	
	_getIconClassNames () {
		let iconBaseClass;

		if (this.props.view) {
			iconBaseClass = this.cssClasses.STATEFUL_ICON;
		} else {
			iconBaseClass = this.cssClasses.ICON;
		}

		return classNames(iconBaseClass,
			!!this.props.text && this.iconPositions[this.props.iconPosition]);
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
	},

	render () {
		return (
			<span className={this.buttonStatefulViewStyles[this.props.view]}>{this._renderIcon('left')}{this.props.text}{this._renderIcon('right')}{this._renderAssistiveText()}</span>
		);
	}
}));

export default ButtonView;
