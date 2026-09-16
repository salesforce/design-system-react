/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # List Component

// ## Dependencies

// ### React
import React, { type ComponentType, type ReactElement } from 'react';

// ### classNames
import classNames from 'classnames';

// ## Children
import ListItem, { type ListItemProps } from './item';
import { type ListItemLabelProps } from './item-label';

// ## Constants
import { LIST } from '../../../utilities/constants';

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
	 * Sets the height of the list based on the numeber of items.
	 */
	length?: null | '5' | '7' | '10' | 5 | 7 | 10;
	/**
	 * Triggered when a list item is selected (via mouse or keyboard).
	 */
	onSelect?: (index: number) => void;
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
	 * Accepts a `Tooltip` component to be used as the template for menu item tooltips that appear via the `tooltipContent` options object attribute
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

	render() {
		let lengthClassName;
		let list;

		if (this.props.length) {
			lengthClassName = `slds-dropdown_length-${this.props.length}`;
		}

		list = (
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
						<ListItem
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
							onSelect={this.props.onSelect ?? (() => {})}
							nodeRef={(listItem) => this.props.itemRefs?.(listItem, index)}
							tooltipTemplate={this.props.tooltipMenuItem}
						/>
					);
				})}
			</ul>
		);

		if (this.props.tooltipMenuItem) {
			/* eslint-disable react/no-danger */
			list = (
				<React.Fragment>
					<style
						dangerouslySetInnerHTML={{
							__html: `.slds-dropdown__item > .slds-tooltip-trigger > a {
	position: relative;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-ms-flex-align: center;
	align-items: center;
	padding: 0.5rem 0.75rem;
	color: #080707;
	white-space: nowrap;
	cursor: pointer;
}

.slds-dropdown__item > .slds-tooltip-trigger > a:active {
    text-decoration: none;
    background-color: #ecebea;
}

.slds-dropdown__item > .slds-tooltip-trigger > a:hover,
.slds-dropdown__item > .slds-tooltip-trigger > a:focus {
    outline: 0;
    text-decoration: none;
    background-color: #f3f2f2;
}
`,
						}}
					/>
					{list}
				</React.Fragment>
			);
			/* eslint-enable react/no-danger */
		}

		return list;
	}
}

export default List;
