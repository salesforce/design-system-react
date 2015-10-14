export default String.raw`
<div class="slds-combobox slds-form-element">
  <div aria-expanded="true" class="slds-picklist">
    <button class="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true" style="padding-left:0">
      <div class="slds-form-element__control">
        <input type="text" class="slds-input" style="border:none;border-right:1px solid #d8dde6;border-radius:.25rem 0 0 .25rem" />
      </div>
      <svg aria-hidden="true" class="slds-icon" style="right:.7rem">
        <use xlink:href="/examples/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
      </svg>
    </button>
    <div class="slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu slds-hide">
      <ul class="slds-dropdown__list" role="menu">
		<li href="#" class="slds-dropdown__item slds-has-icon--left"><a href="#" class="slds-truncate" role="menuitemradio"></a></li>
      </ul>
    </div>
  </div>
</div>
`;
