export default String.raw`
	<div>
	  <div aria-hidden="false" role="dialog" class="slds-modal"> <!--slds-fade-in-open-->
	    <div class="slds-modal__container">
	      <div class="slds-modal__header">
	        <h2 class="slds-text-heading--medium">Modal Header</h2>
	        <button class="slds-button slds-button--icon-inverse slds-modal__close">
	          <svg aria-hidden="true" class="slds-button__icon slds-button__icon--large">
	            <use xlink:href="/examples/symbols.svg#close"></use>
	          </svg>
	          <span class="slds-assistive-text">Close</span>
	        </button>
	      </div>
	      <div class="slds-modal__content">
	      </div>
	      <div class="slds-modal__footer">
	        <button class="slds-button slds-button--neutral">Cancel</button>
	        <button class="slds-button slds-button--neutral slds-button--brand">Save</button>
	      </div>
	    </div>
	  </div>
	  <div class="slds-modal-backdrop"></div> <!--slds-modal-backdrop--open-->
	</div>
`;
