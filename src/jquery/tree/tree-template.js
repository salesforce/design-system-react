export default String.raw`
<div class="slds-tree_container" role="application">
	<h4 class="slds-text-heading--label">Tree Example</h4>
	<ul class="slds-tree" role="tree" aria-labelledby="treeheading-jquery" aria-activedescendant="">
		<li role="treeitem" aria-level="1" aria-expanded="true">
			<div class="slds-tree__item" >
				<x-branch-button></x-branch-button>
				<a id="tree0-node1__label" tabIndex="-1" role="presentation" class="slds-truncate | slds-size--1-of-1">Tree Branch</a>
			</div>
			<ul class="slds-is-expanded" role="group" aria-labelledby="tree0-node1__label">
				<li role="treeitem" aria-level="2">
					<div class="slds-tree__item">
						<div class="slds-spinner slds-spinner--small" role="alert">
							<img src="/assets/design-system/images/spinners/slds_spinner.gif" alt="Loading..." />
						</div>
					</div>
				</li>
			</ul>
		</li>
		<li role="treeitem" aria-level="1">
			<div class="slds-tree__item">
				<a tabIndex="-1" role="presentation" class="slds-truncate | slds-size--1-of-1">Tree Item</a>
			</div>
		</li>
	</ul>
</div>
`;
