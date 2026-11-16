/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # List Component

// ## Dependencies

// ### React
import React, {
	type ComponentType,
	type ReactElement,
	type ReactNode,
} from 'react';

// ### classNames
import classNames from 'classnames';

// ## Children
import ListItem, { type ListItemProps } from './item';
import { type ListItemLabelProps } from './item-label';

// ## Constants
import { LIST } from '../../../utilities/constants';

// Memoized here rather than in `./item`, whose `ListItem` export is public.
const MemoListItem = React.memo(ListItem);

type ListOption = { disabled?: boolean; value?: unknown } & Record<
	string,
	unknown
>;

export interface MenuListProps {
	/**
	 * Determines whether or not to show a checkmark for selected items.
	 */
	checkmark?: boolean;
	/**
	 * CSS classes to be added to `<ul />`.
	 */
	className?: string;
	/**
	 * Used internally to determine the id that will be used for list items.
	 */
	getListItemId?: (index: number) => string;
	/**
	 * Used internally to pass references to the individual menu items back up for focusing / scrolling.
	 */
	itemRefs?: (listItem: HTMLLIElement | null, index: number) => void;
	/**
	 * If provided, this function will be used to render the contents of each menu item.
	 */
	itemRenderer?: ComponentType<ListItemLabelProps>;
	/**
	 * If provided, called to render the contents of each menu item. Takes precedence over `itemRenderer`.
	 */
	renderItemLabel?: (props: ListItemLabelProps) => ReactNode;
	/**
	 * Sets the height of the list based on the numeber of items.
	 */
	length?: null | '5' | '7' | '10' | 5 | 7 | 10;
	/**
	 * Triggered when a list item is selected (via mouse or keyboard).
	 */
	onSelect?: (index: number, event?: React.MouseEvent) => void;
	/**
	 * An array of items to render in the list.
	 */
	options?: ListOption[];
	/**
	 * The index of the currently selected item in the list.
	 */
	selectedIndex?: number;
	/**
	 * The indices of the currently selected items in the list (multi-select).
	 */
	selectedIndices?: number[];
	/**
	 * Accepts a `Tooltip` component to be used as the template for menu item tooltips that appear via the `tooltipContent` options object attribute.
	 */
	tooltipMenuItem?: ReactElement;
	/**
	 * The id of the element which triggered this list (in a menu context).
	 */
	triggerId?: string;
}

/**
 * Component description.
 */
class List extends React.Component<MenuListProps> {
	static displayName = LIST;

	static defaultProps: Partial<MenuListProps> = {
		length: '5',
		options: [],
		selectedIndex: -1,
	};

	// The `<li>` of each mounted item, by index.
	itemNodes: Array<HTMLLIElement | undefined> = [];

	itemNodeRefs: Array<(node: HTMLLIElement | null) => void> = [];

	// Stable per index, so memoized items don't re-render for a new ref. An
	// unmount is reported here; mounted items are reported after every render.
	getItemNodeRef(index: number) {
		if (!this.itemNodeRefs[index]) {
			this.itemNodeRefs[index] = (node) => {
				if (node) {
					this.itemNodes[index] = node;
				} else {
					delete this.itemNodes[index];
					this.props.itemRefs?.(null, index);
				}
			};
		}
		return this.itemNodeRefs[index];
	}

	// Items used to get a new inline ref on every render, so `itemRefs` heard
	// from every item after every render; parents rely on that to re-focus
	// and scroll to the focused item.
	reportItemNodes() {
		this.itemNodes.forEach((node, index) => {
			if (node) {
				this.props.itemRefs?.(node, index);
			}
		});
	}

	componentDidMount() {
		this.reportItemNodes();
	}

	componentDidUpdate() {
		this.reportItemNodes();
	}

	handleItemSelect = (index: number, event?: React.MouseEvent) => {
		this.props.onSelect?.(index, event);
	};

	render() {
		let lengthClassName;

		if (this.props.length) {
			lengthClassName = `slds-dropdown_length-${this.props.length}`;
		}

		return (
			<ul
				aria-labelledby={this.props.triggerId}
				className={classNames(
					'dropdown__list',
					lengthClassName,
					this.props.className
				)}
				role="menu"
			>
				{(this.props.options ?? []).map((option, index) => {
					const id = this.props.getListItemId?.(index) ?? `${index}`;
					const isSingleSelected = index === this.props.selectedIndex;
					const isMultipleSelected =
						!!this.props.selectedIndices &&
						this.props.selectedIndices.indexOf(index) !== -1;
					return (
						<MemoListItem
							{...(option as Partial<ListItemProps>)}
							aria-disabled={option.disabled}
							// show checkmark
							checkmark={
								this.props.checkmark && (isSingleSelected || isMultipleSelected)
							}
							// show checkmark OR invisible placeholder icon
							isCheckmarkVariant={this.props.checkmark}
							data={option}
							id={id}
							index={index}
							isSelected={isSingleSelected || isMultipleSelected}
							key={`${id}-${option.value}`}
							labelRenderer={this.props.itemRenderer}
							renderLabel={this.props.renderItemLabel}
							onSelect={this.handleItemSelect}
							nodeRef={this.getItemNodeRef(index)}
							tooltipTemplate={this.props.tooltipMenuItem}
						/>
					);
				})}
			</ul>
		);
	}
}

export default List;
