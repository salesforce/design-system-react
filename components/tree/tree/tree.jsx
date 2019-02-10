import React from 'react';
import PropTypes from 'prop-types';

import TreeRoot from '../index';

export default class Tree extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			nodes: this.props.nodes,
		};
	}

	componentDidMount = () => {
		this.setState({ nodes: this.props.nodes });
	};

	getNodes = (node) =>
		node.nodes ? node.nodes.map((id) => this.state.nodes[id]) : [];

	// By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic. However, `props` are immutable. The node passed in shouldn't be modified. Object and arrays are reference variables.
	handleExpandClick = (event, data) => {
		const selected = data.select ? true : data.node.selected;
		this.setState((prevState) => ({
			...prevState,
			nodes: {
				...prevState.nodes,
				...{
					[data.node.id]: {
						...data.node,
						expanded: data.expand,
						selected,
					},
				},
			},
		}));
	};

	handleClick = (event, data) => {
		if (this.props.multipleSelection) {
			if (
				!this.props.noBranchSelection ||
				(this.props.noBranchSelection && data.node.type !== 'branch')
			) {
				// Take the previous state, expand it, overwrite the `nodes` key with the previous state's `nodes` key expanded with the id of the node just clicked selected
				this.setState((prevState) => ({
					...prevState,
					nodes: {
						...prevState.nodes,
						...{
							[data.node.id]: { ...data.node, selected: data.select },
						},
					},
				}));
			}
		} else if (this.props.noBranchSelection && data.node.type === 'branch') {
			// OPEN BRANCH/FOLDER WHEN CLICKED
			// Although not codified in SLDS, this takes the click callback and turns it into the expand callback, and should be used for item only selection.
			this.setState((prevState) => ({
				...prevState,
				nodes: {
					...prevState.nodes,
					...{
						[data.node.id]: { ...data.node, expanded: !data.node.expanded },
					},
				},
			}));
		} else {
			// SINGLE SELECTION
			// Take the previous state, expand it, overwrite the `nodes` key with the previous state's `nodes` key expanded with the id of the node just clicked selected and the previously selected node unselected.
			this.setState((prevState) => {
				// Gaurd against no selection with the following. `selectedNode`
				// is the previously selected "current state" that is about to
				// be updated
				const selectedNode = prevState.selectedNode
					? {
							[prevState.selectedNode.id]: {
								...prevState.nodes[prevState.selectedNode.id],
								selected: false,
							},
						}
					: {};
				return {
					...prevState,
					nodes: {
						...prevState.nodes,
						...{
							[data.node.id]: { ...data.node, selected: data.select },
							...selectedNode,
						},
					},
					selectedNode: data.node,
				};
			});
		}
	};

	handleSearchChange = (event) => {
		this.setState({ searchTerm: event.target.value });
	};

	render() {
		return (
			<TreeRoot
				id={this.props.id}
				assistiveText={this.props.assistiveText}
				className={this.props.className}
				getNodes={this.getNodes}
				heading={!this.props.noHeading && this.props.heading}
				listStyle={this.props.listStyle}
				listClassName={this.props.listClassName}
				nodes={this.state.nodes['0'].nodes}
				onExpandClick={this.props.onExpandClick || this.handleExpandClick}
				onClick={this.props.onClick || this.handleClick}
				style={{ width: 'inherit', height: 'inherit' }}
			/>
		);
	}
}

Tree.propTypes = {
	id: PropTypes.string,
	nodes: PropTypes.object,
	assistiveText: PropTypes.string,
	heading: PropTypes.string,
	listStyle: PropTypes.object,
};
