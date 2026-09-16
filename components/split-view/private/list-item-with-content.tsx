/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable class-methods-use-this */

import React, { Component, type ComponentType, type Ref } from 'react';
import classNames from 'classnames';

export const DISPLAY_NAME = 'SLDSSplitViewListItemWithContent';

export interface SplitViewListItemAssistiveText {
	/** The unread indicator. */
	unreadItem?: string;
}

export interface SplitViewListItemEventData {
	item: unknown;
	isSelected: boolean;
	isUnread?: boolean;
}

export interface SplitViewListItemEvents {
	/** Called when the item is clicked. */
	onClick: (event: React.MouseEvent, data: SplitViewListItemEventData) => void;
}

export interface ListItemWithContentProps {
	/**
	 * **Assistive text for accessibility**
	 * * `unreadItem`: The unread indicator.
	 */
	assistiveText?: SplitViewListItemAssistiveText;
	/**
	 * Item to be displayed
	 */
	item: unknown;
	/**
	 * Allows multiple item to be selection
	 */
	multiple?: boolean;
	/**
	 * Shows the item as `focused`.
	 */
	isFocused: boolean;
	/**
	 * Shows the item as `selected`.
	 */
	isSelected: boolean;
	/**
	 * Shows the item as `unread`.
	 */
	isUnread?: boolean;
	/**
	 * **Event Callbacks**
	 * * `onClick`: Called when the item is clicked.
	 * * * Event
	 * * * Meta data
	 * * * * `item`: The original item.
	 * * * * `isSelected`: Is the item selected.
	 * * * * `isUnread`: Is the item unread.
	 */
	events?: SplitViewListItemEvents;
	/**
	 * Reference to the list item component
	 */
	listItemRef?: Ref<HTMLAnchorElement>;
}

const defaultProps: Partial<ListItemWithContentProps> = {
	assistiveText: {
		unreadItem: 'Unread Item',
	},
	events: {} as SplitViewListItemEvents,
};

/**
 * HOC that wraps the list item content with selection and unread functionality.
 * @param ListItemContent {node} A React component
 * @returns {ListItemWithContent} A React component
 */
const listItemWithContent = (
	ListItemContent: ComponentType<ListItemWithContentProps>
) => {
	class ListItemWithContent extends Component<ListItemWithContentProps> {
		static displayName = `${DISPLAY_NAME}(${
			ListItemContent.displayName || ListItemContent.name || 'Component'
		})`;

		static defaultProps = defaultProps;

		onClick = (event: React.MouseEvent) => {
			event.preventDefault();

			this.props.events?.onClick(event, {
				item: this.props.item,
				isSelected: this.props.isSelected,
				isUnread: this.props.isUnread,
			});
		};

		unread() {
			return this.props.isUnread ? (
				<abbr
					className="slds-indicator_unread"
					title={this.props.assistiveText?.unreadItem}
					aria-label={this.props.assistiveText?.unreadItem}
				>
					{/* eslint-disable-next-line react/jsx-curly-brace-presence */}
					<span className="slds-assistive-text">{'●'}</span>
				</abbr>
			) : null;
		}

		render() {
			return (
				<li
					className={classNames('slds-split-view__list-item', {
						'slds-is-unread': this.props.isUnread,
					})}
					role="presentation"
				>
					<a
						className="slds-split-view__list-item-action slds-grow slds-has-flexi-truncate"
						role="option"
						ref={this.props.listItemRef}
						aria-selected={
							this.props.multiple
								? !!this.props.isSelected
								: this.props.isSelected
						}
						tabIndex={this.props.isFocused ? 0 : -1}
						href="#"
						onClick={this.onClick}
					>
						{this.unread()}
						<ListItemContent {...this.props} />
					</a>
				</li>
			);
		}
	}

	return ListItemWithContent;
};

export default listItemWithContent;
