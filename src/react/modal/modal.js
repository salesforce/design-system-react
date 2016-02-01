/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// MODAL CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ModalCore, {CONTROL} from '../../core/modal';

// Framework specific
import React from 'react';
import ReactDOM from 'react-dom';
import Events from '../mixins/events';
import State from '../mixins/state';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

// Provides the default renderers for the header, and the footer.
import DefaultRenderers from './modal-default-renderers';

export const ModalObject = {
	mixins: [State, Events, genericWillMount],

	displayName: CONTROL,

	propTypes: {
		headerTagline: React.PropTypes.any,
		headerTitle: React.PropTypes.any,
		isOpen: React.PropTypes.bool,
		onCancel: React.PropTypes.func,
		onClose: React.PropTypes.func,
		onPrimary: React.PropTypes.func,
		primaryButtonText: React.PropTypes.string,
		secondaryButtonText: React.PropTypes.string,
		triggerNode: React.PropTypes.object
	},

	getDefaultProps () {
		return DefaultRenderers;
	},

	render () {
		return (
			<div>
				<div aria-hidden="false" role="dialog" className={classNames(this.cssClasses.MODAL, {'slds-fade-in-open': this.props.isOpen} )} onClick={this._onBackgroundClick} ref={this._setBackgroundRef}>
					<div className={this.cssClasses.MODALCONTAINER} ref={this._setModalRef}>
						<div className="slds-modal__header">
							{this.props.renderHeader({
								onCloseClick: this._onClose,
								headerTitle: this.props.headerTitle,
								headerTagline: this.props.headerTagline
							})}
						</div>
						<div className="slds-modal__content | slds-p-around--medium">
							{this.props.children}
						</div>
						<div className="slds-modal__footer">
							{this.props.renderFooter({
								onPrimaryClick: this._onPrimaryClick,
								onSecondaryClick: this._onSecondaryClick,
								secondaryButtonText: this.props.secondaryButtonText,
								primaryButtonText: this.props.primaryButtonText
							})}
						</div>
					</div>
				</div>
				<div className={classNames('slds-backdrop', {'slds-backdrop--open': this.props.isOpen} )}></div>
			</div>
		);
	},

	_setBackgroundRef (background) {
		this.elements.background = Lib.wrapElement(ReactDOM.findDOMNode(background));
	},

	_setModalRef (modal) {
		this.elements.modal = Lib.wrapElement(ReactDOM.findDOMNode(modal));

		this.props.onClose();
	},

	_onClose () {
		if (this.props.triggerNode) {
			ReactDOM.findDOMNode(this.props.triggerNode).focus();
		}
		this.props.onCancel();
	},

	_onSecondaryClick () {
		console.log('test');

		if (this.props.triggerNode) {
			ReactDOM.findDOMNode(this.props.triggerNode).focus();
		}
		this.props.onCancel();
	},

	_onBackgroundClick (e) {
		if (e.target && this.backgroundClicked(e.target)) {
			this.props.onClose();
		}
	},

	_onPrimaryClick () {
		console.log(this.props.triggerNode);

		if (this.props.triggerNode) {
			ReactDOM.findDOMNode(this.props.triggerNode).focus();
		}
	}
};

let Modal = Lib.merge({}, ModalCore, ModalObject);

Modal = Lib.runHelpers('react', CONTROL, Modal);
Modal = React.createClass(Modal);

export default Modal;
