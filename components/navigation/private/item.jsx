/*
 Copyright (c) 2017, salesforce.com, inc. All rights reserved.
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

// ### isFunction
import isFunction from 'lodash.isfunction';

import { NAVIGATION_ITEM } from '../../../utilities/constants';

const	handleClick = (event, props) => {
	if (isFunction(props.onSelect)) {
		props.onSelect(event, {
			item: props.item
		});
	}
};

const Item = (props) => (
	<li className={classNames({ 'slds-is-active': props.isSelected })}>
		<a
			data-id={props.item.id}
			href={props.item.url || 'javascript:void(0);'} // eslint-disable-line no-script-url
			className="slds-navigation-list--vertical__action slds-text-link--reset"
			aria-describedby={props.categoryId}
			onClick={(event) => { handleClick(event, props); }}
		>
			{props.item.label}
		</a>
	</li>
);

// ### Display Name
// Always use the canonical component name as the React display name.
Item.displayName = NAVIGATION_ITEM;

// ### Prop Types
Item.propTypes = {
	/**
	 * Item to be rendered.
	 */
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		url: PropTypes.string
	}),
	/**
	 * Whether item is selected or not.
	 */
	isSelected: PropTypes.bool,
	/**
	 * ID of the category this item belongs to.
	 */
	categoryId: PropTypes.string.isRequired,
	/**
	 * Function that will run whenever an item is selected.
	 */
	onSelect: PropTypes.func
};

Item.getDefaultProps = {
	isSelected: false
};

export default Item;
