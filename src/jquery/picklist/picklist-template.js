export default String.raw`
<div class="slds-picklist" aria-expanded="true">
	<button class="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true">
		<span class="slds-truncate">Select an Option</span>
		<svg aria-hidden="true" class="slds-icon">
			<use xlink:href="/assets/design-system/icons/utility-sprite/svg/symbols.svg#down"></use>
		</svg>
	</button>
	<div class="slds-dropdown slds-dropdown--left slds-dropdown--menu slds-hide">
		<ul class="slds-dropdown__list" role="menu">
			<li class="slds-dropdown__item">
				<a href="#" role="menuitemradio">
					<p class="slds-truncate"></p>
				</a>
			</li>
		</ul>
	</div>
</div>
`;
