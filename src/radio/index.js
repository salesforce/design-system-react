/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Radio Component --- SLDS for React

// Implements the [Radio design pattern](https://www.lightningdesignsystem.com/components/forms#radio) in React. This is similar to both the Picklist and the Pills, but currently there is no inheritance from either component.


// > See a [live example](/react/radio) of the Radio component in action

// ## API

/* @todo Add a full API description of the component here. */

// ## Dependencies

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// SLDS for React uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames from 'classnames';

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from 'slds-for-js-core/lib';

// Use the [shared core](../../core/radio.html), which contains logic that is
// shared across SLDS for JavaScript.
import RadioCore, { CONTROL } from 'slds-for-js-core/radio';

// ### React
// React is an external dependencies of the project.
import React from 'react';

// ### CheckboxObject
// [../checkbox/checkbox](../checkbox/checkbox.html)
import { CheckboxDefinition } from '../checkbox';

// ## RadioObject
export const RadioDefinition = {
	// ### Display Name
	// > Always use the canonical component name (set in the core) as the
	// > React display name.
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

	_renderInput () {
		return (
			<input
				name     = {this.props.name}
				type     = "radio"
				disabled = {this.props.disabled}
				checked  = {this.checked()}
				value    = {this.props.value || ''}
				onChange = {this.check}
			/>
		);
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
};

// ## Radio

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Radio extends its [core](../../core/radio.html),
// which in turn extends the base component and a series of traits.

let Radio = Lib.merge(
	{},
	RadioCore,
	CheckboxDefinition,
	RadioDefinition
);

// ### Run the helpers

// `Helpers` are a feature of SLDS for React that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// Nothing in the component itself should ever depend on the presence
// of helpers, as they are completely optional.
Radio = Lib.runHelpers('react', CONTROL, Radio);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Radio = React.createClass(Radio);

export default Radio;
