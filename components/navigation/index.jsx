/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Navigation design pattern](https://lightningdesignsystem.com/components/navigation/) in React.
// Based on SLDS v2.2.1

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import { NAVIGATION } from '../../utilities/constants';

// Child components
import Item from './private/item';

/**
 * Navigation represents a list of links that either take the user to another page or parts of the page the user is in.
 */
const Navigation = createReactClass({
	displayName: NAVIGATION,

	propTypes: {
		/**
		 * HTML id for component. _Tested with snapshot testing._
		 */
		id: PropTypes.string,
		/**
		 * CSS class names to be added to the container element. _Tested with snapshot testing._
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Array of categories. The required shape is: `{id: string, label: string, items: array}`. The required shape of an item is `{id: string, label: string, url: string}`. All item ids are expected to be unique. _Tested with snapshot testing._
		 */
		categories: PropTypes.array,
		/**
		 * The ID of the item that is currently selected. Defaults to the ID of the first item. _Tested with Mocha framework._
		 */
		selectedId: PropTypes.string,
		/**
		 * Triggered when the selection changes. It receives an event and an item object in the shape: `event, {item: [object] }`. _Tested with Mocha framework._
		 */
		onSelect: PropTypes.func,
		/**
		 * Determines component style. _Tested with snapshot testing._
		 */
		variant: PropTypes.oneOf(['default', 'shade']),
	},

	getDefaultProps () {
		return {
			variant: 'default',
		};
	},

	componentWillMount () {
		this.generatedId = shortid.generate();
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getVariant () {
		return this.props.variant === 'shade' ? 'shade' : 'default';
	},

	getSelectedId () {
		const categories = this.props.categories;
		let selectedId;
		if (this.props.selectedId) {
			selectedId = this.props.selectedId;
		} else if (
			categories.length > 0 &&
			categories[0].items &&
			categories[0].items.length > 0
		) {
			selectedId = categories[0].items[0].id;
		}
		return selectedId;
	},

	render () {
		const rootId = this.getId();
		const variant = this.getVariant();
		return (
			<div
				id={rootId}
				className={classNames(
					'slds-grid',
					'slds-grid--vertical',
					'slds-navigation-list--vertical',
					{
						'slds-navigation-list--vertical-inverse': variant === 'shade',
					},
					this.props.className
				)}
			>
				{this.props.categories.map((category) => {
					const categoryId = `${rootId}-${category.id}`;
					const selectedId = this.getSelectedId();
					return [
						<h2
							id={categoryId}
							key={`${categoryId}-header`}
							className="slds-text-title--caps slds-p-around--medium"
						>
							{category.label}
						</h2>,
						<ul key={categoryId}>
							{category.items.map((item) => (
								<Item
									key={item.id}
									item={item}
									isSelected={item.id === selectedId}
									categoryId={categoryId}
									onSelect={this.props.onSelect}
								/>
							))}
						</ul>,
					];
				})}
			</div>
		);
	},
});

export default Navigation;
