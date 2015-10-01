/*
 * REACT FACADE API FOR SELECTLIST TESTS
 * Facade (or framework specific) implementation of tests defined in behaviors folder
 */

// Core file for helpful things like CSS class names
import { CONTROL as controlName } from '../../src/core/tree';
import * as Lib from '../../src/lib/lib';

// import TreeCore from '../../src/core/tree';
// const Core = TreeCore;

// Run in legacy plugin mode
import Tree from '../../src/react/tree/tree';

export const behaviorHandlers = {
	createComponent: {
		default (initData, rendered) {
		}

	},

	getComponentElement: {
		default (component) {
			return component.elements.wrapper;
		}
	},

	destroyComponent: {
		default (component) {
			return this.getComponentElement(component).remove();
		}
	},

	getSelectedItems: {
		default (component) {
			return component.getSelectedItems();
		}
	},

	selectItem: {
		default (component, item) {
			return component.selectItem(item);
		}
	},

	deselectItem: {
		default (component, item) {
			return component.deselectItem(item);
		}
	},

	deselectAll: {
		default (component) {
			return component.deselectAll();
		}
	},

	toggleFolder: {
		default (component, folder) {
			return component.toggleFolder(folder);
		}
	},

	closeAllFolders: {
		default (component) {
			return component.closeAllFolders();
		}
	},

	getOpenFolders: {
		default (component) {
			return component.getOpenFolders();
		}
	}
};
