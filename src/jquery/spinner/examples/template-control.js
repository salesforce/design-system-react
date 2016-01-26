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
		<div class="slds-col slds-theme--default">
			<div class="slds-float--left">
				<div
					data-component-display-name="${'componentDisplayName'}"
					data-component-name="${'componentName'}"
					id="component-wrapper-${'componentName'}__${'componentName'}__0"
					class="component-wrapper component-wrapper-${'componentName'}"
				></div>
			</div>
			<div class="slds-float--left">
				<div
					data-component-display-name="${'componentDisplayName'}"
					data-component-name="${'componentName'}"
					id="component-wrapper-${'componentName'}__${'componentName'}__1"
					class="component-wrapper component-wrapper-${'componentName'}"
				></div>
			</div>
			<div class="slds-float--left">
				<div
					data-component-display-name="${'componentDisplayName'}"
					data-component-name="${'componentName'}"
					id="component-wrapper-${'componentName'}__${'componentName'}__2"
					class="component-wrapper component-wrapper-${'componentName'}"
				></div>
			</div>
		</div>
		<div class="slds-col slds-theme--shade">
			<div class="slds-float--left">
				<div
					data-component-display-name="${'componentDisplayName'}"
					data-component-name="${'componentName'}"
					id="component-wrapper-${'componentName'}__${'componentName'}__3"
					class="component-wrapper component-wrapper-${'componentName'}"
				></div>
			</div>
			<div class="slds-float--left">
				<div
					data-component-display-name="${'componentDisplayName'}"
					data-component-name="${'componentName'}"
					id="component-wrapper-${'componentName'}__${'componentName'}__4"
					class="component-wrapper component-wrapper-${'componentName'}"
				></div>
			</div>
			<div class="slds-float--left">
				<div
					data-component-display-name="${'componentDisplayName'}"
					data-component-name="${'componentName'}"
					id="component-wrapper-${'componentName'}__${'componentName'}__5"
					class="component-wrapper component-wrapper-${'componentName'}"
					class="spinner1"
				></div>
			</div>
		</div>
		<div class="slds-col slds-theme--inverse">
			<div class="slds-float--left">
				<div
					data-component-display-name="${'componentDisplayName'}"
					data-component-name="${'componentName'}"
					id="component-wrapper-${'componentName'}__${'componentName'}__6"
					class="component-wrapper component-wrapper-${'componentName'}"
				></div>
			</div>
			<div class="slds-float--left">
				<div
					data-component-display-name="${'componentDisplayName'}"
					data-component-name="${'componentName'}"
					id="component-wrapper-${'componentName'}__${'componentName'}__7"
					class="component-wrapper component-wrapper-${'componentName'}"
				></div>
			</div>
			<div class="slds-float--left">
				<div
					data-component-display-name="${'componentDisplayName'}"
					data-component-name="${'componentName'}"
					id="component-wrapper-${'componentName'}__${'componentName'}__8"
					class="component-wrapper component-wrapper-${'componentName'}"
					class="spinner1"
				></div>
			</div>
		</div>
	</div>
`;

module.exports = {
	template
};
