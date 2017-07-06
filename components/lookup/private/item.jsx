/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icon';
import { EventUtil } from '../../../utilities';

const displayName = 'Lookup-Menu-Item';
const propTypes = {
	data: PropTypes.object,
	handleItemFocus: PropTypes.func,
	href: PropTypes.string,
	iconCategory: PropTypes.string,
	id: PropTypes.string,
	index: PropTypes.number,
	isActive: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isSelected: PropTypes.bool,
	listItemLabelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	searchTerm: PropTypes.string,
	setFocus: PropTypes.func
};

class Item extends React.Component {
	componentWillReceiveProps (nextProps) {
		if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
			this.scrollFocus();
			this.props.setFocus(this.props.id);
		}
	}

	handleClick = () => this.props.onSelect(this.props.id, this.props.data)

  // Scroll menu item based on up/down mouse keys (assumes all items are the same height)
	scrollFocus () {
		const height = this.itemRef.offsetHeight;
		if (height && this.props.handleItemFocus) this.props.handleItemFocus(this.props.index, height);
	}

	getIcon () {
		if (this.props.isSelected) {
			return (
				<span className="slds-media__figure">
					<Icon
						category="utility"
						name="check"
						size="x-small"
					/>
				</span>
			);
		} else if (this.props.iconName && !this.props.listItemLabelRenderer) {
			return (
				<span className="slds-media__figure">
					<Icon
						category={this.props.iconCategory}
						inverse={this.props.iconInverse}
						key={this.props.iconName}
						name={this.props.iconName}
						size="small"
					/>
				</span>
			);
		}
		return null;
	}

	getCustomLabel () {
		const ListItemLabel = this.props.listItemLabelRenderer;
		return <ListItemLabel {... this.props} />;
	}

	getLabel () {
		return this.props.children.data.subTitle
			? (
				<span className="slds-media__body">
					<span className="slds-listbox__option-text slds-listbox__option-text_entity">{this.props.children.label}</span>
					<span className="slds-listbox__option-meta slds-listbox__option-meta_entity">{this.props.children.data.subTitle}</span>
				</span>
			)
			: (
				<span className="slds-media__body" style={{ alignSelf: 'center' }}>
					<span className="slds-listbox__option-text slds-listbox__option-text_entity">
						{this.props.children.label}
					</span>
				</span>
			);
	}

	render () {
		let itemClassName = 'js-slds-lookup__item slds-listbox__item';
		if (this.props.isActive) itemClassName += ' slds-theme--shade';

		return (
			<li className={itemClassName} ref={(li) => { this.itemRef = li; }} role="presentation">
				<span // eslint-disable-line jsx-a11y/no-static-element-interactions
					aria-disabled={this.props.isDisabled}
					className="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta"
					id={this.props.id}
					onClick={this.handleClick}
					onMouseDown={EventUtil.trapImmediate}
					ref={this.props.id}
					role="option"
				>
					{ this.getIcon() }
					{ this.props.listItemLabelRenderer ? this.getCustomLabel() : this.getLabel() }
				</span>
			</li>
		);
	}
}

Item.displayName = displayName;
Item.propTypes = propTypes;

export default Item;
