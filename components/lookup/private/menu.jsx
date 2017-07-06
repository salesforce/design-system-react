/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import Item from './item';

const displayName = 'Lookup-Menu';
const propTypes = {
	boldRegex: PropTypes.instanceOf(RegExp),
	emptyMessage: PropTypes.string,
	filterWith: PropTypes.func,
	focusIndex: PropTypes.number,
	getListLength: PropTypes.func,
	iconCategory: PropTypes.string,
	items: PropTypes.array,
	listLength: PropTypes.number,
	searchTerm: PropTypes.string,
	selectedIndices: PropTypes.array,
	setFocus: PropTypes.func
};
const defaultProps = {
	emptyMessage: 'No matches found.'
};
class Menu extends React.Component {
	constructor (props) {
		super(props);
		this.state = { filteredItems: this.filteredItems() };
	}

  // Set filtered list length in parent to determine active indexes for aria-activedescendent
	componentDidUpdate (prevProps) {
    // make an array of the children of the list but only count the actual items (but include section dividers)
		const childFilter = (child) => (
			child.className.indexOf('js-slds-lookup__item') > -1 ||
			child.className.indexOf('slds-lookup__divider') > -1
		);
		const list = [].slice.call(this.listRef.children).filter(childFilter).length;
		this.props.getListLength(list);
		if (
			prevProps.items !== this.props.items ||
			prevProps.filter !== this.props.filter ||
			prevProps.searchTerm !== this.props.searchTerm
		) {
			this.setState({ // eslint-disable-line react/no-did-update-set-state
				filteredItems: this.filteredItems()
			});
		}
	}

	filter (item) {
		return this.props.filterWith(this.props.searchTerm, item);
	}

	filteredItems () {
		return this.filterEmptySections(this.props.items.filter(this.filter, this));
	}

	filterEmptySections (items) { // eslint-disable-line class-methods-use-this
		const result = [];
		items.forEach((item, index) => {
			if (item && item.data && item.data.type === 'section') {
				if (index + 1 < items.length) {
					const nextItem = items[index + 1];
					if (nextItem.data && nextItem.data.type !== 'section') {
						result.push(item);
					}
				}
			}			else {
				result.push(item);
			}
		});
		return result;
	}

  // Scroll menu up/down when using mouse keys
	handleItemFocus = (itemIndex, itemHeight) => {
		if (this.listRef) {
			this.listRef.scrollTop = itemIndex * itemHeight;
		}
	}

	getFilteredItemForIndex (i) {
		if (i > -1 && this.state.filteredItems && i < this.state.filteredItems.length) {
			return this.state.filteredItems[i];
		}
		return null;
	}

	renderHeader () {
		return this.props.header;
	}

	renderFooter () {
		return this.props.footer;
	}

	renderSectionDivider () {
		return this.props.sectionDivider;
	}

	renderItems () {
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
					return (<SectionDivider
						data={component.data}
						key={`section_header_${id}`}
						{... this.props}
					/>);
				}
			}

			const isSelected = this.props.selectedIndices.indexOf(i) !== -1 || this.props.selectedIndices.indexOf(i.toString()) !== -1;
			return (<Item
				boldRegex={this.props.boldRegex}
				data={component.data}
				handleItemFocus={this.handleItemFocus}
				iconCategory={this.props.iconCategory}
				iconInverse={this.props.iconInverse}
				iconName={this.props.iconName}
				id={id}
				index={i}
				isActive={isActive}
				isSelected={isSelected}
				key={id}
				listItemLabelRenderer={this.props.listItemLabelRenderer}
				onSelect={this.props.onSelect}
				searchTerm={this.props.searchTerm}
				setFocus={this.props.setFocus}
			>
				{component}
			</Item>);
		});
	}

	renderContent () {
		if (this.state.filteredItems.length === 0) {
			return (
				<li className="slds-listbox__item" aria-live="polite" role="presentation">
					<span className="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">{this.props.emptyMessage}</span>
				</li>
			);
		}

		return this.renderItems();
	}

	render () {
		return (
			<div id={this.props.id} className={this.props.className} role={this.props.role}>
				<ul id="list" className="slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid" role="presentation" ref={(list) => { this.listRef = list; }}>
					{this.renderHeader()}
					{this.renderContent()}
					{this.renderFooter()}
				</ul>
			</div>
		);
	}
}

Menu.displayName = displayName;
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
