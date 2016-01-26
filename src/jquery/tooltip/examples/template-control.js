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
	<button
		type="button"
		data-component-display-name="${'componentDisplayName'}"
		data-component-name="${'componentName'}"
		id="component-wrapper-${'componentName'}__${'componentName'}__0"
		class="component-wrapper component-wrapper-${'componentName'} | slds-button slds-button--neutral slds-button--x-small"
	>Toggle on hover </button>
	<button
		type="button"
		data-component-display-name="${'componentDisplayName'}"
		data-component-name="${'componentName'}"
		id="component-wrapper-${'componentName'}__${'componentName'}__1"
		class="component-wrapper component-wrapper-${'componentName'} | slds-button slds-button--neutral slds-button--x-small"
	>Toggle on click</button>
	<button
		type="button"
		data-component-display-name="${'componentDisplayName'}"
		data-component-name="${'componentName'}"
		id="component-wrapper-${'componentName'}__${'componentName'}__2"
		class="component-wrapper component-wrapper-${'componentName'} | slds-button slds-button--neutral slds-button--x-small"
	>Toggle on focus</button>
`;

module.exports = {
	template
};
