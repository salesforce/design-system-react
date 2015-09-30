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
import Tree from '../../src/jquery/tree/tree';

const $ = Lib.global.jQuery || Lib.global.$;

export const behaviorHandlers = {
	createComponent: {
		default (initData, rendered) {
			// Copied from original FuelUX3 example page
			const treeMarkup = '<div id="my-' + controlName + '"></div>';
			const treeSelector = '#my-' + controlName;
			$(initData.container).append(treeMarkup);
			$(treeSelector).on('initialized.fu.tree', function () {
				console.log('initialized!');
				console.log(arguments);
				rendered();
			});

			const $tree = new Tree( $(treeSelector), initData );
			return $tree;
		}
	},

	getComponentElement: {
		default (component) {
			return component.elements.wrapper;
		}
	},

	destroyComponent: {
		default (component) {
			// component.destroy(); // <- This SHOULD BE implemented but isn't yet
			this.getComponentElement(component).remove();
		}
	},

	getSelectedItems: { default: function () { /* TODO */ } },
	select: { default: function () { /* TODO */ } },
	deselect: { default: function () { /* TODO */ } },
	openFolder: { default: function () { /* TODO */ } },
	closeFolder: { default: function () { /* TODO */ } },
	toggleFolder: { default: function () { /* TODO */ } },
	onSelected: { default: function () { /* TODO */ } },
	onDeselected: { default: function () { /* TODO */ } },
	onOpened: { default: function () { /* TODO */ } },
	onClosed: { default: function () { /* TODO */ } },
	updateChildren: { default: function () { /* TODO */ } },
	showLoading: { default: function () { /* TODO */ } },
	hideLoading: { default: function () { /* TODO */ } },
	onChildrenLoaded: { default: function () { /* TODO */ } },
	closeAll: { default: function () { /* TODO */ } },
	onCloseAllComplete: { default: function () { /* TODO */ } },
	openAll: { default: function () { /* TODO */ } },
	onOpenAllComplete: { default: function () { /* TODO */ } },
	openVisible: { default: function () { /* TODO */ } },
	onOpenVisibleComplete: { default: function () { /* TODO */ } }
};
