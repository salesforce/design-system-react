/* eslint-env jest */
import { renderDOM, renderMarkup, getStorybookURL } from '../../../tests/snapshot-helpers';

import { BUTTON } from '../../../utilities/constants';

import ButtonBase from '../__examples__/base-neutral';
import BrandDisabledDestructiveInverse from '../__examples__/brand-disabled-destructive-inverse';
import ButtonIcons from '../__examples__/button-icons';

const { Chrome } = require('navalia');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Button Visual Snapshot', () => {
	let chrome = null;
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
	const customConfig = { threshold: 1 };

	beforeAll(() => {
		chrome = new Chrome();
	});

	afterAll(() => {
		chrome.done();
	});

	it(`${BUTTON} Base should still render the same`, () => {
		expect(renderDOM(ButtonBase)).toMatchSnapshot();
		expect(renderMarkup(ButtonBase)).toMatchSnapshot();
	});

	it(`${BUTTON} Brand Disabled Destructive Inverse should still render the same`, () => {
		expect(renderDOM(BrandDisabledDestructiveInverse)).toMatchSnapshot();
		expect(renderMarkup(BrandDisabledDestructiveInverse)).toMatchSnapshot();
	});

	it(`${BUTTON} Icons should still render the same`, () => {
		expect(renderDOM(ButtonIcons)).toMatchSnapshot();
		expect(renderMarkup(ButtonIcons)).toMatchSnapshot();
	});

	it(`${BUTTON} Base should still look the same`, () =>
		chrome.goto(getStorybookURL(BUTTON, 'Base'))
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
	);

	it(`${BUTTON} Neutral should still look the same`, () =>
		chrome.goto(getStorybookURL(BUTTON, 'Neutral'))
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
	);

	it(`${BUTTON} Neutral with id should still look the same`, () =>
		chrome.goto(getStorybookURL(BUTTON, 'Neutral with id'))
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
	);

	it(`${BUTTON} Neutral Icon should still look the same`, () =>
		chrome.goto(getStorybookURL(BUTTON, 'Neutral Icon'))
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
	);

	it(`${BUTTON} Disabled should still look the same`, () =>
		chrome.goto(getStorybookURL(BUTTON, 'Disabled'))
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
	);

	it(`${BUTTON} Icon large should still look the same`, () =>
		chrome.goto(getStorybookURL(BUTTON, 'Icon large'))
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
	);

	it(`${BUTTON} Icon with external path should still look the same`, () =>
		chrome.goto(getStorybookURL(BUTTON, 'Icon with external path'))
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
	);

	it(`${BUTTON} Icon Container Small should still look the same`, () =>
		chrome.goto(getStorybookURL(BUTTON, 'Icon Container Small'))
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
	);

	it(`${BUTTON} Dropdown Icon inverse should still look the same`, () =>
		chrome.goto(getStorybookURL(BUTTON, 'Dropdown Icon inverse'))
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
	);

	it(`${BUTTON} Small Icon Hint inverse should still look the same`, () =>
		chrome.goto(getStorybookURL(BUTTON, 'Small Icon Hint inverse'))
			.then(() => chrome.screenshot())
			.then((image) => expect(image).toMatchImageSnapshot({
				customDiffConfig: customConfig
			}))
	);
});
