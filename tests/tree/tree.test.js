/* global describe, beforeEach, afterEach, it, sinon */
/* eslint-disable no-unused-expressions */

// TODO: Enzyme 2.3 does not support React components containing SVGs
// https://github.com/airbnb/enzyme/issues/375

import React, { PropTypes } from 'react';

import { mount } from 'enzyme';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
// `this.wrapper` and `this.dom` is set in the helpers file
import { mountComponent, unmountComponent } from '../enzyme-helpers';

// ### isFunction
import isFunction from 'lodash.isfunction';

import sampleNodes from '../../utilities/sample-data/tree';

import Tree from '../../components/tree';
import Search from '../../components/forms/input/search';

chai.use(chaiEnzyme());

const COMPONENT_CSS_CLASSES = {
	base: 'slds-tree'
};

const DemoTree = React.createClass({
	displayName: 'DemoTree',

	// ### Prop Types
	propTypes: {
		branchExpandClicked: PropTypes.func,
		exampleNodesIndex: PropTypes.string,
		itemClicked: PropTypes.func,
		noBranchSelection: PropTypes.bool,
		searchTerm: PropTypes.string,
		searchable: PropTypes.bool,
		singleSelection: PropTypes.bool,
		treeScrolled: PropTypes.func
	},

	getDefaultProps () {
		return {
			exampleNodesIndex: 'sampleNodesDefault',
			id: 'example-tree'
		};
	},

	getInitialState () {
		const initalNodes = this.props.exampleNodesIndex
		? sampleNodes[this.props.exampleNodesIndex]
		: sampleNodes.sampleNodesDefault;
		return {
			nodes: initalNodes,
			searchTerm: this.props.searchable ? 'fruit' : undefined
		};
	},

	// By default Tree can have multiple selected nodes and folders/branches can be selected. To disable either of these, you can use the following logic. However, `props` are immutable. The node passed in shouldn't be modified, and due to object and arrays being reference variables, forceUpate is needed. This is just a "working example" not a prescription.
	handleExpandClick (event, data) {
		if (isFunction(this.props.branchExpandClicked)) {
			this.props.branchExpandClicked(event, data);
		}
		data.node.loading = data.expand ? true : undefined;

		// Fake delay to demonstrate use of loading node attibute
		setTimeout((node) => {
			node.loading = false;
			this.forceUpdate();
		}, 500, data.node);
		data.node.expanded = data.expand;
	},

	handleClick (event, data) {
		console.log(this.props.itemClicked);
		if (this.props.singleSelection) {
			data.node.selected = data.select;
			this.setState({ singleSelection: data.node });
			if (this.state.singleSelection) {
				this.state.singleSelection.selected = undefined;
			}
			this.forceUpdate();
			if (isFunction(this.props.itemClicked)) {
				this.props.itemClicked(event, data);
			}
		} else {
			if (!this.props.noBranchSelection ||
				(this.props.noBranchSelection && data.node.type !== 'branch')) {
				data.node.selected = data.select;
				this.forceUpdate();
				if (isFunction(this.props.itemClicked)) {
					this.props.itemClicked(event, data);
				}
			}
		}
	},

	handleScroll (event, data) {
		if (isFunction(this.props.treeScrolled)) {
			this.props.treeScrolled(event, data);
		}
	},

	handleSearchChange (event) {
		this.setState({ searchTerm: event.target.value });
	},

	render () {
		return (
			<div>{
				this.props.searchable
				? <div>
					<Search assistiveText="Search Tree" value={this.state.searchTerm} onChange={this.handleSearchChange} />
					<br />
				</div>
				: null
			}
				<Tree
					id="example-tree"
					nodes={this.state.nodes}
					onExpandClick={this.handleExpandClick}
					onClick={this.handleClick}
					onScroll={this.handleScroll}
					searchTerm={this.state.searchTerm}
					{...this.props}
				/>
			</div>
		);
	}
});

describe('Tree: ', () => {
	/*
		Tests
	 */
	describe('Default Structure', () => {
		beforeEach(mountComponent(
			<DemoTree heading="Foods" />
		));

		afterEach(unmountComponent);

		it('has tree class and heading', function () {
			const component = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			const heading = this.wrapper.find('#example-tree__heading');
			expect(component).to.have.length(1);
			expect(heading).to.have.length(1);
		});
	});

	describe('Assistive Technology', () => {
		beforeEach(mountComponent(
			<DemoTree assistiveText="Foods" />
		));

		afterEach(unmountComponent);

		it('has heading via assistiveText', function () {
			const heading = this.wrapper.find('#example-tree__heading.slds-assistive-text');
			expect(heading).to.have.length(1);
			const ariaLabelledbyId = this.wrapper.find('.slds-tree[aria-labelledby="example-tree__heading"]');
			expect(ariaLabelledbyId).to.have.length(1);
		});
	});

	describe('Initial Expanded and Selection based on nodes', () => {
		beforeEach(mountComponent(
			<DemoTree
				heading="Foods"
				exampleNodesIndex="sampleNodesWithInitialState"
			/>
		));

		afterEach(unmountComponent);

		it('has initial selection', function () {
			let selectedNode = this.wrapper.find('#example-tree-1').find('.slds-is-selected');
			expect(selectedNode).to.have.length(1);
			selectedNode = this.wrapper.find('#example-tree-5').find('.slds-is-selected');
			expect(selectedNode).to.have.length(1);
		});

		it('has initial expanded branches', function () {
			const expandedBranchList = this.wrapper.find('#example-tree-2').find('.slds-is-expanded');
			expect(expandedBranchList.node.childNodes).to.have.length(2);
		});
	});

	describe('Branch and items expand and select on click', () => {
		it('branch expands and closes, selects and deselects', function () {
			const itemClicked = sinon.spy();
			const expandClicked = sinon.spy();

			const instance = (
				<DemoTree
					branchExpandClicked={expandClicked}
					itemClicked={itemClicked}
					heading="Foods"
				/>
			);

			this.wrapper = mount(instance, { attachTo: document.body.appendChild(document.createElement('div')) });
			const expandButton = this.wrapper.find('#example-tree-2').find('.slds-button');
			expandButton.simulate('click');
			expect(expandClicked.callCount).to.equal(1);
			expandButton.simulate('click');
			expect(expandClicked.callCount).to.equal(2);
			expandButton.simulate('click');

			const branch = this.wrapper.find('#example-tree-2').find('.slds-tree__item');
			branch.simulate('click');
			expect(itemClicked.callCount).to.equal(1);
		});

		it('item selects', function () {
			const itemClicked = sinon.spy();

			const instance = (
				<DemoTree
					itemClicked={itemClicked}
					heading="Foods"
				/>
			);

			this.wrapper = mount(instance, { attachTo: document.body.appendChild(document.createElement('div')) });
			const item = this.wrapper.find('#example-tree-1').find('.slds-tree__item');
			item.simulate('click');
			expect(itemClicked.callCount).to.equal(1);
		});
	});
	
});
