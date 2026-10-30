/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useRef,
	useCallback,
	useEffect,
	useId,
	type ReactNode,
	type MouseEvent,
	type KeyboardEvent,
} from 'react';
import classNames from 'classnames';

// Child components
import TabsList from './private/tabs-list';
import Tab from './private/tab';
import TabPanel from './private/tab-panel';

import { TABS } from '../../utilities/constants';
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

import checkProps from './check-props';
import componentDoc from './component.json';

/**
 * Tabs variant types
 */
export type TabsVariant = 'default' | 'scoped' | 'vertical';

/**
 * Tab child props (TabsPanel)
 */
export interface TabChildProps {
	label: ReactNode;
	value?: string;
	disabled?: boolean;
	hasError?: boolean;
	assistiveText?: {
		withErrorIcon?: string;
	};
	children?: ReactNode;
	key?: string | number;
}

/**
 * Data passed to the Tabs `onSelect` callback
 */
export interface TabsSelectData {
	/**
	 * `value` of the tab being selected: the panel's `value`, or its index as a
	 * string (`'0'`, `'1'`, ...) when the panel has no `value`.
	 */
	value: string;
	/**
	 * `value` of the tab that was selected before this selection, or `undefined`
	 * when no tab was selected.
	 */
	previousValue: string | undefined;
	/** Index of the tab being selected */
	selectedIndex: number;
	/** Index of the tab that was selected before this selection, or `-1` when no tab was selected */
	previousIndex: number;
}

/**
 * Props shared by both ways of controlling the selected tab
 */
interface TabsBaseProps {
	/** TabsPanel children */
	children: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** HTML id */
	id?: string;
	/**
	 * Called when a tab is requested by click or arrow key. Receives the triggering event and
	 * `{ value, previousValue, selectedIndex, previousIndex }`. Tabs is controlled: update `value`
	 * from this callback to change tabs. It is not called for a disabled tab or for the tab that is
	 * already selected.
	 */
	onSelect: (
		event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
		data: TabsSelectData
	) => void;
	/** Tab style variant */
	variant?: TabsVariant;
}

/**
 * Select the tab by the `value` of its `TabsPanel`.
 */
interface TabsValueProps {
	/**
	 * `value` of the selected `TabsPanel` (required, controlled). A panel without a `value` is
	 * matched by its index as a string (`'0'`, `'1'`, ...). When no panel matches, no tab is selected.
	 */
	value: string;
	selectedIndex?: never;
}

/**
 * Select the tab by index (deprecated).
 */
interface TabsSelectedIndexProps {
	value?: undefined;
	/**
	 * @deprecated Use `value` instead (set `value` on each `TabsPanel`, or use the index as a
	 * string). Index of the selected tab, controlled. Used only when `value` is not passed.
	 */
	selectedIndex: number;
}

/**
 * Props for the Tabs component
 */
export type TabsProps = TabsBaseProps &
	(TabsValueProps | TabsSelectedIndexProps);

// The value a panel is matched by: its `value`, or its index as a string.
const getPanelValue = (
	child: React.ReactElement<TabChildProps>,
	index: number
): string => child.props.value ?? String(index);

// Determine if a node from event.target is a Tab element
function isTabNode(node: HTMLElement): boolean {
	return (
		(node.nodeName === 'A' && node.getAttribute('role') === 'tab') ||
		(node.nodeName === 'LI' &&
			(node.classList.contains('slds-tabs_default__item') ||
				node.classList.contains('slds-tabs_scoped__item') ||
				node.classList.contains('slds-vertical-tabs__nav-item')))
	);
}

// Determine if a tab node is disabled (from DOM)
function isTabNodeDisabled(node: HTMLElement): boolean {
	if (node.classList?.contains('slds-disabled')) {
		return true;
	}
	if (node.getAttribute?.('aria-disabled') === 'true') {
		return true;
	}
	return false;
}

// Determine if a tab React element is disabled
function isTabDisabled(tab: React.ReactElement<TabChildProps>): boolean {
	return Boolean(tab.props?.disabled);
}

/**
 * Tabs keeps related content in a single container that is shown and hidden through navigation.
 */
const Tabs = (props: TabsProps): React.ReactElement => {
	const {
		children,
		className,
		id: propId,
		onSelect,
		selectedIndex: selectedIndexProp,
		value,
		variant = 'default',
	} = props;
	const generatedId = useId();
	const id = propId || generatedId;

	useEffect(() => {
		checkProps(
			TABS,
			{
				defaultSelectedIndex: (props as { defaultSelectedIndex?: number })
					.defaultSelectedIndex,
				selectedIndex: selectedIndexProp,
				value,
			},
			componentDoc
		);
	});

	const [focus, setFocus] = useState(false);
	const tabsRef = useRef<
		Array<{ tab: React.ReactElement<TabChildProps>; node: HTMLElement | null }>
	>([]);
	const tabsNodeRef = useRef<HTMLDivElement>(null);

	const childArray = React.Children.toArray(
		children
	) as React.ReactElement<TabChildProps>[];
	const tabsCount = childArray.length;

	// Selection is controlled: derived from `value`, or from the deprecated
	// `selectedIndex` when `value` is not passed. There is no internal copy.
	const selectedIndex =
		value !== undefined
			? childArray.findIndex(
					(child, index) => getPanelValue(child, index) === value
				)
			: Number.isInteger(selectedIndexProp)
				? (selectedIndexProp as number)
				: -1;

	const getNextTab = useCallback(
		(index: number): number => {
			// Look for non-disabled tab from index to the last tab
			for (let i = index + 1; i < tabsCount; i++) {
				const tab = tabsRef.current[i];
				if (tab && !isTabDisabled(tab.tab)) {
					return i;
				}
			}
			// Continue from first tab
			for (let i = 0; i < index; i++) {
				const tab = tabsRef.current[i];
				if (tab && !isTabDisabled(tab.tab)) {
					return i;
				}
			}
			return index;
		},
		[tabsCount]
	);

	const getPrevTab = useCallback(
		(index: number): number => {
			// Look for non-disabled tab backwards
			for (let i = index - 1; i >= 0; i--) {
				const tab = tabsRef.current[i];
				if (tab && !isTabDisabled(tab.tab)) {
					return i;
				}
			}
			// Continue from last tab
			for (let i = tabsCount - 1; i > index; i--) {
				const tab = tabsRef.current[i];
				if (tab && !isTabDisabled(tab.tab)) {
					return i;
				}
			}
			return index;
		},
		[tabsCount]
	);

	const setSelected = useCallback(
		(
			event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
			index: number,
			shouldFocus?: boolean
		) => {
			if (index < 0 || index >= tabsCount || index === selectedIndex) return;

			const previous =
				selectedIndex >= 0 ? childArray[selectedIndex] : undefined;
			onSelect?.(event, {
				value: getPanelValue(childArray[index], index),
				previousValue: previous
					? getPanelValue(previous, selectedIndex)
					: undefined,
				selectedIndex: index,
				previousIndex: selectedIndex,
			});
			// Focus follows the selection once the parent updates `value`.
			setFocus(shouldFocus === true);
		},
		[tabsCount, onSelect, selectedIndex, childArray]
	);

	const isTabFromContainer = useCallback((node: HTMLElement): boolean => {
		if (!isTabNode(node)) return false;

		let nodeAncestor: HTMLElement | null = node.parentElement;
		while (nodeAncestor) {
			if (nodeAncestor === tabsNodeRef.current) return true;
			if (nodeAncestor.getAttribute('data-tabs')) break;
			nodeAncestor = nodeAncestor.parentElement;
		}
		return false;
	}, []);

	const handleClick = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			let node = e.target as HTMLElement;
			do {
				if (isTabFromContainer(node)) {
					if (isTabNodeDisabled(node)) return;

					let parentNode = node.parentNode as HTMLElement;
					if (parentNode?.nodeName === 'LI') {
						node = parentNode;
						parentNode = node.parentNode as HTMLElement;
					}

					const index = Array.from(parentNode.children).indexOf(node);
					setSelected(e, index);
					return;
				}
				node = node.parentNode as HTMLElement;
			} while (node !== null);
		},
		[isTabFromContainer, setSelected]
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (isTabFromContainer(event.target as HTMLElement)) {
				let index = selectedIndex;
				let preventDefault = false;

				if (event.keyCode === KEYS.LEFT || event.keyCode === KEYS.UP) {
					index = getPrevTab(index);
					preventDefault = true;
				} else if (
					event.keyCode === KEYS.RIGHT ||
					event.keyCode === KEYS.DOWN
				) {
					index = getNextTab(index);
					preventDefault = true;
				}

				if (preventDefault) {
					EventUtil.trap(event);
				}

				setSelected(event, index, true);
			}
		},
		[isTabFromContainer, selectedIndex, getPrevTab, getNextTab, setSelected]
	);

	const renderTabsList = () => (
		<TabsList id={id} variant={variant}>
			{childArray.map((child, index) => {
				const tabId = `${id}-slds-tabs_tab-${index}`;
				const panelId = `${id}-slds-tabs_panel-${index}`;
				const isSelected = selectedIndex === index;
				const shouldFocus = isSelected && focus;

				return (
					<Tab
						key={child.key ?? index}
						ref={(node: HTMLElement | null) => {
							tabsRef.current[index] = { tab: child, node };
							if (focus) {
								setFocus(false);
							}
						}}
						focus={shouldFocus}
						selected={isSelected}
						id={tabId}
						panelId={panelId}
						disabled={child.props.disabled}
						variant={variant}
						hasError={child.props.hasError}
						assistiveText={child.props.assistiveText}
					>
						{child.props.label}
					</Tab>
				);
			})}
		</TabsList>
	);

	const renderTabPanels = () =>
		childArray.map((child, index) => {
			const tabId = `${id}-slds-tabs_tab-${index}`;
			const panelId = `${id}-slds-tabs_panel-${index}`;
			const isSelected = selectedIndex === index;

			return (
				<TabPanel
					key={child.key ?? index}
					selected={isSelected}
					id={panelId}
					tabId={tabId}
					variant={variant}
				>
					{child}
				</TabPanel>
			);
		});

	return (
		<div
			id={id}
			className={classNames(
				{
					'slds-tabs_default': variant === 'default',
					'slds-tabs_scoped': variant === 'scoped',
					'slds-vertical-tabs': variant === 'vertical',
				},
				className as string
			)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			data-tabs
			ref={tabsNodeRef}
		>
			{renderTabsList()}
			{renderTabPanels()}
		</div>
	);
};

Tabs.displayName = TABS;

export default Tabs;
