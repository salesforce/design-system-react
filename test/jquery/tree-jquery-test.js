/*
 * JQUERY FACADE API FOR SELECTLIST TESTS
 * Facade (or framework specific) implementation of tests defined in behaviors folder
 */

// Core file for helpful things like CSS class names
import { CONTROL as controlName } from '../../src/core/tree';
import * as Lib from '../../src/lib/lib';

// import TreeCore from '../../src/core/tree';
// const Core = TreeCore;

// Run in legacy plugin mode
import '../../src/helpers/create-jquery-plugin.js';
import Tree from '../../src/jquery/tree/tree';

const $ = Lib.global.jQuery || Lib.global.$;

export const behaviorHandlers = {
	createComponent: {
		default (initData, rendered) {
			// Copied from original FuelUX3 example page
			const treeMarkup = '<div id="my-' + controlName + '"></div>';
			const treeSelector = '#my-' + controlName;
			$(initData.container).append(treeMarkup);
			$(treeSelector).on('initialized.fu.tree', rendered);

			const $tree = new Tree( $(treeSelector), initData );
			return $tree;
		}

		// plugin (initData, rendered) {
		// 	// Copied from original FuelUX3 example page
		// 	const treeMarkup = '<div id="my-' + controlName + '"></div>';
		// 	const treeSelector = '#my-' + controlName;
		// 	$(initData.container).append(treeMarkup);

		// 	$(treeSelector).on('initialized.fu.tree', rendered);
		// 	$(treeSelector).tree(initData);

		// 	return $(treeSelector);
		// }
	},

	getComponentElement: {
		default (component) {
			return component.elements.wrapper;
		}

		// plugin (jDomEl) {
		// 	return jDomEl;
		// }
	},

	destroyComponent: {
		default (component) {
			// component.destroy(); // <- This SHOULD BE implemented but isn't yet
			return this.getComponentElement(component).remove();
		}

		// plugin (jDomEl) {
		// 	jDomEl.tree('destroy');
		// }
	},

	getSelectedItems: {
		default (component) {
			return component.getSelectedItems();
		}

		// plugin (jDomEl) {
		// 	return jDomEl.tree('getSelectedItems');
		// }
	},

	selectItem: {
		default (component, item) {
			return component.selectItem(item);
		}

		// plugin (jDomEl, item) {
		// 	return jDomEl.tree('selectItem', item);
		// }
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
