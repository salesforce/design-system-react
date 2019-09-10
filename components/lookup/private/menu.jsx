/* eslint-disable react/sort-comp */
/* eslint-disable prefer-destructuring */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import Item from './item';

/* eslint-disable react/no-did-update-set-state */

const displayName = 'Lookup-Menu';
const propTypes = {
	boldRegex: PropTypes.instanceOf(RegExp),
	emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	filterWith: PropTypes.func,
	focusIndex: PropTypes.number,
	getListLength: PropTypes.func,
	iconCategory: PropTypes.string,
	items: PropTypes.array,
	label: PropTypes.string,
	listLength: PropTypes.number,
	searchTerm: PropTypes.string,
	setFocus: PropTypes.func,
};
const defaultProps = {
	emptyMessage: 'No matches found.',
};
class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = { filteredItems: this.filteredItems() };
	}

	// Set filtered list length in parent to determine active indexes for aria-activedescendent
	componentDidUpdate(prevProps) {
		// make an array of the children of the list but only count the actual items (but include section dividers)
		const childFilter = (child) =>
			child.className.indexOf('js-slds-lookup__item') > -1 ||
			child.className.indexOf('slds-lookup__divider') > -1;
		const list = [].slice.call(this.listRef.children).filter(childFilter)
			.length;
		this.props.getListLength(list);
		if (
			prevProps.items !== this.props.items ||
			prevProps.filter !== this.props.filter ||
			prevProps.searchTerm !== this.props.searchTerm
		) {
			// eslint-disable-next-line class-methods-use-this
			this.setState({
				filteredItems: this.filteredItems(),
			});
		}
	}

	getFilteredItemForIndex(i) {
		if (
			i > -1 &&
			this.state.filteredItems &&
			i < this.state.filteredItems.length
		) {
			return this.state.filteredItems[i];
		}
		return null;
	}

	filter(item) {
		return this.props.filterWith(this.props.searchTerm, item);
	}

	// eslint-disable-next-line class-methods-use-this
	filterEmptySections(items) {
		const result = [];
		items.forEach((item, index) => {
			if (item && item.data && item.data.type === 'section') {
				if (index + 1 < items.length) {
					const nextItem = items[index + 1];
					if (nextItem.data && nextItem.data.type !== 'section') {
						// eslint-disable-next-line fp/no-mutating-methods
						result.push(item);
					}
				}
			} else {
				// eslint-disable-next-line fp/no-mutating-methods
				result.push(item);
			}
		});
		return result;
	}

	filteredItems() {
		return this.filterEmptySections(this.props.items.filter(this.filter, this));
	}

	// Scroll menu up/down when using mouse keys
	handleItemFocus = (itemIndex, itemHeight) => {
		if (this.listRef) {
			this.listRef.scrollTop = itemIndex * itemHeight;
		}
	};

	renderContent() {
		if (this.state.filteredItems.length === 0) {
			return (
				<li className="slds-lookup__message" aria-live="polite">
					<span className="slds-m-left_x-large slds-p-vertical_medium">
						{this.props.emptyMessage}
					</span>
				</li>
			);
		}

		return this.renderItems();
	}

	renderFooter() {
		return this.props.footer;
	}

	renderHeader() {
		return this.props.header;
	}

	renderItems() {
		const focusIndex = this.props.focusIndex;
		return this.state.filteredItems.map((component, i) => {
			// isActive means it is aria-activedescendant
			const id = component.id;
			let isActive = false;
			if (this.props.header) {
				isActive = focusIndex === i + 1;
			} else {
				isActive = focusIndex === i;
			}
			if (component.data.type === 'section') {
				if (this.props.sectionDividerRenderer) {
					const SectionDivider = this.props.sectionDividerRenderer;
					return (
						<SectionDivider
							data={component.data}
							key={`section_header_${id}`}
							{...this.props}
						/>
					);
				}
			}
			return (
				<Item
					boldRegex={this.props.boldRegex}
					data={component.data}
					handleItemFocus={this.handleItemFocus}
					iconCategory={this.props.iconCategory}
					iconInverse={this.props.iconInverse}
					iconName={this.props.iconName}
					id={id}
					index={i}
					isActive={isActive}
					key={id}
					listItemLabelRenderer={this.props.listItemLabelRenderer}
					onSelect={this.props.onSelect}
					searchTerm={this.props.searchTerm}
					setFocus={this.props.setFocus}
				>
					{component}
				</Item>
			);
		});
	}

	renderSectionDivider() {
		return this.props.sectionDivider;
	}

	render() {
		return (
			<section id="menuContainer" className="ignore-react-onclickoutside">
				{this.renderHeader()}
				<ul
					id="list"
					className="slds-lookup__list"
					role="presentation"
					ref={(list) => {
						if (list) {
							this.listRef = list;
						}
					}}
				>
					{this.renderContent()}
				</ul>
				{this.renderFooter()}
			</section>
		);
	}
}

Menu.displayName = displayName;
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
