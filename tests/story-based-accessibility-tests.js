/*
 * STORY-BASED ACCESSIBILITY TESTING
 *
 * This uses StoryShots to iterate over stories created in Storybook to
 * automatically create aXe tests.
 *
 * For more information, please visit:
 * https://github.com/storybooks/storybook/tree/master/addons/storyshots
 */

// Ran in Jest jsDOM environment

import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import initStoryshots, { imageSnapshot } from '@storybook/addon-storyshots';

// Add aXe to Jest expect
expect.extend(toHaveNoViolations);
// Make compatible with React 16
configure({ adapter: new Adapter() });

// Mock canvas for JSDOM tests
window.HTMLCanvasElement.prototype.getContext = () => ({});
// Mock popperJS to prevent it from running in jsDOM
jest.mock('popper.js', () => {
	const PopperJS = jest.requireActual('popper.js');
	return class {
		static placements = PopperJS.placements;

		constructor() {
			return {
				destroy: () => {},
				scheduleUpdate: () => {},
			};
		}
	};
});

describe('aXe Testing', function aXeFunction() {
	initStoryshots({
		configPath: '.storybook-based-tests',
		suite: 'aXe storyshots',
		test: async ({ story, context }) => {
			const component = story.render(context);
			const wrapper = mount(component);
			expect(await axe(wrapper.html())).toHaveNoViolations();
		},
	});
});
