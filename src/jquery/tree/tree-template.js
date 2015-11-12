export default String.raw`
<div class="slds-tree-container" role="application">
	<ul class="slds-tree" role="tree">
		<li class="slds-tree__branch" role="treeitem" aria-expanded="true">
			<div class="slds-tree__branch--header slds-tree__item">
				<x-button></x-button>
				<div class="slds-tree__branch--name" role="presentation">Tree Branch</div>
			</div>
			<ul class="slds-tree__group slds-nested" role="group" aria-labelledby="tree0-node0-link">
				<li className="slds-tree__loader" role="alert"></li>
			</ul>
		</li>
		<li class="slds-tree__item" data-template="treeitem" role="treeitem">
			<div role="presentation" class="slds-tree__item-label | slds-truncate">Tree Item</div>
		</li>
	</ul>
</div>
`;
