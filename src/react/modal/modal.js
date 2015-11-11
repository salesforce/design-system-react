// MODAL CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ModalCore, {CONTROL} from '../../core/modal';

// Framework specific
import React from 'react';
import ReactDOM from 'react-dom';
import Events from '../mixins/events';

// Third party
import classNames from 'classnames';

// Children
import Svg from '../svg/svg';

export const ModalObject = {
	mixins: [Events],

	displayName: CONTROL,
	
	propTypes: {
		isOpen: React.PropTypes.bool,
		secondaryBtnText: React.PropTypes.string,
		primaryBtnText: React.PropTypes.string,
		onClose: React.PropTypes.func,
		onCancel: React.PropTypes.func,
		onAction: React.PropTypes.func
	},

	render () {
		return (
			<div>
				<div aria-hidden="false" role="dialog" className={classNames('slds-modal', {'slds-fade-in-open': this.props.isOpen} )} onClick={this._onBackgroundClick} ref="background">
					<div className="slds-modal__container" ref="modal">
						<div className="slds-modal__header">
							<h2 className="slds-text-heading--medium">Modal Header</h2>
							<button className="slds-button slds-button--icon-inverse slds-modal__close" onClick={this._onCloseClick}>
								<Svg className="slds-button__icon slds-button__icon--large" icon="utility.close" />
								<span className="slds-assistive-text">Close</span>
							</button>
						</div>
						<div className="slds-modal__content">
							{this.props.children}
						</div>
						<div className="slds-modal__footer">
							<button className="slds-button slds-button--neutral" onClick={this._onCancelClick}>{this.props.secondaryBtnText}</button>
							<button className="slds-button slds-button--neutral slds-button--brand" onClick={this._onCancelClick}>{this.props.primaryBtnText}</button>
						</div>
					</div>
				</div>
				<div className={classNames('slds-modal-backdrop', {'slds-modal-backdrop--open': this.props.isOpen} )}></div>
			</div>
		);
	},

	_onCloseClick () {
		this.props.onClose();
	},

	_onCancelClick () {
		this.props.onCancel();
	},

	_onBackgroundClick (ev) {
		if (ev.target === this.refs.background || ev.target === this.refs.modal) {
			this.props.onClose();
		}
	}
};

let Modal = Lib.merge({}, ModalCore, ModalObject);

Modal = Lib.runHelpers('react', CONTROL, Modal);
Modal = React.createClass(Modal);

export default Modal;
