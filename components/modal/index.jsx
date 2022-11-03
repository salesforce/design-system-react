/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable react/prefer-es6-class, jsx-a11y/no-noninteractive-element-interactions */

// Implements the [Modal design pattern](https://lightningdesignsystem.com/components/modals/) in React.
// Based on SLDS v2.2.1

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import classNames from 'classnames';
import ReactModal from 'react-modal';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import checkAppElementIsSet from '../../utilities/warning/check-app-element-set';

import Button from '../button';

import { MODAL } from '../../utilities/constants';
import componentDoc from './component.json';

const documentDefined = typeof document !== 'undefined';
const windowDefined = typeof window !== 'undefined';

const propTypes = {
	/**
	 * Vertical alignment of Modal.
	 */
	align: PropTypes.oneOf(['top', 'center']),
	/**
	 * Boolean indicating if the appElement should be hidden.
	 */
	ariaHideApp: PropTypes.bool,
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `dialogLabel`: This is a visually hidden label for the dialog. If not provided, `heading` is used.
	 * * `dialogLabelledBy`: This describes which node labels the dialog. If not provided and dialogLabel is unavailable, `id` is used.
	 * * `closeButton`: This is a visually hidden label for the close button.
	 */
	assistiveText: PropTypes.shape({
		dialogLabel: PropTypes.string,
		dialogLabelledBy: PropTypes.string,
		closeButton: PropTypes.string,
	}),
	/**
	 * Modal content.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * Custom CSS classes for the modal `section` node classed `.slds-modal` and the parent of `.slds-modal__container`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Custom CSS classes for the modal's container. This is the child element of `.slds-modal` with class `.slds-modal__container`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	containerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Custom CSS classes for the modal's body. This is the element that has overflow rules and should be used to set a static height if desired. Use `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	contentClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
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
	 * If true, Modals cannot be dismissed by clicking on the close icon or pressing esc key.
	 */
	disableClose: PropTypes.bool,
	/**
	 * If true, Modals can be dismissed by clicking outside of modal. If unspecified, defaults to disableClose.
	 */
	dismissOnClickOutside: PropTypes.bool,
	/**
	 * Callback to fire with Modal is dismissed
	 */
	onRequestClose: PropTypes.func,
	/**
	 * Accepts a node or array of nodes that are typically a `Button` or `ProgressIndicator`. If an array, the nodes render on the right side first but are then floated left and right if <code>directional</code> prop is `true`.
	 */
	footer: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
	/**
	 * Allows for a custom modal header that does not scroll with modal content. If this is defined, `heading` and `tagline` will be ignored. The close button will still be present.
	 */
	header: PropTypes.node,
	/**
	 * Adds CSS classes to the container surrounding the modal header and the close button. Use `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	headerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Unique identifier for the modal. The id is automatically generated if not provided
	 */
	id: PropTypes.string,
	/**
	 * Forces the modal to be open or closed.
	 */
	isOpen: PropTypes.bool.isRequired,
	/**
	 * Function whose return value is the mount node to insert the Modal element into. The default is `() => document.body`.
	 */
	parentSelector: PropTypes.func,
	/**
	 * Custom CSS classes for the portal DOM node. This node is a direct descendant of the `body` and is the parent of `ReactModal__Overlay`. Use `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	portalClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
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
		'info',
	]),
	/**
	 * Specifies the modal's width. May be deprecated in favor of `width` in the future.
	 */
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	/**
	 * Content underneath the heading in the modal header.
	 */
	tagline: PropTypes.node,
	/**
	 * Content underneath the title in the modal header.
	 */
	title: PropTypes.node,
	/**
	 * Text heading at the top of a modal.
	 */
	heading: PropTypes.node,
	/**
	 * Allows adding additional notifications within the modal.
	 */
	toast: PropTypes.node,
};

const defaultProps = {
	assistiveText: {
		dialogLabelledBy: '',
		closeButton: 'Close',
	},
	align: 'center',
	ariaHideApp: true,
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
	constructor(props) {
		super(props);
		this.state = {
			isClosing: false,
		};

		// Bind
		this.handleModalClick = this.handleModalClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.dismissModalOnClickOutside = this.dismissModalOnClickOutside.bind(
			this
		);

		this.generatedId = shortid.generate();
		checkProps(MODAL, props, componentDoc);
		if (props.ariaHideApp) {
			checkAppElementIsSet();
		}

		this.selfRef = React.createRef();
	}

	componentDidMount() {
		this.setReturnFocus();
		this.updateBodyScroll();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.isOpen !== prevProps.isOpen) {
			this.updateBodyScroll();
		}
		if (this.state.isClosing !== prevState.isClosing) {
			if (this.state.isClosing) {
				// This section of code should be removed once trigger.jsx
				// and manager.jsx are removed. They appear to have
				// been created in order to do modals in portals.
				if (!this.isUnmounting) {
					if (
						this.selfRef &&
						this.selfRef.parentNode &&
						this.selfRef.parentNode.getAttribute('data-slds-modal')
					) {
						ReactDOM.unmountComponentAtNode(this.selfRef);
						document.body.removeChild(this.selfRef);
					}
				}
			}
		}
	}

	componentWillUnmount() {
		this.isUnmounting = true;
		this.clearBodyScroll();
	}

	getId() {
		return this.props.id || this.generatedId;
	}

	getBorderRadius() {
		const borderRadiusValue = '.25rem';
		const borderTopRadius =
			this.props.title || this.props.heading || this.props.header
				? {}
				: {
						borderTopLeftRadius: borderRadiusValue,
						borderTopRightRadius: borderRadiusValue,
				  };
		const borderBottomRadius = this.props.footer
			? {}
			: {
					borderBottomLeftRadius: borderRadiusValue,
					borderBottomRightRadius: borderRadiusValue,
			  };
		return {
			...borderTopRadius,
			...borderBottomRadius,
		};
	}

	getAriaAttributes() {
		const ariaAttributes = {
			describedby: `${this.getId()}-modal-content`,
			modal: 'true',
		};

		if (this.props.assistiveText.dialogLabel) {
			ariaAttributes.label = this.props.assistiveText.dialogLabel;
			return ariaAttributes;
		}

		let dialogLabelledBy = null;

		if (this.props.assistiveText.dialogLabelledBy) {
			// eslint-disable-next-line prefer-destructuring
			dialogLabelledBy = this.props.assistiveText.dialogLabelledBy;
		} else if (this.props.heading || this.props.title) {
			dialogLabelledBy = `${this.getId()}-heading`;
		}

		ariaAttributes.labelledby = dialogLabelledBy;

		return ariaAttributes;
	}

	getModal() {
		const modalStyle =
			this.props.align === 'top' ? { justifyContent: 'flex-start' } : null;
		const borderRadius = this.getBorderRadius();
		const contentStyleFromProps = this.props.contentStyle || {};
		const contentStyle = {
			...borderRadius,
			...contentStyleFromProps,
		};

		return (
			// temporarily disabling eslint for the onClicks on the div tags
			/* eslint-disable */
			<section
				className={classNames(
					'slds-modal',
					'slds-fade-in-open',
					this.props.size ? `slds-modal_${this.props.size}` : null,
					{ 'slds-modal_prompt': this.isPrompt() },
					this.props.className
				)}
				onClick={this.dismissModalOnClickOutside}
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
						id={`${this.getId()}-modal-content`}
						style={contentStyle}
						onClick={this.handleModalClick}
					>
						{this.props.children}
					</div>
					{this.footerComponent()}
				</div>
			</section>
			/* eslint-enable */
		);
	}

	setReturnFocus() {
		this.setState({
			returnFocusTo: documentDefined ? document.activeElement : null,
		});
	}

	// eslint-disable-next-line class-methods-use-this
	clearBodyScroll() {
		if (windowDefined && documentDefined && document.body) {
			document.body.style.overflow = 'inherit';
		}
	}

	closeModal() {
		if (!this.props.disableClose) {
			this.dismissModal();
		}
	}

	dismissModal() {
		this.setState({ isClosing: true });
		if (this.state.returnFocusTo && this.state.returnFocusTo.focus) {
			this.state.returnFocusTo.focus();
		}
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	}

	dismissModalOnClickOutside() {
		// if dismissOnClickOutside is not set, default its value to disableClose
		const dismissOnClickOutside =
			this.props.dismissOnClickOutside !== undefined
				? this.props.dismissOnClickOutside
				: !this.props.disableClose;

		if (dismissOnClickOutside) {
			this.dismissModal();
		}
	}

	footerComponent() {
		let footer = null;
		const hasFooter = this.props.footer;
		const footerClass = {
			'slds-modal__footer': true,
			'slds-modal__footer_directional': this.props.directional,
			'slds-theme_default': this.isPrompt(),
		};

		if (hasFooter) {
			footer = ( // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-element-interactions
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

	// eslint-disable-next-line class-methods-use-this
	handleModalClick(event) {
		if (event && event.stopPropagation) {
			event.stopPropagation();
		}
	}

	handleSubmitModal() {
		this.closeModal();
	}

	headerComponent() {
		let headerContent = this.props.header;
		const headerEmpty =
			!headerContent &&
			!(this.props.heading || this.props.title) &&
			!this.props.tagline;
		const assistiveText = {
			...defaultProps.assistiveText,
			...this.props.assistiveText,
		};
		const closeButtonAssistiveText =
			this.props.closeButtonAssistiveText || assistiveText.closeButton;
		const closeButton = (
			<Button
				assistiveText={{ icon: closeButtonAssistiveText }}
				iconCategory="utility"
				iconName="close"
				iconSize="large"
				inverse
				className="slds-button_icon slds-modal__close"
				onClick={this.closeModal}
				title={closeButtonAssistiveText}
				variant="icon"
			/>
		);

		if (
			(!headerContent && (this.props.heading || this.props.title)) ||
			this.props.tagline
		) {
			headerContent = (
				<div>
					{this.props.toast}
					<h1
						className={classNames({
							'slds-text-heading_small': this.isPrompt(),
							'slds-text-heading_medium': !this.isPrompt(),
						})}
						id={`${this.getId()}-heading`}
					>
						{this.props.heading ? this.props.heading : this.props.title}
					</h1>
					{this.props.tagline ? (
						<p className="slds-m-top_x-small">{this.props.tagline}</p>
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
						'slds-modal__header_empty': headerEmpty,
						[`slds-theme_${this.props.prompt}`]: this.isPrompt(),
						'slds-theme_alert-texture': this.isPrompt(),
					},
					this.props.headerClassName
				)}
				onClick={this.handleModalClick}
			>
				{this.props.disableClose ? null : closeButton}
				{headerContent}
			</header>
		);
	}

	isPrompt() {
		return this.props.prompt !== undefined;
	}

	updateBodyScroll() {
		if (windowDefined && documentDefined && document.body) {
			if (this.props.isOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'inherit';
			}
		}
	}

	render() {
		const ariaAttributes = this.getAriaAttributes();
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
				zIndex: 8000, // following SLDS guideline for z-index overlay
				backgroundColor: 'default',
			},
		};

		return (
			<ReactModal
				aria={ariaAttributes}
				ariaHideApp={this.props.ariaHideApp}
				isOpen={this.props.isOpen}
				onRequestClose={this.closeModal}
				role={this.props.disableClose ? 'alertdialog' : 'dialog'}
				style={customStyles}
				parentSelector={this.props.parentSelector}
				portalClassName={classNames(
					'ReactModalPortal',
					this.props.portalClassName
				)}
			>
				{this.getModal()}
				<div className="slds-backdrop slds-backdrop_open" />
			</ReactModal>
		);
	}
}

Modal.displayName = MODAL;
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
