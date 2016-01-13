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
		renderFooter: React.PropTypes.func,
		renderHeader: React.PropTypes.func,
		secondaryButtonText: React.PropTypes.string
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
								onCloseClick: this.props.onClose,
								headerTitle: this.props.headerTitle,
								headerTagline: this.props.headerTagline
							})}
						</div>
						<div className="slds-modal__content">
							{this.props.children}
						</div>
						<div className="slds-modal__footer">
							{this.props.renderFooter({
								onPrimaryClick: this.props.onPrimary,
								onSecondaryClick: this.props.onCancel,
								secondaryButtonText: this.props.secondaryButtonText,
								primaryButtonText: this.props.primaryButtonText
							})}
						</div>
					</div>
				</div>
				<div className={classNames('slds-modal-backdrop', {'slds-modal-backdrop--open': this.props.isOpen} )}></div>
			</div>
		);
	},

	_setBackgroundRef (background) {
		this.elements.background = Lib.wrapElement(ReactDOM.findDOMNode(background));
	},

	_setModalRef (modal) {
		this.elements.modal = Lib.wrapElement(ReactDOM.findDOMNode(modal));
	},

	_onBackgroundClick (e) {
		if (e.target && this.backgroundClicked(e.target)) {
			this.props.onClose();
		}
	}
};

let Modal = Lib.merge({}, ModalCore, ModalObject);

Modal = Lib.runHelpers('react', CONTROL, Modal);
Modal = React.createClass(Modal);

export default Modal;
