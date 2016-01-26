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
	<fieldset class="slds-form-element">
		<legend
			data-component-display-name="${'componentDisplayName'}"
			data-component-name="${'componentName'}"
			class="slds-form-element__label slds-form-element__label--top"
		></legend>
		<div
			data-component-display-name="${'componentDisplayName'}"
			data-component-name="${'componentName'}"
			id="component-wrapper-${'componentName'}__${'componentName'}-checked"
			class="slds-form-element__control"
		></div>
		<div
			data-component-display-name="${'componentDisplayName'}"
			data-component-name="${'componentName'}"
			id="component-wrapper-${'componentName'}__${'componentName'}-unchecked"
			class="slds-form-element__control"
		></div>
	</fieldset>
`;

module.exports = {
	template
};
