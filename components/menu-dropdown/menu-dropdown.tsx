/* eslint-disable max-lines */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Dropdown design pattern](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown) in React.

import React, {
	useState,
	useRef,
	useCallback,
	useEffect,
	useContext,
	useMemo,
	type ReactNode,
	type ReactElement,
	type MouseEvent,
	type KeyboardEvent,
	type FocusEvent,
} from 'react';
import classNames from 'classnames';
import isFunction from 'lodash.isfunction';

// Children
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Legacy JS module
import Dialog from '../utilities/dialog';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Legacy JS module
import BaseList from '../utilities/menu-list';
import ListItem from '../utilities/menu-list/item';
import ListItemLabel from '../utilities/menu-list/item-label';

// The menu-list `List` accepts additional legacy consumer props (`onCancel`) and
// is passed a callback `ref` typed against the DOM element by historical callers.
// Alias to a permissive type here rather than widen the public MenuListProps.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const List = BaseList as unknown as React.ComponentType<any>;

// This is the default Dropdown Trigger, which expects one button as a child.
import DefaultTrigger from './button-trigger';

// This component's `checkProps` which issues warnings to developers about properties
import checkProps from './check-props';
import componentDoc from './component.json';

import EventUtil from '../../utilities/event';
import generateId from '../../utilities/generate-id';
import keyboardNavigate from '../../utilities/keyboard-navigate';
import KeyBuffer from '../../utilities/key-buffer';
import KEYS from '../../utilities/key-code';
import {
	MENU_DROPDOWN,
	MENU_DROPDOWN_TRIGGER,
	LIST,
} from '../../utilities/constants';
import { IconSettingsContext } from '../icon-settings';

const documentDefined = typeof document !== 'undefined';

// The overlay is an optional way to allow the dropdown to close on outside
// clicks even when those clicks are over areas that wouldn't normally fire
// click or touch events (for example, iframes).
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

// Global state for tracking open dropdown
let currentOpenDropdown: { handleClose: () => void } | undefined;

const DropdownNubbinPositionsArray = [
	'top left',
	'top',
	'top right',
	'bottom left',
	'bottom',
	'bottom right',
] as const;

export type DropdownNubbinPosition = (typeof DropdownNubbinPositionsArray)[number];

export const DropdownNubbinPositions: readonly DropdownNubbinPosition[] = DropdownNubbinPositionsArray;

const noop = () => {};

export interface MenuDropdownOption {
	className?: string;
	disabled?: boolean;
	divider?: 'top' | 'bottom';
	href?: string;
	id?: string;
	label?: string;
	leftIcon?: {
		name: string;
		category: string;
	};
	rightIcon?: {
		name: string;
		category: string;
	};
	tooltipContent?: string;
	type?: 'header' | 'item' | 'divider';
	value?: string | number;
}

export interface MenuDropdownProps {
	/** Aligns the menu center, right, or left respective to the trigger */
	align?: 'center' | 'left' | 'right';
	/** Text that is visually hidden but read aloud by screenreaders */
	assistiveText?: Record<string, unknown>;
	/** CSS classes to be added to triggering button */
	buttonClassName?: string | string[] | Record<string, boolean>;
	/** If true, button/icon is white. Meant for buttons on dark backgrounds */
	buttonInverse?: boolean;
	/** Determines variant of the Button component that triggers dropdown */
	buttonVariant?: 'base' | 'neutral' | 'brand' | 'destructive' | 'icon';
	/** If true, renders checkmark icon on the selected Menu Item */
	checkmark?: boolean;
	/** Custom content to render in the dropdown */
	children?: ReactNode;
	/** CSS classes to be added to dropdown menu */
	className?: string | string[] | Record<string, boolean>;
	/** Class names added to the Dialog component */
	containerClassName?: string | string[] | Record<string, boolean>;
	/** Prevent dropdown menu from opening */
	disabled?: boolean;
	/** Prevents the dropdown from changing position based on the viewport */
	hasStaticAlignment?: boolean;
	/** Associates an icon button with another element on the page */
	hint?: boolean;
	/** Delay on menu closing in milliseconds */
	hoverCloseDelay?: number;
	/** Name of the icon category */
	iconCategory?: 'action' | 'custom' | 'doctype' | 'standard' | 'utility';
	/** Name of the icon */
	iconName?: string;
	/** Icon position relative to label */
	iconPosition?: 'left' | 'right';
	/** Icon variant */
	iconVariant?:
		| 'bare'
		| 'container'
		| 'border'
		| 'border-filled'
		| 'small'
		| 'more';
	/** Determines the size of the icon */
	iconSize?: 'x-small' | 'small' | 'medium' | 'large';
	/** A unique ID for keyboard navigation and ARIA support */
	id?: string;
	/** Whether to inherit target width */
	inheritTargetWidth?: boolean;
	/** Adds inverse class to the dropdown */
	inverse?: boolean;
	/** @deprecated Use menuPosition="relative" instead */
	isInline?: boolean;
	/** Forces the dropdown to be open or closed */
	isOpen?: boolean;
	/** Text within the trigger button */
	label?: string | ReactNode;
	/** Custom element that overrides the default Menu Item component */
	listItemRenderer?: (props: Record<string, unknown>) => ReactElement;
	/** Menu list length */
	length?: null | '5' | '7' | '10' | 5 | 7 | 10;
	/** Position strategy for the menu */
	menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
	/** Style applied to menu element */
	menuStyle?: React.CSSProperties;
	/** Whether this dropdown supports multi select */
	multiple?: boolean;
	/** Positions dropdown menu with a nubbin */
	nubbinPosition?: DropdownNubbinPosition;
	/** @deprecated */
	offset?: string;
	/** Called when the triggering button loses focus */
	onBlur?: (event: FocusEvent) => void;
	/** Triggered when the trigger button is clicked */
	onClick?: (event: MouseEvent) => void;
	/** Triggered when the dropdown is closed */
	onClose?: () => void;
	/** Called when the triggering button gains focus */
	onFocus?: (event: FocusEvent) => void;
	/** Called when a key is pressed */
	onKeyDown?: (event: KeyboardEvent) => void;
	/** Called when mouse clicks down on the trigger button */
	onMouseDown?: (event: MouseEvent) => void;
	/** Called when mouse hovers over the trigger button */
	onMouseEnter?: (event: MouseEvent) => void;
	/** Called when mouse hover leaves the trigger button */
	onMouseLeave?: (event: MouseEvent) => void;
	/** Triggered when the dropdown is opened */
	onOpen?: () => void;
	/** Triggered when an item in the menu is clicked */
	onSelect?: (
		option: MenuDropdownOption,
		data: { option: MenuDropdownOption; optionIndex: number }
	) => void;
	/** Determines if mouse hover or click opens the dropdown menu */
	openOn?: 'hover' | 'click' | 'hybrid';
	/** An array of menu item objects */
	options?: MenuDropdownOption[];
	/** If true, adds a transparent overlay when menu is open */
	overlay?: boolean | ((isOpen: boolean, overlayEl: HTMLSpanElement) => void);
	/** An object of CSS styles for the triggering button */
	style?: React.CSSProperties;
	/** Write "-1" if you don't want the user to tab to the button */
	tabIndex?: string;
	/** Tooltip for the trigger button */
	tooltip?: ReactNode;
	/** Tooltip component template for menu items */
	tooltipMenuItem?: ReactNode;
	/** CSS classes to be added to wrapping trigger div */
	triggerClassName?: string | string[] | Record<string, boolean>;
	/** Current selected menu item */
	value?: number | string | (number | string)[];
	/** Width of the menu dropdown */
	width?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'bottom' | 'large';
	/** Internal: Used for requesting focus */
	requestFocus?: boolean;
	/** Internal: Callback for focus request */
	onRequestFocus?: (trigger: HTMLElement) => void;
}

interface NavigableItem {
	index: number;
	text: string;
}

interface NavigableItems extends Array<NavigableItem> {
	indexes: number[];
	keyBuffer: ReturnType<typeof KeyBuffer>;
}

const itemIsSelectable = (item: MenuDropdownOption): boolean =>
	item.type !== 'header' && item.type !== 'divider' && !item.disabled;

const getNavigableItems = (items?: MenuDropdownOption[]): NavigableItems => {
	const navigableItems: NavigableItems = [] as unknown as NavigableItems;
	navigableItems.indexes = [];
	navigableItems.keyBuffer = new KeyBuffer();

	if (Array.isArray(items)) {
		items.forEach((item, index) => {
			if (itemIsSelectable(item)) {
				navigableItems.push({
					index,
					text: `${item.label}`.toLowerCase(),
				});
				navigableItems.indexes.push(index);
			}
		});
	}

	return navigableItems;
};

// Nubbin position mapping
const DropdownToDialogNubbinMapping: Record<string, string> = {
	top: 'bottom',
	'top left': 'bottom left',
	'top right': 'bottom right',
	bottom: 'top',
	'bottom left': 'top left',
	'bottom right': 'top right',
};

/**
 * The MenuDropdown component is a variant of the Lightning Design System Menu component.
 * This is a React 19 compatible functional component that replaces the deprecated
 * react-onclickoutside HOC with a custom click outside handler.
 */
const MenuDropdown: React.FC<MenuDropdownProps> & {
	displayName: string;
} = (props) => {
	const {
		align = 'left',
		assistiveText,
		buttonClassName,
		buttonInverse,
		buttonVariant,
		checkmark,
		children,
		className,
		containerClassName,
		disabled,
		hasStaticAlignment,
		hint,
		hoverCloseDelay = 300,
		iconCategory,
		iconName,
		iconPosition,
		iconSize,
		iconVariant,
		id,
		inheritTargetWidth,
		inverse = false,
		isInline,
		isOpen: isOpenProp,
		label,
		length = '5',
		listItemRenderer,
		menuPosition: menuPositionProp = 'absolute',
		menuStyle,
		multiple,
		nubbinPosition,
		offset,
		onBlur,
		onClick,
		onClose,
		onFocus,
		onKeyDown,
		onMouseDown,
		onMouseEnter,
		onMouseLeave,
		onOpen,
		onSelect,
		openOn = 'click',
		options,
		overlay: overlayProp,
		requestFocus,
		onRequestFocus,
		style,
		tabIndex,
		tooltip,
		tooltipMenuItem,
		triggerClassName,
		value,
		width = 'medium',
	} = props;

	const context = useContext(IconSettingsContext);

	// Generate stable IDs
	const generatedId = useMemo(() => generateId(), []);
	const getId = useCallback(() => id || generatedId, [id, generatedId]);

	// State
	const [isOpenState, setIsOpenState] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
	const [triggerRendered, setTriggerRendered] = useState(false);

	// Refs
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const triggerContainerRef = useRef<HTMLDivElement | null>(null);
	const listRef = useRef<HTMLUListElement | null>(null);
	const listItemsRef = useRef<Record<number, HTMLLIElement | null>>({});
	const isHoverRef = useRef(false);
	const isUnmountingRef = useRef(false);
	const closingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const overlayRef = useRef<HTMLSpanElement | null>(null);

	// Navigable items
	const navigableItems = useMemo(
		() => getNavigableItems(options),
		[options]
	);

	// Check props in development
	useEffect(() => {
		checkProps(MENU_DROPDOWN, props, componentDoc);
	}, [props]);

	// Calculate isOpen
	const getIsOpen = useCallback((): boolean => {
		return !!(typeof isOpenProp === 'boolean' ? isOpenProp : isOpenState);
	}, [isOpenProp, isOpenState]);

	const isOpen = !disabled && getIsOpen() && triggerRendered;

	// Helper to get index by value
	const getIndexByValue = useCallback(
		(val: string | number | undefined, opts?: MenuDropdownOption[]): number => {
			let foundIndex = -1;
			if (opts && opts.length) {
				opts.some((element, index) => {
					if (element && element.value === val) {
						foundIndex = index;
						return true;
					}
					return false;
				});
			}
			return foundIndex;
		},
		[]
	);

	// Update selected indices when value changes
	useEffect(() => {
		if (multiple) {
			let values: (string | number)[] = [];
			if (!Array.isArray(value)) {
				if (value !== undefined) {
					values = [value];
				}
			} else {
				values = value;
			}
			values = values.filter((v) => getIndexByValue(v, options) !== -1);
			const currentIndices = values.map((v) => getIndexByValue(v, options));
			setSelectedIndices(currentIndices);
		} else {
			setSelectedIndex(getIndexByValue(value as string | number, options));
		}
	}, [value, options, multiple, getIndexByValue]);

	// Menu position (for backwards compatibility)
	const menuPosition = isInline ? 'relative' : menuPositionProp;

	// Get list item ID
	const getListItemId = useCallback(
		(index?: number): string | undefined => {
			if (index !== undefined) {
				return `${getId()}-item-${index}`;
			}
			return undefined;
		},
		[getId]
	);

	// Get list item renderer
	const getListItemRenderer = useCallback(() => {
		return listItemRenderer ? listItemRenderer : ListItemLabel;
	}, [listItemRenderer]);

	// Focus trigger
	const setFocus = useCallback(() => {
		if (!isHoverRef.current && !isUnmountingRef.current && triggerRef.current) {
			triggerRef.current.focus();
		}
	}, []);

	// Get menu element
	const getMenu = useCallback((): HTMLUListElement | null => {
		return listRef.current;
	}, []);

	// Get menu item element
	const getMenuItem = useCallback(
		(index: number): HTMLLIElement | null => {
			if (index !== undefined && listItemsRef.current) {
				return listItemsRef.current[index] || null;
			}
			return null;
		},
		[]
	);

	// Handle close
	const handleCloseRef = useRef<() => void>(() => {});

	const handleClose = useCallback(() => {
		if (getIsOpen()) {
			if (currentOpenDropdown?.handleClose === handleCloseRef.current) {
				currentOpenDropdown = undefined;
			}
			setIsOpenState(false);
			isHoverRef.current = false;
			onClose?.();
		}
	}, [getIsOpen, onClose]);

	// Update the ref so we can compare in cleanup
	handleCloseRef.current = handleClose;

	// Handle open
	const handleOpen = useCallback(() => {
		if (!getIsOpen()) {
			if (currentOpenDropdown && isFunction(currentOpenDropdown.handleClose)) {
				currentOpenDropdown.handleClose();
			}
			currentOpenDropdown = { handleClose };
			setIsOpenState(true);
			onOpen?.();
		}
	}, [getIsOpen, handleClose, onOpen]);

	// Handle click outside - called via document event listener
	const handleClickOutside = useCallback(
		(event: Event) => {
			const target = event.target as Node;
			const container = triggerContainerRef.current;

			// Check if click is outside the trigger container
			if (container && !container.contains(target)) {
				// Also check if it's in the dialog (for portal-rendered menus)
				const outsideClickIgnoreClass = `ignore-click-${getId()}`;
				if (target instanceof Element) {
					if (target.classList?.contains(outsideClickIgnoreClass)) {
						return;
					}
					if (target.closest(`.${outsideClickIgnoreClass}`)) {
						return;
					}
					if (target.closest('.ignore-react-onclickoutside')) {
						return;
					}
				}
				handleClose();
			}
		},
		[getId, handleClose]
	);

	// Set up click outside listener
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('touchstart', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [isOpen, handleClickOutside]);

	// Toggle open
	const toggleOpen = useCallback(() => {
		setFocus();
		if (getIsOpen()) {
			handleClose();
		} else {
			handleOpen();
		}
	}, [getIsOpen, handleClose, handleOpen, setFocus]);

	// Handle click
	const handleClick = useCallback(
		(event: MouseEvent) => {
			if (!getIsOpen()) {
				handleOpen();
				setFocus();
			} else {
				handleClose();
			}
			onClick?.(event);
		},
		[getIsOpen, handleOpen, handleClose, setFocus, onClick]
	);

	// Handle focus
	const handleFocus = useCallback(
		(event: FocusEvent) => {
			onFocus?.(event);
		},
		[onFocus]
	);

	// Handle mouse enter
	const handleMouseEnter = useCallback(
		(event: MouseEvent) => {
			isHoverRef.current = true;
			if (!getIsOpen() && openOn === 'hover') {
				handleOpen();
			} else {
				if (closingTimeoutRef.current) {
					clearTimeout(closingTimeoutRef.current);
				}
			}
			onMouseEnter?.(event);
		},
		[getIsOpen, openOn, handleOpen, onMouseEnter]
	);

	// Handle mouse leave
	const handleMouseLeave = useCallback(
		(event: MouseEvent) => {
			if (getIsOpen()) {
				closingTimeoutRef.current = setTimeout(() => {
					handleClose();
				}, hoverCloseDelay);
			}
			onMouseLeave?.(event);
		},
		[getIsOpen, hoverCloseDelay, handleClose, onMouseLeave]
	);

	// Handle select
	const handleSelect = useCallback(
		(index: number) => {
			if (!multiple) {
				setSelectedIndex(index);
				handleClose();
				setFocus();
			} else if (selectedIndices.indexOf(index) === -1) {
				setSelectedIndices((prev) => [...prev, index]);
			} else {
				setSelectedIndices((prev) => prev.filter((i) => i !== index));
			}

			if (onSelect && options) {
				const option = options[index];
				onSelect(option, { option, optionIndex: index });
			}
		},
		[multiple, selectedIndices, handleClose, setFocus, onSelect, options]
	);

	// Focus menu item
	const focusMenuItem = useCallback((menuItem: HTMLLIElement) => {
		const anchor = menuItem.getElementsByTagName('a')[0];
		if (anchor) {
			anchor.focus();
		}
	}, []);

	// Scroll to menu item
	const scrollToMenuItem = useCallback(
		(menu: HTMLUListElement | null, menuItem: HTMLLIElement | null) => {
			if (menu && menuItem) {
				const menuHeight = menu.offsetHeight;
				const menuTop = menu.scrollTop;
				const menuItemTop = menuItem.offsetTop - menu.offsetTop;

				if (menuItemTop < menuTop) {
					menu.scrollTop = menuItemTop;
				} else {
					const menuBottom = menuTop + menuHeight + menu.offsetTop;
					const menuItemBottom =
						menuItemTop + menuItem.offsetHeight + menu.offsetTop;
					if (menuItemBottom > menuBottom) {
						menu.scrollTop = menuItemBottom - menuHeight - menu.offsetTop;
					}
				}
			}
		},
		[]
	);

	// Handle keyboard focus
	const handleKeyboardFocus = useCallback(
		(newFocusedIndex: number | undefined) => {
			if (
				focusedIndex !== newFocusedIndex &&
				newFocusedIndex !== undefined
			) {
				setFocusedIndex(newFocusedIndex);
			}

			const menu = getMenu();
			const menuItem = getMenuItem(newFocusedIndex ?? -1);

			if (menuItem) {
				focusMenuItem(menuItem);
				scrollToMenuItem(menu, menuItem);
			}
		},
		[focusedIndex, getMenu, getMenuItem, focusMenuItem, scrollToMenuItem]
	);

	// Create a context object for keyboard navigation
	const componentContext = useMemo(
		() => ({
			trigger: triggerRef.current,
			handleClick: (event: Event) => {
				handleClick(event as unknown as MouseEvent);
			},
		}),
		[handleClick]
	);

	// Handle keyboard navigate
	const handleKeyboardNavigate = useCallback(
		({
			event,
			isOpen: menuIsOpen = true,
			keyCode,
			onFocus: focusCallback = handleKeyboardFocus,
			onSelect: selectCallback,
			target,
			toggleOpen: toggleCallback = noop,
		}: {
			event: KeyboardEvent;
			isOpen?: boolean;
			keyCode: number;
			onFocus?: (index: number | undefined) => void;
			onSelect: (index: number) => void;
			target: EventTarget | null;
			toggleOpen?: () => void;
		}) => {
			keyboardNavigate({
				componentContext,
				currentFocusedIndex: focusedIndex,
				event,
				isOpen: menuIsOpen,
				key: (event as unknown as { key?: string }).key,
				keyCode,
				navigableItems,
				onFocus: focusCallback,
				onSelect: selectCallback,
				target,
				toggleOpen: toggleCallback,
			});
		},
		[componentContext, focusedIndex, handleKeyboardFocus, navigableItems]
	);

	// Handle cancel
	const handleCancel = useCallback(() => {
		setFocus();
		handleClose();
	}, [setFocus, handleClose]);

	// Handle key down
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.keyCode) {
				if (event.keyCode === KEYS.TAB) {
					handleCancel();
				} else if (
					event.keyCode === KEYS.ENTER ||
					event.keyCode === KEYS.SPACE ||
					event.keyCode === KEYS.DOWN ||
					event.keyCode === KEYS.UP ||
					event.keyCode === KEYS.ESCAPE
				) {
					EventUtil.trap(event);
					handleKeyboardNavigate({
						event,
						isOpen: getIsOpen(),
						keyCode: event.keyCode,
						onSelect: handleSelect,
						target: event.target,
						toggleOpen,
					});
				}
				onKeyDown?.(event);
			}
		},
		[handleCancel, handleKeyboardNavigate, getIsOpen, handleSelect, toggleOpen, onKeyDown]
	);

	// Handle click custom content
	const handleClickCustomContent = useCallback(() => {
		setFocus();
		handleClose();
		onSelect?.(
			{} as MenuDropdownOption,
			{ option: {} as MenuDropdownOption, optionIndex: -1 }
		);
	}, [setFocus, handleClose, onSelect]);

	// Save ref to trigger
	const saveRefToTrigger = useCallback(
		(trigger: HTMLButtonElement | null) => {
			triggerRef.current = trigger;
			if (!triggerRendered && trigger) {
				setTriggerRendered(true);
			}
			if (trigger && requestFocus && onRequestFocus) {
				onRequestFocus(trigger);
			}
		},
		[triggerRendered, requestFocus, onRequestFocus]
	);

	// Save ref to trigger container
	const saveRefToTriggerContainer = useCallback(
		(container: HTMLDivElement | null) => {
			triggerContainerRef.current = container;
			if (!triggerRef.current) {
				triggerRef.current = container?.querySelector('button') || null;
			}
		},
		[]
	);

	// Save ref to list
	const saveRefToList = useCallback((list: HTMLUListElement | null) => {
		listRef.current = list;
	}, []);

	// Save ref to list item
	const saveRefToListItem = useCallback(
		(listItem: HTMLLIElement | null, index: number) => {
			listItemsRef.current[index] = listItem;
			if (index === focusedIndex && listItem) {
				handleKeyboardFocus(focusedIndex);
			}
		},
		[focusedIndex, handleKeyboardFocus]
	);

	// Render overlay
	const renderOverlay = useCallback(
		(shouldShow: boolean) => {
			if (isFunction(overlayProp) && documentDefined) {
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

	// Effect for overlay
	useEffect(() => {
		renderOverlay(isOpen);
	}, [isOpen, renderOverlay]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			isUnmountingRef.current = true;
			if (currentOpenDropdown?.handleClose === handleCloseRef.current) {
				currentOpenDropdown = undefined;
			}
			renderOverlay(false);
			if (closingTimeoutRef.current) {
				clearTimeout(closingTimeoutRef.current);
			}
		};
	}, [renderOverlay]);

	// Render default menu content
	const renderDefaultMenuContent = useCallback(
		(customListProps?: Record<string, unknown>) => (
			<List
				key={`${getId()}-dropdown-list`}
				checkmark={checkmark}
				getListItemId={getListItemId}
				itemRefs={saveRefToListItem}
				itemRenderer={getListItemRenderer()}
				onCancel={handleCancel}
				onSelect={handleSelect}
				options={options}
				ref={saveRefToList}
				selectedIndex={!multiple ? selectedIndex : undefined}
				selectedIndices={multiple ? selectedIndices : undefined}
				tooltipMenuItem={tooltipMenuItem}
				triggerId={getId()}
				length={length}
				{...customListProps}
			/>
		),
		[
			getId,
			checkmark,
			getListItemId,
			saveRefToListItem,
			getListItemRenderer,
			handleCancel,
			handleSelect,
			options,
			saveRefToList,
			multiple,
			selectedIndex,
			selectedIndices,
			tooltipMenuItem,
			length,
		]
	);

	// Render menu content
	const renderMenuContent = useCallback(
		(customContent: ReactNode[] | null) => {
			const customContentWithListPropInjection: ReactNode[] = [];

			if (customContent) {
				React.Children.forEach(customContent, (child) => {
					if (
						child &&
						typeof child === 'object' &&
						'type' in child &&
						(child.type as { displayName?: string })?.displayName === LIST
					) {
						customContentWithListPropInjection.push(
							renderDefaultMenuContent((child as ReactElement).props as Record<string, unknown>)
						);
					} else if (child) {
						const clonedCustomContent = React.cloneElement(
							child as ReactElement<{ onClick?: () => void; key?: string }>,
							{
								onClick: handleClickCustomContent,
								key: generateId(),
							}
						);
						customContentWithListPropInjection.push(clonedCustomContent);
					}
				});
			}

			return customContentWithListPropInjection.length > 0
				? customContentWithListPropInjection
				: renderDefaultMenuContent();
		},
		[renderDefaultMenuContent, handleClickCustomContent]
	);

	// Render dialog
	const renderDialog = useCallback(
		(
			customContent: ReactNode[] | null,
			shouldShow: boolean,
			outsideClickIgnoreClass: string
		) => {
			let dialogAlign = 'bottom';
			let hasNubbin = false;
			let positionClassName = '';

			if (nubbinPosition) {
				hasNubbin = true;
				dialogAlign = DropdownToDialogNubbinMapping[nubbinPosition];
			} else if (align) {
				dialogAlign = align === 'center' ? 'bottom' : `bottom ${align}`;
			}

			const positions = DropdownToDialogNubbinMapping[dialogAlign]?.split(' ') || [];
			positionClassName = classNames(
				positions.map((position) => `slds-dropdown_${position}`)
			);

			const menuStylesBase: React.CSSProperties = {};
			if (align === 'center' && !hasNubbin) {
				menuStylesBase.transform = 'none';
			}

			return shouldShow ? (
				<Dialog
					align={dialogAlign as 'top' | 'top left' | 'top right' | 'bottom' | 'bottom left' | 'bottom right'}
					className={classNames(containerClassName)}
					closeOnTabKey
					contentsClassName={classNames(
						'slds-dropdown',
						`slds-dropdown_${width}`,
						'slds-text-align_left',
						'ignore-react-onclickoutside',
						className,
						positionClassName,
						{
							'slds-dropdown_inverse': inverse,
						}
					)}
					context={context}
					hasNubbin={hasNubbin}
					hasStaticAlignment={hasStaticAlignment}
					inheritWidthOf={inheritTargetWidth ? 'target' : 'none'}
					offset={offset}
					onClose={handleClose}
					onKeyDown={handleKeyDown}
					outsideClickIgnoreClass={outsideClickIgnoreClass}
					position={menuPosition}
					style={{
						...menuStylesBase,
						...menuStyle,
					}}
					onRequestTargetElement={() => triggerRef.current}
				>
					{renderMenuContent(customContent)}
				</Dialog>
			) : null;
		},
		[
			nubbinPosition,
			align,
			containerClassName,
			className,
			inverse,
			context,
			hasStaticAlignment,
			inheritTargetWidth,
			offset,
			handleClose,
			handleKeyDown,
			menuPosition,
			menuStyle,
			width,
			renderMenuContent,
		]
	);

	// Find custom trigger and content from children
	let CurrentTrigger: React.ElementType = DefaultTrigger;
	let CustomTriggerChildProps: Record<string, unknown> = {};
	const customContent: ReactNode[] = [];

	React.Children.forEach(children, (child) => {
		if (
			child &&
			typeof child === 'object' &&
			'type' in child &&
			(child.type as { displayName?: string })?.displayName ===
				MENU_DROPDOWN_TRIGGER
		) {
			CustomTriggerChildProps = (child as ReactElement).props as Record<string, unknown>;
			CurrentTrigger = (child as ReactElement).type as React.ElementType;
		} else if (child) {
			customContent.push(child);
		}
	});

	const outsideClickIgnoreClass = `ignore-click-${getId()}`;

	return (
		<CurrentTrigger
			ref={saveRefToTriggerContainer}
			aria-haspopup
			assistiveText={assistiveText}
			className={classNames(outsideClickIgnoreClass, buttonClassName)}
			disabled={disabled}
			hint={hint}
			iconCategory={iconCategory}
			iconName={iconName}
			iconPosition={iconPosition}
			iconSize={iconSize}
			iconVariant={iconVariant}
			id={getId()}
			inverse={buttonInverse}
			isOpen={isOpen}
			label={label}
			menu={renderDialog(
				customContent.length > 0 ? customContent : null,
				isOpen,
				outsideClickIgnoreClass
			)}
			onBlur={onBlur}
			onClick={
				openOn === 'click' || openOn === 'hybrid' ? handleClick : onClick
			}
			onFocus={handleFocus}
			onKeyDown={handleKeyDown}
			onMouseDown={onMouseDown}
			onMouseEnter={
				openOn === 'hover' || openOn === 'hybrid' ? handleMouseEnter : undefined
			}
			onMouseLeave={
				openOn === 'hover' || openOn === 'hybrid' ? handleMouseLeave : undefined
			}
			openOn={openOn}
			style={style}
			tabIndex={tabIndex || (isOpen ? '-1' : '0')}
			tooltip={tooltip}
			triggerClassName={triggerClassName}
			triggerRef={saveRefToTrigger}
			variant={buttonVariant}
			{...CustomTriggerChildProps}
		/>
	);
};

MenuDropdown.displayName = MENU_DROPDOWN;

export default MenuDropdown;
export { ListItem, ListItemLabel };

