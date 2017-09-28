/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icon';
import EventUtil from '../../../utilities/event';
import cx from 'classnames';

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
		if (this.props.iconName && !this.props.listItemLabelRenderer) {
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
		let label;
		if (this.props.children.data.subTitle) {
			label = (<div className="slds-media__body">
				<div className="slds-lookup__result-text">{this.props.children.label}</div>
				<span className="slds-lookup__result-meta slds-text-body--small">{this.props.children.data.subTitle}</span>
			</div>);
		} else {
			const labelClassName = cx('slds-lookup__result-text', {
				'slds-m-left--x-small': !this.props.iconName
			});

			label = (<div className="slds-media__body">
				<div className={labelClassName}>{this.props.children.label}</div>
			</div>);
		}
		return label;
	}

	render () {
		let itemClassName = 'js-slds-lookup__item';
		const id = this.props.id;
		if (this.props.isActive) itemClassName += ' slds-theme--shade';

		return (
      // IMPORTANT: anchor id is used to set lookup's input's aria-activedescendant
			<li className={itemClassName} ref={(li) => { this.itemRef = li; }}>
				<a
					aria-disabled={this.props.isDisabled}
					className="slds-lookup__item-action slds-media slds-media--center"
					href={this.props.href}
					id={id}
					onClick={this.handleClick}
					onMouseDown={EventUtil.trapImmediate}
					ref={id}
					role="option"
					tabIndex="-1"
				>
					{this.getIcon()}
					{ this.props.listItemLabelRenderer ? this.getCustomLabel() : this.getLabel() }
				</a>
			</li>
    );
	}
}

Item.displayName = displayName;
Item.propTypes = propTypes;

export default Item;
