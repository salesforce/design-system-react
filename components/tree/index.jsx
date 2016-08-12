/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tree Component

// Implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/tree/) in React.

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// Child components
import Branch, { cssClasses as branchCssClasses } from './branch';

// ### classNames
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// Similar to React's PropTypes check. When in development mode, it issues errors in the console about properties.
import checkProps from './check-props';

// ## Constants
import { TREE } from '../../utilities/constants';

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
const cssClasses = {
	base: branchCssClasses.tree,
	container: 'slds-tree_container'
};

const idSuffixes = {
	heading: '__heading'
};

/**
 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed..
 */
const Tree = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: TREE,

	// ### Prop Types
	propTypes: {
		/**
		 * For users of assistive technology, if set the heading will be hidden. `heading` or `assistiveText` must be set in order to label the tree.
		 */
		assistiveText: PropTypes.string,
		/**
		 * Class names to be added to the container element.
		 */
		containerClassName: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string]),
		/**
		 * Class names to be added to the top-level `ul` element.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string]),
		/**
		 * List of expanded branch objects `{label: 'Cat', id=2}`.
		 * */
		expanded: PropTypes.array,
		/**
		 * This is the tree's heading and describes it contents. It can be hidden, see `assistiveText`.
		 * */
		heading: React.PropTypes.string,
		/**
		 * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
		 */
		id: PropTypes.string,
		nodeKeys: React.PropTypes.shape({
			nodes: React.PropTypes.string
		}),
		/**
		 * Array of items starting at the top of the tree. Every object in the array should have an id key in order to be fully accessible to users of assistive technology.
		 */
		nodes: PropTypes.array,
		/**
		 * Function that will run whenever an item or branch is clicked.
		 */
		onClick: PropTypes.func.isRequired,
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
			id: shortid.generate(),
			nodeKeys: {
				nodes: 'nodes'
			}
		};
	},

	componentWillMount () {
		// TODO: This may need to be cleaned up to alert a developer when they do both that the heading is hidden.
		checkProps(TREE, this.props);
	},

	// ### Render
	render () {
		const {
			assistiveText,
			containerClassName,
			className,
			expanded,
			heading,
			id,
			nodes,
			nodeKeys,
			loading,
			onClick,
			onExpandClick,
			selection
		} = this.props;

		// One of these is required to pass accessibility tests
		const headingText = assistiveText || heading;

		// Start the zero level branch--that is the tree root. There is no label for
		// the tree root, but is required by all other nodes
		return (
			<div id={id} className={classNames('slds-tree_container', containerClassName)} role="application">
				{headingText
					? <h4
						className={classNames('slds-text-title--caps', { 'slds-assistive-text': assistiveText })}
						id={`${id}__heading`}
					>{headingText}</h4>
					: null}
				<Branch
					expanded={expanded}
					initalClassName={className}
					htmlId={id}
					label=""
					level={0}
					loading={loading}
					node={{ [this.props.nodeKeys.nodes]: nodes }}
					nodeKeys={nodeKeys}
					onExpandClick={onExpandClick}
					onClick={onClick}
					selection={selection}
				/>
			</div>
		);
	}
});

module.exports = Tree;
module.exports.cssClasses = cssClasses;
module.exports.idSuffixes = idSuffixes;
