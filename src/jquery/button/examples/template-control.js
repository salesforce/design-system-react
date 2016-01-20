const template = `
	<div class="slds-grid slds-grid--vertical">
		<div class="slds-col row">
			<span class="button-base"></span>
			<span class="button-base-disabled"></span>
		</div>
		<div class="slds-col row">
			<span class="button-neutral"></span>
			<span class="button-neutral-disabled"></span>
			<span class="button-neutral-small"></span>
		</div>
		<div class="slds-col row">
			<span class="button-neutral-icon-left"></span>
			<span class="button-neutral-icon-right"></span>
		</div>
		<div class="slds-col row">
			<span class="button-brand"></span>
			<span class="button-brand-disabled"></span>
			<span class="button-brand-small"></span>
		</div>
		<div class="slds-col row">
			<span class="button-destructive"></span>
			<span class="button-destructive-disabled"></span>
			<span class="button-destructive-small"></span>
		</div>
		<div class="slds-col row">
			<div class="slds-box slds-box--x-small | slds-theme--inverse">
				<span class="button-inverse"></span>
				<span class="button-inverse-disabled"></span>
				<span class="button-inverse-small"></span>
			</div>
		</div>
		<div class="slds-col row">
			<span class="button-stateful"></span>
		</div>
		<div class="slds-col row">
			<div class="button-stateful-inverse | slds-box slds-box--x-small | slds-theme--inverse"></div>
		</div>
		<div class="slds-col row">
			<span class="button-icon-bare-x-small"></span>
			<span class="button-icon-bare-small"></span>
			<span class="button-icon-bare"></span>
			<span class="button-icon-bare-large"></span>
		</div>
		<div class="slds-col row">
			<span class="button-icon-bare-x-small--disabled"></span>
			<span class="button-icon-bare-small--disabled"></span>
			<span class="button-icon-bare--disabled"></span>
			<span class="button-icon-bare-large--disabled"></span>
		</div>
		<div class="slds-col row">
			<span class="button-icon-container"></span>
			<span class="button-icon-container-disabled"></span>
		</div>
		<div class="slds-col row">
			<span class="button-icon-border"></span>
			<span class="button-icon-border-disabled"></span>
		</div>
		<div class="slds-col row">
			<div class="slds-box slds-box--x-small | slds-theme--success">
				<span class="button-icon-border-filled"></span>
				<span class="button-icon-border-filled-disabled"></span>
			</div>
		</div>
		<div class="slds-col row">
			<span class="button-icon-more"></span>
			<span class="button-icon-more-disabled"></span>
		</div>
		<div class="slds-col row">
			<span class="button-icon-stateful"></span>
		</div>
		<div class="slds-col row">
			<div class="slds-box slds-box--x-small | slds-theme--inverse">
				<span class="button-icon-inverse"></span>
				<span class="button-icon-inverse-disabled"></span>
			</div>
		</div>
		<div class="slds-col row">
			<div class="button-icon-hint | slds-box slds-box--x-small | slds-hint-parent">
				<span class="button-icon-bare-hint"></span>
				<span class="button-icon-border-hint"></span>
				<span class="button-icon-border-filled-hint"></span>
				<span class="button-icon-container-hint"></span>
			</div>
		</div>
	</div>
`;

module.exports = {
	template
};
