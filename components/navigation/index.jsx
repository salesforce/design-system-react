/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { PropTypes } from 'react';

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

/**
 * Navigation represents a list of links that either take the user to another page or parts of the page the user is in.
 */
const Navigation = React.createClass({
	displayName: NAVIGATION,

	propTypes: {
		/**
		 * HTML id for component
		 */
		id: PropTypes.string,
		/**
		 * CSS class names to be added to the container element.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Array of categories. The required shape is: `{id: string, label: string, items: array}`. The required shape of an item is `{id: string, label: string}`. All item ids are expected to be unique.
		 */
		categories: PropTypes.array,
		/**
		 * The ID of the item that is currently selected. Defaults to the ID of the first item.
		 */
		selectedId: PropTypes.string,
		/**
		 * Triggered when the selection changes.
		 */
		onSelect: PropTypes.func,
		/**
		 * Determines component style.
		 */
		variant: React.PropTypes.oneOf(['default', 'shade'])
	},

	getDefaultProps () {
		return {
			variant: 'default'
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
		if (this.props.selectedId) {
			return this.props.selectedId;
		} else if (categories.length > 0 && categories[0].items && categories[0].items.length > 0) {
			return categories[0].items[0].id;
		}
	},

	handleClick (event) {
		this.props.onSelect(event, {
			selectedId: event.target.dataset.id
		});
	},

	render () {
		const rootId = this.getId();
		const variant = this.getVariant();
		const selectedId = this.getSelectedId();
		return (
			<div
				id={rootId}
				className={classNames(
					'slds-grid',
					'slds-grid--vertical',
					'slds-navigation-list--vertical', {
						'slds-navigation-list--vertical-inverse': variant === 'shade'
					},
					this.props.className
				)}
			>
				{this.props.categories.map((category) => {
					const categoryId = `${rootId}-${category.id}`;
					return [
						<h2
							id={categoryId}
							key={categoryId + '-header'}
							className='slds-text-title--caps slds-p-around--medium'
						>
							{category.label}
						</h2>,
						<ul key={categoryId}>
							{category.items.map((item) => {
								return (
									<li className={classNames({'slds-is-active': item.id === selectedId})} key={item.id}>
										<a
											data-id={item.id}
											href='javascript:void(0);' // eslint-disable-line no-script-url
											className='slds-navigation-list--vertical__action slds-text-link--reset'
											aria-describedby={categoryId}
											onClick={this.handleClick}
										>
											{item.label}
										</a>
									</li>
								);
							})}
						</ul>
					];
				})}
			</div>
		);
	}
});

export default Navigation;
