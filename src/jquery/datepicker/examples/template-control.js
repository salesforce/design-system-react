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
	<div
		data-component-display-name="${'componentDisplayName'}"
		data-component-name="${'componentName'}"
		id="component-wrapper-${'componentName'}__${'componentName'}"
		class="component-wrapper component-wrapper-${'componentName'}"
	></div>
`;

module.exports = {
	template
};
