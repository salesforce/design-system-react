// BUTTON GROUP CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Children
import Button from '../button/button';

export const ButtonGroupObject = {
	mixins: [State, Events, genericWillMount],

	propTypes: {
		children: function (props, propName, componentName) {
			const prop = props[propName];
			let error;

			React.Children.forEach(prop, child => {
				if (!error && child.type !== Button) {
					error = new Error(
						'`' + componentName + '` ' +
						'should only contain children of the type `Button`.'
					);
				}
			});
			
			if (error) {
				return error;
			}
		}
	},
	
	render () {
		return (
			<div type="button"
				className="slds-button-group" role="group" // {this.props.className}
				>{this.props.children}</div>
		);
	}
};

const CONTROL = 'slds-button-group';

let ButtonGroup = Lib.merge({}, ButtonGroupObject);

ButtonGroup = Lib.runHelpers('react', CONTROL, ButtonGroup);
ButtonGroup = React.createClass(ButtonGroup);

export default ButtonGroup;
