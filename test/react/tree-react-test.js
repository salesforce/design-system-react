/*
 * REACT FACADE API FOR SELECTLIST TESTS
 * Facade (or framework specific) implementation of tests defined in behaviors folder
 */

// Core file for helpful things like CSS class names
import { CONTROL as controlName } from '../../src/core/tree';
import * as Lib from '../../src/lib/lib';

// import TreeCore from '../../src/core/tree';
// const Core = TreeCore;

import React from 'react';
import Tree from '../../src/react/tree/tree';

// REMOVE
void(controlName);
void(Lib);

// Global objects to control the state

export const behaviorHandlers = {
	createComponent: {
		default (initData, rendered) {
			const el = initData.container[0]; // container is jQuery, so get the DOM element out of it
			const TestTree = React.createClass({
				getInitialState () {
					return { disabled: false,
							 selection: [],
							 open: [] };
				},

				render () {
					return (<Tree
								multiSelect={true}
								collection={initData.collection}
								selection={this.state.selection}
								open={this.state.open}
								onChanged={this.handleChanged}
								onOpened={this.handleToggle}
								onClosed={this.handleToggle} />);
				},

				handleChanged (item, selection) {
					this.setState({ selection });
				},
				
				handleToggle (item, open) {
					this.setState({ open });
				}
			});
			const theTree = React.render(<TestTree/>, el);
			rendered(theTree);  // Rendering is finished by this point
			return theTree;
		}
	},

	getComponentElement: {
		default (component) {
			return React.findDOMNode(component);
		}
	},

	destroyComponent: {
		default (component) {
			return this.getComponentElement(component).remove();
		}
	},

	disableComponent: {
		default (component) {
			component.state.disabled = true;
		}
	},

	enableComponent: {
		default (component) {
			component.state.disabled = false;
		}
	},

	getSelectedItems: {
		default (component) {
			return component.state.selection;
		}
	},

	selectItem: {
		default (component, item) {
			component.state.selection.push(item);
		}
	},

	deselectItem: {
		default (component, item) {
			component.state.selection.pop(item);
		}
	},

	deselectAll: {
		default (component) {
			component.state.selection = [];
		}
	},

	toggleFolder: {
		default (component, folder) {
			component.state.open.push(folder);
		}
	},

	closeAllFolders: {
		default (component) {
			component.state.open = [];
		}
	},

	getOpenFolders: {
		default (component) {
			return component.state.open;
		}
	}
};
