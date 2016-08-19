/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tree Branch Component

// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

import Button from '../button';

// Child components
import Item from './item';

import Highlighter from '../utilities/highlighter';

// ### isArray
import isArray from 'lodash.isarray';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### Event Helpers
import { EventUtil } from '../../utilities';

// ### classNames
import classNames from 'classnames';

// ### shortid
import shortid from 'shortid';

// ## Constants
import { TREE_BRANCH } from '../../utilities/constants';


// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
const cssClasses = {
	base: 'slds-item',
	tree: 'slds-tree'
};

const idSuffixes = {
	label: '__label'
};


/**
 * A Tree Item is a non-branching node in a hierarchical list.
 */
const Branch = (props) => {
	let treeIndex = '';

	const handleExpandClick = (event) => {
		EventUtil.trap(event);

		if (isFunction(props.onExpandClick)) {
			props.onExpandClick(event, {
				node: props.node,
				expand: !props.node.expanded,
				treeIndex: props.treeIndex
			});
		}
	};

	const handleClick = (event) => {
		EventUtil.trap(event);
		if (isFunction(props.onClick)) {
			props.onClick(event, {
				node: props.node,
				select: !props.node.selected,
				treeIndex: props.treeIndex
			});
		}
	};

	const handleScroll = (event) => {
		const percentage = (event.target.scrollTop) / (event.target.scrollHeight - event.target.clientHeight) * 100;

		if (isFunction(props.onScroll)) {
			props.onScroll(event, {
				percentage
			});
		}
	};

	const renderInitialNode = (children) => (
		// id intentionally not rendered here, and is present on container that includes the header
		<ul
			aria-labelledby={`${props.htmlId}__heading`}
			// TODO
			// aria-activedescendant=""
			className={classNames('slds-tree', props.initalClassName)}
			onScroll={handleScroll}
			role="tree"
			style={props.initialStyle}
			// tabIndex="0"
		>
			{children}
		</ul>
	);

	renderInitialNode.displayName = 'InitialNode';

	// Most of these props come from the nodes array, not from the Tree props
	const renderBranch = (children) => {
		const isExpanded = props.node.expanded;
		const isSelected = props.node.selected;
		const isLoading = props.node.loading;

		// TODO: Remove tabbing from anchor tag AND button / add tabIndex={-1} when keyboard navigation is present.
		return (
			<li
				id={props.htmlId}
				role="treeitem"
				aria-level={props.level}
				aria-expanded={isExpanded ? 'true' : 'false'}
			>
				<div className={classNames('slds-tree__item', { 'slds-is-selected': isSelected })} onClick={handleClick}>
					<Button
						assistiveText="Toggle"
						iconName="chevronright"
						iconSize="small"
						variant="icon"
						className="slds-m-right--small"
						aria-controls={props.htmlId}
						onClick={handleExpandClick}
					/>
					<a
						id={`${props.htmlId}__label`}
						href="#"
						role="presentation"
						className="slds-truncate"
					>{<Highlighter search={props.searchTerm}>{props.label}</Highlighter>}
					{isLoading ? props.inlineLoader : null}</a>
				</div>
				{isExpanded
				?	<ul
						className={classNames({ 'slds-is-expanded': isExpanded, 'slds-is-collapsed': !isExpanded })}
						role="group"
						aria-labelledby={`${props.htmlId}__label`}
				> {children}
				</ul>
				: null}
			</li>
		);
	};

	renderBranch.displayName = 'Branch';

	const children = [];
	const {
		treeId,
		level,
		onExpandClick,
		inlineLoader,
		loading,
		searchTerm,
		selection
	} = props;

	if (isArray(props.node.nodes)) {
		props.node.nodes.forEach((node, index) => {
			const htmlId = `${props.treeId}-${node.id}`;
			treeIndex = `${index}`;
			if (props.treeIndex) {
				treeIndex = `${props.treeIndex}-${treeIndex}`;
			}

			if (node.type === 'folder') {
				children.push(
					<Branch
						inlineLoader={inlineLoader}
						expanded={props.expanded}
						htmlId={htmlId}
						key={shortid.generate()}
						label={node.label}
						level={level + 1}
						loading={loading}
						node={node}
						nodes={node.nodes}
						onClick={props.onClick}
						onExpandClick={onExpandClick}
						searchTerm={searchTerm}
						selection={selection}
						treeId={treeId}
						treeIndex={treeIndex}
					/>
				);
			} else {
				children.push(
					<Item
						{...node}
						label={node.label}
						htmlId={htmlId}
						key={shortid.generate()}
						level={level + 1}
						node={node}
						onClick={props.onClick}
						searchTerm={searchTerm}
						selection={selection}
						treeIndex={treeIndex}
						treeId={treeId}
					/>
				);
			}
		});
	}

	let branch = props.level === 0 ? renderInitialNode(children) : renderBranch(children);
	return branch;
};

// ### Display Name
// Always use the canonical component name as the React display name.
Branch.displayName = TREE_BRANCH;

// ### Prop Types
Branch.propTypes = {
	/**
	 * List of expanded branches. A list of each branches `id` object key,
	 * */
	expanded: PropTypes.array,
	/**
	 * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
	 */
	htmlId: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string]).isRequired,
	/**
	 * All tree nodes must have a unique HTML `id` for users of assistive technology. If no `id` key is present in the  is provided, one will be generated.
	 */
	index: PropTypes.number,
	/**
	 * Determines if nodes in the top-level of the tree.
	 */
	initial: PropTypes.bool,
	/*
	 * Class names to be added to the top-level `ul` element.
	 */
	initalClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string]),
	initialStyle: PropTypes.object,
	/**
	 * The text of the tree item.
	 */
	label: PropTypes.string,
	/**
	 * The number of nestings. Determines the ARIA level and style alignment.
	 */
	level: PropTypes.number.isRequired,
	inlineLoader: PropTypes.node,
	/**
	 * The current node that is being rendered.
	 */
	node: PropTypes.object.isRequired,
	/**
	 * Function that will run whenever an item or branch is clicked.
	 */
	onClick: PropTypes.func,
	/**
	 * This function triggers when the expand or collapse icon is clicked.
	 */
	onExpandClick: PropTypes.func.isRequired,
	/**
	 * Highlights term if found in node label
	 */
	searchTerm: PropTypes.string,
	/**
	 * An array of the currently selected items
	 */
	selection: PropTypes.array,
	/**
	 * Unique id used for a prefix of all tree nodes
	 */
	treeId: PropTypes.string,
	/**
	 * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
	 */
	treeIndex: PropTypes.string
};

Branch.getDefaultProps = {
	level: 0,
	label: '',
	treeIndex: ''
};

module.exports = Branch;
module.exports.cssClasses = cssClasses;
module.exports.idSuffixes = idSuffixes;

