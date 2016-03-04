/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Spinner Component --- SLDS for React

// Implements the [Spinner design pattern](https://www.lightningdesignsystem.com/components/spinners) in React.

// [<div class="slds-spinner--large"><img src="/assets/design-system/images/spinners/slds_spinner.gif" alt="See a live example of the Spinner component in action..."></div>](/react/spinner)

// > See a [live example](/react/spinner) of the Spinner component in action

// ## API
/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib                from '../../lib/lib';

// Use the [shared core](../../core/spinner.html), which contains logic that is shared across SLDS for JavaScript.
import SpinnerCore, { CONTROL } from '../../core/spinner';

// ### React
// React is an external dependency of the project.
import React                   from 'react';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Generic Will Mount
// [../mixins/generic-will-mount](../mixins/generic-will-mount.html)
import genericWillMount        from '../mixins/generic-will-mount';

// #### State
// [../mixins/state](../mixins/state.html)
import State                   from '../mixins/state';

// ## Spinner

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Spinner extends its [core](../../core/spinner.html),
// which in turn extends the base component.

export const SpinnerDefinition = {
	// ### Mixins

	// SLDS for React specifically is also extended via React's standard
	// mixin model. These three mixins hook into native React Wycliffe events
	// and expose functionality needed for a cross-framework core. For
	// example, some places in the core or traits a `setState` method is used.
	//
	// In React this is built in to the framework, while SLDS for jQuery
	// simply borrow the idea for its own use.
	//
	// Similarly, a `setProperties` method is available but in React it is
	// actually a `noop` because React expects a one-way data flow, while in
	// other Frameworks it typically does something very similar to
	// `setState`.
	mixins: [State, genericWillMount],

	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		size: React.PropTypes.oneOf(Object.keys(SpinnerCore.sizes)),
		theme: React.PropTypes.oneOf(Object.keys(SpinnerCore.fileNames))
	},

	// ## Render
	render () {
		const strings = this.state.strings;

		return (
			<div className={this.sizes[this.props.size]}>
				<img src={this.fileNames[this.props.theme]} alt={strings.LOADING} />
			</div>
		);
	}
};

let Spinner = Lib.merge(
	{},
	SpinnerCore,
	SpinnerDefinition
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
Spinner = Lib.runHelpers('react', CONTROL, Spinner);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Spinner = React.createClass(Spinner);

export default Spinner;
