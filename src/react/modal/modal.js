/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Modal Component --- SLDS for React

// Implements the [Modal design pattern](https://www.lightningdesignsystem.com/components/modals) in React.

// [![Modal component example screenshot](/assets/demo-site/images/component-examples/modal.png "See a live example of the Modal component in action")](/react/modal)

// > See a [live example](/react/modal) of the Modal component in action

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib               from '../../lib/lib';

// Use the [shared core](../../core/modal.html), which contains logic that is
// shared across SLDS for JavaScript.
import ModalCore, { CONTROL } from '../../core/modal';

// ### React and ReactDOM
// React and ReactDOM are external dependencies of the project.
import React                  from 'react';
import ReactDOM               from 'react-dom';

// #### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// SLDS for React uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames             from 'classnames';

// ### Mixins

// These are mixins that appear in all of SLDS for Javascript,
// bringing consistency to instantiation, events, and state.

// #### Events
// [../mixins/events](../mixins/events.html)
import Events                 from '../mixins/events';

// #### Generic Will Mount
// [../mixins/generic-will-mount](../mixins/generic-will-mount.html)
import genericWillMount       from '../mixins/generic-will-mount';

// #### State
// [../mixins/state](../mixins/state.html)
import State                  from '../mixins/state';

// ### Children

// #### Default Renderers
// [./modal-default-renderers](./modal-default-renderers.html)
// Provides the default renderers for the header, and the footer.
import DefaultRenderers       from './modal-default-renderers';

// ## Modal Object
export const ModalDefinition = {
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
	mixins: [State, Events, genericWillMount],

	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: CONTROL,

	// ### Prop Types
	propTypes: {
		headerTagline       : React.PropTypes.any,
		headerTitle         : React.PropTypes.any,
		isOpen              : React.PropTypes.bool,
		onCancel            : React.PropTypes.func,
		onClose             : React.PropTypes.func,
		onPrimary           : React.PropTypes.func,
		primaryButtonText   : React.PropTypes.string,
		secondaryButtonText : React.PropTypes.string,
		triggerNode         : React.PropTypes.object
	},

	// ### Get Default Props
	getDefaultProps() {
		// [DefaultRenderers](#children--DefaultRenderers)
		return DefaultRenderers;
	},

	// ### Render
	render() {
		return (
			<div>
				<div aria-hidden="false" role="dialog" className={classNames (this.cssClasses.MODAL, {
				'slds-fade-in-open': this.props.isOpen
			})} onClick={this._onBackgroundClick} ref={this._setBackgroundRef}>
					<div className={this.cssClasses.MODALCONTAINER} ref={this._setModalRef}>
						<div className="slds-modal__header">
							{this.props.renderHeader ({
								onCloseClick        : this._onClose,
								headerTitle         : this.props.headerTitle,
								headerTagline       : this.props.headerTagline
			})}
						</div>
						<div className="slds-modal__content | slds-p-around--medium">
							{this.props.children}
						</div>
						<div className="slds-modal__footer">
							{this.props.renderFooter ({
								onPrimaryClick      : this._onPrimaryClick,
								onSecondaryClick    : this._onSecondaryClick,
								secondaryButtonText : this.props.secondaryButtonText,
								primaryButtonText   : this.props.primaryButtonText
			})}
						</div>
					</div>
				</div>
				<div className={classNames ('slds-backdrop', {
				'slds-backdrop--open': this.props.isOpen
			})}></div>
			</div>
			);
	},

	// ### Set Background Ref
	_setBackgroundRef(background) {
		this.elements.background = Lib.wrapElement(ReactDOM.findDOMNode(background));
	},

	// ### Set Modal Ref
	_setModalRef(modal) {
		this.elements.modal = Lib.wrapElement(ReactDOM.findDOMNode(modal));

		this.props.onClose();
	},

	// ### On Close
	_onClose() {
		if (this.props.triggerNode) {
			ReactDOM.findDOMNode(this.props.triggerNode).focus();
		}
		this.props.onCancel();
	},

	// ### On Secondary Click
	_onSecondaryClick() {
		if (this.props.triggerNode) {
			ReactDOM.findDOMNode (this.props.triggerNode).focus();
		}
		this.props.onCancel();
	},

	// ### On Background Click
	_onBackgroundClick(e) {
		if (e.target && this.backgroundClicked(e.target)) {
			this.props.onClose();
		}
	},

	// ### On Primary Click
	_onPrimaryClick() {
		if (this.props.triggerNode) {
			ReactDOM.findDOMNode(this.props.triggerNode).focus();
		}
	}
};

// ## Modal

// SLDS for React **extends objects** by merging them together, rather than
// via the prototype chain or imitation of object-oriented inheritance.
// The important thing to remember is that _some methods will be available 
// to the component which are not declared in this file_.

// These are not magic methods, they're not black box methods, but you do need
// to trace the dependencies of the component to see where they are coming
// from. In particular, Modal extends its [core](../../core/modal.html),
// which in turn extends the base component.

let Modal = Lib.merge(
	{},
	ModalCore,
	ModalDefinition
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
Modal = Lib.runHelpers('react', CONTROL, Modal);

// Once everything has been merged together and all registered helpers have
// been run we can create the React class and export the result for
// consumption by our apps.
Modal = React.createClass(Modal);

export default Modal;
