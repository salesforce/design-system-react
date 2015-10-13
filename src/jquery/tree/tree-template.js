export default String.raw`
<ul class="tree slds-tree" role="tree" aria-labelledby="treeheading">
	<li class="slds-tree__branch" role="treeitem" aria-expanded="true">
		<div class="slds-tree__branch--header slds-tree__item">
			<button class="slds-button slds-button--icon-bare slds-m-right--x-small">
				<svg aria-hidden="true" class="slds-button__icon slds-button__icon--small">
					<use xlink:href="/examples/symbols.svg#chevronright"></use>
				</svg>
				<span class="slds-assistive-text">Toggle</span>
			</button>
			<div class="slds-tree__branch--name" role="presentation">Tree Branch</div>
		</div>
		<ul class="slds-tree__group slds-nested" role="group" aria-labelledby="tree0-node0-link">
			<li className="slds-tree__loader" role="alert">Loading...</li>
		</ul>
	</li>
	<li class="slds-tree__item" data-template="treeitem" role="treeitem">
		<div role="presentation" class="slds-truncate">Tree Item</div>
	</li>
</ul>
`;
