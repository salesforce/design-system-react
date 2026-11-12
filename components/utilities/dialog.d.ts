/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import type { ReactNode, KeyboardEvent, CSSProperties } from 'react';

export type DialogAlign =
	| 'top'
	| 'top left'
	| 'top right'
	| 'bottom'
	| 'bottom left'
	| 'bottom right'
	| 'right'
	| 'right top'
	| 'right bottom'
	| 'left'
	| 'left top'
	| 'left bottom';

export interface DialogProps {
	/** Alignment of the dialog relative to the trigger */
	align?: DialogAlign;
	/** Content to render inside the dialog */
	children?: ReactNode;
	/** CSS class name for the dialog container */
	className?: string;
	/** Whether to close the dialog when Tab key is pressed */
	closeOnTabKey?: boolean;
	/** CSS class name for the dialog contents */
	contentsClassName?: string;
	/** Context for icon settings */
	context?: unknown;
	/** Whether the dialog has a nubbin (arrow pointer) */
	hasNubbin?: boolean;
	/** Prevents the dialog from repositioning based on viewport */
	hasStaticAlignment?: boolean;
	/** Element to inherit width from */
	inheritWidthOf?: 'target' | 'none';
	/** Offset from the target element */
	offset?: string;
	/** Called when the dialog is closed */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onClose?: (event?: any, data?: { componentWillUnmount?: boolean }) => void;
	/** Called when the dialog is cancelled */
	onCancel?: () => void;
	/** Called when a key is pressed */
	onKeyDown?: (event: KeyboardEvent) => void;
	/** Called to get the target element for positioning */
	onRequestTargetElement?: () => HTMLElement | null;
	/** CSS class to ignore when detecting outside clicks */
	outsideClickIgnoreClass?: string;
	/** Position strategy for the dialog */
	position?: 'absolute' | 'overflowBoundaryElement' | 'relative';
	/** Additional inline styles */
	style?: CSSProperties;
	/** Container props passed to the wrapper element */
	containerProps?: Record<string, unknown>;
	/** Called when mouse enters the dialog */
	onMouseEnter?: (event: React.MouseEvent) => void;
	/** Called when mouse leaves the dialog */
	onMouseLeave?: (event: React.MouseEvent) => void;
	/** Variant of the dialog */
	variant?: 'base' | 'tooltip' | 'popover' | 'modal';
	/** Called when the dialog is opened */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onOpen?: (event?: any, data?: { portal?: HTMLElement }) => void;
}

declare const Dialog: React.ForwardRefExoticComponent<
	DialogProps & React.RefAttributes<HTMLElement>
>;

export default Dialog;

