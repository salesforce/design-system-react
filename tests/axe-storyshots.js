import puppeteer from 'puppeteer';
import { logger } from '@storybook/node-logger';
import { constructUrl } from './url';

const noop = () => {};
const asyncNoop = async () => {};

const defaultConfig = {
	axeConfig: {},
	storybookUrl: 'http://localhost:8002',
	chromeExecutablePath: undefined,
	getGotoOptions: noop,
	customizePage: asyncNoop,
	getCustomBrowser: undefined,
	puppeteerLaunchOptions: {},
};

// eslint-disable-next-line import/prefer-default-export
export const axeStoryshots = (customConfig = {}) => {
	const {
		axeConfig,
		storybookUrl,
		chromeExecutablePath,
		getGotoOptions,
		customizePage,
		getCustomBrowser,
		puppeteerLaunchOptions,
	} = { ...defaultConfig, ...customConfig };

	let browser; // holds ref to browser. (ie. Chrome)
	let page; // Hold ref to the page

	const testFn = async ({ context }) => {
		const { kind, name } = context;
		const url = constructUrl(storybookUrl, kind, name);

		if (!browser || !page) {
			logger.error(
				`Error when using Puppeteer for test ${kind} - ${name} : It seems the headless browser is not running.`
			);

			throw new Error('no-headless-browser-running');
		}

		expect.assertions(1);

		try {
			await customizePage(page);
			await page.goto(url, getGotoOptions({ context, url }));
		} catch (e) {
			logger.error(
				`Error when connecting to ${url}, did you start or build the storybook first? A storybook instance should be running or a static version should be built when using aXe Storyhots.`,
				e
			);
			throw e;
		}

		await expect(page).toHaveNoViolations({
			config: axeConfig,
		});
	};

	testFn.afterAll = () => {
		if (getCustomBrowser && page) {
			return page.close();
		}

		return browser.close();
	};

	testFn.beforeAll = async () => {
		if (getCustomBrowser) {
			browser = await getCustomBrowser();
		} else {
			// add some options "no-sandbox" to make it work properly on some Linux systems as proposed here: https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-322851507
			browser = await puppeteer.launch({
				args: [
					'--no-sandbox ',
					'--disable-setuid-sandbox',
					'--disable-dev-shm-usage',
				],
				executablePath: chromeExecutablePath,
				...puppeteerLaunchOptions,
			});
		}

		page = await browser.newPage();
		// Recommended by Deque Labs
		// See https://github.com/dequelabs/axe-puppeteer#bypassing-content-security-policy
		await page.setBypassCSP(true);
	};

	return testFn;
};
