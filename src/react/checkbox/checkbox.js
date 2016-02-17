/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Checkbox Component --- React Facade

// Implements the [Checkbox design pattern](https://www.lightningdesignsystem.com/components/forms#checkbox) in React.

// [![Checkbox component example screenshot](/assets/demo-site/images/component-examples/checkbox.png "See a live example of the Checkbox component in action")](/react/checkbox)

// > See a [live example](/react/checkbox) of the Checkbox component in action

// ## API
/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                  from '../../lib/lib';

// Use the [shared core](../../core/checkbox.html), which contains logic that
// is the same in every facade.
import CheckboxCore, { CONTROL } from '../../core/checkbox';

// ### React
// React is an external dependency of the project.
import React                     from 'react';

// #### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// Façades uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames                from 'classnames';

// ### Mixins

// These are mixins that appear in every Façade, bringing consistency between
// how each framework deals with instantiation, events, and state.

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                    from '../mixins/events';

// #### Generic Will Mount
// [../mixins/generic-will-mount](../mixins/generic-will-mount.html)
import genericWillMount          from '../mixins/generic-will-mount';

// #### State
// [../mixins/state](../mixins/state.html)
import State                     from '../mixins/state';

// ## Checkbox Object
export const CheckboxObject = {
	// ### Mixins

	// The React facade specifically is also extended via React's standard
	// mixin model. These three mixins hook into native React Wycliffe events
	// and expose functionality needed for a cross-framework core. For
	// example, some places in the core or traits a `setState` method is used.
	//
	// In React this is built in to the framework, and the other facades
	// simply borrow the idea for their own use.
	//
	// Similarly, a `setProperties` method is available but in React it is
	// actually a `noop` because React expects a one-way data flow, while in
	// other Frameworks it typically does something very similar to
	// `setState`.
	mixins: [State, Events, genericWillMount],

	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		checked    : React.PropTypes.bool,
		disabled   : React.PropTypes.bool,
		labelText  : React.PropTypes.string,
		name       : React.PropTypes.string.isRequired,
		onChanged  : React.PropTypes.func,
		onDisabled : React.PropTypes.func,
		onEnabled  : React.PropTypes.func,
		value      : React.PropTypes.string
	},

	// ### Render
	render () {
		return (
			<label className={classNames(this.cssClasses.CONTROL)}>
				{this._renderInput()}
				<span className={classNames(this.cssClasses.FAUX)}></span>
				{this._renderLabelText()}
			</label>
		);
	},

	// ### Render Input
	_renderInput () {
		return (
			<input
				name     = {this.props.name}
				type     = "checkbox"
				disabled = {this.props.disabled}
				checked  = {this.props.checked}
				value    = {this.props.value || ''}
				onChange = {this.toggle}
			/>
		);
	},

	// ### Render Label Text
	_renderLabelText () {
		if (this.props.labelText) {
			return <span className={classNames(this.cssClasses.LABEL)}>{this.props.labelText}</span>;
		}
	}
};

// ## Checkbox

// Façades **extends objects** by merging them together, rather than via the
// prototype chain or imitation of object-oriented inheritance. The important
// thing to remember is that _some methods will be available to the component
// which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Checkbox extends its [core](../../core/checkbox.html),
// which in turn extends the base component.

let Checkbox = Lib.merge(
	{},
	CheckboxCore,
	CheckboxObject
);

// ### Run the helpers

// `Helpers` are a feature of Façades that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// For example, the jQuery facade uses this mechanism to optionally create
// jQuery plug-in versions of each component. Nothing in the component itself
// should ever depend on the presence of helpers, as they are completely
// optional.
Checkbox = Lib.runHelpers('react', CONTROL, Checkbox);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Checkbox = React.createClass(Checkbox);

export default Checkbox;
