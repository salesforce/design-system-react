/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';

import ReactDOM from 'react-dom';

import Modal from 'react-modal';

import Button from '../../button';
import Icon from '../../icon';
import EventUtil from '../../../utilities/event';

const customStyles = {
	content: {
		position: 'default',
		top: 'default',
		left: 'default',
		right: 'default',
		bottom: 'default',
		border: 'default',
		background: 'default',
		overflow: 'default',
		WebkitOverflowScrolling: 'default',
		borderRadius: 'default',
		outline: 'default',
		padding: 'default',
	},
	overlay: {
		backgroundColor: 'default',
	},
};

// This component should be deprecated and appears to have
// been created in order to do modals in portals.

class Manager extends React.Component {
	static defaultProps = {
		title: '',
		isOpen: false,
	};

	state = {
		isOpen: this.props.isOpen,
		revealed: false,
	};

	componentDidMount() {
		if (!this.state.revealed) {
			setTimeout(() => {
				this.setState({ revealed: true });
			});
		}
		this.updateBodyScroll();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.isOpen !== prevState.isOpen) {
			this.updateBodyScroll();

			if (!this.state.isOpen) {
				if (!this.isUnmounting) {
					// eslint-disable-next-line react/no-find-dom-node
					const el = ReactDOM.findDOMNode(this).parentNode;
					if (el && el.getAttribute('data-slds-modal')) {
						ReactDOM.unmountComponentAtNode(el);
						document.body.removeChild(el);
					}
				}
			}
		}
	}

	componentWillUnmount() {
		this.isUnmounting = true;
	}

	getModal = () => (
		/* eslint-disable jsx-a11y/no-static-element-interactions */
		<div
			className={`slds-modal${this.state.revealed ? ' slds-fade-in-open' : ''}`}
			onClick={this.closeModal}
		>
			<div
				className="slds-modal__container"
				onClick={(e) => {
					EventUtil.trap(e);
				}}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				<div className="slds-modal__header">
					<h2 className="slds-text-heading_medium">{this.props.title}</h2>
					<Button
						className="slds-button slds-modal__close"
						onClick={this.closeModal}
					>
						<Icon name="close" category="utility" size="small" />
						{/* This file is an example file and should not be used */}
						{/* eslint-disable-next-line react/jsx-no-literals */}
						<span className="slds-assistive-text">Close</span>
					</Button>
				</div>

				<div className="slds-modal__content">{this.props.children}</div>
				<div className="slds-modal__footer">{this.props.footer}</div>
			</div>
		</div>
	);

	openModal = () => {
		this.setState({ isOpen: true });
	};

	closeModal = () => {
		this.setState({ isOpen: false });
	};

	handleSubmitModal = () => {
		this.closeModal();
	};

	updateBodyScroll = () => {
		if (window && document && document.body) {
			if (this.state.isOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'inherit';
			}
		}
	};

	render() {
		return (
			<Modal
				isOpen={this.state.isOpen}
				onRequestClose={this.closeModal}
				style={customStyles}
				overlayClassName={`slds-modal-backdrop${
					this.state.revealed ? ' slds-modal-backdrop_open' : ''
				}`}
			>
				{this.getModal()}
			</Modal>
		);
	}
}

export default Manager;
