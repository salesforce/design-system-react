/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Button View --- SLDS for React

// Helps implement the [Button design pattern](https://www.lightningdesignsystem.com/components/buttons) in React.

// Used by [Button](./button.html).

// ## API

/* @todo Add a full API description of the component here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from 'slds-for-js-core/lib';

// Use the [shared core](../../core/button-view.html), which contains logic
// that is shared across SLDS for JavaScript.
import ButtonViewCore, { CONTROL } from 'slds-for-js-core/components/button-view';

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Is Icon
// The [isIcon mixin](../mixins/custom-prop-types/icon.html) for React to checks whether a prop provides an icon format
import isIcon from '../mixins/custom-prop-types/icon.js';

// #### State
// [../mixins/state](../mixins/state.html)
import State from '../mixins/state';

// The [Svg helper](../svg.html) for React provides a simple wrapper around the markup required for SVGs, and uses `Lib.getSVGPath` to convert strings in the format `sprite file`.`icon name` into full paths.
import Svg from '../svg';

// ## Button View Object
export const ButtonViewObject = {
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		assistiveText : React.PropTypes.string,
		icon          : isIcon,
		iconPosition  : React.PropTypes.oneOf(Object.keys(ButtonViewCore.iconPositions)),
		iconSize      : React.PropTypes.oneOf(Object.keys(ButtonViewCore.buttonIconSizes)),
		text          : React.PropTypes.string,
		view          : React.PropTypes.oneOf(Object.keys(ButtonViewCore.buttonStatefulViewStyles))
	},

	// ### Render Assistive Text
	_renderAssistiveText () {
		if (this.props.assistiveText) {
			return <span className={this.cssClasses.ASSISTIVE_TEXT}>{this.props.assistiveText}</span>;
		}
	},

	// ### Render Icon
	_renderIcon (position) {
		let buttonIconSize = '';

		if (this.props.iconSize) {
			buttonIconSize = this.buttonIconSizes[this.props.iconSize];
		}

		if (this.props.icon && this.props.iconPosition === position) {
			return (<Svg className={this._getIconClassNames(buttonIconSize)} icon={this.props.icon} />);
		}

		if (position === 'right' && this.props.iconStyle === 'icon-more') {
			buttonIconSize = this.buttonIconSizes['x-small'];
			return (<Svg className={this._getIconClassNames(buttonIconSize)} icon={this.moreIcon} />);
		}
	},

	// ### Render
	render () {
		return (
			<span className={this.buttonStatefulViewStyles[this.props.view]}>{this._renderIcon('left')}{this.props.text}{this._renderAssistiveText()}{this._renderIcon('right')}</span>
		);
	}
};

// ## Button View

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, ButtonView extends its [core](../../core/button-view.html),
// which in turn extends the base component.

let ButtonView = Lib.merge(
	{},
	State,
	ButtonViewCore,
	ButtonViewObject
);

ButtonView = React.createClass(ButtonView);

export default ButtonView;
