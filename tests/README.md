# Unit Testing

Design System React requires unit testing of (at minimum):

- component props
- JSX children
- event callbacks
- keyboard interactions
- mouse interactions
- DOM manipulation

All Pull Requests must contain unit tests which cover these items for the code being considered. Writing your unit tests before writing your code (Test Driven Development) is encouraged.

Pull requests should conform to our [ESLint style definitions](https://github.com/salesforce-ux/eslint-config-slds). However, due to the complexities of unit testing, disabling many of the ESLint rules is acceptable (see the sample code below for examples).

## External Libraries
- **[Mocha](http://mochajs.org/)** - Test framework ([getting started primer](http://mochajs.org/#getting-started))
- **[Chai](http://chaijs.com/) w/[Expect Syntax](http://chaijs.com/api/bdd/)** - Test assertion library
- **[Karma](https://karma-runner.github.io/1.0/index.html)** - Command line test runner --runs tests with `npm test`
- **[Sinon](http://sinonjs.org)** - Stub/mock generator for callbacks and human interactions
- **[Enzyme](http://airbnb.io/enzyme/)** - manipulate and traverse the DOM with syntax similar to jQuery
- **[Chai Enzyme](https://github.com/producthunt/chai-enzyme)** - Chai assertions and convenience functions which eliminate asynchronous render complexities
- **[Istanbul](https://github.com/gotwarlost/istanbul)** - Measures code coverage
- **[ESLint](http://eslint.org/)** - Promotes consistent coding styles

## Running Tests
- Run tests from terminal with `npm test`
- View tests in-browser. Webpack will reload your test when file changes.
	1. Start server from terminal with `npm start`
	1. Browse to [http://localhost:8001](http://localhost:8001)

## Test file
- Files ending in `.test.jsx` will be run by the Karma
- Use ECMAScript 6 syntax
- Tests must unmount and clean up the test fixture after each test or grouping of related tests
  - **Do not allow unrelated tests to "bleed" into each other.** The easiest way to determine this is from running the tests in browser.
- Split tests into multiple files when appropriate
- Store JSON formatted data for your tests/storybooks a corresponding `utilities/sample-data/[COMPONENT-NAME]` file

Here is a well-commented sample test file which you can copy/paste into a new file to get started:
```
/* Adds all of the Mocha (eg `it` and `should`) and sinon testing global 
 * variables to the global namespace for eslint purposes.
 */
/* eslint-env mocha */
/* global sinon */

// Additional modifiers to [eslint-config-slds](https://github.com/salesforce-ux/eslint-config-slds) for convenience
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */

// Import your external dependencies
import React, { PropTypes } from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

// Import your internal dependencies (for example):
import Tree from '../../components/tree';

/* Enzyme Helpers can mount and unmount React component instances to 
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this` 
 * context [full source here](tests/enzyme-helpers.js). 
 */
import { mountComponent, unmountComponent } from '../enzyme-helpers';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions: 
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

/* A re-usable demo component fixture outside of `describe` sections 
 * can accept props within each test and be unmounted after each tests. 
 * This wrapping component will be similar to your wrapping component 
 * you will create in the React Storybook for manual testing.
 */
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

/* All tests for component being tested should be wrapped in a root `describe`, 
 * which should be named after the component being tested.
 * When read aloud, the cumulative `describe` and `it` names should form a coherent 
 * sentence, eg "Date Picker default structure and css is present with expected 
 * attributes set". If you are having trouble constructing a cumulative short 
 * sentence, this may be an indicator that your test is poorly structured.
 * String provided as first parameter names the `describe` section. Limit to nouns
 * as much as possible/appropriate.`
 */
describe('Component Name here', () => {

		/* Below you will find some examples of minimum areas to be tested.
         * This should not be considered an exhaustive list. Please ensure 
         * thorough testing of your code. 
         */

		// BASIC STRUCTURE

    describe('default structure and css', () => {
        // Test DOM with minimal props set

        // String provided as first parameter names the `it` section.
        // Use short declarative sentences (sentence with "it").
        it('is present with expected attributes set', () => {});
    });

    describe('assistive technology', () => {
        /* Detect if presence of accessibility features such as ARIA 
         * roles and screen reader text is present in the DOM.
         * If your component has an ARIA role in application, and 
         * does not use `tab-index`, test that the correct keyboard
         * navigation is present.
         */
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
        /* Use exports from a corresponding `utilities/sample-data/[COMPONENT-NAME]` 
         * file to provide data to your Storybook Stories and tests in JSON format.
         */
    });


    // EVENTS

    describe('Mouse and keyboard interactions', () => {
        /* Test event callback functions using Simulate. For more information, view 
         * https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/simulate.md
         */

        describe('onClick', () => {
            const itemClicked = sinon.spy();

            beforeEach(mountComponent(
                <DemoComponent itemClicked={itemClicked} />
            ));

            afterEach(unmountComponent);

            it('calls event handler', function () {
                const item = this.wrapper.find('#example-tree-1').find('.slds-tree__item');
                // If applicable, use second parameter to pass the data object
                item.simulate('click', {});
                expect(itemClicked.callCount).to.equal(1);
                // If applicable, also test data object for correct contents.
            });
        });

    });
});
```
