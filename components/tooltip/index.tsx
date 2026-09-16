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
import { POPOVER_TOOLTIP } from '../../utilities/constants';
import generateId from '../../utilities/generate-id';

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

export type TooltipPosition = 'absolute' | 'overflowBoundaryElement' | 'relative';

export type TooltipTheme = 'info' | 'error';

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
	 * Pass the one element that triggers the Tooltip as a child. It must be an element with `tabIndex` or an element that already has a `tabIndex` set such as an anchor or a button.
	 */
	children?: ReactNode;
	/**
	 * Content inside Tooltip.
	 */
	content?: ReactNode;
	/**
	 * CSS classes to be added to the popover dialog. That is the element with `.slds-popover` on it.
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
	 * Delay on Tooltip closing in milliseconds. Defaults to 50
	 */
	hoverCloseDelay?: number;
	/**
	 * Delay on Tooltip opening in milliseconds. Defaults to 0
	 */
	hoverOpenDelay?: number;
	/**
	 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
	 */
	id?: string;
	/**
	 * **Text labels for internationalization**
	 */
	labels?: TooltipLabels;
	/**
	 * Forces tooltip to be open. A value of `false` will disable any interaction with the tooltip.
	 */
	isOpen?: boolean;
	/**
	 * Callback that returns an element or React `ref` to align the Tooltip with.
	 */
	onRequestTargetElement?: () => HTMLElement | null;
	/**
	 * Callback when the info icon in learn more variant is clicked
	 */
	onClickTrigger?: (event: MouseEvent<HTMLAnchorElement>) => void;
	/**
	 * CSS classes to be added to tag with `slds-tooltip-trigger`.
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
	 * Custom styles to be added to wrapping triggering `div`.
	 */
	triggerStyle?: CSSProperties;
	/**
	 * Determines the theme of tooltip: for informative purpose (blue background) or warning purpose (red background).
	 */
	theme?: TooltipTheme;
	/**
	 * @deprecated Use onRequestTargetElement instead
	 */
	target?: HTMLElement | null;
	/**
	 * Determines the type of the tooltip.
	 */
	variant?: TooltipVariant;
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
	content = <span>Tooltip</span>,
	dialogClassName,
	hasAnchoredNubbin = false,
	hasStaticAlignment = false,
	hoverCloseDelay = 50,
	hoverOpenDelay = 0,
	id: idProp,
	labels: labelsProp,
	isOpen: isOpenProp,
	onRequestTargetElement,
	onClickTrigger,
	triggerClassName,
	position = 'absolute',
	triggerStyle,
	theme = 'info',
	target: deprecatedTarget,
	variant = 'base',
}: TooltipProps): React.ReactElement => {
	// Merge assistive text and labels with defaults
	const assistiveText = { ...defaultAssistiveText, ...assistiveTextProp };
	const labels = { ...defaultLabels, ...labelsProp };

	// Context
	const iconSettings = useContext(IconSettingsContext);

	// State
	const [isOpenState, setIsOpenState] = useState(false);
	const [triggerRendered, setTriggerRendered] = useState(false);

	// Refs
	const triggerRef = useRef<HTMLDivElement>(null);
	const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const generatedIdRef = useRef(generateId());
	const isUnmountingRef = useRef(false);

	// Check props in development
	useEffect(() => {
		checkProps(POPOVER_TOOLTIP, {
			align,
			assistiveText,
			children,
			content,
			dialogClassName,
			hasAnchoredNubbin,
			hasStaticAlignment,
			hoverCloseDelay,
			hoverOpenDelay,
			id: idProp,
			labels,
			isOpen: isOpenProp,
			onRequestTargetElement,
			onClickTrigger,
			triggerClassName,
			position,
			triggerStyle,
			theme,
			variant,
		}, componentDoc);
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

	const getIsOpen = useCallback(() => {
		return isOpenProp === undefined ? isOpenState : isOpenProp;
	}, [isOpenProp, isOpenState]);

	const getTooltipTarget = useCallback(() => {
		if (onRequestTargetElement) {
			return onRequestTargetElement();
		}

		// for backwards compatibility
		if (deprecatedTarget) {
			return deprecatedTarget;
		}

		return triggerRef.current;
	}, [onRequestTargetElement, deprecatedTarget]);

	// Event handlers
	const handleCancel = useCallback(() => {
		if (tooltipTimeoutRef.current) {
			clearTimeout(tooltipTimeoutRef.current);
		}

		setIsOpenState(false);
	}, []);

	const handleMouseEnter = useCallback(() => {
		if (tooltipTimeoutRef.current) {
			clearTimeout(tooltipTimeoutRef.current);
		}

		tooltipTimeoutRef.current = setTimeout(() => {
			if (!isUnmountingRef.current) {
				setIsOpenState(true);
			}
		}, hoverOpenDelay);
	}, [hoverOpenDelay]);

	const handleMouseLeave = useCallback((e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
		e.stopPropagation();
		if (tooltipTimeoutRef.current) {
			clearTimeout(tooltipTimeoutRef.current);
		}

		tooltipTimeoutRef.current = setTimeout(() => {
			const relatedTarget = (e as MouseEvent<HTMLElement>).relatedTarget as HTMLElement | null;
			const isHoveringTooltip =
				relatedTarget?.classList?.contains('slds-popover_tooltip') ||
				relatedTarget?.classList?.contains('slds-popover__body');

			if (!isUnmountingRef.current && !isHoveringTooltip) {
				setIsOpenState(false);
			}
		}, hoverCloseDelay);
	}, [hoverCloseDelay]);

	const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
		e.stopPropagation();

		tooltipTimeoutRef.current = setTimeout(() => {
			if (!isUnmountingRef.current && e.key === 'Escape') {
				setIsOpenState(false);
			}
		}, hoverCloseDelay);
	}, [hoverCloseDelay]);

	// Save trigger ref and trigger re-render once mounted
	const saveTriggerRef = useCallback((component: HTMLDivElement | null) => {
		if (component && triggerRef.current !== component) {
			(triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = component;
			// Dialog/Popper.js cannot place the popover until
			// the trigger/target DOM node is mounted.
			if (!triggerRendered) {
				setTriggerRendered(true);
			}
		}
	}, [triggerRendered]);

	// Render helpers
	const getAnchoredNubbinStyles = () => {
		if (!hasAnchoredNubbin) {
			return null;
		}

		const alignment = align.split(' ')[0] as 'top' | 'bottom' | 'left' | 'right';
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
			height: triggerRef.current ? triggerRef.current.getBoundingClientRect().height : 0,
			width: triggerRef.current ? triggerRef.current.getBoundingClientRect().width : 0,
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
		let childrenToRender: ReactNode;
		const noChildrenProvided = React.Children.count(children) === 0;

		if (noChildrenProvided && onClickTrigger) {
			childrenToRender = (
				<a
					href="#"
					onClick={EventUtil.trappedHandler(onClickTrigger) as React.MouseEventHandler<HTMLAnchorElement>}
				>
					<Icon
						category="utility"
						name="info"
						assistiveText={{
							label: assistiveText.triggerLearnMoreIcon,
						}}
						size="x-small"
					/>
				</a>
			);
		} else if (noChildrenProvided) {
			childrenToRender = (
				<Button
					aria-disabled
					assistiveText={{
						icon: assistiveText.triggerLearnMoreIcon,
					}}
					iconCategory="utility"
					iconName="info"
					variant="icon"
				/>
			);
		} else {
			childrenToRender = children;
		}

		return React.Children.map(childrenToRender, (child, i) => {
			if (!React.isValidElement(child)) {
				return child;
			}

			return React.cloneElement(child as React.ReactElement<{
				key?: React.Key;
				'aria-describedby'?: string;
				onBlur?: (e: FocusEvent<HTMLElement>) => void;
				onFocus?: () => void;
				onMouseEnter?: () => void;
				onMouseLeave?: (e: MouseEvent<HTMLElement>) => void;
				onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
			}>, {
				key: i,
				'aria-describedby': getIsOpen() ? getId() : undefined,
				onBlur: handleMouseLeave,
				onFocus: handleMouseEnter,
				onMouseEnter: handleMouseEnter,
				onMouseLeave: handleMouseLeave,
				onKeyDown: handleKeyDown,
			});
		});
	};

	const getTooltipContent = () => {
		// REMOVE AT NEXT BREAKING CHANGE (v1.0 or v0.9)
		// Support deprecated 'error' variant value (now use theme='error')
		const isErrorTheme = theme === 'error' || (variant as string) === 'error';
		
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
		const isOpen = getIsOpen();

		// REMOVE AT NEXT BREAKING CHANGE (v1.0 or v0.9)
		// Support deprecated 'error' variant value (now use theme='error')
		const deprecatedWay = (variant as string) === 'error';

		return isOpen ? (
			<Dialog
				closeOnTabKey
				hasNubbin
				contentsClassName={classNames(
					'slds-popover',
					'slds-popover_tooltip',
					{
						'slds-theme_error': theme === 'error' || deprecatedWay,
					},
					dialogClassName
				)}
				align={align}
				context={iconSettings}
				hasStaticAlignment={hasStaticAlignment}
				onClose={handleCancel}
				onRequestTargetElement={getTooltipTarget}
				onMouseLeave={handleCancel}
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
		...triggerStyle,
	};

	return (
		<div
			className={classNames('slds-tooltip-trigger', triggerClassName)}
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

export default Tooltip;

