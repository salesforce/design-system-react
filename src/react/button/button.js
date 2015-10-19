// BUTTON CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ButtonCore, {CONTROL} from '../../core/button';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Children
import ButtonView from './button-view';

export const ButtonObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		assistiveText: React.PropTypes.string,
		icon: React.PropTypes.string,
		text: React.PropTypes.string,
		iconStyle: React.PropTypes.string,
		iconPosition: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		size: React.PropTypes.oneOf(Object.keys(ButtonCore.sizes)),
		theme: React.PropTypes.oneOf(Object.keys(ButtonCore.themes)),
		selected: React.PropTypes.bool,
		onClick: React.PropTypes.func,
		children: function (props, propName, componentName) {
			const prop = props[propName];
			let error;

			React.Children.forEach(prop, child => {
				if (!error && child.type !== ButtonView) {
					error = new Error(
						'`' + componentName + '` ' +
						'should only contain children of the type `ButtonView`.'
					);
				}
			});
			
			if (error) {
				return error;
			}
		}
	},
	
	_renderViews () {
		const views = React.Children.map(this.props.children, (child, index) => {
			return React.cloneElement(child, { iconPosition: this.props.iconPosition, key: index });
		}) || [];
		
		const defaultView = views.length > 0 ? 'notSelected' : null;
		
		views.push(<ButtonView assistiveText={this.props.assistiveText} icon={this.props.icon} text={this.props.text} view={defaultView} iconPosition={this.props.iconPosition} key="default" />);
		
		return views;
	},
	
	render () {
		const hasChildren = React.Children.count(this.props.children);
		
		// TODO: Does the onClick received by the user need a specific payload or is the event alone enough?
		return (
			<button type="button"
				onClick={this.props.onClick}
				className={this._getClassNames(hasChildren)}
				disabled={this.props.disabled}>{this._renderViews()}</button>
		);
	}
};

let Button = Lib.merge({}, ButtonCore, ButtonObject);

Button = Lib.runHelpers('react', CONTROL, Button);
Button = React.createClass(Button);

export default Button;
