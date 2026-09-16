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

export interface SplitViewListboxSelectData {
	selectedItems: SplitViewListboxItem[];
	item: SplitViewListboxItem | null;
}

export interface SplitViewListboxEvents {
	/**
	 * Called when a list item is selected.
	 */
	onSelect: (event: SyntheticEvent, data: SplitViewListboxSelectData) => void;
	/**
	 * Called when the list is sorted.
	 */
	onSort?: (event: SyntheticEvent) => void;
}

export interface SplitViewListboxLabels {
	/** This is the header of the list. */
	header?: string;
}

export type SplitViewListboxItem = SplitViewListItem & {
	id?: string | number;
	[key: string]: unknown;
};

export interface SplitViewListboxProps {
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
	 * * `onSelect`: Called when a list item is selected.
	 * * `onSort`: Called when the list is sorted.
	 */
	events?: SplitViewListboxEvents;
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
	options: SplitViewListboxItem[];
	/**
	 * Accepts an array of item objects. For single selection, pass in an array of one object.
	 */
	selection?: SplitViewListboxItem[];
	/**
	 * Accepts an array of item objects. For single unread, pass in an array of one object.
	 */
	unread?: SplitViewListboxItem[];
	/**
	 * Custom list item template for the list item content. The select and unread functionality wraps the custom list item.
	 * This should be a React component that accepts props.
	 */
	listItem?: React.ComponentType<{ item?: SplitViewListboxItem }>;
}

interface SplitViewListboxState {
	currentSelectedItem: SplitViewListboxItem | null;
	currentFocusedListItem: {
		index: number;
		item: SplitViewListboxItem | null;
	};
}

const defaultProps: Partial<SplitViewListboxProps> = {
	assistiveText: {
		list: 'Select an item to open it in a new workspace tab.',
		sort: {
			sortedBy: 'Sorted by',
			descending: 'Descending',
			ascending: 'Ascending',
		},
	},
	events: {} as SplitViewListboxEvents,
	labels: {},
	selection: [],
	unread: [],
};

/**
 * The menu with the ARIA role of a listbox.
 */
class SplitViewListbox extends React.Component<
	SplitViewListboxProps,
	SplitViewListboxState
> {
	static displayName = SPLIT_VIEW_LISTBOX;

	static defaultProps = defaultProps;

	listItemComponents: Record<number, HTMLAnchorElement>;

	ListItemWithContent: ReturnType<typeof listItemWithContent>;

	constructor(props: SplitViewListboxProps) {
		super(props);

		this.listItemComponents = {};

		this.state = {
			currentSelectedItem: null,
			currentFocusedListItem: {
				index: 0,
				item: null,
			},
		};

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
		this.focusFirstItem();
	}

	isListItemFocused(item: SplitViewListboxItem) {
		return this.state.currentFocusedListItem.item === item;
	}

	isSelected(item: SplitViewListboxItem) {
		return (this.props.selection || []).includes(item);
	}

	isUnread(item: SplitViewListboxItem) {
		return (this.props.unread || []).includes(item);
	}

	handleKeyDown(event: React.KeyboardEvent) {
		if (this.props.multiple && event.key === 'a' && event.ctrlKey) {
			// select / deselect all
			eventUtil.trap(event);
			if (this.props.options === this.props.selection) {
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
			this.props.options.find((item) =>
				(this.props.selection || []).includes(item)
			) || this.props.options[0];

		if (firstSelectedItem) {
			this.focusItem(firstSelectedItem, true);
		}
	}

	focusItem(item: SplitViewListboxItem, setDataOnly?: boolean) {
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
		this.setState({ currentSelectedItem: null });
		this.props.events?.onSelect(event, {
			selectedItems: [],
			item: null,
		});
	}

	selectAllListItems(event: SyntheticEvent) {
		this.props.events?.onSelect(event, {
			selectedItems: this.props.options,
			item: this.state.currentSelectedItem,
		});
	}

	selectListItem(item: SplitViewListboxItem, event: React.MouseEvent) {
		let selectedItems = [item];
		const selection = this.props.selection || [];

		if (this.props.multiple) {
			if (event.metaKey) {
				selectedItems = selection.includes(item)
					? selection.filter((i) => i !== item)
					: [item, ...selection];
			} else if (event.shiftKey) {
				const [begin, end] = [
					this.props.options.indexOf(this.state.currentSelectedItem as SplitViewListboxItem),
					this.props.options.indexOf(item),
				].sort();

				const addToSelection = this.props.options.slice(begin, end + 1);

				selectedItems = [
					...addToSelection,
					...selection.filter((i) => !addToSelection.includes(i)),
				];
			}
		}

		this.setState({ currentSelectedItem: item });

		this.props.events?.onSelect(event, { selectedItems, item });
	}

	handleOnSelect(
		event: React.MouseEvent,
		{ item }: { item: SplitViewListboxItem }
	) {
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
							item: meta.item as SplitViewListboxItem,
						}),
				}}
				multiple={this.props.multiple}
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
