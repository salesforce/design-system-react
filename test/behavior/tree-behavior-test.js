/*
 * TREE TESTS
 * Imports all the facades-specific implementations of the tests listed below and runs them
 * Do not run facade (framework) specific tests directly. Use this file.
 * It may be helpful to temporally remove a 'facade' from package.json, as you write tests.
 * View at http://localhost:8080/test/
 */

// Library allowing DOM elements to be checked for
import * as expectDom from '../lib/expect-dom';
// Confirm that the API test libraries export ALL the behaviors and approaches
import { verifyFacadeProvidesBehaviorCallbacks, registerBehaviorTestCombinations } from '../lib/behavior-test-runner';
// import the needed component and all it's facade-specific functions
// (ex.- jQuery-specific implementation of createComponent)
import { tree as componentFacadeTestLib } from '../tests-api';

import { CONTROL as controlName } from '../../src/core/tree';
// import TreeCore from '../../src/core/tree';

const $ = require('jquery');
const chai = require('chai');
const expect = chai.expect;

/* Testing Contract: Expected values on each facade's exported behaviorHandlers

TODO: Decide on formatting for these comments and rewrite to match formatting selection

component createComponent( initData )
	This should return the object which represents the component (to be passed back in on later calls)
	initData => {
		container: containing element for the tree (tree does not have to be immediate child)
		multiSelect: Boolean, optional, default false
		folderSelect: Boolean, optional, default true
		children: [
			{
				text: String value to show for the node
				type: String 'folder' or 'item'
				iconClass: undefined, null, or value for className module (should default based on type)
				expandable: undefined or Boolean (should default to true)
				initiallyOpen: undefined or Boolean, default false
				children: [ ... ] undefined, null, or an array of objects (see containing array for format)
			}
		]
	}

getComponentElement( component )
	This should return the outermost unordered list element (beginning of the official tree HTML)
	component => returned value from createComponent

destroyComponent( component )
	This should perform all cleanup tasks such that it appears the tree never existed.
	component => returned value from createComponent

array getSelectedItems( component )
	Return an array containing the selected item's objects
	component => returned value from createComponent

select( component , object )
	Select the passed-in item in the tree
	component => returned value from createComponent

deselect( component , object )
	Deselect the passed-in item in the tree
	component => returned value from createComponent

openFolder( component , object )
	Visaully open folder (regardless of "expandable" setting)
	component => returned value from createComponent

closeFolder( component , object )
	Visaully close folder (regardless of "expandable" setting)
	component => returned value from createComponent

toggleFolder( component , object )
	Visually open or close folder (regardless of "expandable" setting)
	component => returned value from createComponent

onSelected( component , callback )
	Register an appropriate callback handler to notify when an item gets selected
	component => returned value from createComponent
	callback( selectedItems , item )
		selectedItems should be the new result of getSelectedItems()
		item should be the specific item which was added

onDeselected( component , callback )
	Register an appropriate callback handler to notify when an item gets deselected
	component => returned value from createComponent
	callback( selectedItems , item )
		selectedItems should be the new result of getSelectedItems()
		item should be the specific item which was removed

onOpened( component , callback )
	Register an appropriate callback handler to notify when a user requests that a folder be opened
	component => returned value from createComponent
	callback( item )
		item should be the specific folder which was opened

onClosed( component , callback )
	Register an appropriate callback handler to notify when a user requests that a folder be closed
	component => returned value from createComponent
	callback( item )
		item should be the specific folder which was closed

updateChildren( component , folder , children )
	Replace/repaint the given folder with a new array of children
	The implementor will be expected to call this after receiving an onOpened if they haven't done so already
	Should not open a closed folder (can be applied in the background)
	component => returned value from createComponent

showLoading( component , folder )
	Indicate to the user that changes will follow on this folder
	component => returned value from createComponent

hideLoading( component , folder )
	Remove loading indication (should normally be called prior to updateChildren)
	component => returned value from createComponent

onChildrenLoaded( component , callback )
	Register an appropriate callback handler to notify when a folder's children have been populated
	component => returned value from createComponent

closeAll( component )
	Visually close all open folders at all levels (collapse the tree)
	component => returned value from createComponent

onCloseAllComplete( component , callback )
	Register an appropriate callback handler to notify when closeAll() is complete
	component => returned value from createComponent
	callback( folders )
		folders should be an array of the folders which were previously open and are now closed

openAll( component )
	Visually open all folders at all levels (expand the entire tree)
	component => returned value from createComponent

onOpenAllComplete( component , callback )
	Register an appropriate callback handler to notify when openAll() is complete
	component => returned value from createComponent
	callback( folders )
		folders should be an array of the folders which were previously closed and are now opened

openVisible( component )
	Visually open all folders currently visible
	component => returned value from createComponent

onOpenVisibleComplete( component , callback )
	Register an appropriate callback handler to notify when openVisible() is complete
	component => returned value from createComponent
	callback( folders )
		folders should be an array of the folders which were previously closed and are now opened

*/

describe(controlName + ' Component', function () {
	verifyFacadeProvidesBehaviorCallbacks(componentFacadeTestLib, [
		'createComponent',
		'getComponentElement',
		'destroyComponent',
		'getSelectedItems',
		'select',
		'deselect',
		'openFolder',
		'closeFolder',
		'toggleFolder',
		'onSelected',
		'onDeselected',
		'onOpened',
		'onClosed',
		'updateChildren',
		'showLoading',
		'hideLoading',
		'onChildrenLoaded',
		'closeAll',
		'onCloseAllComplete',
		'openAll',
		'onOpenAllComplete',
		'openVisible',
		'onOpenVisibleComplete'
	]);

	registerBehaviorTestCombinations(componentFacadeTestLib, [
		// behaviors being tested
		'createComponent',
		'getComponentElement',
		'destroyComponent'
	], [
		// other behaviors required for tests
	], function (testingBehaviorHandlers) {
		let container = null;

		beforeEach(function () {
			container = $('<div />');
			$('body').append(container); // Container must be on the body and visible for tests to work
		});

		afterEach(function () {
			container.remove(); // Clean up container
			container = null;
		});

		describe('create and destroy component', function () {
			it('should create a single tree element on the DOM within the container', function () {
				const component = testingBehaviorHandlers.createComponent( {
					container: container,
					children: []
				} );

				expect(container.find('.tree').length).to.equal(1);

				testingBehaviorHandlers.destroyComponent(component);
			});

			it('should return an object representing the component', function () {
				const component = testingBehaviorHandlers.createComponent( {
					container: container,
					children: []
				} );

				expect(component).to.be.an('object');

				testingBehaviorHandlers.destroyComponent(component);
			});

			it('destroy should remove tree from container', function () {
				const component = testingBehaviorHandlers.createComponent( {
					container: container,
					children: []
				} );

				testingBehaviorHandlers.destroyComponent(component);

				expect(container.find('.tree').length).to.equal(0);
			});
		});

		describe('DOM expectations', function () {
			let component = null;
			let treeEl = null;

			const initDataTemplate = {
				container: container,
				children: [
					{
						text: 'Item 1',
						type: 'item'
					},
					{
						text: 'Folder 1',
						type: 'folder',
						initiallyOpen: true,
						expandable: true,
						children: [
							{
								text: 'Item 2',
								type: 'item',
								iconClass: 'custom-item-icon-class'
							},
							{
								text: 'Folder 2',
								type: 'folder',
								iconClass: 'custom-folder-icon-class',
								expandable: true,
								children: []
							}
						]
					}
				]
			};

			beforeEach(function () {
				const initData = JSON.parse( JSON.stringify( initDataTemplate ) );
				initData.container = container;

				component = testingBehaviorHandlers.createComponent( initData );

				treeEl = testingBehaviorHandlers.getComponentElement(component);
			});

			afterEach(function () {
				testingBehaviorHandlers.destroyComponent(component);
				component = null;
				treeEl = null;
			});

			function getComponentElement () {
				return treeEl;
			}

			expectDom.matches(getComponentElement, 'ul');
			expectDom.matches(getComponentElement, '.tree');
			expectDom.matches(getComponentElement, '[role=tree]');
			expectDom.found(getComponentElement,   '> li:visible', 2);
			expectDom.found(getComponentElement,   '> li:visible:eq(0).tree-item');
			expectDom.found(getComponentElement,   '> li:visible:eq(0)[role=treeitem]');
			expectDom.found(getComponentElement,   '> li:visible:eq(0) > button');
			expectDom.found(getComponentElement,   '> li:visible:eq(0) > button:eq(0).tree-item-name');
			expectDom.found(getComponentElement,   '> li:visible:eq(0) > button:eq(0)[type=button]');
			expectDom.found(getComponentElement,   '> li:visible:eq(0) > button:eq(0) > .icon-item');
			expectDom.found(getComponentElement,   '> li:visible:eq(0) > button:eq(0) > .tree-label');
			expectDom.text(getComponentElement,    '> li:visible:eq(0) > button:eq(0) > .tree-label', initDataTemplate.children[0].text);
			expectDom.found(getComponentElement,   '> li:visible:eq(1).tree-branch');
			expectDom.found(getComponentElement,   '> li:visible:eq(1)[role=treeitem]');
			expectDom.found(getComponentElement,   '> li:visible:eq(1).tree-open');
			expectDom.found(getComponentElement,   '> li:visible:eq(1)[aria-expanded=true]');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) > button');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0).tree-branch-name');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0)[type=button]');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0) > .icon-caret');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0) > .icon-folder');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0) > .tree-label');
			expectDom.text(getComponentElement,    '> li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0) > .tree-label', initDataTemplate.children[1].text);
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0).tree-branch-children');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0)[role=group]');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible', 2);
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(0).tree-item');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(0)[role=treeitem]');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(0) > button');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(0) > button:eq(0).tree-item-name');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(0) > button:eq(0)[type=button]');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(0) > button:eq(0) > .icon-item');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(0) > button:eq(0) > .icon-item:eq(0).custom-item-icon-class');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(0) > button:eq(0) > .tree-label');
			expectDom.text(getComponentElement,    '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(0) > button:eq(0) > .tree-label', initDataTemplate.children[1].children[0].text);
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1).tree-branch');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1)[role=treeitem]');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1).tree-open');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1)[aria-expanded=true]');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) > button');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0).tree-branch-name');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0)[type=button]');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0) > .icon-caret');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0) > .icon-folder');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0) > .icon-folder:eq(0).custom-folder-icon-class');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0) > .tree-label');
			expectDom.text(getComponentElement,    '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) > button:eq(0) > .tree-label', initDataTemplate.children[1].children[1].text);
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) + ul');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0).tree-branch-children');
			expectDom.found(getComponentElement,   '> li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0) > li:visible:eq(1) > .tree-branch-header:eq(0) + ul:eq(0)[role=group]');
		});
	});
});
