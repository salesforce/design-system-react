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

// ### reject
import reject from 'lodash.reject';

// ### omit
import omit from 'lodash.omit';

// ### find
import find from 'lodash.find';

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
const Branch = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: TREE_BRANCH,

	// ### Prop Types
	propTypes: {
		/**
		 * List of expanded branches. A list of each branches `id` object key,
		 * */
		expanded: PropTypes.array,
		/**
		 * Function that will be called by every branch to receive its child nodes. `node` object with the branch data is passed into this function: `getNodes(node)`. `getNodes` can return a Promise and it will be resolved.
		 * */
		getNodes: PropTypes.func,
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
		/**
		 * Class names to be added to the top-level `ul` element.
		 */
		initalClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string]),
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
		 * Function that will run whenever an item or branch is clicked.
		 */
		onClick: PropTypes.func,
		/**
		 * This function triggers when the expand or collapse icon is clicked.
		 */
		onExpandClick: PropTypes.func.isRequired,
		/**
		 * An array of the currently selected items
		 */
		selection: PropTypes.array
	},

	getDefaultProps () {
		return {
			expanded: [],
			level: 0,
			selection: []
		};
	},

	getInitialState () {
		return {
			nodes: []
		};
	},

	componentDidMount () {
		// This means that mounting and rendering does not mean that tree data is
		// loaded. To determine if data is loaded, add a callback to your Promise.
		// when it is resolved.
		if (isFunction(this.props.getNodes)) {
			// we may want to have a `getNodesResolved` to allow an async callback even when not passing in a Promise.
			Promise.resolve(this.props.getNodes(this.props.node)).then((nodes) => this.setState({ nodes }));
		}
	},

	handleExpandClick (e) {
		EventUtil.trap(e);

		if (isFunction(this.props.onExpandClick)) {
			let expanded;
			const node = omit(this.props.node, 'nodes');
			const isExpanded = this.isExpanded();

			if (!isExpanded) {
				expanded = [...this.props.expanded, node];
			} else {
				expanded = reject(this.props.expanded, node);
			}

			this.props.onExpandClick(expanded, node, e);
		}
	},


	handleClick (e) {
		EventUtil.trap(e);
		if (isFunction(this.props.onClick)) {
			let selection;
			const node = omit(this.props.node, 'nodes');
			const isSelected = this.isSelected();

			if (!isSelected) {
				selection = [...this.props.selection, node];
			} else {
				selection = reject(this.props.selection, node);
			}

			this.props.onClick(selection, node, e);
		}
	},

	renderInitialNode (children) {
		const selectionID = [];
		this.props.selection.forEach((node) => {
			selectionID.push(node.id);
		});
		// id intentionally not rendered here, and is present on container
		return (
			<ul
				className={classNames('slds-tree', this.props.initalClassName)}
				role="tree"
				aria-labelledby={`${this.props.htmlId}__heading`}
				aria-activedescendant={selectionID.join(' ')}
			>
				{children}
			</ul>
		);
	},

	isExpanded () {
		const node = omit(this.props.node, 'nodes');
		return !!find(this.props.expanded, node);
	},

	isSelected () {
		const node = omit(this.props.node, 'nodes');
		return !!find(this.props.selection, node);
	},

	// Most of these props come from the nodes array, not from the Tree props
	renderBranch (children) {
		const isExpanded = this.isExpanded();
		const isSelected = this.isSelected();
		return (
			<li
				id={this.props.htmlId}
				role="treeitem"
				aria-level={this.props.level}
				aria-expanded={isExpanded ? 'true' : 'false'}
			>
				<div className={classNames('slds-tree__item', { 'slds-is-selected': isSelected })} onClick={this.handleClick}>
					<Button
						assistiveText="Toggle"
						iconName="chevronright"
						iconSize="small"
						variant="icon"
						className="slds-m-right--small"
						aria-controls={this.props.htmlId}
						onClick={this.handleExpandClick}
					/>
					<a
						id={`${this.props.htmlId}__label`}
						href="#"
						tabIndex={-1}
						role="presentation"
						className="slds-truncate"
					>{this.props.label}</a>
				</div>
				<ul
					className={classNames({ 'slds-is-expanded': isExpanded, 'slds-is-collapsed': !isExpanded })}
					role="group"
					aria-labelledby={`${this.props.htmlId}__label`}
				>{children}
				</ul>
			</li>
		);
	},

	// ### Render
	render () {
		const children = [];
		const {
			level,
			onExpandClick,
			selection
		} = this.props;

		if (isArray(this.state.nodes)) {
			this.state.nodes.forEach((node, index) => {
				const htmlId = `${this.props.htmlId}-${node.htmlId || index}`;

				if (node.type === 'folder') {
					children.push(
						<Branch
							expanded={this.props.expanded}
							getNodes={this.props.getNodes}
							htmlId={htmlId}
							key={shortid.generate()}
							label={node.label}
							level={level + 1}
							node={node}
							nodes={this.props.getNodes(node)}
							onClick={this.props.onClick}
							onExpandClick={onExpandClick}
							selection={selection}
						/>
					);
				} else {
					children.push(
						<Item
							{...node}
							htmlId={htmlId}
							key={shortid.generate()}
							level={level + 1}
							node={node}
							nodes={this.props.getNodes(node)}
							onClick={this.props.onClick}
							selection={selection}
						/>
					);
				}
			});
		}

		const branch = this.props.level === 0 ? this.renderInitialNode(children) : this.renderBranch(children);

		return branch;
	}
});

module.exports = Branch;
module.exports.cssClasses = cssClasses;
module.exports.idSuffixes = idSuffixes;
