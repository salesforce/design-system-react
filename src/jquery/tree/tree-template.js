export default String.raw`
<ul class="tree" role="tree">
	<li class="tree-branch" data-template="treebranch" role="treeitem" aria-expanded="false">
		<div class="tree-branch-header">
			<button type="button" class="glyphicon icon-caret glyphicon-play"><span class="sr-only">Open</span></button>
			<button type="button" class="tree-branch-name">
				<span class="glyphicon icon-caret glyphicon-play"></span>
				<span class="glyphicon icon-folder glyphicon-folder-close"></span>
				<span class="tree-label"></span>
			</button>
		</div>
		<ul class="tree-branch-children hidden" role="group"></ul>
	</li>
	<li class="tree-item" data-template="treeitem" role="treeitem">
		<button type="button" class="tree-item-name">
			<span class="glyphicon icon-item fueluxicon-bullet"></span>
			<span class="tree-label"></span>
		</button>
	</li>
	<div class="tree-loader" role="alert"></div>
</ul>
`;
