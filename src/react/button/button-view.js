// BUTTON VIEW - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ButtonViewCore, {CONTROL} from '../../core/button-view';

// Framework specific
import React from 'react';
import Svg from '../svg/svg';
import State from '../mixins/state';
import isIcon from '../mixins/custom-prop-types/icon.js';

export const ButtonViewObject = {
	propTypes: {
		assistiveText: React.PropTypes.string,
		icon: isIcon,
		text: React.PropTypes.string,
		view: React.PropTypes.oneOf(Object.keys(ButtonViewCore.buttonStatefulViewStyles)),
		iconPosition: React.PropTypes.oneOf(Object.keys(ButtonViewCore.iconPositions))
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
		if (position === 'right' && this.props.iconStyle === 'icon-more') {
			return (<Svg className={this._getIconClassNames(this.iconSizes['x-small'])} icon={this.moreIcon} />);
		}
	},

	render () {
		return (
			<span className={this.buttonStatefulViewStyles[this.props.view]}>{this._renderIcon('left')}{this.props.text}{this._renderIcon('right')}{this._renderAssistiveText()}</span>
		);
	}
};

let ButtonView = Lib.merge({}, State, ButtonViewCore, ButtonViewObject);

ButtonView = Lib.runHelpers('react', CONTROL, ButtonView);
ButtonView = React.createClass(ButtonView);

export default ButtonView;
