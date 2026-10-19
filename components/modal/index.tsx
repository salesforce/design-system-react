/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Modal design pattern](https://lightningdesignsystem.com/components/modals/) in React.

import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	useRef,
	CSSProperties,
	ReactNode,
	MouseEvent,
	KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';

import checkProps from './check-props';
import checkAppElementIsSet from '../../utilities/warning/check-app-element-set';
import Button from '../button';
import { MODAL } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';
import componentDoc from './component.json';

const documentDefined = typeof document !== 'undefined';
const windowDefined = typeof window !== 'undefined';

// Types
export type ModalAlign = 'top' | 'center';
export type ModalSize = 'small' | 'medium' | 'large';
export type ModalPrompt =
	'success' | 'warning' | 'error' | 'wrench' | 'offline' | 'info';

export interface ModalAssistiveText {
	/** This is a visually hidden label for the dialog. If not provided, `heading` is used. */
	dialogLabel?: string;
	/** This describes which node labels the dialog. If not provided and dialogLabel is unavailable, `id` is used. */
	dialogLabelledBy?: string;
	/** This is a visually hidden label for the close button. */
	closeButton?: string;
}

/**
 * What caused a Modal close request:
 * - `'close-button'`: the header close button was clicked
 * - `'escape'`: the Escape key was pressed
 * - `'click-outside'`: a click landed outside the modal container (on the backdrop area)
 */
export type ModalRequestCloseTrigger =
	'close-button' | 'escape' | 'click-outside';

/**
 * Data passed to `onRequestClose`
 */
export interface ModalRequestCloseData {
	/** What caused the close request */
	trigger: ModalRequestCloseTrigger;
}

/**
 * Event passed to `onRequestClose`: the click (close button / outside click) or
 * keydown (Escape) that caused the request
 */
export type ModalRequestCloseEvent = MouseEvent | KeyboardEvent;

export interface ModalProps {
	/** Vertical alignment of Modal. */
	align?: ModalAlign;
	/**
	 * Boolean indicating if the appElement should be hidden. Defaults to `true`.
	 * This is a pass-through to `react-modal`'s `ariaHideApp` and keeps that library's name and
	 * default, so it is an intentional exception to the rule that boolean props default to `false`.
	 */
	ariaHideApp?: boolean;
	/** Assistive text for accessibility. */
	assistiveText?: ModalAssistiveText;
	/** Modal content. */
	children: ReactNode;
	/** Custom CSS classes for the modal `section` node. */
	className?: string | string[] | Record<string, boolean>;
	/** Custom CSS classes for the modal's container. */
	containerClassName?: string | string[] | Record<string, boolean>;
	/** Custom CSS classes for the modal's body. */
	contentClassName?: string | string[] | Record<string, boolean>;
	/** Custom styles for the modal's body. */
	contentStyle?: CSSProperties;
	/** If true, modal footer buttons render left and right. */
	isDirectional?: boolean;
	/** @deprecated Use `isDirectional` instead. */
	directional?: boolean;
	/** If true, Modals cannot be dismissed by clicking on the close icon or pressing esc key. */
	isNonDismissible?: boolean;
	/** @deprecated Use `isNonDismissible` instead. */
	disableClose?: boolean;
	/** If true, Modals can be dismissed by clicking outside of modal. If unspecified, defaults to !isNonDismissible. */
	dismissOnClickOutside?: boolean;
	/**
	 * Callback to fire when the Modal requests to be dismissed. Receives the triggering
	 * click or keydown event and `data.trigger`: `'close-button'`, `'escape'`, or `'click-outside'`.
	 * Not called when `isNonDismissible` (or `dismissOnClickOutside: false` for outside clicks) prevents it.
	 */
	onRequestClose?: (
		event: ModalRequestCloseEvent,
		data: ModalRequestCloseData
	) => void;
	/** Modal footer content, typically buttons. */
	footer?: ReactNode | ReactNode[];
	/** Custom CSS classes for the footer. */
	footerClassName?: string | string[] | Record<string, boolean>;
	/** Allows for a custom modal header that does not scroll with modal content. */
	header?: ReactNode;
	/** Adds CSS classes to the container surrounding the modal header. */
	headerClassName?: string | string[] | Record<string, boolean>;
	/** Unique identifier for the modal. The id is automatically generated if not provided. */
	id?: string;
	/** Forces the modal to be open or closed. */
	isOpen: boolean;
	/** Function whose return value is the mount node to insert the Modal element into. */
	parentSelector?: () => HTMLElement;
	/** Custom CSS classes for the portal DOM node. */
	portalClassName?: string | string[] | Record<string, boolean>;
	/** Styles the modal as a prompt. */
	prompt?: ModalPrompt;
	/** Specifies the modal's width. */
	size?: ModalSize;
	/** Content underneath the heading in the modal header. */
	tagline?: ReactNode;
	/** Content underneath the title in the modal header. @deprecated Use heading instead */
	title?: ReactNode;
	/** Text heading at the top of a modal. */
	heading?: ReactNode;
	/** Allows adding additional notifications within the modal. */
	toast?: ReactNode;
	/** @deprecated Use assistiveText.closeButton instead */
	closeButtonAssistiveText?: string;
}

const defaultAssistiveText: ModalAssistiveText = {
	dialogLabelledBy: '',
	closeButton: 'Close',
};

/**
 * The Modal component is used for the Lightning Design System Modal and Notification > Prompt components.
 * The Modal opens from a state change outside of the component itself (pass this state to the `isOpen` prop).
 *
 * By default, `Modal` will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies.
 * To prevent this you can add the following to your application with `#mount` being the root node of your application:
 * ```
 * import settings from 'design-system-react/components/settings';
 * settings.setAppElement('#mount');
 * ```
 */
const Modal: React.FC<ModalProps> = ({
	align = 'center',
	ariaHideApp = true,
	assistiveText: assistiveTextProp,
	children,
	className,
	containerClassName,
	contentClassName,
	contentStyle: contentStyleProp,
	isDirectional: isDirectionalProp,
	directional,
	isNonDismissible: isNonDismissibleProp,
	disableClose,
	dismissOnClickOutside,
	onRequestClose,
	footer,
	footerClassName,
	header,
	headerClassName,
	id: idProp,
	isOpen,
	parentSelector,
	portalClassName,
	prompt,
	size,
	tagline,
	title,
	heading,
	toast,
	closeButtonAssistiveText,
}) => {
	const isDirectional = isDirectionalProp ?? directional ?? false;
	const isNonDismissible = isNonDismissibleProp ?? disableClose ?? false;

	// State
	const [returnFocusTo, setReturnFocusTo] = useState<Element | null>(null);

	// Refs
	const generatedId = useRef(generateId());

	// Merged assistive text
	const assistiveText = useMemo(
		() => ({
			...defaultAssistiveText,
			...assistiveTextProp,
		}),
		[assistiveTextProp]
	);

	// ID getter
	const getId = useCallback(() => idProp || generatedId.current, [idProp]);

	// Is this a prompt modal?
	const isPrompt = prompt !== undefined;

	// Check props and warn if the app element isn't set, in development
	useEffect(() => {
		checkProps(MODAL, { directional, disableClose }, componentDoc);
		if (ariaHideApp) {
			checkAppElementIsSet();
		}
	}, []); // Only run on mount

	// Set return focus on mount
	useEffect(() => {
		if (documentDefined) {
			setReturnFocusTo(document.activeElement);
		}
	}, []);

	// Update body scroll when isOpen changes
	useEffect(() => {
		if (windowDefined && documentDefined && document.body) {
			if (isOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'inherit';
			}
		}

		return () => {
			// Clear body scroll on unmount
			if (windowDefined && documentDefined && document.body) {
				document.body.style.overflow = 'inherit';
			}
		};
	}, [isOpen]);

	// Dismiss modal handler
	const dismissModal = useCallback(
		(event: ModalRequestCloseEvent, data: ModalRequestCloseData) => {
			if (
				returnFocusTo &&
				'focus' in returnFocusTo &&
				typeof returnFocusTo.focus === 'function'
			) {
				returnFocusTo.focus();
			}
			if (onRequestClose) {
				onRequestClose(event, data);
			}
		},
		[returnFocusTo, onRequestClose]
	);

	// Close modal handler (respects isNonDismissible)
	const closeModal = useCallback(
		(event: ModalRequestCloseEvent, data: ModalRequestCloseData) => {
			if (!isNonDismissible) {
				dismissModal(event, data);
			}
		},
		[isNonDismissible, dismissModal]
	);

	// Close button click handler
	const handleCloseButtonClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			closeModal(event, { trigger: 'close-button' });
		},
		[closeModal]
	);

	// react-modal's own close request: Escape keydown, or a click directly on its overlay
	const handleReactModalRequestClose = useCallback(
		(event: ModalRequestCloseEvent) => {
			closeModal(event, {
				trigger: event.type === 'keydown' ? 'escape' : 'click-outside',
			});
		},
		[closeModal]
	);

	// Dismiss on click outside handler
	const dismissModalOnClickOutside = useCallback(
		(event: MouseEvent<HTMLElement>) => {
			// if dismissOnClickOutside is not set, default its value to !isNonDismissible
			const shouldDismiss =
				dismissOnClickOutside !== undefined
					? dismissOnClickOutside
					: !isNonDismissible;

			if (shouldDismiss) {
				dismissModal(event, { trigger: 'click-outside' });
			}
		},
		[dismissOnClickOutside, isNonDismissible, dismissModal]
	);

	// Prevent click propagation inside modal
	const handleModalClick = useCallback((event: MouseEvent) => {
		if (event && event.stopPropagation) {
			event.stopPropagation();
		}
	}, []);

	// Calculate border radius based on header/footer presence
	const getBorderRadius = useCallback((): CSSProperties => {
		const borderRadiusValue = '.25rem';
		const hasHeader = heading || header;
		const borderTopRadius = hasHeader
			? {}
			: {
					borderTopLeftRadius: borderRadiusValue,
					borderTopRightRadius: borderRadiusValue,
				};
		const borderBottomRadius = footer
			? {}
			: {
					borderBottomLeftRadius: borderRadiusValue,
					borderBottomRightRadius: borderRadiusValue,
				};
		return {
			...borderTopRadius,
			...borderBottomRadius,
		};
	}, [heading, header, footer]);

	// Get ARIA attributes
	const getAriaAttributes = useCallback(() => {
		const modalId = getId();
		const ariaAttributes: {
			describedby: string;
			modal: boolean;
			label?: string;
			labelledby?: string;
		} = {
			describedby: `${modalId}-modal-content`,
			modal: true,
		};

		if (assistiveText.dialogLabel) {
			ariaAttributes.label = assistiveText.dialogLabel;
			return ariaAttributes;
		}

		let dialogLabelledBy: string | undefined;

		if (assistiveText.dialogLabelledBy) {
			dialogLabelledBy = assistiveText.dialogLabelledBy;
		} else if (heading) {
			dialogLabelledBy = `${modalId}-heading`;
		}

		if (dialogLabelledBy) {
			ariaAttributes.labelledby = dialogLabelledBy;
		}

		return ariaAttributes;
	}, [getId, assistiveText, heading]);

	// Render header
	const renderHeader = () => {
		let headerContent = header;
		const headerEmpty = !headerContent && !heading && !tagline;
		const closeButtonText = assistiveText.closeButton;

		const closeButton = (
			<Button
				assistiveText={{ icon: closeButtonText }}
				iconCategory="utility"
				iconName="close"
				iconSize="large"
				className="slds-button_icon slds-modal__close"
				onClick={handleCloseButtonClick}
				title={closeButtonText}
				variant="icon"
			/>
		);

		if ((!headerContent && heading) || tagline) {
			headerContent = (
				<div>
					{toast}
					<h1
						className={classNames({
							'slds-text-heading_small': isPrompt,
							'slds-text-heading_medium': !isPrompt,
						})}
						id={`${getId()}-heading`}
					>
						{heading}
					</h1>
					{tagline ? <p className="slds-m-top_x-small">{tagline}</p> : null}
				</div>
			);
		}

		return (
			<header
				className={classNames(
					'slds-modal__header',
					{
						'slds-modal__header_empty': headerEmpty,
						[`slds-theme_${prompt}`]: isPrompt,
						'slds-theme_alert-texture': isPrompt,
					},
					headerClassName
				)}
				onClick={handleModalClick}
			>
				{isNonDismissible ? null : closeButton}
				{headerContent}
			</header>
		);
	};

	// Render footer
	const renderFooter = () => {
		if (!footer) {
			return null;
		}

		const footerClasses = {
			'slds-modal__footer': true,
			'slds-modal__footer_directional': isDirectional,
			'slds-theme_default': isPrompt,
		};

		return (
			<footer
				className={classNames(footerClasses, footerClassName)}
				onClick={handleModalClick}
			>
				{footer}
			</footer>
		);
	};

	// Render modal content
	const renderModal = () => {
		const modalStyle =
			align === 'top' ? { justifyContent: 'flex-start' } : undefined;
		const borderRadius = getBorderRadius();
		const contentStyle: CSSProperties = {
			...borderRadius,
			...contentStyleProp,
		};

		return (
			<section
				className={classNames(
					'slds-modal',
					'slds-fade-in-open',
					size ? `slds-modal_${size}` : null,
					{ 'slds-modal_prompt': isPrompt },
					className
				)}
				onClick={dismissModalOnClickOutside}
			>
				<div
					className={classNames('slds-modal__container', containerClassName)}
					style={modalStyle}
				>
					{renderHeader()}
					<div
						className={classNames('slds-modal__content', contentClassName)}
						id={`${getId()}-modal-content`}
						style={contentStyle}
						onClick={handleModalClick}
					>
						{children}
					</div>
					{renderFooter()}
				</div>
			</section>
		);
	};

	// Custom styles for ReactModal - using undefined to reset default styles
	const customStyles: ReactModal.Styles = {
		content: {
			position: undefined,
			top: undefined,
			left: undefined,
			right: undefined,
			bottom: undefined,
			border: undefined,
			background: undefined,
			overflow: undefined,
			WebkitOverflowScrolling: undefined,
			borderRadius: undefined,
			outline: undefined,
			padding: undefined,
		},
		overlay: {
			zIndex: 8000, // following SLDS guideline for z-index overlay
			backgroundColor: undefined,
		},
	};

	const ariaAttributes = getAriaAttributes();

	return (
		<ReactModal
			aria={ariaAttributes}
			ariaHideApp={ariaHideApp}
			isOpen={isOpen}
			onRequestClose={handleReactModalRequestClose}
			role={isNonDismissible ? 'alertdialog' : 'dialog'}
			style={customStyles}
			parentSelector={parentSelector}
			portalClassName={classNames('ReactModalPortal', portalClassName)}
		>
			{renderModal()}
			<div className="slds-backdrop slds-backdrop_open" />
		</ReactModal>
	);
};

Modal.displayName = MODAL;

export default Modal;
