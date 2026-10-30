/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useRef,
	useCallback,
	useId,
	type MouseEvent,
	type KeyboardEvent,
} from 'react';
import classNames from 'classnames';

// Child components
import TabsList from './private/tabs-list';
import Tab from './private/tab';
import TabPanel from './private/tab-panel';
import type { TabsPanelProps } from './panel';
import type { ChildrenOf } from '../../types/common';

import { TABS } from '../../utilities/constants';
import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

/**
 * Tabs variant types
 */
export type TabsVariant = 'default' | 'scoped' | 'vertical';

/** @deprecated Use `TabsPanelProps` from `tabs/panel`. */
export type TabChildProps = TabsPanelProps;

/**
 * Data passed to the Tabs `onSelect` callback
 */
export interface TabsSelectData {
	/** Index of the tab being selected */
	selectedIndex: number;
	/** Index of the tab that was selected before this selection */
	previousIndex: number;
}

/**
 * Props for the Tabs component
 */
export interface TabsProps {
	/** `TabsPanel` elements, one per tab. Tabs reads each panel's `label`, `disabled`, `hasError` and `assistiveText`. */
	children: ChildrenOf<TabsPanelProps>;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Default selected tab index */
	defaultSelectedIndex?: number;
	/** HTML id */
	id?: string;
	/**
	 * Called when a tab is selected by click or keyboard. Receives the triggering event and
	 * `{ selectedIndex, previousIndex }`. When `selectedIndex` is not passed, the selection always
	 * changes; when it is passed (controlled), update it from this callback to change tabs.
	 */
	onSelect?: (
		event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
		data: TabsSelectData
	) => void;
	/** Currently selected tab index (controlled) */
	selectedIndex?: number;
	/** Tab style variant */
	variant?: TabsVariant;
}

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
function isTabDisabled(tab: React.ReactElement<TabsPanelProps>): boolean {
	return Boolean(tab.props?.disabled);
}

/**
 * Tabs keeps related content in a single container that is shown and hidden through navigation.
 */
const Tabs = ({
	children,
	className,
	defaultSelectedIndex = 0,
	id: propId,
	onSelect,
	selectedIndex: controlledSelectedIndex,
	variant = 'default',
}: TabsProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	const [internalSelectedIndex, setInternalSelectedIndex] =
		useState(defaultSelectedIndex);
	const [focus, setFocus] = useState(false);
	const tabsRef = useRef<
		Array<{ tab: React.ReactElement<TabsPanelProps>; node: HTMLElement | null }>
	>([]);
	const tabsNodeRef = useRef<HTMLDivElement>(null);

	const childArray = React.Children.toArray(
		children
	) as React.ReactElement<TabsPanelProps>[];
	const tabsCount = childArray.length;

	// Use controlled or internal state
	const selectedIndex = Number.isInteger(controlledSelectedIndex)
		? controlledSelectedIndex!
		: internalSelectedIndex;

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
			if (index < 0 || index >= tabsCount) return;

			onSelect?.(event, { selectedIndex: index, previousIndex: selectedIndex });

			if (index !== internalSelectedIndex) {
				setInternalSelectedIndex(index);
				setFocus(shouldFocus === true);
			}
		},
		[tabsCount, onSelect, selectedIndex, internalSelectedIndex]
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
