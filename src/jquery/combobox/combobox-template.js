export default String.raw`
<div class="slds-combobox slds-picklist" aria-expanded="true">
	<button class="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true" style="padding-left:0">
		<div class="slds-form-element__control">
			<input type="text" class="slds-input" style="border:none;border-right:1px solid #d8dde6;border-radius:.25rem 0 0 .25rem" />
		</div>
		<svg aria-hidden="true" class="slds-icon" style="right:.7rem">
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
