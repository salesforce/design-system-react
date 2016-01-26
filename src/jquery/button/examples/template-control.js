function formatIt (strings, ...keys) {
	return function (...values) {
		const dict = values[values.length - 1] || {};
		const result = [strings[0]];
		keys.forEach(function (key, i) {
			const value = Number.isInteger(key) ? values[key] : dict[key];
			result.push(value, strings[i + 1]);
		});
		return result.join('');
	};
}


const template = formatIt`
	<div class="slds-grid slds-grid--vertical">
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-base" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-base-disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-neutral" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-neutral-disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-neutral-small" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-neutral-icon-left" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-neutral-icon-right" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-brand" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-brand-disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-brand-small" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-destructive" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-destructive-disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-destructive-small" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<div class="slds-box slds-box--x-small | slds-theme--inverse">
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-inverse" class="component-wrapper component-wrapper-${'componentName'}"></span>
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-inverse-disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-inverse-small" class="component-wrapper component-wrapper-${'componentName'}"></span>
			</div>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-stateful" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<div id="component-wrapper-${'componentName'}__${'componentName'}-stateful-inverse | slds-box slds-box--x-small | slds-theme--inverse"></div>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-bare-x-small" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-bare-small" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-bare" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-bare-large" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-bare-x-small--disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-bare-small--disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-bare--disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-bare-large--disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-container" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-container-disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-border" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-border-disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<div class="slds-box slds-box--x-small | slds-theme--success">
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-border-filled" class="component-wrapper component-wrapper-${'componentName'}"></span>
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-border-filled-disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
			</div>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-more" class="component-wrapper component-wrapper-${'componentName'}"></span>
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-more-disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-stateful" class="component-wrapper component-wrapper-${'componentName'}"></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<div class="slds-box slds-box--x-small | slds-theme--inverse">
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-inverse" class="component-wrapper component-wrapper-${'componentName'}"></span>
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-inverse-disabled" class="component-wrapper component-wrapper-${'componentName'}"></span>
			</div>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<div id="component-wrapper-${'componentName'}__${'componentName'}-icon-hint | slds-box slds-box--x-small | slds-hint-parent">
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-bare-hint" class="component-wrapper component-wrapper-${'componentName'}"></span>
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-border-hint" class="component-wrapper component-wrapper-${'componentName'}"></span>
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-border-filled-hint" class="component-wrapper component-wrapper-${'componentName'}"></span>
				<span data-component-display-name="${'componentDisplayName'}" data-component-name="${'componentName'}" id="component-wrapper-${'componentName'}__${'componentName'}-icon-container-hint" class="component-wrapper component-wrapper-${'componentName'}"></span>
			</div>
		</div>
	</div>
`;

module.exports = {
	template
};
