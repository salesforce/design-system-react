/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Tree Branch Component

// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### isFunction
import isFunction from 'lodash.isfunction';

// ### classNames
import classNames from 'classnames';

// ### shortid
import shortid from 'shortid';

import Button from '../../button';

// Child components
import Item from './item';

import Highlighter from '../../utilities/highlighter';

// ### Event Helpers
import EventUtil from '../../../utilities/event';

// ## Constants
import { TREE_BRANCH } from '../../../utilities/constants';

const handleExpandClick = (event, props) => {
	EventUtil.trap(event);

	if (isFunction(props.onExpandClick)) {
		props.onExpandClick(event, {
			node: props.node,
			expand: !props.node.expanded,
			treeIndex: props.treeIndex
		});
	}
};

const handleClick = (event, props) => {
	EventUtil.trap(event);
	if (isFunction(props.onClick)) {
		props.onClick(event, {
			node: props.node,
			select: !props.node.selected,
			treeIndex: props.treeIndex
		});
	}
};

const handleScroll = (event, props) => {
	const percentage =
		event.target.scrollTop /
		(event.target.scrollHeight - event.target.clientHeight) *
		100;

	if (isFunction(props.onScroll)) {
		props.onScroll(event, {
			percentage
		});
	}
};

const renderInitialNode = (children, props) => (
	// id intentionally not rendered here, and is present on container that includes the header
	<ul
		aria-labelledby={`${props.htmlId}__heading`}
		// TODO
		// aria-activedescendant=""
		className={classNames('slds-tree', props.initalClassName)}
		onScroll={(event) => {
			handleScroll(event, props);
		}}
		role="tree"
		style={props.initialStyle}
		// tabIndex="0"
	>
		{children}
	</ul>
);

renderInitialNode.displayName = 'InitialNode';

renderInitialNode.propTypes = {
	/**
	 * HTML `id` of the wrapping container element.
	 */
	htmlId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	/*
	 * Class names to be added to the top-level `ul` element.
	 */
	initalClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string
	]),
	/*
	 * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
	 */
	initialStyle: PropTypes.object
};

// Most of these props come from the nodes array, not from the Tree props
const renderBranch = (children, props) => {
	const isExpanded = props.node.expanded;
	const isSelected = props.node.selected;
	const isLoading = props.node.loading;

	const loader = (
		<div
			style={{
				display: 'block',
				paddingLeft: `${1.5 * props.level + 1.5}rem`,
				marginTop: '.5rem'
			}}
		>
			<div
				style={{
					borderRadius: '15rem',
					display: 'block',
					marginBottom: '.75rem',
					height: '.5rem',
					backgroundColor: 'rgb(224, 229, 238)',
					width: '40%'
				}}
			/>
			<div
				style={{
					borderRadius: '15rem',
					display: 'block',
					marginBottom: '.75rem',
					height: '.5rem',
					backgroundColor: 'rgb(224, 229, 238)',
					width: '80%'
				}}
			/>
			<div
				style={{
					borderRadius: '15rem',
					display: 'block',
					marginBottom: '.75rem',
					height: '.5rem',
					backgroundColor: 'rgb(224, 229, 238)',
					width: '60%'
				}}
			/>
		</div>
	);

	// TODO: Remove tabbing from anchor tag AND button / add tabIndex={-1} when keyboard navigation is present.
	return (
		<li
			id={props.htmlId}
			role="treeitem"
			aria-level={props.level}
			aria-expanded={isExpanded ? 'true' : 'false'}
		>
			{/* eslint-disable jsx-a11y/no-static-element-interactions */}
			<div
				className={classNames('slds-tree__item', {
					'slds-is-selected': isSelected
				})}
				onClick={(event) => {
					handleClick(event, props);
				}}
			>
				{/* eslint-enable jsx-a11y/no-static-element-interactions */}
				<Button
					assistiveText="Toggle"
					iconName="chevronright"
					iconSize="small"
					variant="icon"
					className="slds-m-right--small"
					aria-controls={props.htmlId}
					onClick={(event) => {
						handleExpandClick(event, props);
					}}
				/>
				{/* eslint-disable no-script-url */}
				<a
					id={`${props.htmlId}__label`}
					href="javascript:void(0)"
					// eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
					role="presentation"
					className="slds-truncate"
				>
					{/* eslint-enable no-script-url */}
					{<Highlighter search={props.searchTerm}>{props.label}</Highlighter>}
				</a>
			</div>
			{isLoading ? loader : null}
			<ul
				className={classNames({
					'slds-is-expanded': isExpanded,
					'slds-is-collapsed': !isExpanded
				})}
				role="group"
				aria-labelledby={`${props.htmlId}__label`}
			>
				{isExpanded && !isLoading ? children : null}
			</ul>
		</li>
	);
};

renderBranch.displayName = 'Branch';

renderBranch.propTypes = {
	/**
	 * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
	 */
	htmlId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	/**
	 * The text of the tree item.
	 */
	label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
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
	 * Highlights term if found in node label
	 */
	searchTerm: PropTypes.string,
	/**
	 * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
	 */
	treeIndex: PropTypes.string
};

/**
 * A Tree Item is a non-branching node in a hierarchical list.
 */
const Branch = (props) => {
	let treeIndex = '';
	let children;

	const { treeId, level, onExpandClick, searchTerm } = props;

	if (Array.isArray(props.getNodes(props.node))) {
		children = props.node.nodes.map((node, index) => {
			let child;
			const htmlId = `${props.treeId}-${node.id}`;
			treeIndex = `${index}`;
			if (props.treeIndex) {
				treeIndex = `${props.treeIndex}-${treeIndex}`;
			}

			if (node.type === 'branch') {
				child = (
					<Branch
						getNodes={props.getNodes}
						htmlId={htmlId}
						key={shortid.generate()}
						label={node.label}
						level={level + 1}
						node={node}
						nodes={node.nodes}
						onClick={props.onClick}
						onExpandClick={onExpandClick}
						searchTerm={searchTerm}
						treeId={treeId}
						treeIndex={treeIndex}
					/>
				);
			} else {
				child = (
					<Item
						label={node.label}
						htmlId={htmlId}
						key={shortid.generate()}
						level={level + 1}
						node={node}
						onClick={props.onClick}
						searchTerm={searchTerm}
						treeIndex={treeIndex}
						treeId={treeId}
					/>
				);
			}
			return child;
		});
	}

	const branch =
		props.level === 0
			? renderInitialNode(children, props)
			: renderBranch(children, props);
	return branch;
};

// ### Display Name
// Always use the canonical component name as the React display name.
Branch.displayName = TREE_BRANCH;

// ### Prop Types
Branch.propTypes = {
	/**
	 * A function that will be called by every branch to receive its child nodes. The parent `node` object with the branch data is passed into this function: `getNodes(node)`. If your state engine is Flux or Redux, then your tree data structure will probably be flattened or normalized within the store. This will allow you to build out your tree without transversing an actual tree of data and may be more performant.
	 */
	getNodes: PropTypes.func,
	/**
	 * HTML `id` of the wrapping container element joined with the `id` of the node. This will recursively increase as the tree depth increases.
	 */
	htmlId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
		PropTypes.string
	]),
	initialStyle: PropTypes.object,
	/**
	 * The text of the tree item.
	 */
	label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
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
	 * Highlights term if found in node label
	 */
	searchTerm: PropTypes.string,
	/**
	 * Unique id used for a prefix of all tree nodes. This is the prefix for subsequent `htmlId` props.
	 */
	treeId: PropTypes.string,
	/**
	 * Location of node (zero index). First node is `0`. It's first child is `0-0`. This can be used to modify your nodes without searching for the node. This index is only valid if the `nodes` prop is the same as at the time of the event.
	 */
	treeIndex: PropTypes.string
};

Branch.defaultProps = {
	level: 0,
	label: '',
	treeIndex: ''
};

export default Branch;
