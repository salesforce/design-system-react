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

	render () {
		// falsy values will not output object key (ex. {selected: false} -> '')
		const selectedClasses = {};
		selectedClasses[this.cssClasses['not-selected']] = this.props.stateful;
		if (this.props.selected) {
			selectedClasses[this.cssClasses['not-selected']] = null;
			selectedClasses[this.cssClasses.selected] = this.props.selected;
		}
		const className = classNames(this.cssClasses.base,
			this.cssClasses[this.props.size],
			this.cssClasses[this.props.theme],
			this.cssClasses[this.props.iconStyle],
			selectedClasses);

		const assistiveText = this.props.assistiveText ? <span className={this.cssClasses.ASSISTIVE_TEXT}>{this.props.assistiveText}</span> : '';

		return (
			<button type={this.props.type}
				onClick={this.props.onClick}
				className={className}
				disabled={this.props.disabled}
				aria-live={this.props.stateful ? 'assertive' : null}>{this.props.children}{assistiveText}</button>
		);
	}
};

let Button = Lib.merge({}, ButtonCore, ButtonObject);

Button = Lib.runHelpers('react', CONTROL, Button);
Button = React.createClass(Button);

export default Button;
