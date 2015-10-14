export default String.raw`
<div class="slds-form-element">
  <div aria-expanded="true" class="slds-picklist">
    <button class="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true">
      <span class="slds-truncate">Select an Option</span>
      <svg aria-hidden="true" class="slds-icon">
        <use xlink:href="/examples/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
      </svg>
    </button>
    <div class="slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu slds-hide">
      <ul class="slds-dropdown__list" role="menu">
		<li href="#" class="slds-dropdown__item slds-has-icon--left"><a href="#" class="slds-truncate" role="menuitemradio"></a></li>
      </ul>
    </div>
	<input class="slds-hide" readonly aria-hidden="true" type="text"></input>
  </div>
</div>
`;
