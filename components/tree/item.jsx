/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tree Item Component

// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

import Button from '../button';

// ### classNames
import classNames from 'classnames';

// ### reject
import reject from 'lodash.reject';

// ### omit
import omit from 'lodash.omit';

// ### find
import find from 'lodash.find';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### Event Helpers
import { EventUtil } from '../../utilities';

// ## Constants
import { TREE_ITEM } from '../../utilities/constants';

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
const cssClasses = {
	base: 'slds-item'
};

const idSuffixes = {
	base: '__body'
};

/**
 * A Tree Item is a non-branching node in a hierarchical list.
 */
const Item = (props) => {
	const isSelected = () => {
		const node = omit(props.node, 'nodes');
		return !!find(props.selection, node);
	};

	const	handleClick = (event) => {
		EventUtil.trap(event);

		if (isFunction(props.onClick)) {
			let selection;
			const node = omit(props.node, 'nodes');
			const isSelectedStored = isSelected();

			if (!isSelectedStored) {
				selection = [...props.selection, node];
			} else {
				selection = reject(props.selection, node);
			}

			props.onClick(event, { selection, node, select: !isSelectedStored, treeIndex: props.treeIndex });
		}
	};

	// ### Render
	const isSelectedStored = props.nodeHasState ? props.node[props.nodeKeys.treeNodeSelected] : isSelected();

	return (
		<li id={props.htmlId} role="treeitem" aria-level={props.level}>
			<div
				className={classNames('slds-tree__item', { 'slds-is-selected': isSelectedStored })}
				aria-selected={isSelectedStored ? 'true' : 'false'}
				onClick={handleClick}
			>
				<Button
					assistiveText="Toggle"
					iconName="chevronright"
					iconSize="small"
					iconVariant="bare"
					variant="icon"
					className="slds-m-right--small slds-is-disabled"
					disabled
				/>
				<a href="#" tabIndex={-1} role="presentation" className="slds-truncate">{props.label}</a>
			</div>
		</li>
	);
};

// ### Display Name
// Always use the canonical component name as the React display name.
Item.displayName = TREE_ITEM;

// ### Prop Types
Item.propTypes = {
	/**
	 * The text of the tree item.
	 */
	htmlId: PropTypes.string.isRequired,
	/**
	 * The text of the tree item.
	 */
	label: PropTypes.string.isRequired,
	/**
	 * The number of nestings. Determines the ARIA level and style alignment.
	 */
	level: PropTypes.number.isRequired,
	/**
	 * The current node that is being rendered.
	 */
	node: PropTypes.object.isRequired,
	/**
	 * Allows the nodes prop to determine state, {label: 'My cool node', expanded: true, selected: true, type: 'folder', nodes: [...childNodes]}`. Useful if UI state is part of your application's state engine.
	 */
	nodeHasState: PropTypes.bool,
	/**
	 * Keys into your JSON object, so the data does not need to be reformatted. The default expects `{label: 'My cool node', type: 'folder', nodes: [...childNodes]}`.
	 */
	nodeKeys: React.PropTypes.shape({
		expanded: React.PropTypes.string,
		label: React.PropTypes.string,
		nodes: React.PropTypes.string,
		selected: React.PropTypes.string,
		type: React.PropTypes.string
	}),
	/**
	 * Function that will run whenever an item or branch is clicked.
	 */
	onClick: PropTypes.func,
	/**
	 * An array of the currently selected items
	 */
	selection: PropTypes.array,
	/**
	 * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
	 */
	treeIndex: PropTypes.string
};

Item.getDefaultProps = {
	selected: false
};

module.exports = Item;
module.exports.cssClasses = cssClasses;
module.exports.idSuffixes = idSuffixes;

