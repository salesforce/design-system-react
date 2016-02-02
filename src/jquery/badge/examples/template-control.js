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
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-base"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-default"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-shade"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-inverse"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-alt-inverse"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-info"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-success"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
		</div>
		<div class="slds-col | slds-m-bottom--small">
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-warning"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-error"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-offline"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
			<span
				data-component-display-name="${'componentDisplayName'}"
				data-component-name="${'componentName'}"
				id="component-wrapper-${'componentName'}__${'componentName'}-shade-alert-texture"
				class="component-wrapper component-wrapper-${'componentName'}"
			></span>
		</div>
	</div>
`;

module.exports = {
	template
};
