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
import {
	treeNodes,
	initialExpanded,
	initialSelection
} from '../../utilities/sample-data/tree';

// ### isFunction
import isFunction from 'lodash.isfunction';

import Tree from '../../components/tree';

chai.use(chaiEnzyme());

const COMPONENT_CSS_CLASSES = {
	base: 'slds-tree'
};

const DemoTree = React.createClass({
	displayName: 'DemoTree',

	// ### Prop Types
	propTypes: {
		initialExpanded: PropTypes.array,
		initialSelection: PropTypes.array,
		noBranchSelection: PropTypes.bool,
		singleSelection: PropTypes.bool,
		branchExpandClicked: PropTypes.func,
		itemClicked: PropTypes.func
	},

	getDefaultProps () {
		return {
			initialExpanded: [],
			initialSelection: []
		};
	},

	getInitialState () {
		return {
			nodes: treeNodes,
			// Open: Fruits, Tree Fruits, Citrus, Apples, Empty Folder (2, 5, 17, 18, 7)
			expanded: this.props.initialExpanded,
			// Selected: Peaches
			selection: this.props.initialSelection
		};
	},

	handleExpandClick (expanded) {
		if (isFunction(this.props.branchExpandClicked)) {
			this.props.branchExpandClicked();
		}
		this.state.expanded = expanded;
	},

	// By default Tree can have multiple selected nodes and folders/branches can be
	// selected. To disable either of these, use the following conditions.
	handleClick (selection, clickedItem) {
		if (isFunction(this.props.itemClicked)) {
			this.props.itemClicked();
		}
		// itemClicked('Node Clicked')(selection, clickedItem, ...rest);
		if (!this.props.singleSelection) {
			if (!this.props.noBranchSelection ||
				(this.props.noBranchSelection && clickedItem.type !== 'folder')) {
				this.state.selection = selection;
			}
		} else {
			this.state.selection = [clickedItem];
		}
	},

	render () {
		return (
			<Tree
				id="example-tree"
				nodes={this.state.nodes}
				onExpandClick={this.handleExpandClick}
				onClick={this.handleClick}
				expanded={this.state.expanded}
				selection={this.state.selection}
				{...this.props}
			/>
		);
	}
});

describe('Tree: ', () => {
	// Base defaults

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

	/*
	 * setTimeOut should not be used, a callback in `getNodes` should be used
	 */
	describe('Initial Expanded and Selection', () => {
		beforeEach(mountComponent(
			<DemoTree heading="Foods" initialSelection={initialSelection} initialExpanded={initialExpanded} />
		));

		afterEach(unmountComponent);

		it('has initial selection id', function (done) {
			setTimeout(() => {
				const component = this.wrapper.find('.slds-tree[aria-activedescendant="15"]');
				expect(component).to.have.length(1);
				done();
			}, 200);
		});

		it('has initial expanded branches', function (done) {
			setTimeout(() => {
				const expandedBranches = this.wrapper.find('li[aria-expanded="true"]');
				expect(expandedBranches).to.have.length(5);
				// TODO: add foreach to cycle through and check for correct IDs
				done();
			}, 200);
		});
	});

	describe('Expand and selects on click', () => {
		it('branch expands and closes', function (done) {
			const expandClicked = sinon.spy();

			const instance = (
				<DemoTree
					branchExpandClicked={expandClicked}
					heading="Foods"
				/>
			);

			this.wrapper = mount(instance, { attachTo: document.body.appendChild(document.createElement('div')) });
			setTimeout(() => {
				const expandedButton = this.wrapper.first('.slds-button');
				expandedButton.simulate('click');
				expect(expandClicked.callCount).to.equal(1);
				expandedButton.simulate('click');
				expect(expandClicked.callCount).to.equal(2);
				done();
			}, 200);
		});

		it('branch selects and unselects', function (done) {
			const itemClicked = sinon.spy();

			const instance = (
				<DemoTree
					itemClicked={itemClicked}
					heading="Foods"
				/>
			);

			this.wrapper = mount(instance, { attachTo: document.body.appendChild(document.createElement('div')) });
			setTimeout(() => {
				const item = this.wrapper.first('.slds-item');
				// verify if closed?
				item.simulate('click');
				expect(itemClicked.callCount).to.equal(1);
				// verify if open?
				item.simulate('click');
				expect(itemClicked.callCount).to.equal(2);
				done();
			}, 200);
		});
	});
	
	// test getNodes? in some ways it's always being tested--just not as an external Promise.
});
