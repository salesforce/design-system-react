const template = `
	<div class="slds-box slds-box--x-small | slds-theme--shade | slds-m-bottom--medium">
		<h4 class="slds-text-heading--label">
			Neutral button with icon
		</h4>
		<div class="slds-button-group" role="group">
			<button type="button" id="button-jquery-set-icon" class="slds-button slds-button--neutral slds-button--small">Re-render neutral icon button view</button>
		</div>
	</div>
	<div class="slds-box slds-box--small | slds-theme--shade">
		<h4 class="slds-text-heading--label">
			Stateful button
		</h4>
		<div class="slds-button-group" role="group">
			<button type="button" id="button-stateful-jquery-select" class="slds-button slds-button--neutral slds-button--small">Select</button>
			<button type="button" id="button-stateful-jquery-deselect" class="slds-button slds-button--neutral slds-button--small">Deselect</button>
			<button type="button" id="button-stateful-jquery-disable" class="slds-button slds-button--neutral slds-button--small">Disable</button>
			<button type="button" id="button-stateful-jquery-enable" class="slds-button slds-button--neutral slds-button--small">Enable</button>
		</div>
		<div class="slds-button-group" role="group">
			<button type="button" id="button-stateful-jquery-destroy" class="slds-button slds-button--neutral slds-button--small">Destroy</button>
			<button type="button" id="button-stateful-jquery-recreate" class="slds-button slds-button--neutral slds-button--small">Re-create</button>
		</div>
	</div>
`;

module.exports = {
	template
};
