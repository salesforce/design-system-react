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
	<div class="slds-button-group" role="group">
		<button
			type="button"
			data-component-display-name="${'componentDisplayName'}"
			data-component-name="${'componentName'}"
			id="${'componentName'}-jquery-check"
			class="slds-button slds-button--neutral slds-button--small"
		>Check</button>
		<button
			type="button"
			data-component-display-name="${'componentDisplayName'}"
			data-component-name="${'componentName'}"
			id="${'componentName'}-jquery-uncheck"
			class="slds-button slds-button--neutral slds-button--small"
		>Uncheck</button>
		<button
			type="button"
			data-component-display-name="${'componentDisplayName'}"
			data-component-name="${'componentName'}"
			id="${'componentName'}-jquery-disable"
			class="slds-button slds-button--neutral slds-button--small"
		>Disable</button>
		<button
			type="button"
			data-component-display-name="${'componentDisplayName'}"
			data-component-name="${'componentName'}"
			id="${'componentName'}-jquery-enable"
			class="slds-button slds-button--neutral slds-button--small"
		>Enable</button>
	</div>
`;

module.exports = {
	template
};
