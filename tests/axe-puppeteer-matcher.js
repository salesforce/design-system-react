/*
 * Jest expect.extend
 *
 * Please add the following to your Jest config.
 * 
 * setupFilesAfterEnv: ["<rootDir>/tests/axe-puppeteer.js"]
 * 
 * // Deprecated Jest < 24
 * "setupTestFrameworkScriptFile": "<rootDir>/tests/axe-puppeteer.js",
 * 
 */
import AxePuppeteer from 'axe-puppeteer';

function outputViolations(violations) {
	return violations
		.map(({ help, helpUrl, id, nodes }) => {
			let output =
				`RULE: ${id}: ${help}\n` +
				'EXPECTED no violations in the following DOM nodes:\n';

			nodes.forEach((node) => {
				if (node.any.length !== 0) {
					output += `  ${node.target}\n`;
					output +=
						'    This is a list of checks that, if none pass, will generate a violation. Fix ANY of the following to pass:\n';
					node.any.forEach((check) => {
						output += `    - ${check.message}\n`;
					});
				}

				if (node.all.length !== 0) {
					output += `  ${node.target}\n`;
					output +=
						'    This is a list of checks that, if any fail, will generate a violation. Fix ALL of the following to pass:\n';
					node.all.forEach((check) => {
						output += `      - ${check.message}.\n`;
					});
				}

				if (node.none.length) {
					output += `  ${node.target}\n`;
					output +=
						'    This is a list of checks that, if any pass, will generate a violation. Fix ALL of the following to pass:\n';
					node.none.forEach((check) => {
						output += `      - ${check.message}.\n`;
					});
				}
			});

			output += `Need more help? Please visit: ${helpUrl}\n`;
			return output;
		})
		.join('\n');
}

async function toHaveNoViolations(page, { config = {} } = {}) {
	const axe = new AxePuppeteer(page);
	axe.include('#root').configure(config);
	const { violations } = await axe.analyze();
	const pass = violations.length === 0;
	const message = pass
		? () => {}
		: () =>
				`${this.utils.matcherHint('.toHaveNoViolations')}\n\n` +
				`Expected story to pass aXe accessibility tests.\n` +
				`The following violations were found:\n` +
				`${outputViolations(violations)}`;

	return {
		message,
		pass,
	};
}

expect.extend({
	toHaveNoViolations,
});
