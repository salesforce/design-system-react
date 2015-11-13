export default String.raw`
  <div>
    <div aria-hidden="false" role="dialog" class="slds-modal"> <!--slds-fade-in-open-->
      <div class="slds-modal__container">
        <div class="slds-modal__header">
          <h2></h2>
            <x-close-button></x-close-button>
        </div>
        <div class="slds-modal__content">

        </div>
        <div class="slds-modal__footer">
          <x-secondary-button></x-secondary-button>
          <x-primary-button></x-primary-button>
        </div>
      </div>
    </div>
    <div class="slds-modal-backdrop"></div> <!--slds-modal-backdrop--open-->
  </div>
`;
