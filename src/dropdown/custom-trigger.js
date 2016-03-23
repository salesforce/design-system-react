/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Trigger Component (Dropdown, Custom Flavor) --- SLDS for React

// > See a [live example](/react/dropdown) of the Dropdown component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import { merge, runHelpers } from 'slds-for-js-core/lib';

// ### React
// React is an external dependency of the project.
import React from 'react';

// #### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// Façades uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames from 'classnames';

// [Button](../button.html)
import Button from '../button';

// ## DropdownObject
export const TriggerDefinition = {
	// ### Display Name
	displayName: 'Trigger',

	// ### Render
	render () {
		const {
			ariaExpanded,
			className,
			id,
			onKeyDown,
			onKeyPress,
			// ### Additional properties
			// We allow allowing additional cleanly with [object destructuring](https://facebook.github.io/react/docs/transferring-props.html#transferring-with-...-in-jsx).
			...props
		} = this.props;

		return (
			<li className={classNames('slds-context-bar-action', 'slds-grid', className)}
				id={id}
				ariaExpanded={ariaExpanded}
				onKeyDown={onKeyDown}
				onKeyPress={onKeyPress}
				{...props}
			><a className={classNames('slds-context-bar-action__label', 'slds-context-bar-action__label--expand', 'slds-text-link--reset', 'slds-grid', 'slds-grid--vertical-align-center')} >Menu Item 1</a>
				<Button
					assistiveText="Assistive text for submenu"
					className="slds-context-bar-action__trigger"
					iconStyle="icon-bare"
					icon="utility.down"
					aria-haspopup="true"
				/>
				{this.props.menu}
			</li>
		);
	}
};


// ## Trigger

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from.

let Trigger = merge(
	{},
	TriggerDefinition
);

// `Helpers` are a feature of SLDS for React that allows anyone to register code that
// can manipulate the component before it is encapsulated in a React class.
//
// This allows flexibility for adding custom behavior without modifying the
// original source, or for adding optional behavior.
//
// Nothing in the component itself should ever depend on the presence
// of helpers, as they are completely optional.
Trigger = runHelpers('react', 'Trigger', Trigger);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Trigger = React.createClass(Trigger);

export default Trigger;
