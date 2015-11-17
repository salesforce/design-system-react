// # Button Control
// ### React Facade

// Implements the Button [design pattern](https://www.lightningdesignsystem.com/components/buttons) in React.

// Buttons are used within many other controls in this library. There are many variations, as well as stateful buttons. Buttons are made of one or more `ButtonViews`. Stateful buttons have three views, but most buttons only have one.

/* TODO: Add a full API description of the control here. */

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../../lib/lib';

// Use the [shared core](../../core/button.html), which contains logic that is the same in every facade.
import ButtonCore, {CONTROL} from '../../core/button';

// React is an external depdencies of the project.
import React from 'react';

// [State](../mixins/state.html), [Events](../mixins/events.html), and [genericWillMount](../mixins/generic-will-mount.html) are mixins that appear in every facade and bring some consistency between how each framework deals with instantiation, events, and state.
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Use the [shared button view core](../../core/button-view.html) and `isIcon` to check `propTypes` passed.
import ButtonViewCore from '../../core/button-view';
import isIcon from '../mixins/custom-prop-types/icon.js';

// Use `ButtonView` as children with `Button`.
import ButtonView from './button-view';

let Button = Lib.merge({}, ButtonCore, {
	// The React facade specifically is also extended via React's standard mixin model. These three mixins hook into native React lifecycle events and expose functionality needed for a cross-framework core. For example, some places in the core or traits a `setState` method is used. In React this is built in to the framework, and the other facades simply borrow the idea for their own use. Similarly, a `setProperties` method is available but in React it is actually a `noop` because React expects a one-way data flow, while in other Frameworks it typically does something very similar to `setState`.
	mixins: [State, Events, genericWillMount],

	// Always use the canonical control name (set in the core) as the React display name.
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

		/* TODO: Decide if this valid. Picklist needs spans and SVG as children.
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
		} */
	},
	
		// While some functionality moves into the core or traits, each facade typically provides its own rendering logic so that it can take advantage of the benefits offered by the framework and maintain appropriate patterns for that framework.
	_renderViews () {
		// Clone children (if they exist) passed with the same `iconPosition`
		const views = React.Children.map(this.props.children, (child, index) => {
			return React.cloneElement(child, { iconPosition: this.props.iconPosition, key: index });
		}) || [];

		// `Button` always needs at least one `ButtonView`
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
	
	// `_getClassNames` can be found in the [shared core](../../core/button.html).
	render () {
		// Alow any props not listed to be added to the `<button>` such as `onClick`.
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
		const isStateful = React.Children.count(this.props.children) || this.props.selectable;
		return (
			<button type="button"
				className={this._getClassNames(this.props.className, isStateful)}
				{...props}>{this._renderViews()}</button>
		);
	}
});

// `Helpers` are a feature of Facades that allows anyone to register code that can manipulate the control before it is encapsulated in a React class. This allows flexibility for adding custom behavior without modifying the original source, or for adding optional behavior. For example, the jQuery facade uses this mechanism to optionally create jQuery plugin versions of each control. Nothing in the control itself should ever depend on the presence of helpers, as they are completely optional.
Button = Lib.runHelpers('react', CONTROL, Button);

// Once everything has been merged together and all registered helpers have been run we can create the React class and export the result for consumption by our apps.
Button = React.createClass(Button);

export default Button;
