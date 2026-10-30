/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable class-methods-use-this */

import React, { type ReactNode, type SyntheticEvent } from 'react';
import classNames from 'classnames';
import eventUtil from '../../utilities/event';

import { SPLIT_VIEW_LISTBOX } from '../../utilities/constants';

import Icon from '../icon';
import SplitViewListItemContent, {
	type SplitViewListItem,
} from './private/list-item-content';
import listItemWithContent from './private/list-item-with-content';
import checkProps, { checkSelectionProps } from './listbox-check-props';
import componentDoc from './component.json';

export const SORT_OPTIONS = Object.freeze({
	UP: 'up',
	DOWN: 'down',
});

export interface SplitViewListboxSortAssistiveText {
	sortedBy?: string;
	descending?: string;
	ascending?: string;
}

export interface SplitViewListboxAssistiveText {
	list?: string;
	sort?: SplitViewListboxSortAssistiveText;
	unreadItem?: string;
}

export interface SplitViewListboxSelectData<
	T extends SplitViewListboxItem = SplitViewListboxItem,
> {
	/** The requested selection, as item ids. Pass it back as `selection`. */
	selection: SplitViewListboxItemId[];
	/** The items of the requested selection */
	selectedItems: T[];
	/** The item that was clicked, or the range anchor for select-all (`null` when deselecting all) */
	item: T | null;
}

export interface SplitViewListboxEvents<
	T extends SplitViewListboxItem = SplitViewListboxItem,
> {
	/**
	 * Called when the selection is asked to change (click, meta/shift-click, Ctrl+A).
	 * `data.selection` is the requested selection; update `selection` to apply it.
	 */
	onSelect: (
		event: SyntheticEvent,
		data: SplitViewListboxSelectData<T>
	) => void;
	/**
	 * Called when the list is sorted.
	 */
	onSort?: (event: SyntheticEvent) => void;
}

export interface SplitViewListboxLabels {
	/** This is the header of the list. */
	header?: string;
}

/** An item's `id`, as used in `selection` and `unread` */
export type SplitViewListboxItemId = string | number;

/**
 * Fields read by the default list item. Items with other fields are typed by
 * the `SplitViewListbox` type parameter, which flows to `renderListItem`, `listItem` and `onSelect`.
 */
export type SplitViewListboxItem = SplitViewListItem & {
	/** Unique id of the item, matched against `selection` and `unread` */
	id: SplitViewListboxItemId;
};

/**
 * Data passed to `renderListItem`
 */
export interface SplitViewListboxRenderListItemData<
	T extends SplitViewListboxItem = SplitViewListboxItem,
> {
	/** Whether the item has keyboard focus (is the list's tab stop) */
	isFocused: boolean;
	/** Whether the item is in `selection` */
	isSelected: boolean;
	/** Whether the item is in `unread` */
	isUnread: boolean;
	/** The item from `options` */
	item: T;
}

export interface SplitViewListboxProps<
	T extends SplitViewListboxItem = SplitViewListboxItem,
> {
	/**
	 * **Assistive text for accessibility**
	 * * `list`: aria label for the list
	 * * `sort`
	 *    * `sortedBy`: Clickable sort header for the list.
	 *    * `descending`: Descending sorting.
	 *    * `ascending`: Ascending sorting.
	 */
	assistiveText?: SplitViewListboxAssistiveText;
	/**
	 * CSS classes to be added to the parent `div` tag.
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Event Callbacks
	 * * `onSelect` (required): Called with `(event, { selection, selectedItems, item })` when the selection is asked to change. `selection` is the requested selection as item ids.
	 * * `onSort`: Called when the list is sorted.
	 */
	events: SplitViewListboxEvents<T>;
	/**
	 * HTML id for component.
	 */
	id?: string;
	/**
	 * **Text labels for internationalization**
	 * * `header`: This is the header of the list.
	 */
	labels?: SplitViewListboxLabels;
	/**
	 * The direction of the sort arrow. Option are:
	 * * SORT_OPTIONS.UP: `up`
	 * * SORT_OPTIONS.DOWN: `down`
	 */
	sortDirection?: 'up' | 'down';
	/**
	 * Allows multiple item to be selection
	 */
	multiple?: boolean;
	/**
	 * The list of items.
	 * It is recommended that you have a unique `id` for each item.
	 */
	options: T[];
	/**
	 * Ids (`item.id`) of the selected items (`[]` for none). The listbox is controlled: it renders this
	 * selection and reports changes through `events.onSelect`. For single selection, pass an array of one id.
	 *
	 * Passing item objects is deprecated: they are still matched by `id` (or by identity when an item
	 * has no `id`), and the listbox warns.
	 */
	selection: SplitViewListboxItemId[] | T[];
	/**
	 * Ids (`item.id`) of the unread items.
	 *
	 * Passing item objects is deprecated: they are still matched by `id` (or by identity when an item
	 * has no `id`), and the listbox warns.
	 */
	unread?: SplitViewListboxItemId[] | T[];
	/**
	 * @deprecated Use `renderListItem` instead, which is called as a function with `{ isFocused, isSelected, isUnread, item }`.
	 */
	listItem?: React.ComponentType<{ item: T }>;
	/**
	 * Renders the content of each list item in place of the default label and text. The listbox still renders the option, its selection and the unread indicator around it. Receives `{ isFocused, isSelected, isUnread, item }`.
	 */
	renderListItem?: (data: SplitViewListboxRenderListItemData<T>) => ReactNode;
}

interface SplitViewListboxState<T extends SplitViewListboxItem> {
	/** Anchor of shift-click range selection: the last clicked item (ephemeral, not the selection) */
	anchorItem: T | null;
	currentFocusedListItem: {
		index: number;
		item: T | null;
	};
}

// Typed by its keys (not `Partial<SplitViewListboxProps>`) so JSX still requires the other props
const defaultProps = {
	assistiveText: {
		list: 'Select an item to open it in a new workspace tab.',
		sort: {
			sortedBy: 'Sorted by',
			descending: 'Descending',
			ascending: 'Ascending',
		},
	},
	labels: {},
} satisfies Partial<SplitViewListboxProps>;

const EMPTY: never[] = [];

/**
 * Key an item, or an entry of `selection`/`unread`, is matched by: the id, or for an item object
 * without an `id` (deprecated object entries only), the object itself.
 */
const toKey = (entry: unknown): unknown =>
	entry !== null && typeof entry === 'object'
		? ((entry as { id?: unknown }).id ?? entry)
		: entry;

/**
 * The menu with the ARIA role of a listbox.
 */
class SplitViewListbox<
	T extends SplitViewListboxItem = SplitViewListboxItem,
> extends React.Component<SplitViewListboxProps<T>, SplitViewListboxState<T>> {
	static displayName = SPLIT_VIEW_LISTBOX;

	static defaultProps = defaultProps;

	listItemComponents: Record<number, HTMLAnchorElement>;

	ListItemWithContent: ReturnType<typeof listItemWithContent>;

	constructor(props: SplitViewListboxProps<T>) {
		super(props);

		this.listItemComponents = {};

		this.state = {
			anchorItem: null,
			currentFocusedListItem: {
				index: 0,
				item: null,
			},
		};

		checkProps(SPLIT_VIEW_LISTBOX, props, componentDoc);

		// Generates the list item template
		this.ListItemWithContent = listItemWithContent(
			(props.listItem as unknown as React.ComponentType<
				import('./private/list-item-with-content').ListItemWithContentProps
			>) ||
				(SplitViewListItemContent as unknown as React.ComponentType<
					import('./private/list-item-with-content').ListItemWithContentProps
				>)
		);
	}

	componentDidMount() {
		checkSelectionProps(SPLIT_VIEW_LISTBOX, this.props, componentDoc);
		this.focusFirstItem();
	}

	componentDidUpdate() {
		checkSelectionProps(SPLIT_VIEW_LISTBOX, this.props, componentDoc);
	}

	isListItemFocused(item: T) {
		const focusedItem = this.state.currentFocusedListItem.item;
		return focusedItem !== null && toKey(focusedItem) === toKey(item);
	}

	isSelected(item: T) {
		const key = toKey(item);
		return (this.props.selection || EMPTY).some(
			(entry: unknown) => toKey(entry) === key
		);
	}

	isUnread(item: T) {
		const key = toKey(item);
		return (this.props.unread || EMPTY).some(
			(entry: unknown) => toKey(entry) === key
		);
	}

	/** The selected items, in `options` order */
	selectedItems(): T[] {
		return this.props.options.filter((item) => this.isSelected(item));
	}

	indexOfItem(item: T | null): number {
		const key = item === null ? undefined : toKey(item);
		return key === undefined
			? -1
			: this.props.options.findIndex((option) => toKey(option) === key);
	}

	reportSelection(event: SyntheticEvent, selectedItems: T[], item: T | null) {
		this.props.events?.onSelect?.(event, {
			selection: selectedItems.map((selectedItem) => selectedItem.id),
			selectedItems,
			item,
		});
	}

	handleKeyDown(event: React.KeyboardEvent) {
		if (this.props.multiple && event.key === 'a' && event.ctrlKey) {
			// select / deselect all
			eventUtil.trap(event);
			const { options } = this.props;
			if (
				options.length > 0 &&
				options.every((option) => this.isSelected(option))
			) {
				this.deselectAllListItems(event);
			} else {
				this.selectAllListItems(event);
			}
		} else if (event.key === 'ArrowUp') {
			eventUtil.trap(event);
			this.moveToPreviousItem(event);
		} else if (event.key === 'ArrowDown') {
			eventUtil.trap(event);
			this.moveToNextItem(event);
		}
	}

	moveToNextItem(event: SyntheticEvent) {
		const nextFocusIndex =
			this.state.currentFocusedListItem.index === this.props.options.length - 1
				? 0
				: this.state.currentFocusedListItem.index + 1;

		this.moveToIndex(event, nextFocusIndex);
	}

	moveToPreviousItem(event: SyntheticEvent) {
		const previousFocusIndex =
			this.state.currentFocusedListItem.index === 0
				? this.props.options.length - 1
				: this.state.currentFocusedListItem.index - 1;

		this.moveToIndex(event, previousFocusIndex);
	}

	moveToIndex(event: SyntheticEvent, index: number) {
		const item = this.props.options[index];

		this.focusItem(item);
	}

	focusFirstItem() {
		const firstSelectedItem =
			this.props.options.find((item) => this.isSelected(item)) ||
			this.props.options[0];

		if (firstSelectedItem) {
			this.focusItem(firstSelectedItem, true);
		}
	}

	focusItem(item: T, setDataOnly?: boolean) {
		const index = this.props.options.indexOf(item);

		if (!setDataOnly) {
			this.listItemComponents[index].focus();
		}

		this.setState({
			currentFocusedListItem: {
				index,
				item,
			},
		});
	}

	deselectAllListItems(event: SyntheticEvent) {
		this.setState({ anchorItem: null });
		this.reportSelection(event, [], null);
	}

	selectAllListItems(event: SyntheticEvent) {
		this.reportSelection(event, [...this.props.options], this.state.anchorItem);
	}

	// Reports the requested selection. The rendered selection only changes when `selection` does.
	selectListItem(item: T, event: React.MouseEvent) {
		let selectedItems = [item];

		if (this.props.multiple) {
			const currentItems = this.selectedItems();
			if (event.metaKey) {
				selectedItems = this.isSelected(item)
					? currentItems.filter((i) => toKey(i) !== toKey(item))
					: [item, ...currentItems];
			} else if (event.shiftKey) {
				const itemIndex = this.indexOfItem(item);
				// Without an earlier click, the range starts at the first selected item
				const anchorIndex = [
					this.indexOfItem(this.state.anchorItem),
					this.indexOfItem(currentItems[0] ?? null),
					itemIndex,
				].find((index) => index !== -1) as number;
				const begin = Math.min(anchorIndex, itemIndex);
				const end = Math.max(anchorIndex, itemIndex);

				const addToSelection = this.props.options.slice(begin, end + 1);
				const addedKeys = addToSelection.map(toKey);

				selectedItems = [
					...addToSelection,
					...currentItems.filter((i) => !addedKeys.includes(toKey(i))),
				];
			}
		}

		this.setState({ anchorItem: item });

		this.reportSelection(event, selectedItems, item);
	}

	handleOnSelect(event: React.MouseEvent, { item }: { item: T }) {
		this.selectListItem(item, event);
		this.focusItem(item);
	}

	sortDirection(): ReactNode {
		return this.props.sortDirection ? (
			<Icon
				category="utility"
				name={
					this.props.sortDirection === SORT_OPTIONS.DOWN
						? 'arrowdown'
						: 'arrowup'
				}
				size="xx-small"
				className="slds-align-top"
			/>
		) : null;
	}

	headerWrapper(children: ReactNode): ReactNode {
		return this.props.events?.onSort ? (
			<a
				aria-live="polite"
				style={{ borderTop: '0' }}
				href="#"
				role="button"
				className="slds-split-view__list-header slds-grid slds-text-link_reset"
				onClick={eventUtil.trappedHandler(this.props.events.onSort)}
			>
				{children}
			</a>
		) : (
			<div
				style={{ borderTop: '0' }}
				className="slds-split-view__list-header slds-grid"
			>
				{children}
			</div>
		);
	}

	header(): ReactNode {
		const sort = this.props.assistiveText?.sort || {};
		return this.props.labels?.header
			? this.headerWrapper(
					<span
						aria-sort={
							(this.props.sortDirection === SORT_OPTIONS.DOWN
								? sort.descending
								: sort.ascending) as React.AriaAttributes['aria-sort']
						}
					>
						<span className="slds-assistive-text">
							{sort.sortedBy}
							{': '}
						</span>
						<span>
							{this.props.labels.header}
							{this.sortDirection()}
						</span>
						<span className="slds-assistive-text">
							{'- '}
							{this.props.sortDirection === SORT_OPTIONS.DOWN
								? sort.descending
								: sort.ascending}
						</span>
					</span>
				)
			: null;
	}

	addListItemComponent(component: HTMLAnchorElement, index: number) {
		this.listItemComponents[index] = component;
	}

	listItems(): ReactNode {
		const { ListItemWithContent } = this;
		const { renderListItem } = this.props;

		return this.props.options.map((item, index) => (
			<ListItemWithContent
				key={item.id || index}
				assistiveText={{
					unreadItem: this.props.assistiveText?.unreadItem,
				}}
				listItemRef={(component: HTMLAnchorElement | null) => {
					if (component) {
						this.addListItemComponent(component, index);
					}
				}}
				item={item}
				isFocused={this.isListItemFocused(item)}
				isSelected={this.isSelected(item)}
				isUnread={this.isUnread(item)}
				events={{
					onClick: (event, meta) =>
						this.handleOnSelect(event, {
							item: meta.item as T,
						}),
				}}
				multiple={this.props.multiple}
				renderContent={
					renderListItem
						? (data) => renderListItem({ ...data, item })
						: undefined
				}
			/>
		));
	}

	render() {
		return (
			<div
				id={this.props.id}
				className={classNames(
					'slds-grid slds-grid_vertical slds-scrollable_none',
					this.props.className as string
				)}
			>
				{this.header()}
				<ul
					className="slds-scrollable_y"
					aria-label={this.props.assistiveText?.list}
					aria-multiselectable={this.props.multiple}
					role="listbox"
					onKeyDown={(event) => this.handleKeyDown(event)}
				>
					{this.listItems()}
				</ul>
			</div>
		);
	}
}

export default SplitViewListbox;
