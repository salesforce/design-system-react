/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tooltip

import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useContext,
	type ReactNode,
	type CSSProperties,
	type KeyboardEvent,
	type FocusEvent,
	type MouseEvent,
} from 'react';
import classNames from 'classnames';

import EventUtil from '../../utilities/event';
import { useControllableState } from '../../utilities/hooks';
import { POPOVER_TOOLTIP } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';
import { renderTrigger, type TriggerRender } from '../../utilities/merge-props';

import Dialog from '../utilities/dialog';
import Icon from '../icon';
// eslint-disable-next-line import/no-cycle
import Button from '../button';

// This component's `checkProps` which issues warnings to developers about properties when in development mode
import checkProps from './check-props';
import componentDoc from './component.json';
import { IconSettingsContext } from '../icon-settings';

// ### Types

export type TooltipAlign =
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

export type TooltipPosition =
	'absolute' | 'overflowBoundaryElement' | 'relative';

export type TooltipTheme = 'info' | 'error';

export type TooltipIconVariant = 'bare' | 'error' | 'inverse' | 'warning';

export type TooltipVariant = 'base' | 'learnMore' | 'list-item';

export interface TooltipAssistiveText {
	/** This text is inside the info icon within the tooltip content and exists to "complete the sentence" for assistive tech users. */
	tooltipTipLearnMoreIcon?: string;
	/** This text is inside the info icon that triggers the tooltip in order to have text within the link. */
	triggerLearnMoreIcon?: string;
}

export interface TooltipLabels {
	/** This label appears in the tooltip after the info icon. */
	learnMoreAfter?: string;
	/** This label appears in the tooltip before the info icon. */
	learnMoreBefore?: string;
}

/**
 * What caused `onRequestOpen` to fire:
 * * `focus`: the trigger received focus
 * * `mouseEnter`: the mouse entered the trigger
 */
export type TooltipRequestOpenTrigger = 'focus' | 'mouseEnter';

/**
 * Data passed to `onRequestOpen`
 */
export interface TooltipRequestOpenData {
	/** What caused the open request */
	trigger: TooltipRequestOpenTrigger;
}

/**
 * What caused `onRequestClose` to fire:
 * * `blur`: focus left the trigger (including Tab from the tooltip)
 * * `cancel`: Escape was pressed on the trigger
 * * `clickOutside`: a click landed outside the tooltip
 * * `mouseLeave`: the mouse left the trigger or the tooltip
 */
export type TooltipRequestCloseTrigger =
	'blur' | 'cancel' | 'clickOutside' | 'mouseLeave';

/**
 * Data passed to `onRequestClose`
 */
export interface TooltipRequestCloseData {
	/** What caused the close request */
	trigger: TooltipRequestCloseTrigger;
}

/**
 * Props Tooltip gives its trigger. A `trigger` element has them merged into its own
 * props; a `trigger` function receives them to spread onto the element it returns.
 */
export interface TooltipTriggerProps {
	/** The tooltip's id while it's open */
	'aria-describedby'?: string;
	onBlur: (event: FocusEvent<HTMLElement>) => void;
	onFocus: (event: FocusEvent<HTMLElement>) => void;
	onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
	onMouseEnter: (event: MouseEvent<HTMLElement>) => void;
	onMouseLeave: (event: MouseEvent<HTMLElement>) => void;
}

export interface TooltipProps {
	/**
	 * Alignment of the Tooltip relative to the element that triggers it.
	 */
	align?: TooltipAlign;
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 */
	assistiveText?: TooltipAssistiveText;
	/**
	 * @deprecated Use `trigger`. Each child element is used as a trigger.
	 */
	children?: ReactNode;
	/**
	 * Content inside Tooltip.
	 */
	content?: ReactNode;
	/**
	 * CSS classes to be added to the root element: the wrapper with `.slds-tooltip-trigger` on it.
	 */
	className?: string | string[] | Record<string, boolean>;
	/**
	 * CSS classes to be added to the popover dialog. That is the element with `.slds-popover` on it.
	 */
	classNameDialog?: string | string[] | Record<string, boolean>;
	/**
	 * @deprecated Use `classNameDialog`.
	 */
	dialogClassName?: string | string[] | Record<string, boolean>;
	/**
	 * Enabling this hides the default nubbin, replacing it with one attached directly to the tooltip trigger.
	 */
	hasAnchoredNubbin?: boolean;
	/**
	 * By default, dialogs will flip their alignment if they extend beyond a boundary element.
	 * `hasStaticAlignment` disables this behavior.
	 */
	hasStaticAlignment?: boolean;
	/**
	 * Styles the default info icon trigger that renders when no children are passed. Matches `icon-variant` on `lightning-helptext`.
	 * * `bare` - (default) Default icon color.
	 * * `error` - Red icon, to call out an error.
	 * * `inverse` - White icon, for dark backgrounds.
	 * * `warning` - Yellow icon, to advise caution.
	 */
	iconVariant?: TooltipIconVariant;
	/**
	 * Delay on Tooltip closing in milliseconds. Defaults to 50
	 */
	hoverCloseDelay?: number;
	/**
	 * Delay on Tooltip opening in milliseconds. Defaults to 0
	 */
	hoverOpenDelay?: number;
	/**
	 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
	 * It is the id of the popover, not of the root element.
	 */
	id?: string;
	/**
	 * **Text labels for internationalization**
	 */
	labels?: TooltipLabels;
	/**
	 * Open state when the tooltip is controlled. When set, the tooltip only opens and closes when this
	 * prop changes: `isOpen={false}` keeps it closed and `isOpen={true}` keeps it open, whatever the
	 * user does. Handle `onRequestOpen`/`onRequestClose` to update it. Leave it `undefined` for an
	 * uncontrolled tooltip that opens on hover and focus (see `defaultIsOpen`).
	 */
	isOpen?: boolean;
	/**
	 * Initial open state of an uncontrolled tooltip (`isOpen` is `undefined`). Defaults to `false`.
	 */
	defaultIsOpen?: boolean;
	/**
	 * Called when the tooltip requests to open (hover after `hoverOpenDelay`, or focus), controlled or
	 * not. `data.trigger` says why. A controlled tooltip opens only if the parent sets `isOpen` to `true`.
	 */
	onRequestOpen?: (
		event: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
		data: TooltipRequestOpenData
	) => void;
	/**
	 * Called when the tooltip requests to close (mouse leave, blur, Escape, click outside), controlled
	 * or not. `data.trigger` says why. `event` is `undefined` for `clickOutside`. A controlled tooltip
	 * closes only if the parent sets `isOpen` to `false`.
	 */
	onRequestClose?: (
		event:
			| MouseEvent<HTMLElement>
			| FocusEvent<HTMLElement>
			| KeyboardEvent<HTMLElement>
			| undefined,
		data: TooltipRequestCloseData
	) => void;
	/**
	 * Callback that returns an element or React `ref` to align the Tooltip with.
	 */
	onRequestTargetElement?: () => HTMLElement | null;
	/**
	 * Callback when the info icon in learn more variant is clicked
	 */
	onClickTrigger?: (event: MouseEvent<HTMLAnchorElement>) => void;
	/**
	 * @deprecated Use `className`.
	 */
	triggerClassName?: string | string[] | Record<string, boolean>;
	/**
	 * Please select one of the following:
	 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself.
	 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents.
	 * * `relative` - No styling or portals will be used.
	 */
	position?: TooltipPosition;
	/**
	 * Custom styles to be added to the root element (the wrapping trigger `div`).
	 */
	style?: CSSProperties;
	/**
	 * @deprecated Use `style`.
	 */
	triggerStyle?: CSSProperties;
	/**
	 * Determines the theme of tooltip: for informative purpose (blue background) or warning purpose (red background).
	 */
	theme?: TooltipTheme;
	/**
	 * The element that shows the Tooltip on hover and focus. It must be focusable, such as a
	 * `Button`, an anchor, or an element with `tabIndex`. Pass an element to have Tooltip merge
	 * its trigger props into the element's: event handlers run the element's first, then
	 * Tooltip's, `aria-describedby` is joined, and the element's other props win. Or pass a
	 * function that receives the trigger props (`TooltipTriggerProps`) and returns the trigger.
	 * Without a trigger, Tooltip renders an info icon button.
	 */
	trigger?: TriggerRender<TooltipTriggerProps>;
	/**
	 * Determines the type of the tooltip.
	 */
	variant?: TooltipVariant;
}

/**
 * Props library components set on a Tooltip. Not part of the public API.
 */
export interface TooltipInjectedProps {
	/** Skips the warning for a trigger that isn't tabbable, for triggers focused another way */
	silenceTriggerTabbableWarning?: boolean;
}

const defaultAssistiveText: TooltipAssistiveText = {
	tooltipTipLearnMoreIcon: 'this link',
	triggerLearnMoreIcon: 'Help',
};

const defaultLabels: TooltipLabels = {
	learnMoreAfter: 'to learn more.',
	learnMoreBefore: 'Click',
};

/**
 * The PopoverTooltip component is variant of the Lightning Design System Popover component.
 * This component wraps an element that triggers it to open. It must be a focusable child element
 * (either a button or an anchor), so that keyboard users can navigate to it.
 */
const Tooltip = ({
	align = 'top',
	assistiveText: assistiveTextProp,
	children,
	className,
	classNameDialog,
	content = <span>Tooltip</span>,
	dialogClassName,
	hasAnchoredNubbin = false,
	hasStaticAlignment = false,
	hoverCloseDelay = 50,
	hoverOpenDelay = 0,
	iconVariant = 'bare',
	id: idProp,
	labels: labelsProp,
	isOpen: isOpenProp,
	defaultIsOpen = false,
	onRequestOpen,
	onRequestClose,
	onRequestTargetElement,
	onClickTrigger,
	triggerClassName,
	position = 'absolute',
	style,
	triggerStyle,
	theme = 'info',
	trigger,
	variant = 'base',
	silenceTriggerTabbableWarning,
}: TooltipProps & TooltipInjectedProps): React.ReactElement => {
	// Merge assistive text and labels with defaults
	const assistiveText = { ...defaultAssistiveText, ...assistiveTextProp };
	const labels = { ...defaultLabels, ...labelsProp };

	// Context
	const iconSettings = useContext(IconSettingsContext);

	// State
	const [isOpen, setIsOpen] = useControllableState(isOpenProp, defaultIsOpen);
	const [triggerRendered, setTriggerRendered] = useState(false);

	// Refs
	const triggerRef = useRef<HTMLDivElement>(null);
	const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const generatedIdRef = useRef(generateId());
	const isUnmountingRef = useRef(false);
	// Latest open state, read by the hover/blur/Escape timers
	const isOpenRef = useRef(isOpen);
	useEffect(() => {
		isOpenRef.current = isOpen;
	}, [isOpen]);

	// Check props in development
	useEffect(() => {
		checkProps(
			POPOVER_TOOLTIP,
			{
				align,
				assistiveText,
				children,
				className,
				classNameDialog,
				content,
				dialogClassName,
				hasAnchoredNubbin,
				hasStaticAlignment,
				hoverCloseDelay,
				hoverOpenDelay,
				iconVariant,
				id: idProp,
				labels,
				isOpen: isOpenProp,
				onRequestTargetElement,
				onClickTrigger,
				triggerClassName,
				position,
				style,
				triggerStyle,
				theme,
				trigger,
				variant,
				silenceTriggerTabbableWarning,
			},
			componentDoc
		);
	}, []);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			isUnmountingRef.current = true;
			if (tooltipTimeoutRef.current) {
				clearTimeout(tooltipTimeoutRef.current);
			}
		};
	}, []);

	// Get computed values
	const getId = useCallback(() => {
		return idProp || generatedIdRef.current;
	}, [idProp]);

	const getIsOpen = useCallback(() => isOpen, [isOpen]);

	const getTooltipTarget = useCallback(() => {
		if (onRequestTargetElement) {
			return onRequestTargetElement();
		}

		return triggerRef.current;
	}, [onRequestTargetElement]);

	// Event handlers
	const clearTooltipTimeout = () => {
		if (tooltipTimeoutRef.current) {
			clearTimeout(tooltipTimeoutRef.current);
		}
	};

	const requestOpen = useCallback(
		(
			event: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
			trigger: TooltipRequestOpenTrigger
		) => {
			if (isUnmountingRef.current || isOpenRef.current) {
				return;
			}
			onRequestOpen?.(event, { trigger });
			setIsOpen(true);
		},
		[onRequestOpen, setIsOpen]
	);

	const requestClose = useCallback(
		(
			event:
				| MouseEvent<HTMLElement>
				| FocusEvent<HTMLElement>
				| KeyboardEvent<HTMLElement>
				| undefined,
			trigger: TooltipRequestCloseTrigger
		) => {
			if (isUnmountingRef.current || !isOpenRef.current) {
				return;
			}
			onRequestClose?.(event, { trigger });
			setIsOpen(false);
		},
		[onRequestClose, setIsOpen]
	);

	// Called by the Dialog on click outside, Tab and unmount
	const handleDialogClose = useCallback(
		(
			event?: KeyboardEvent<HTMLElement>,
			data?: { componentWillUnmount?: boolean }
		) => {
			clearTooltipTimeout();
			// The dialog unmounts because the tooltip already closed: nothing to request
			if (data?.componentWillUnmount) {
				return;
			}
			requestClose(event, event ? 'blur' : 'clickOutside');
		},
		[requestClose]
	);

	const handleDialogMouseLeave = useCallback(
		(event: MouseEvent) => {
			clearTooltipTimeout();
			requestClose(event as MouseEvent<HTMLElement>, 'mouseLeave');
		},
		[requestClose]
	);

	const scheduleOpen = useCallback(
		(
			event: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
			trigger: TooltipRequestOpenTrigger
		) => {
			clearTooltipTimeout();
			tooltipTimeoutRef.current = setTimeout(() => {
				requestOpen(event, trigger);
			}, hoverOpenDelay);
		},
		[hoverOpenDelay, requestOpen]
	);

	const handleMouseEnter = useCallback(
		(event: MouseEvent<HTMLElement>) => scheduleOpen(event, 'mouseEnter'),
		[scheduleOpen]
	);

	const handleFocus = useCallback(
		(event: FocusEvent<HTMLElement>) => scheduleOpen(event, 'focus'),
		[scheduleOpen]
	);

	const scheduleClose = useCallback(
		(
			e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
			trigger: TooltipRequestCloseTrigger
		) => {
			e.stopPropagation();
			clearTooltipTimeout();

			tooltipTimeoutRef.current = setTimeout(() => {
				const relatedTarget = (e as MouseEvent<HTMLElement>)
					.relatedTarget as HTMLElement | null;
				const isHoveringTooltip =
					relatedTarget?.classList?.contains('slds-popover_tooltip') ||
					relatedTarget?.classList?.contains('slds-popover__body');

				if (!isHoveringTooltip) {
					requestClose(e, trigger);
				}
			}, hoverCloseDelay);
		},
		[hoverCloseDelay, requestClose]
	);

	const handleMouseLeave = useCallback(
		(e: MouseEvent<HTMLElement>) => scheduleClose(e, 'mouseLeave'),
		[scheduleClose]
	);

	const handleBlur = useCallback(
		(e: FocusEvent<HTMLElement>) => scheduleClose(e, 'blur'),
		[scheduleClose]
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLElement>) => {
			e.stopPropagation();

			tooltipTimeoutRef.current = setTimeout(() => {
				if (e.key === 'Escape') {
					requestClose(e, 'cancel');
				}
			}, hoverCloseDelay);
		},
		[hoverCloseDelay, requestClose]
	);

	// Save trigger ref and trigger re-render once mounted
	const saveTriggerRef = useCallback(
		(component: HTMLDivElement | null) => {
			if (component && triggerRef.current !== component) {
				(triggerRef as React.MutableRefObject<HTMLDivElement | null>).current =
					component;
				// Dialog/Popper.js cannot place the popover until
				// the trigger/target DOM node is mounted.
				if (!triggerRendered) {
					setTriggerRendered(true);
				}
			}
		},
		[triggerRendered]
	);

	// Render helpers
	const getAnchoredNubbinStyles = () => {
		if (!hasAnchoredNubbin) {
			return null;
		}

		const alignment = align.split(' ')[0] as
			'top' | 'bottom' | 'left' | 'right';
		const nubbinContainerStyles: CSSProperties = {
			height: '0',
			position: 'relative',
			width: '0',
		};
		const nubbinStyles: CSSProperties = {
			backgroundColor: '#16325c',
			content: '""',
			height: '1rem',
			position: 'absolute',
			transform: 'rotate(45deg)',
			width: '1rem',
		};
		const triggerDimensions = {
			height: triggerRef.current
				? triggerRef.current.getBoundingClientRect().height
				: 0,
			width: triggerRef.current
				? triggerRef.current.getBoundingClientRect().width
				: 0,
		};

		switch (alignment) {
			case 'bottom': {
				nubbinContainerStyles.left = `${triggerDimensions.width / 2}px`;
				nubbinContainerStyles.top = `${triggerDimensions.height}px`;
				nubbinStyles.left = '-8px';
				nubbinStyles.top = '3px';
				break;
			}
			case 'left': {
				nubbinContainerStyles.left = '0';
				nubbinContainerStyles.top = `${triggerDimensions.height / 2}px`;
				nubbinStyles.left = '-19px';
				nubbinStyles.top = '-9px';
				break;
			}
			case 'right': {
				nubbinContainerStyles.left = `${triggerDimensions.width}px`;
				nubbinContainerStyles.top = `${triggerDimensions.height / 2}px`;
				nubbinStyles.left = '3px';
				nubbinStyles.top = '-9px';
				break;
			}
			default: {
				// top
				nubbinContainerStyles.left = `${triggerDimensions.width / 2}px`;
				nubbinContainerStyles.top = '0';
				nubbinStyles.left = '-8px';
				nubbinStyles.top = '-19px';
			}
		}

		return (
			<>
				<style>{`#${getId()}:after, #${getId()}:before {
	display: none;
}`}</style>
				{getIsOpen() ? (
					<div style={nubbinContainerStyles}>
						<div style={nubbinStyles} />
					</div>
				) : null}
			</>
		);
	};

	const getContent = () => {
		const isInverseIcon = iconVariant === 'inverse';
		const iconColorVariant =
			iconVariant === 'error' || iconVariant === 'warning'
				? iconVariant
				: undefined;

		const triggerProps: TooltipTriggerProps = {
			'aria-describedby': getIsOpen() ? getId() : undefined,
			onBlur: handleBlur,
			onFocus: handleFocus,
			onKeyDown: handleKeyDown,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
		};

		if (trigger !== undefined) {
			return renderTrigger(trigger, triggerProps);
		}

		// Deprecated: each child element is a trigger
		if (React.Children.count(children) !== 0) {
			return React.Children.map(children, (child) =>
				React.isValidElement(child) ? renderTrigger(child, triggerProps) : child
			);
		}

		if (onClickTrigger) {
			return renderTrigger(
				<a
					href="#"
					onClick={
						EventUtil.trappedHandler(
							onClickTrigger
						) as React.MouseEventHandler<HTMLAnchorElement>
					}
				>
					<Icon
						category="utility"
						colorVariant={iconColorVariant}
						inverse={isInverseIcon}
						name="info"
						assistiveText={{
							label: assistiveText.triggerLearnMoreIcon,
						}}
						size="x-small"
					/>
				</a>,
				triggerProps
			);
		}

		return renderTrigger(
			<Button
				aria-disabled
				assistiveText={{
					icon: assistiveText.triggerLearnMoreIcon,
				}}
				iconCategory="utility"
				iconClassName={iconColorVariant && `slds-icon-text-${iconColorVariant}`}
				iconName="info"
				// `bare` keeps `slds-button_icon`, which Button drops for `inverse` alone
				iconVariant={isInverseIcon ? 'bare' : undefined}
				inverse={isInverseIcon}
				variant="icon"
			/>,
			triggerProps
		);
	};

	const getTooltipContent = () => {
		const isErrorTheme = theme === 'error';

		return (
			<div
				className={classNames('slds-popover__body', {
					// Ensure text contrast on error theme (red background needs white text)
					'slds-text-color_inverse': isErrorTheme,
				})}
			>
				{content}
				{variant === 'learnMore' && onClickTrigger ? (
					<div className="slds-m-top_x-small" aria-hidden="true">
						{labels.learnMoreBefore}{' '}
						<Icon
							assistiveText={{
								label: assistiveText.tooltipTipLearnMoreIcon,
							}}
							category="utility"
							inverse
							name="info"
							size="x-small"
						/>{' '}
						{labels.learnMoreAfter}{' '}
					</div>
				) : null}
			</div>
		);
	};

	const getTooltip = () => {
		return getIsOpen() ? (
			<Dialog
				closeOnTabKey
				hasNubbin
				contentsClassName={classNames(
					'slds-popover',
					'slds-popover_tooltip',
					{
						'slds-theme_error': theme === 'error',
					},
					classNameDialog ?? dialogClassName
				)}
				align={align}
				context={iconSettings}
				hasStaticAlignment={hasStaticAlignment}
				onClose={handleDialogClose}
				onRequestTargetElement={getTooltipTarget}
				onMouseLeave={handleDialogMouseLeave}
				position={position}
				variant="tooltip"
				containerProps={{
					id: getId(),
				}}
			>
				{getTooltipContent()}
			</Dialog>
		) : (
			<span />
		);
	};

	const containerStyles: CSSProperties = {
		display: 'inline-block',
		lineHeight: '1',
		...(style ?? triggerStyle),
	};

	return (
		<div
			className={classNames(
				'slds-tooltip-trigger',
				className ?? triggerClassName
			)}
			style={containerStyles}
			ref={saveTriggerRef}
		>
			{getAnchoredNubbinStyles()}
			{getContent()}
			{getTooltip()}
		</div>
	);
};

Tooltip.displayName = POPOVER_TOOLTIP;

export default Tooltip as React.FC<TooltipProps>;
