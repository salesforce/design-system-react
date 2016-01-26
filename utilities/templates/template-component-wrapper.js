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
	<div class="slds-col | slds-m-top--large | component-wrapper" id="${'controlName'}">
		<!-- ${'controlName'} -->
		<div class="slds-grid slds-grid--vertical | component">
			<div class="slds-col | header">
				<div class="slds-section-title | slds-m-top--medium">
					<div class="slds-grid">
						<h2 class="slds-col | slds-has-flexi-truncate | slds-text-heading--medium">
							<span>${'controlDisplayName'}</span>
							<span class="slds-badge | slds-theme--shade">alpha: done</span>
						</h2>
						<a class="slds-col | slds-no-flex | slds-align-middle | slds-text-body--small" href="/docs/src/jquery/${'controlName'}/${'controlName'}.html">Docs</a>
					</div>
				</div>
			</div>
			<div class="slds-col | body">
				<div class="slds-grid | slds-wrap">
					<div class="slds-col | slds-size--1-of-1 slds-medium-size--1-of-1 slds-large-size--1-of-2 | example-type example-type--react">
						<div class="slds-grid slds-grid--vertical | example-wrapper">
							<div class="slds-col | example-type-heading-wrapper | facades-demo-hide">
								<span class="slds-text-heading--label">React</span>
							</div>
							<div id="${'controlName'}-react-control" class="slds-col | example"></div>
							<div id="${'controlName'}-react-demo-controls" class="slds-col | demo-controls"></div>
						</div>
					</div>
					<div class="slds-col | slds-size--1-of-1 slds-medium-size--1-of-1 slds-large-size--1-of-2 | example-type example-type--jquery">
						<div class="slds-grid slds-grid--vertical | example-wrapper">
							<div class="slds-col | example-type-heading-wrapper | facades-demo-hide">
								<span class="slds-text-heading--label">jQuery</span>
							</div>
							<div id="${'controlName'}-jquery-control" class="slds-col | example"></div>
							<div id="${'controlName'}-jquery-demo-controls" class="slds-col | demo-controls"></div>
							<div class="slds-col | facades-demo-code-showcase">
								<aside class="slds-box | slds-theme--shade">
									<div class="slds-section-title">
										<div class="slds-grid">
											<h4 id="${'controlName'}-example-code" class="slds-col | slds-has-flexi-truncate | slds-text-heading--label">
												Example Code
											</h4>
										</div>
									</div>
									<pre style="max-height: 400px;" class="language-jsx"><code>{{ ${'controlName'} }}</code></pre>
								</aside>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
`;

module.exports = {
	template
};


