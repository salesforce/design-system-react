// BUTTON CONTROL - REACT FACADE
// All props, no state

// Core
import * as Lib from '../../lib/lib';
import ButtonCore, {CONTROL} from '../../core/button';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';
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
		onClick: React.PropTypes.func
	},

	getClassNames () {
		// falsy values will not output object key (ex. {selected: false} -> '')
		const selectedClasses = {};
		selectedClasses[this.cssClasses.NOT_SELECTED] = this.props.stateful;
		if (this.props.selected) {
			selectedClasses[this.cssClasses.NOT_SELECTED] = null;
			selectedClasses[this.cssClasses.SELECTED] = this.props.selected;
		}
		return classNames(this.cssClasses.BASE,
			this.cssClasses[this.props.size],
			this.cssClasses[this.props.theme],
			this.cssClasses[this.props.iconStyle],
			selectedClasses);
	},

	render () {
		const assistiveText = this.props.assistiveText ? <span className={this.cssClasses.ASSISTIVE_TEXT}>{this.props.assistiveText}</span> : '';

		return (
			<button type={this.props.type}
				onClick={this.props.onClick}
				className={this.getClassNames()}
				disabled={this.props.disabled}
				aria-live={this.props.stateful ? 'assertive' : null}>{this.props.children}{assistiveText}</button>
		);
	}
};

let Button = Lib.merge({}, ButtonCore, ButtonObject);

Button = Lib.runHelpers('react', CONTROL, Button);
Button = React.createClass(Button);

export default Button;
