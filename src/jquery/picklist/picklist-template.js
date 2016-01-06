export default String.raw`
<div class="slds-picklist" aria-expanded="true">
	<x-dropdown-button></x-dropdown-button>
	<div class="slds-dropdown slds-dropdown--left slds-dropdown--menu slds-hide">
		<ul class="slds-dropdown__list" role="menu">
			<li class="slds-dropdown__header">
				<span class="slds-text-heading--label"></span>
			</li>
			<li class="slds-dropdown__divider"></li>
			<li class="slds-dropdown__item">
				<a href="javascript:void(0)" role="menuitemradio">
					<p class="slds-truncate"></p>
				</a>
			</li>
		</ul>
	</div>
</div>
`;
