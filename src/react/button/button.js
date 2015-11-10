// BUTTON CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ButtonCore, {CONTROL} from '../../core/button';
import ButtonViewCore from '../../core/button-view';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';
import isIcon from '../mixins/custom-prop-types/icon.js';

// Children
import ButtonView from './button-view';

export const ButtonObject = {
	mixins: [State, Events, genericWillMount],

	displayName: CONTROL,

	propTypes: {
		assistiveText: React.PropTypes.string,
		icon: isIcon,
		iconPosition: React.PropTypes.oneOf(Object.keys(ButtonViewCore.iconPositions)),
		iconSize: React.PropTypes.oneOf(Object.keys(ButtonViewCore.buttonIconSizes)),
		iconStyle: React.PropTypes.oneOf(Object.keys(ButtonCore.iconButtonStyles)),
		selected: React.PropTypes.bool,
		selectable: React.PropTypes.bool,
		size: React.PropTypes.oneOf(Object.keys(ButtonCore.sizes)),
		text: React.PropTypes.string,
		theme: React.PropTypes.oneOf(Object.keys(ButtonCore.themes))

		// TODO: Decide if this valid. Picklist needs spans and SVG as children.
		// children: function (props, propName, componentName) {
		// 	const prop = props[propName];
		// 	let error;

		// 	React.Children.forEach(prop, child => {
		// 		if (!error && child.type !== ButtonView) {
		// 			error = new Error(
		// 				'`' + componentName + '` ' +
		// 				'should only contain children of the type `ButtonView`.'
		// 			);
		// 		}
		// 	});
			
		// 	if (error) {
		// 		return error;
		// 	}
		// }
	},
	
	_renderViews () {
		const views = React.Children.map(this.props.children, (child, index) => {
			return React.cloneElement(child, { iconPosition: this.props.iconPosition, key: index });
		}) || [];
		
		const defaultView = views.length > 0 ? 'notSelected' : null;
		views.push(<ButtonView
									assistiveText={this.props.assistiveText}
									icon={this.props.icon}
									iconSize={this.props.iconSize}
									iconStyle={this.props.iconStyle}
									text={this.props.text}
									view={defaultView}
									iconPosition={this.props.iconPosition}
									key="default" />);
		return views;
	},
	
	render () {
		const {assistiveText,
			className,
			icon,
			iconPosition,
			iconSize,
			iconStyle,
			selected,
			selectable,
			size,
			text,
			theme,
			...props} = this.props;
		const hasChildren = React.Children.count(this.props.children);
		// TODO: Does the onClick received by the user need a specific payload or is the event alone enough?
		return (
			<button type="button"
				className={this._getClassNames(this.props.className, (hasChildren || this.props.selectable))}
				{...props}>{this._renderViews()}</button>
		);
	}
};

let Button = Lib.merge({}, ButtonCore, ButtonObject);

Button = Lib.runHelpers('react', CONTROL, Button);
Button = React.createClass(Button);

export default Button;
