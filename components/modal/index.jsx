/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable react/prefer-es6-class */

// Implements the [Modal design pattern](https://lightningdesignsystem.com/components/modals/) in React.
// Based on SLDS v2.2.1

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Button from '../button';
import classNames from 'classnames';
import ReactModal from 'react-modal';

// ### isBoolean
import isBoolean from 'lodash.isboolean';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

const displayName = 'Modal';
const propTypes = {
	/**
	 * Vertical alignment of Modal.
	 */
	align: PropTypes.oneOf(['top', 'center']),
	/**
	 * Modal content.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * Text read aloud by screen readers when the user focuses on the Close Button.
	 */
	closeButtonAssistiveText: PropTypes.string,
	/**
	 * Custom CSS classes for the modal's container. This is the element with `.slds-modal__container`. Use `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	containerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string
	]),
	/**
	 * Custom CSS classes for the modal's body. This is the element that has overflow rules and should be used to set a static height if desired. Use `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	contentClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string
	]),
	/**
	 * Custom styles for the modal's body. This is the element that has overflow rules and should be used to set a static height if desired.
	 */
	contentStyle: PropTypes.object,
	/**
	 * If true, modal footer buttons render left and right. An example use case would be for "back" and "next" buttons.
	 */
	directional: PropTypes.bool,
	/**
	 * If true, Modals can be dismissed by clicking on the close icon or pressing esc key.
	 */
	dismissible: PropTypes.bool,
	/**
	 * If true, Modals can be dismissed by clicking outside of modal. If unspecified, defaults to dismissible.
	 */
	dismissOnClickOutside: PropTypes.bool,
	/**
	 * Callback to fire with Modal is dismissed
	 */
	onRequestClose: PropTypes.func,
	/**
	 * Accepts either a node or array of buttons to be placed in the footer. If array, the buttons render on the right side by default but are floated left and right if <code>directional</code> is true.
	 */
	footer: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
	/**
	 * Allows for a custom modal header that does not scroll with modal content. If this is defined, `title` and `tagline` will be ignored. The close button will still be present.
	 */
	header: PropTypes.node,
	/**
	 * Adds CSS classes to the container surrounding the modal header and the close button. Use `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	headerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string
	]),
	/**
	 * Forces the modal to be open or closed.
	 */
	isOpen: PropTypes.bool.isRequired,
	/**
	 * Function that returns parent node to contain Modal. Should return document.querySelector('#myModalContainer').
	 */
	parentSelector: PropTypes.func,
	/**
	 * Custom CSS classes for the portal DOM node. This node is a direct descendant of the `body` and is the parent of `ReactModal__Overlay`. Use `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	portalClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string
	]),
	/**
	 * Styles the modal as a prompt.
	 */
	prompt: PropTypes.oneOf([
		'success',
		'warning',
		'error',
		'wrench',
		'offline',
		'info'
	]),
	/**
	 * Specifiies the modal's width. May be deprecated in favor of `width` in the future.
	 */
	size: PropTypes.oneOf(['medium', 'large']),
	/**
	 * Content underneath the title in the modal header.
	 */
	tagline: PropTypes.node,
	/**
	 * Text heading at the top of a modal.
	 */
	title: PropTypes.node,
	/**
	 * Allows adding additional notifications within the modal.
	 */
	toast: PropTypes.node
};

const defaultProps = {
	align: 'center',
	dismissible: true
};

/**
 * The Modal component is used for the Lightning Design System Modal and Notification > Prompt components. The Modal opens from a state change outside of the component itself (pass this state to the <code>isOpen</code> prop). For more details on the Prompt markup, please review the <a href="http://www.lightningdesignsystem.com/components/notifications#prompt">Notifications > Prompt</a>.
 *
 * By default, `Modal` will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies. To prevent this you can add the following to your application with `#mount` being the root node of your application that you would like to hide from assistive technologies when the `Modal` is open.
 * ```
 * import settings from 'design-system-react/components/settings';
 * settings.setAppElement('#mount');
 * ```
 * This component uses a portalMount (a disconnected React subtree mount) to create a modal as a child of `body`.
 */
class Modal extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isClosing: false
		};

		// Bind
		this.handleModalClick = this.handleModalClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.dismissModalOnClickOutside = this.dismissModalOnClickOutside.bind(
			this
		);
	}

	setReturnFocus () {
		this.setState({
			returnFocusTo: document.activeElement
		});
	}

	componentDidMount () {
		this.setReturnFocus();
		this.updateBodyScroll();
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.props.isOpen !== prevProps.isOpen) {
			this.updateBodyScroll();
		}
		if (this.state.isClosing !== prevState.isClosing) {
			if (this.state.isClosing) {
				// console.log("CLOSING: ');
				if (!this.isUnmounting) {
					const el = ReactDOM.findDOMNode(this).parentNode; // eslint-disable-line react/no-find-dom-node
					if (el && el.getAttribute('data-slds-modal')) {
						ReactDOM.unmountComponentAtNode(el);
						document.body.removeChild(el);
					}
				}
			}
		}
	}

	componentWillMount () {
		this.generatedId = shortid.generate();
	}

	componentWillUnmount () {
		this.isUnmounting = true;
		this.clearBodyScroll();
	}

	getId () {
		return this.props.id || this.generatedId;
	}

	dismissModalOnClickOutside () {
		// if dismissOnClickOutside is not set, default its value to dismissible
		const dismissOnClickOutside = isBoolean(this.props.dismissOnClickOutside)
			? this.props.dismissOnClickOutside
			: this.props.dismissible;

		if (dismissOnClickOutside) {
			this.dismissModal();
		}
	}

	closeModal () {
		if (this.props.dismissible) {
			this.dismissModal();
		}
	}

	dismissModal () {
		this.setState({ isClosing: true });
		if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
			this.state.returnFocusTo.focus();
		}
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	}

	handleSubmitModal () {
		this.closeModal();
	}

	updateBodyScroll () {
		if (window && document && document.body) {
			if (this.props.isOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'inherit';
			}
		}
	}

	clearBodyScroll () {
		// eslint-disable-line class-methods-use-this
		if (window && document && document.body) {
			document.body.style.overflow = 'inherit';
		}
	}

	handleModalClick (event) {
		// eslint-disable-line class-methods-use-this
		if (event && event.stopPropagation) {
			event.stopPropagation();
		}
	}

	isPrompt () {
		return this.props.prompt !== undefined;
	}

	footerComponent () {
		let footer = null;
		const hasFooter = this.props.footer;
		const footerClass = {
			'slds-modal__footer': true,
			'slds-modal__footer--directional': this.props.directional,
			'slds-theme--default': this.isPrompt()
		};

		if (hasFooter) {
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			footer = (
				<footer
					className={classNames(footerClass, this.props.footerClassNames)}
					onClick={this.handleModalClick}
				>
					{this.props.footer}
				</footer>
			);
		}
		return footer;
	}

	headerComponent () {
		let headerContent = this.props.header;
		const headerEmpty =
			!headerContent && !this.props.title && !this.props.tagline;
		const closeButtonAssistiveText =
			this.props.closeButtonAssistiveText || 'Close';
		const closeButton = (
			<Button
				assistiveText={closeButtonAssistiveText}
				iconName="close"
				iconSize="large"
				inverse
				className="slds-modal__close"
				onClick={this.closeModal}
				title={closeButtonAssistiveText}
				variant="icon"
			/>
		);

		if ((!headerContent && this.props.title) || this.props.tagline) {
			headerContent = (
				<div>
					{this.props.toast}
					<h2
						className={classNames({
							'slds-text-heading--small': this.isPrompt(),
							'slds-text-heading--medium': !this.isPrompt()
						})}
						id={this.getId()}
					>
						{this.props.title}
					</h2>
					{this.props.tagline ? (
						<p className="slds-m-top--x-small">{this.props.tagline}</p>
					) : null}
				</div>
			);
		}

		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<header
				className={classNames(
					'slds-modal__header',
					{
						'slds-modal__header--empty': headerEmpty,
						[`slds-theme--${this.props.prompt}`]: this.isPrompt(),
						'slds-theme--alert-texture': this.isPrompt()
					},
					this.props.headerClassName
				)}
				onClick={this.handleModalClick}
			>
				{this.props.dismissible ? closeButton : null}
				{headerContent}
			</header>
		);
	}

	getModal () {
		const modalStyle =
			this.props.align === 'top' ? { justifyContent: 'flex-start' } : null;
		const borderRadius =
			this.props.title || this.props.header ? {} : { borderRadius: '.25rem' };
		const contentStyleFromProps = this.props.contentStyle || {};
		const contentStyle = {
			...borderRadius,
			...contentStyleFromProps
		};
		return (
			// temporarily disabling eslint for the onClicks on the div tags
			/* eslint-disable */
			<div
				aria-labelledby={this.getId()}
				className={classNames({
					'slds-modal': true,
					'slds-fade-in-open': true,
					'slds-modal--large': this.props.size === 'large',
					'slds-modal--prompt': this.isPrompt()
				})}
				onClick={this.dismissModalOnClickOutside}
				role="dialog"
			>
				<div
					className={classNames(
						'slds-modal__container',
						this.props.containerClassName
					)}
					style={modalStyle}
				>
					{this.headerComponent()}
					<div
						className={classNames(
							'slds-modal__content',
							this.props.contentClassName
						)}
						style={contentStyle}
						onClick={this.handleModalClick}
					>
						{this.props.children}
					</div>
					{this.footerComponent()}
				</div>
			</div>
			/* eslint-enable */
		);
	}

	render () {
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
				padding: 'default'
			},
			overlay: {
				position: 'static',
				backgroundColor: 'default'
			}
		};

		return (
			<ReactModal
				contentLabel="Modal"
				isOpen={this.props.isOpen}
				onRequestClose={this.closeModal}
				style={customStyles}
				parentSelector={this.props.parentSelector}
				portalClassName={classNames(
					'ReactModalPortal',
					this.props.portalClassName
				)}
			>
				{this.getModal()}
				<div className="slds-backdrop slds-backdrop--open" />
			</ReactModal>
		);
	}
}

Modal.displayName = displayName;
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
