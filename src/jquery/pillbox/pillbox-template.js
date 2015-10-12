export default String.raw`
<div class="pillbox slds-pillbox">
  <ul class="slds-pill-group">
    <li class="slds-pill">
      <span href="#" class="slds-pill__label">Item Title</span>
      <button class="slds-button slds-button--icon-bare">
        <svg aria-hidden="true" class="slds-button__icon">
          <use xlink:href="/examples/symbols.svg#close"></use>
        </svg>
        <span class="slds-assistive-text">Remove</span>
      </button>
    </li>
    <li class="slds-pill-input-wrap">
      <input type="text" class="slds-pill-add-item" placeholder="add item">
    </li>
  </ul>
</div>
`;
