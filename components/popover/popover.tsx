/* eslint-disable max-lines */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useId,
	useContext,
	type ReactNode,
	type ReactElement,
	type MouseEvent,
	type KeyboardEvent,
	type FocusEvent,
	type CSSProperties,
} from 'react';
import classNames from 'classnames';

import Button from '../button';
import MediaObject from '../media-object';
import Icon from '../icon';
import Dialog from '../utilities/dialog';
import keyboardNavigableDialog from '../../utilities/keyboard-navigable-dialog';
import KEYS from '../../utilities/key-code';
import { POPOVER } from '../../utilities/constants';
import { IconSettingsContext } from '../icon-settings';

const documentDefined = typeof document !== 'undefined';

// Shared overlay element for click-outside detection over iframes
const overlay = documentDefined
	? document.createElement('span')
	: ({ style: {} } as HTMLSpanElement);
if (documentDefined) {
	overlay.style.top = '0';
	overlay.style.left = '0';
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.position = 'absolute';
}

// Track currently open popover for single-popover-at-a-time behavior
let currentOpenPopover: {
	handleClose: (
		event: MouseEvent | KeyboardEvent | undefined,
		data: PopoverRequestCloseData
	) => void;
	getId: () => string;
} | null = null;

/**
 * Popover alignment options
 */
export type PopoverAlign =
	| 'top'
	| 'top left'
	| 'top right'
	| 'right'
	| 'right top'
	| 'right bottom'
	| 'bottom'
	| 'bottom left'
	| 'bottom right'
	| 'left'
	| 'left top'
	| 'left bottom';

/**
 * Popover position options
 */
export type PopoverPosition =
	'absolute' | 'overflowBoundaryElement' | 'relative';

/**
 * Popover variant options
 */
export type PopoverVariant =
	| 'base'
	| 'error'
	| 'feature'
	| 'walkthrough'
	| 'walkthrough-action'
	| 'warning';

/**
 * Assistive text for Popover
 */
export interface PopoverAssistiveText {
	closeButton?: string;
}

/**
 * What caused `onRequestClose` to fire:
 * * `cancel`: the close button was clicked or Escape was pressed
 * * `clickOutside`: a click landed outside the popover
 * * `mouseLeave`: the mouse left the trigger/popover (`openOn` `hover`/`hybrid`) and `hoverCloseDelay` elapsed
 * * `newPopover`: another Popover opened (only one can be open at a time)
 * * `triggerClick`: the trigger was clicked while the popover was open
 */
export type PopoverRequestCloseTrigger =
	'cancel' | 'clickOutside' | 'mouseLeave' | 'newPopover' | 'triggerClick';

/**
 * Data passed to `onRequestClose`
 */
export interface PopoverRequestCloseData {
	/** What caused the close request */
	trigger: PopoverRequestCloseTrigger;
	/** HTML id of the popover being closed. Only present when `trigger` is `newPopover`. */
	id?: string;
}

/**
 * Data passed to `onOpen`
 */
export interface PopoverOpenData {
	/** The rendered popover dialog element */
	portal?: HTMLElement;
}

/**
 * Data passed to `onClose`
 */
export interface PopoverCloseData {
	/** `true` when the popover dialog is closing because it is being unmounted */
	componentWillUnmount: boolean;
}

/**
 * Props for the Popover component
 */
export interface PopoverProps {
	/** Alignment relative to trigger */
	align?: PopoverAlign;
	/** Accessibility labels */
	assistiveText?: PopoverAssistiveText;
	/** HTML id of heading for aria-labelledby */
	ariaLabelledby?: string;
	/** Trigger element (first child) and optional other children */
	children: ReactNode;
	/** Popover body content */
	body: ReactNode;
	/** CSS classes for body */
	classNameBody?: string | string[] | Record<string, boolean>;
	/** CSS classes for footer */
	classNameFooter?: string | string[] | Record<string, boolean>;
	/** @deprecated Use classNameFooter */
	footerClassName?: string | string[] | Record<string, boolean>;
	/** CSS classes for popover container */
	className?: string | string[] | Record<string, boolean>;
	/** CSS classes for contents wrapper */
	contentsClassName?: string | string[] | Record<string, boolean>;
	/** Disable the popover */
	disabled?: boolean;
	/** Footer content */
	footer?: ReactNode;
	/** Footer styles */
	footerStyle?: CSSProperties;
	/** Walkthrough footer actions */
	footerWalkthroughActions?: ReactNode | ReactNode[];
	/** Hide close button */
	hasNoCloseButton?: boolean;
	/** Hide nubbin/arrow */
	hasNoNubbin?: boolean;
	/** Prevent position flipping */
	hasStaticAlignment?: boolean;
	/** Remove trigger inline-block style */
	hasNoTriggerStyles?: boolean;
	/** Popover heading */
	heading?: ReactNode;
	/** Icon for feature variant */
	icon?: ReactNode;
	/** HTML id */
	id?: string;
	/** Controlled open state */
	isOpen?: boolean;
	/** Offset from target */
	offset?: string;
	/** Click handler */
	onClick?: (event: MouseEvent) => void;
	/** Called after the popover dialog has closed (unmounted). There is no triggering event, so `event` is `undefined`. */
	onClose?: (event: undefined, data: PopoverCloseData) => void;
	/** Focus handler */
	onFocus?: (event: FocusEvent) => void;
	/** Key down handler */
	onKeyDown?: (event: KeyboardEvent) => void;
	/** Mouse down handler */
	onMouseDown?: (event: MouseEvent) => void;
	/** Mouse enter handler */
	onMouseEnter?: (event: MouseEvent) => void;
	/** Mouse leave handler */
	onMouseLeave?: (event: MouseEvent) => void;
	/** Called after the popover dialog has opened and rendered. There is no triggering event, so `event` is `undefined`. */
	onOpen?: (event: undefined, data: PopoverOpenData) => void;
	/**
	 * Called when the popover requests to close. `data.trigger` says why. `event` is the triggering
	 * click or key event, or `undefined` when there is none (`mouseLeave` timer, `newPopover`).
	 */
	onRequestClose?: (
		event: MouseEvent | KeyboardEvent | undefined,
		data: PopoverRequestCloseData
	) => void;
	/** Custom target element getter */
	onRequestTargetElement?: () => HTMLElement | null;
	/** Open trigger type */
	openOn?: 'click' | 'hover' | 'hybrid';
	/** Overlay for click-outside on iframes */
	overlay?: boolean | ((isOpen: boolean, overlayElement: HTMLElement) => void);
	/** Positioning strategy */
	position?: PopoverPosition;
	/** Walkthrough step text */
	stepText?: string;
	/** Custom styles */
	style?: CSSProperties;
	/** CSS classes for trigger wrapper */
	triggerClassName?: string | string[] | Record<string, boolean>;
	/** Popover variant */
	variant?: PopoverVariant;
	/** Delay before closing on hover (ms) */
	hoverCloseDelay?: number;
	/** @deprecated Use assistiveText.closeButton */
	closeButtonAssistiveText?: string;
}

// Nubbin positions for export (legacy)
export const PopoverNubbinPositions = [
	'top left',
	'top',
	'top right',
	'bottom left',
	'bottom',
	'bottom right',
];

const defaultAssistiveText: PopoverAssistiveText = {
	closeButton: 'Close dialog',
};

/**
 * The Popover component is a non-modal dialog. It should be paired with a clickable
 * trigger such as a Button. It traps focus from the page and must be exited if focus
 * needs to be outside the Popover.
 */
const Popover = ({
	align = 'right',
	assistiveText: propAssistiveText,
	ariaLabelledby,
	children,
	body,
	classNameBody,
	classNameFooter,
	footerClassName,
	className,
	contentsClassName,
	disabled = false,
	footer,
	footerStyle,
	footerWalkthroughActions,
	hasNoCloseButton = false,
	hasNoNubbin = false,
	hasStaticAlignment = false,
	hasNoTriggerStyles = false,
	heading,
	icon,
	id: propId,
	isOpen: controlledIsOpen,
	offset,
	onClick,
	onClose,
	onFocus,
	onKeyDown,
	onMouseDown,
	onMouseEnter,
	onMouseLeave,
	onOpen,
	onRequestClose,
	onRequestTargetElement,
	openOn = 'click',
	overlay: overlayProp,
	position = 'absolute',
	stepText,
	style,
	triggerClassName,
	variant = 'base',
	hoverCloseDelay = 300,
	closeButtonAssistiveText,
}: PopoverProps): ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	const context = useContext(IconSettingsContext);

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const finalCloseButtonAssistiveText =
		closeButtonAssistiveText || assistiveText.closeButton;

	// State
	const [internalIsOpen, setInternalIsOpen] = useState(false);
	const [inputRendered, setInputRendered] = useState(false);

	// Refs
	const triggerRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLElement>(null);
	const isHoverRef = useRef(false);
	const isClosingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const overlayRef = useRef<HTMLSpanElement | null>(null);
	const isUnmountingRef = useRef(false);

	// Derived state
	const isOpen =
		!disabled &&
		(controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen);

	// Get target element for positioning
	const getTargetElement = useCallback(() => {
		if (onRequestTargetElement) {
			const target = onRequestTargetElement();
			if (target) return target;
		}
		return triggerRef.current;
	}, [onRequestTargetElement]);

	// Handle dialog close (when unmounted)
	const handleDialogClose = useCallback(
		(
			_event?: React.SyntheticEvent,
			data?: { componentWillUnmount?: boolean }
		) => {
			const componentWillUnmount = data?.componentWillUnmount || false;

			if (currentOpenPopover?.getId() === id) {
				currentOpenPopover = null;
			}

			if (onClose) {
				onClose(undefined, { componentWillUnmount });
			}
		},
		[id, onClose]
	);

	// Handle dialog open (after it has rendered)
	const handleDialogOpen = useCallback(
		(_event?: unknown, data?: { portal?: HTMLElement }) => {
			if (onOpen) {
				onOpen(undefined, { portal: data?.portal });
			}
		},
		[onOpen]
	);

	// Handle close
	const handleClose = useCallback(
		(
			event: MouseEvent | KeyboardEvent | undefined,
			data: PopoverRequestCloseData
		) => {
			if (isOpen) {
				if (onRequestClose) {
					onRequestClose(event, data);
				}

				if (currentOpenPopover?.getId() === id) {
					currentOpenPopover = null;
				}

				setInternalIsOpen(false);
				isHoverRef.current = false;
			}
		},
		[isOpen, id, onRequestClose]
	);

	// Latest `handleClose`, so the "close the other open popover" path does not call a stale
	// closure from when this popover opened (whose `isOpen` was still `false`).
	const handleCloseRef = useRef(handleClose);
	useEffect(() => {
		handleCloseRef.current = handleClose;
	}, [handleClose]);

	// Handle open
	const handleOpen = useCallback(() => {
		if (!isOpen) {
			// Close any other open popover
			if (currentOpenPopover && currentOpenPopover.getId() !== id) {
				currentOpenPopover.handleClose(undefined, {
					trigger: 'newPopover',
					id: currentOpenPopover.getId(),
				});
			}

			currentOpenPopover = {
				handleClose: (event, data) => handleCloseRef.current(event, data),
				getId: () => id,
			};

			setInternalIsOpen(true);
		}
	}, [isOpen, id]);

	// Handle cancel (close button or escape)
	const handleCancel = useCallback(
		(event: MouseEvent | KeyboardEvent) => {
			handleClose(event, { trigger: 'cancel' });
		},
		[handleClose]
	);

	// Handle click outside
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			handleClose(event, { trigger: 'clickOutside' });
		},
		[handleClose]
	);

	// Handle mouse enter
	const handleMouseEnter = useCallback(
		(event: MouseEvent) => {
			isHoverRef.current = true;

			if (!isOpen && openOn === 'hover') {
				handleOpen();
			} else {
				if (isClosingRef.current) {
					clearTimeout(isClosingRef.current);
				}
			}

			if (onMouseEnter) {
				onMouseEnter(event);
			}
		},
		[isOpen, openOn, handleOpen, onMouseEnter]
	);

	// Handle mouse leave
	const handleMouseLeave = useCallback(
		(event: MouseEvent) => {
			if (isOpen) {
				isClosingRef.current = setTimeout(() => {
					handleClose(undefined, { trigger: 'mouseLeave' });
				}, hoverCloseDelay);
			}

			if (onMouseLeave) {
				onMouseLeave(event);
			}
		},
		[isOpen, hoverCloseDelay, handleClose, onMouseLeave]
	);

	// Handle click
	const handleClick = useCallback(
		(event: MouseEvent, triggerOnClickCallback?: (e: MouseEvent) => void) => {
			if (!isOpen) {
				handleOpen();
			} else {
				handleClose(event, { trigger: 'triggerClick' });
			}

			if (onClick) {
				onClick(event);
			}

			if (triggerOnClickCallback) {
				triggerOnClickCallback(event);
			}
		},
		[isOpen, handleOpen, handleClose, onClick]
	);

	// Handle focus
	const handleFocus = useCallback(
		(event: FocusEvent) => {
			if (!isOpen) {
				handleOpen();
			}

			if (onFocus) {
				onFocus(event);
			}
		},
		[isOpen, handleOpen, onFocus]
	);

	// Toggle from keyboard
	const toggleOpenFromKeyboard = useCallback(
		(event: KeyboardEvent) => {
			if (isOpen) {
				handleCancel(event);
			} else {
				handleOpen();
			}
		},
		[isOpen, handleCancel, handleOpen]
	);

	// Handle key down
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.keyCode) {
				if (event.keyCode !== KEYS.TAB) {
					keyboardNavigableDialog({
						event,
						isOpen,
						handleClick: (e: MouseEvent) => handleClick(e),
						keyCode: event.keyCode,
						eventTarget: event.target,
						// keyboardNavigableDialog calls `toggleOpen()` without the event; pass it through
						toggleOpen: () => toggleOpenFromKeyboard(event),
						trigger: triggerRef.current,
					});
				}
				if (onKeyDown) {
					onKeyDown(event);
				}
			}
		},
		[isOpen, handleClick, toggleOpenFromKeyboard, onKeyDown]
	);

	// Render overlay for click-outside detection
	const renderOverlay = useCallback(
		(shouldShow: boolean) => {
			if (typeof overlayProp === 'function' && documentDefined) {
				overlayProp(shouldShow, overlay);
			} else if (
				overlayProp &&
				shouldShow &&
				!overlayRef.current &&
				documentDefined
			) {
				overlayRef.current = overlay;
				document.querySelector('body')?.appendChild(overlay);
			} else if (!shouldShow && overlayRef.current?.parentNode) {
				overlayRef.current.parentNode.removeChild(overlayRef.current);
				overlayRef.current = null;
			}
		},
		[overlayProp]
	);

	// Container ref callback
	const setContainerRef = useCallback(
		(component: HTMLDivElement | null) => {
			(triggerRef as React.MutableRefObject<HTMLDivElement | null>).current =
				component;
			if (component && !inputRendered) {
				setInputRendered(true);
			}
		},
		[inputRendered]
	);

	// Dialog ref callback
	const setMenuRef = useCallback((component: HTMLElement | null) => {
		(dialogRef as React.MutableRefObject<HTMLElement | null>).current =
			component;
	}, []);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			isUnmountingRef.current = true;
			if (currentOpenPopover?.getId() === id) {
				currentOpenPopover = null;
			}
			renderOverlay(false);
		};
	}, [id, renderOverlay]);

	// Update overlay when isOpen changes
	useEffect(() => {
		renderOverlay(isOpen);
	}, [isOpen, renderOverlay]);

	// Render header
	const renderHeader = () => {
		const hasThemedHeader = variant === 'error' || variant === 'warning';
		const hasDefinedHeader = heading || hasThemedHeader;

		if (
			!hasDefinedHeader ||
			variant === 'walkthrough-action' ||
			variant === 'feature'
		) {
			return null;
		}

		const headerIcon = {
			error: <Icon category="utility" name="error" size="x-small" inverse />,
			warning: (
				<Icon category="utility" name="warning" size="x-small" inverse />
			),
		};

		if (hasThemedHeader) {
			return (
				<header className="slds-popover__header">
					<MediaObject
						body={
							<h2
								id={ariaLabelledby || `${id}-dialog-heading`}
								className="slds-truncate slds-text-heading_medium"
								title={typeof heading === 'string' ? heading : undefined}
							>
								{heading}
							</h2>
						}
						figure={headerIcon[variant as 'error' | 'warning']}
						verticalCenter
					/>
				</header>
			);
		}

		return (
			<header
				className={classNames('slds-popover__header', {
					'slds-p-vertical_medium': variant === 'walkthrough',
				})}
			>
				<h2
					id={ariaLabelledby || `${id}-dialog-heading`}
					className={classNames({
						'slds-text-heading_small': variant !== 'walkthrough',
						'slds-text-heading_medium': variant === 'walkthrough',
					})}
				>
					{heading}
				</h2>
			</header>
		);
	};

	// Render body
	const renderBody = () => {
		if (variant === 'error' || variant === 'warning') {
			return (
				<div
					id={`${id}-dialog-body`}
					className={classNames('slds-popover__body', classNameBody as string)}
				>
					{body}
				</div>
			);
		}

		if (variant === 'walkthrough-action' || variant === 'feature') {
			return (
				<div
					className={classNames('slds-popover__body', classNameBody as string)}
					id={`${id}-dialog-body`}
				>
					<div className="slds-media">
						<div className="slds-media__figure">
							{variant === 'walkthrough-action' ? (
								<Icon
									category="utility"
									name="touch_action"
									size="small"
									inverse
								/>
							) : (
								icon
							)}
						</div>
						<div className="slds-media__body">
							{heading && (
								<h2
									id={ariaLabelledby || `${id}-dialog-heading`}
									className="slds-text-heading_small"
								>
									{heading}
								</h2>
							)}
							{body}
							{stepText && (
								<p className="slds-m-top_medium slds-text-title">{stepText}</p>
							)}
						</div>
					</div>
				</div>
			);
		}

		return (
			<div
				id={`${id}-dialog-body`}
				className={classNames('slds-popover__body', classNameBody as string)}
			>
				{body}
			</div>
		);
	};

	// Render footer
	const renderFooter = () => {
		if (footer) {
			return (
				<footer
					className={classNames(
						'slds-popover__footer',
						classNameFooter as string,
						footerClassName as string
					)}
					style={footerStyle}
				>
					{footer}
				</footer>
			);
		}

		if (
			variant !== 'walkthrough-action' &&
			(footerWalkthroughActions || stepText)
		) {
			return (
				<footer
					className={classNames(
						'slds-popover__footer',
						classNameFooter as string,
						footerClassName as string
					)}
				>
					<div className="slds-grid slds-grid_vertical-align-center">
						{stepText && <span className="slds-text-title">{stepText}</span>}
						{footerWalkthroughActions && (
							<div
								className="slds-col_bump-left"
								style={{ display: 'inline-block' }}
							>
								{footerWalkthroughActions}
							</div>
						)}
					</div>
				</footer>
			);
		}

		return null;
	};

	// Render dialog
	const renderDialog = () => {
		if (!isOpen) return null;

		const outsideClickIgnoreClass = `ignore-click-${id}`;

		return (
			<Dialog
				hasNubbin={!hasNoNubbin}
				align={align}
				contentsClassName={classNames(
					contentsClassName as string,
					'ignore-react-onclickoutside',
					'slds-popover',
					{ 'slds-popover_error': variant === 'error' },
					{
						'slds-popover_walkthrough':
							variant === 'walkthrough' ||
							variant === 'walkthrough-action' ||
							variant === 'feature',
					},
					{ 'slds-popover_walkthrough-alt': variant === 'walkthrough-action' },
					{ 'slds-popover_feature': variant === 'feature' },
					{ 'slds-popover_warning': variant === 'warning' },
					className as string
				)}
				context={context}
				hasStaticAlignment={hasStaticAlignment}
				offset={offset}
				onClose={handleDialogClose}
				onOpen={handleDialogOpen}
				onKeyDown={handleKeyDown}
				onMouseEnter={openOn === 'hover' ? handleMouseEnter : undefined}
				onMouseLeave={openOn === 'hover' ? handleMouseLeave : undefined}
				outsideClickIgnoreClass={outsideClickIgnoreClass}
				onRequestTargetElement={getTargetElement}
				position={position}
				style={style}
				variant="popover"
				ref={setMenuRef}
				containerProps={{
					id: `${id}-popover`,
					'aria-labelledby': ariaLabelledby || `${id}-dialog-heading`,
					'aria-describedby': `${id}-dialog-body`,
				}}
			>
				{!hasNoCloseButton && (
					<Button
						assistiveText={{ icon: finalCloseButtonAssistiveText }}
						iconCategory="utility"
						iconName="close"
						className={classNames(
							'slds-button slds-button_icon-small slds-float_right slds-popover__close slds-button_icon',
							{
								'slds-button_icon-inverse':
									variant === 'walkthrough' ||
									variant === 'walkthrough-action' ||
									variant === 'feature',
							}
						)}
						onClick={handleCancel}
						variant="icon"
						inverse={variant === 'error' || variant === 'warning'}
					/>
				)}
				{renderHeader()}
				{renderBody()}
				{renderFooter()}
			</Dialog>
		);
	};

	// Clone trigger element
	const otherChildren: ReactNode[] = [];
	let clonedTrigger: ReactNode = null;

	React.Children.forEach(children, (child, index) => {
		if (index === 0 && React.isValidElement(child)) {
			const childProps = child.props as Record<string, unknown>;
			const triggerProps: Record<string, unknown> = {
				'aria-haspopup': 'dialog',
				id,
				onClick:
					openOn === 'click' || openOn === 'hybrid'
						? (event: MouseEvent) => {
								handleClick(
									event,
									childProps.onClick as (e: MouseEvent) => void
								);
							}
						: childProps.onClick,
				onFocus: openOn === 'hover' ? handleFocus : undefined,
				onMouseDown,
				onMouseEnter:
					openOn === 'hover' || openOn === 'hybrid'
						? handleMouseEnter
						: undefined,
				onMouseLeave:
					openOn === 'hover' || openOn === 'hybrid'
						? handleMouseLeave
						: undefined,
				tabIndex: (childProps.tabIndex as number) || 0,
			};
			clonedTrigger = React.cloneElement(child, triggerProps);
		} else if (child) {
			otherChildren.push(child);
		}
	});

	const containerStyles: CSSProperties = {
		display: hasNoTriggerStyles ? undefined : 'inline-block',
	};

	return (
		<div
			className={triggerClassName as string}
			style={containerStyles}
			ref={setContainerRef}
		>
			{clonedTrigger}
			{otherChildren.length > 0 ? otherChildren : null}
			{renderDialog()}
		</div>
	);
};

Popover.displayName = POPOVER;

export default Popover;
