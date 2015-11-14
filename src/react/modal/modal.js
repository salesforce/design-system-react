// MODAL CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ModalCore, {CONTROL} from '../../core/modal';

// Framework specific
import React from 'react';
import Events from '../mixins/events';

// Third party
import classNames from 'classnames';

// Provides the default renderers for the header, and the footer.
import DefaultRenderers from './modal-default-renderers';
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
		onAction: React.PropTypes.func,
		headerTitle: React.PropTypes.any,
		headerTagline: React.PropTypes.any
	},

	render () {
		return (
			<div>
				<div aria-hidden="false" role="dialog" className={classNames(this.cssClasses.MODAL, {'slds-fade-in-open': this.props.isOpen} )} onClick={this._onBackgroundClick} ref="background">
					<div className={this.cssClasses.MODALCONTAINER} ref="modal">
						{this.props.renderHeader({
							onCloseClick: this._onCloseClick,
							headerTitle: this.props.headerTitle,
							headerTagline: this.props.headerTagline
						})}
						<div className="slds-modal__content">
							{this.props.children}
						</div>
						{this.props.renderFooter({
							onPrimaryClick: this._onPrimaryClick,
							onSecondaryClick: this._onSecondaryClick,
							secondaryBtnText: this.props.secondaryBtnText,
							primaryBtnText: this.props.primaryBtnText
						})}
					</div>
				</div>
				<div className={classNames('slds-modal-backdrop', {'slds-modal-backdrop--open': this.props.isOpen} )}></div>
			</div>
		);
	},

	getDefaultProps () {
		return DefaultRenderers;
	},

	_onCloseClick () {
		this.props.onClose();
	},

	_onSecondaryClick () {
		this.props.onCancel();
	},

	_onBackgroundClick (e) {
		if (e.target && this.backgroundClicked(e.target)) {
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
