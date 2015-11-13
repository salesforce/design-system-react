// MODAL CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ModalCore, {CONTROL} from '../../core/modal';

// Framework specific
import React from 'react';
import Events from '../mixins/events';

// Third party
import classNames from 'classnames';

// Children
import Button from '../button/button';

export const ModalObject = {
	mixins: [Events],

	displayName: CONTROL,
	
	propTypes: {
		isOpen: React.PropTypes.bool,
		headerText: React.PropTypes.string,
		headerTextSize: React.PropTypes.string,
		primaryButtonText: React.PropTypes.string,
		secondaryButtonText: React.PropTypes.string,
		onClose: React.PropTypes.func,
		onCancel: React.PropTypes.func,
		onAction: React.PropTypes.func
	},

	render () {
		return (
			<div>
				<div
					aria-hidden="false"
					role="dialog"
					className={classNames(this.cssClasses.MODAL, {'slds-fade-in-open': this.props.isOpen} )}
					onClick={this._onBackgroundClick}
					ref="background">
					<div className="slds-modal__container" ref="modal">
						<div className="slds-modal__header">
							<h2 className={this.headerTextSize[this.props.headerTextSize]}>{this.props.headerText}</h2>
							<Button
								assistiveText="Close"
								className="slds-modal__close"
								icon="utility.close"
								iconSize="large"
								iconStyle="icon-inverse"
								onClick={this._onCloseClick}/>
						</div>
						<div className="slds-modal__content">
							{this.props.children}
						</div>
						<div className="slds-modal__footer">
							<Button
								text={this.props.secondaryButtonText}
								theme="neutral"
								onClick={this._onCancelClick}/>
							<Button
								text={this.props.primaryButtonText}
								theme="brand"
								onClick={this._onPrimaryClick}/>
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
	},

	_onPrimaryClick () {
		this.props.onPrimary();
	}
};

let Modal = Lib.merge({}, ModalCore, ModalObject);

Modal = Lib.runHelpers('react', CONTROL, Modal);
Modal = React.createClass(Modal);

export default Modal;
