import { registerTestsForBehaviorCallbacks, registerBehaviorTestCombinations } from '../lib/behavior-test-runner';

const _ = require('underscore');
const $ = require('jquery');
const chai = require('chai');
const expect = chai.expect;

// TODO: Load the facades programmatically
const facades = {
	jquery: require('../jquery/tree-test'),
	marionette: require('../marionette/tree-test'),
	react: require('../react/tree-test')
};

/* Testing Contract: Expected values on each facade's exported behaviorHandlers

TODO: Write document explaining relationship of behavior tests to facade-specific component tests
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
				iconClass: undefined, null, or value for className module
				expandable: undefined or Boolean (should default to true)
				children: [ ... ] undefined, null, or an array of objects (see containing array)
			}
		]
	}

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

describe('Tree Component', function () {
	_.each(facades, function (facadeTestLib, facadeName) {
		registerTestsForBehaviorCallbacks(facadeName, facadeTestLib, [
			'createComponent',
			'destroyComponent'
		]);

		registerBehaviorTestCombinations(facadeName, facadeTestLib, [
			'createComponent',
			'destroyComponent'
		], function (testingBehaviorHandlers) {
			let container = null;

			beforeEach(function () {
				container = $('<div />');
				$('body').append(container);
			});

			afterEach(function () {
				container.remove();
				container = null;
			});

			describe('create and destroy component', function () {
				it('should create a single tree element on the DOM within the container', function () {
					const tree = testingBehaviorHandlers.createComponent( {
						container: container,
						children: []
					} );

					expect(container.find('.tree').length).to.equal(1);

					testingBehaviorHandlers.destroyComponent(tree);
				});

				it('should return an object representing the component', function () {
					const tree = testingBehaviorHandlers.createComponent( {
						container: container,
						children: []
					} );

					expect(tree).to.be.an('object');

					testingBehaviorHandlers.destroyComponent(tree);
				});

				it('destroy should remove tree from container', function () {
					const tree = testingBehaviorHandlers.createComponent( {
						container: container,
						children: []
					} );

					testingBehaviorHandlers.destroyComponent(tree);

					expect(container.find('.tree').length).to.equal(0);
				});
			});

			describe('tree component DOM expectations', function () {
				let tree = null;

				beforeEach(function () {
					tree = testingBehaviorHandlers.createComponent( {
						container: container,
						children: []
					} );
				});

				afterEach(function () {
					testingBehaviorHandlers.destroyComponent(tree);
					tree = null;
				});

				it('should have the class "tree"', function () {
					expect($(tree).is('.tree')).to.be.true;
				});

				it('should have the aria role "tree"', function () {
					expect($(tree).is('[role=tree]')).to.be.true;
				});
			});
		});
	});
});

// Validate tree element: class="tree" role="tree"
	// TODO item elements: class="tree-item" role="treeitem"
		// TODO type="button" class="tree-item-name"
			// TODO class="icon-item" with appropriate other classes
			// TODO class="tree-label" with appropriate text
	// TODO folder elements: class="tree-branch" role="treeitem" (optionally class="tree-open" aria-expanded="true")
		// TODO class="tree-branch-header"
			// TODO type="button" class="tree-branch-name"
				// TODO if expandable class="icon-caret"
				// TODO class="icon-folder" with appropriate other classes
				// TODO class="tree-label" with appropriate text
		// TODO class="tree-branch-children" role="group"
			// TODO tree-item or tree-branch ...
		// TODO class="tree-loader" role="alert"
