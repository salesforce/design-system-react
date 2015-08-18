import { registerTestsForBehaviorCallbacks, registerBehaviorTestCombinations } from '../lib/behavior-test-runner';
import { tree as componentFacadeTestLib } from '../tests-api';

const $ = require('jquery');
const chai = require('chai');
const expect = chai.expect;

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

describe('Tree Component', function () {
	registerTestsForBehaviorCallbacks(componentFacadeTestLib, [
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
		'createComponent',
		'getComponentElement',
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

		describe('DOM expectations based on data', function () {
			let component = null;
			let tree = null;
			const initData = {
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
				component = testingBehaviorHandlers.createComponent( JSON.parse( JSON.stringify( initData ) ) );
				tree = $(testingBehaviorHandlers.getComponentElement(component));
			});

			afterEach(function () {
				testingBehaviorHandlers.destroyComponent(component);
				component = null;
				tree = null;
			});

			describe('tree element', function () {
				it('should be an unordered list element', function () {
					expect(tree.is('ul')).to.be.true;
				});

				it('should have the class "tree"', function () {
					expect(tree.is('.tree')).to.be.true;
				});

				it('should have the aria role "tree"', function () {
					expect(tree.is('[role=tree]')).to.be.true;
				});

				describe('outer item element', function () {
					let item = null;

					beforeEach(function () {
						item = tree.find('> li').first();
					});

					it('should have the class "tree-item"', function () {
						expect(item.is('.tree-item')).to.be.true;
					});

					it('should have the role "tree"', function () {
						expect(item.is('[role=tree]')).to.be.true;
					});

					describe('tree item button', function () {
						let button = null;

						beforeEach(function () {
							button = item.find('> button').first();
						});

						it('should have the class "tree-item-name"', function () {
							expect(button.is('.tree-item-name')).to.be.true;
						});

						it('should have the type "button"', function () {
							expect(button.is('[type=button]')).to.be.true;
						});

						describe('tree item icon', function () {
							it('should have an element with the class "icon-item"', function () {
								expect(button.find('.icon-item').length).to.equal(1);
							});
						});

						describe('tree item label', function () {
							it('should have an element with the class "tree-label"', function () {
								expect(button.find('.tree-label').length).to.equal(1);
							});

							it('should have the text from the data', function () {
								expect(button.find('.tree-label').text()).to.equal(initData.children[0].text);
							});
						});
					});
				});

				describe('outer folder element', function () {
					it('should have the class "tree-branch"');
					it('should have the role "treeitem"');
					it('should have the class "tree-open"');
					it('should have the attribute aria-expanded="true"');

					describe('tree folder header', function () {
						it('should have the class "tree-branch-header"');

						describe('tree folder button', function () {
							it('should have the class "tree-branch-name"');
							it('should have the type "button"');

							describe('tree folder caret', function () {
								it('should have the class "icon-caret"');
							});

							describe('tree folder icon', function () {
								it('should have the class "icon-folder"');
							});

							describe('tree folder label', function () {
								it('should have the class "tree-label"');
								it('should have the text from the data');
							});
						});
					});

					describe('tree folder children', function () {
						it('should have the class "tree-branch-children"');
						it('should have the role "group"');

						describe('tree folder children example', function () {
							describe('outer item element', function () {
								it('should have the class "tree-item"');
								it('should have the role "tree"');

								describe('tree item button', function () {
									it('should have the class "tree-item-name"');
									it('should have the type "button"');

									describe('tree item icon', function () {
										it('should have the class "icon-item"');
										it('should have the other classes passed in via data');
									});

									describe('tree item label', function () {
										it('should have the class "tree-label"');
										it('should have the text from the data');
									});
								});
							});

							describe('outer folder element', function () {
								it('should have the class "tree-branch"');
								it('should have the role "treeitem"');
								it('should have the class "tree-open"');
								it('should have the attribute aria-expanded="true"');

								describe('tree folder header', function () {
									it('should have the class "tree-branch-header"');

									describe('tree folder button', function () {
										it('should have the class "tree-branch-name"');
										it('should have the type "button"');

										describe('tree folder caret', function () {
											it('should have the class "icon-caret"');
										});

										describe('tree folder icon', function () {
											it('should have the class "icon-folder"');
											it('should have the other classes passed in via data');
										});

										describe('tree folder label', function () {
											it('should have the class "tree-label"');
											it('should have the text from the data');
										});
									});
								});

								describe('tree folder children', function () {
									it('should have the class "tree-branch-children"');
									it('should have the role "group"');

									describe('tree folder children', function () {
										it('should not have any tree items');
										it('should not have any tree folders');
									});
								});

								describe('tree loader', function () {
									it('should have the class "tree-loader"');
									it('should have the role "alert"');
								});
							});
						});
					});

					describe('tree loader', function () {
						it('should have the class "tree-loader"');
						it('should have the role "alert"');
					});
				});
			});
		});
	});

	registerBehaviorTestCombinations(componentFacadeTestLib, [
		'createComponent',
		'destroyComponent'
		// TODO: Test interactivity
	], function ( ) { // testingBehaviorHandlers ) {
	});
});
