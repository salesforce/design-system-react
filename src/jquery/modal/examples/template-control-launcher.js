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
	<div class="slds-m-vertical--large">
		<button type="button" id="${'componentName'}-jquery-control-launch" class="slds-button slds-button--neutral slds-button--x-small">Show ${'componentDisplayName'}</button>
	</div>
`;

module.exports = {
	template
};
