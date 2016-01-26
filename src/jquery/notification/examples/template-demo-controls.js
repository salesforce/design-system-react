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
			id="${'componentName'}-jquery-hide"
			class="slds-button slds-button--neutral slds-button--small"
		>Hide</button>
		<button
			type="button"
			data-component-display-name="${'componentDisplayName'}"
			data-component-name="${'componentName'}"
			id="${'componentName'}-jquery-show"
			class="slds-button slds-button--neutral slds-button--small"
		>Show</button>
	</div>
`;

module.exports = {
	template
};
