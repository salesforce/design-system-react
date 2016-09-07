# Introduction to unit testing

Unit testing is a software development process in which the smallest testable parts of an application are individually and independently scrutinized for proper operation.

With a user interface library based in React, this typically means testing the component props, JSX children, event callbacks, keyboard interactions, mouse interactions, and DOM manipulation.

## External Libraries
- **Mocha** - A test framework. You can view the [Getting Started](http://mochajs.org/#getting-started) primer.
- **Chai** - A [test assertion library](http://chaijs.com/). Please use the [expect syntax](http://chaijs.com/api/bdd/).
- **Karma** - A command line test runner that can be run with `npm test`.
- **Sinon** - A [stub/mock generator](http://sinonjs.org). This is typically used for callbacks and human interactions with Design System React.
- **Enzyme** - A React specific library to [manipulate and traverse the DOM](http://airbnb.io/enzyme/). The syntax is similar to jQuery.
- **Chai Enzyme** - [Chai assertions and convenience functions](https://github.com/producthunt/chai-enzyme) for testing React Components with enzyme. This hooks test assertion into Enzyme's React lifecycle, so you don't have to know when the component asynchronously renders.
- **Istanbul** - A [test reporter](https://github.com/gotwarlost/istanbul) used primarily for code coverage when `npm test` is ran.

## Test file
- Test modules will only run if they end in `test.jsx`
- Tests should be written in ECMAScript 6 and example situations should be similar to the Storybook Stories presented when `npm start` is served.
- Tests should unmount and clean up the test fixture after each test or grouping or related tests. Do not allow unrelated tests to be "bleed" into each other.
- Feel free to use multiple test files if one file becomes cumbersome.

Adds all of the Mocha and sinon testing global variables to the global namespace.

```
/* eslint-env mocha */
/* global sinon */
```

Additional modifiers to [eslint-config-slds](https://github.com/salesforce-ux/eslint-config-slds), you may want. You will probably see more eslint comments than in the rest of the codebase.
```
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */
```

Import your external dependencies. Mocha functions such as `describe` and `it` will be in the global namespace:
```
import React, { PropTypes } from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
```

Import your internal dependencies (for example):
```
import Tree from '../../components/tree';
import Search from '../../components/forms/input/search';
```

You may find the following Enzyme Helpers functions helpful. They can mount and unmount your React component instance to the DOM and set `this.wrapper` and `this.dom` within Mocha's `this` context. You can view the [full source here](tests/enzyme-helpers.js).

```
import { mountComponent, unmountComponent } from '../enzyme-helpers';
```

Set Chai to use chaiEnzyme for [enzyme compatible assertions](https://github.com/producthunt/chai-enzyme).

```
chai.use(chaiEnzyme());
```

It may be helpful to have a re-usable demo component fixture outside any `describe` sections that can take props and be unmounted after every test. This would be similiar to demo components in [Storybook stories](/stories) and typically can just be copied over if you are not doing Test Driven Development. Mocha's `describe` descriptions are typically nouns, "Default Structure and CSS" and `it` asserts are typically sentences with a verb, "item calls itemClicked".

```
const DemoComponent = React.createClass({
	displayName: 'DemoComponent',
	propTypes: {},

	getDefaultProps () {
		return {};
	},

	getInitialState () {
		return {};
	},

	// event handlers

	render () {
		return (
			// JSX
		);
	}
});
```

Wrap in the component name and create Mocha sub-sections. This is not an exhaustive list:
```
describe('Component Name: ', () => {
	describe('Default Structure and CSS', () => {
		// What should be present in the DOM with minimal props set?
	});

	describe('Assistive Technology', () => {
		// Detect presence of accessibility features such as ARIA roles and screen reader text is present in the DOM. If your component has an ARIA role of application and does not use tab-index, test that the correct keyboard navigation is present
	});

	// PROPS AND CHILDREN

	describe('Optional Props', () => {
		// What should be present in the DOM when style and className are applied?
	});

	describe('Optional Children', () => {
		// What should be present when children are added?
	});

	// DATA PROPS

	describe('Data', () => {
		// If your control takes data, test if it is displayed correctly. If you would like store sample data in a JSON export to use in your Storybook Stories and with your tests, you can do so in `utilities/sample-data/[COMPONENT-NAME]`.
	});

	// EVENTS

	describe('Mouse and keyboard interactions', () => {
		// Test callback functions for `onClick`, `onKeyDown` and other events. Test the callback data object (that is the second parameter). To test mouse and keyboard interactions, use [Simulate from Enzyme](https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/simulate.md).

		describe('Item calls event handler', () => {
			const itemClicked = sinon.spy();

			beforeEach(mountComponent(
				<DemoComponent itemClicked={itemClicked} />
			));

			afterEach(unmountComponent);

			it('item calls event handler', function () {
				const item = this.wrapper.find('#example-tree-1').find('.slds-tree__item');
				item.simulate('click');
				expect(itemClicked.callCount).to.equal(1);
				// Please test the data object for correct contents, too.
			});
		});

	});
});

```