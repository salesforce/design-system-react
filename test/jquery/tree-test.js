// TODO: Fill in this file with API-specific tests here

export const behaviorHandlers = {
	createComponent: {
		default: function (initData) {
			// TODO: Really call control, these are just to test that the behaviors are working
			const $ = require('jquery');
			// Copied from original FuelUX3 example page
			const tree = $('<ul class="tree" role="tree"><li class="tree-branch hide" data-template="treebranch" role="treeitem" aria-expanded="false"><div class="tree-branch-header"><button type="button" class="tree-branch-name"><span class="glyphicon icon-caret glyphicon-play"></span><span class="glyphicon icon-folder glyphicon-folder-close"></span><span class="tree-label"></span></button></div><ul class="tree-branch-children" role="group"></ul><div class="tree-loader hidden" role="alert">Loading...</div></li><li class="tree-item hide" data-template="treeitem" role="treeitem"><button type="button" class="tree-item-name"><span class="glyphicon icon-item fueluxicon-bullet"></span><span class="tree-label"></span></button></li><li class="tree-item" data-template="treeitem" role="treeitem"><button type="button" class="tree-item-name"><span class="glyphicon icon-item fueluxicon-bullet"></span><span class="tree-label">Item 1</span></button></li><li class="tree-branch tree-open" data-template="treebranch" role="treeitem" aria-expanded="true"><div class="tree-branch-header"><button type="button" class="tree-branch-name"><span class="glyphicon icon-caret glyphicon-play"></span><span class="glyphicon icon-folder glyphicon-folder-open"></span><span class="tree-label">Folder 1</span></button></div><ul class="tree-branch-children" role="group"><li class="tree-item" data-template="treeitem" role="treeitem"><button type="button" class="tree-item-name"><span class="glyphicon icon-item fueluxicon-bullet custom-item-icon-class"></span><span class="tree-label">Item 2</span></button></li><li class="tree-branch tree-open" data-template="treebranch" role="treeitem" aria-expanded="true" id="folder1"><div class="tree-branch-header"><button type="button" class="tree-branch-name"><span class="glyphicon icon-caret glyphicon-play"></span><span class="glyphicon icon-folder glyphicon-folder-open custom-folder-icon-class"></span><span class="tree-label" id="folder1-label">Folder 2</span></button></div><ul class="tree-branch-children" role="group"></ul><div class="tree-loader hidden" role="alert">Loading...</div></li></ul><div class="tree-loader hidden" role="alert">Loading...</div></li></ul>');
			$(initData.container).append(tree);
			return tree;
		}
	},

	getComponentElement: {
		default: function (component) {
			return component[0];
		}
	},

	destroyComponent: {
		default: function (component) {
			// TODO: Call control, these are just to test that the behaviors are working
			component.remove();
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
