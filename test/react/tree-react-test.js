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
					return Lib.merge({
						selection: [],
						open: [],
						onChanged: this.handleChanged,
						onOpened: this.handleToggle,
						onClosed: this.handleToggle
					}, initData);
				},

				render () {
					return (<Tree {...this.state} />);
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
			component.setState({
				disabled: true
			});
		}
	},

	enableComponent: {
		default (component) {
			component.setState({
				disabled: false
			});
		}
	},

	// TO-DO: Should we try to confirm these via DOM? Or via the API method (not very React-like)?
	getSelectedItems: {
		default (component) {
			return component.state.selection;
		}
	},

	// TO-DO: Possibly make an "approach" that does a click instead?
	selectItem: {
		default (component, item) {
			component.state.selection.push(item);
			
			component.setState({
				selection: component.state.selection
			});
		}
	},

	deselectItem: {
		default (component, item) {
			component.state.selection.pop(item);
			
			component.setState({
				selection: component.state.selection
			});
		}
	},

	deselectAll: {
		default (component) {
			component.setState({
				selection: []
			});
		}
	},

	// TO-DO: Make this actually toggle, not just add. Also, make other approaches as described above
	toggleFolder: {
		default (component, folder) {
			component.state.open.push(folder);
			
			component.setState({
				open: component.state.open
			});
		}
	},

	closeAllFolders: {
		default (component) {
			component.setState({
				open: []
			});
		}
	},

	getOpenFolders: {
		default (component) {
			return component.state.open;
		}
	}
};
