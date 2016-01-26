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
		<button type="button" id="button-group-jquery-button-select" class="slds-button slds-button--neutral slds-button--small">Toggle 1</button>
		<button type="button" id="button-group-jquery-button-deselect" class="slds-button slds-button--neutral slds-button--small">Toggle 2</button>
	</div>
`;

module.exports = {
	template
};
