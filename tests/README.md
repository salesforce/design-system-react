# Unit testing

Thank you for helping us make this library more robust and stable.

* Tests reduce bugs in new features and existing features
* Tests are good documentation
* Tests reduce the cost of change and refactoring
* Tests improve code design

## Overview

Testing is done using Mocha, Jest, and Storybook. Roughly speaking: Jest tests DOM structure and visual regression with images, Mocha tests user interaction and events, and Storybook allows you to visually inspect and interact with a component.

### Running tests

* Run lint, Karma/PhantomJS environment, and snapshot tests with `npm test`.
* Test Mocha tests interactively in your browser.
  * Start server from terminal with `npm start`
  * Browse to [http://localhost:8001](http://localhost:8001)
* Run snapshot tests with `npm run snapshot-test` or, for just a specific file:
  `npm run snapshot-test components/button/`.

### React Storybook

Add DOM snapshot, image snapshot, and documentation site examples to Storybook for manual testing.

`npm start` and browse to [http://localhost:9001](http://localhost:9001) to view Storybooks.

### Style and quality linting

There are two parts to code linting: style and quality. [Prettier-ESLint](https://github.com/prettier/prettier-eslint)/[Prettier](https://prettier.io/) formats JavaScript, markdown and JSON to a consistent style for increased readability. [ESLint](http://eslint.org/) checks for code quality. Many editors have `prettier-eslint` format-on-save options. However, do not use Prettier by itself or linting will not pass. Use `eslint-disable-line [RULE]` within tests for necessary exceptions.

* `npm run lint` will check style and quality.
* `npm run lint:fix` will fix most style issues.
* `npm run lint:quality` will run `eslint`.
* `npm run lint:style` will run `prettier-eslint`.

### Story-based tests

Story-based tests use [Jest](https://facebook.github.io/jest/), [React Storybook](https://storybook.js.org/), and [Storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) to automatically create DOM and image snapshots of each story example. Snapshot testing uses the Jest framework to take a snapshot of the state of the DOM when the component is rendered and save it as a string for future comparison. StoryShots utilizes Jest Image Snapshot to test the visual rendering of pages against previously correct versions for visual regression testing. These tests are run without a DOM. Most props that don't involve the user can be tested here.

To create tests automatically, import examples in `/components/storybook-stories.js` into `/components/story-based-tests.js` also. Then, run `npm run snapshot-test`. Markup and image snapshots will be generated within the `tests` folder for each Storybook story. If additional snapshot tests are needed, create a test ending in `.snapshot-test.jsx`. 

Use Jest to test the presence of:

* DOM/markup nodes
* CSS classes
* Styles

**Do not** use Jest for:

* Mouse/keyboard user interaction (event callbacks)

#### Snapshot requirements

* Test if the markup of every state conforms to the [SLDS site](https://www.lightningdesignsystem.com/).
* **Always pass HTML IDs in** - Many components have the optional `id` property but will generate a random id to use if not passed in. These randomly generated IDs will cause your snapshot tests to fail. The markup text diff may be easier to debug if you change one prop per snapshot and have many snapshots instead of changing many props in one snapshot.
* Reuse code examples in `examples` folder for tests. This allows confirmation of the alignment of the documentation site examples with SLDS markup.

### Additional tools

* **[Mocha](http://mochajs.org/)** - Test framework ran in [PhantomJS](http://phantomjs.org/)
* **[Chai](http://chaijs.com/) w/[Expect Syntax](http://chaijs.com/api/bdd/)** - Test assertion library
* **[Karma](https://karma-runner.github.io/1.0/index.html)** - Command line test runner for Mocha
* **[Sinon](http://sinonjs.org)** - Stub/mock generator for callbacks and human interactions
* **[Enzyme](http://airbnb.io/enzyme/)** - manipulate and traverse the DOM with syntax similar to jQuery
* **[Chai Enzyme](https://github.com/producthunt/chai-enzyme)** - Chai assertions and convenience functions which eliminate asynchronous render complexities
* **[Istanbul](https://github.com/gotwarlost/istanbul)** - Measures code coverage for Mocha framework
* **[react-docgen](https://github.com/reactjs/react-docgen)** - Extracts information from React components and generates JSON used by the documentation site

## General test requirements

* Tests need to simulate user interactions as closely as possible.
* Tests must work in both PhantomJS via the CLI and in your local browser at [http://localhost:8001](http://localhost:8001).
* All pull requests must contain unit testing of:
  * All components not in a `private` folder
  * All props. This includes `children`, but only to check if `children` rendered.
  * Correct parameters for all event callbacks
  * Keyboard interactions specified at [SLDS site](https://www.lightningdesignsystem.com/) and possibly additional test for `tab` if DOM focus is involved
  * Mouse interactions. This includes testing if the component gained focus or lost focus when another element is clicked.
  * Correct DOM focus manipulation (if applicable)
  * Jest snapshots for each [SLDS state and variant](https://www.lightningdesignsystem.com/) implemented and all documentation site example.
* Tests must unmount and clean up the test fixture after each test or grouping of related tests. Do not allow unrelated tests to "bleed" into each other.
* Add to the `PropType` description comments `_Tested with snapshot testing._` or `_Tested with Mocha testing._` to state to consumers how the prop is tested. _This will also give you starting list of what needs testing. `assistiveText`, `className`, `labels`, `id`, `isOpen`, `options`, `variant` are examples of props to test with snapshots._
  eg:

```
const propTypes = {
  /**
   * CSS class names to be added to the accordion component. _Tested with snapshot testing._
   */
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  /**
   * HTML id for accordion component. _Tested with snapshot testing._
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
```



#### TDD with Jest

HTML Snapshots are a great way to compare markup with the [SLDS site](https://www.lightningdesignsystem.com/) examples.

1. Copy markup from design system site
1. [Convert to JSX](http://magic.reactjs.net/htmltojsx.htm). _SVGs may require extra attention and hand-conversion._
1. Copy JSX into the new component's `render` function to feed the markup into the Jest snapshot
1. `npm run snapshot-test` _(or `npm run snapshot-test -- -u` to overwrite the existing snapshot)_
1. Return to the component and `npm run snapshot-test -- --watch`
1. Modify your component until you get the markup correct.

### Mocha

Files ending in `.browser-test.jsx` will be run by CI server and in browser.

* ARIA attribute states should be tested with in-browser Mocha tests.
* All mouse/keyboard interactions and events must have Mocha tests.
  * For components with user interactions events, real DOM testing is preferred. It is not recommended to use shallow rendering or to modify component prototypes with mock functions for these tests.
  * Because they are often easier to debug in the browser, mouse/keyboard user interaction testing should be done using Mocha.

## Sample Mocha Test File

Here is a well-commented sample test file which you can copy/paste into a new file to get started:

```
// Import your external dependencies
import React from 'react';
import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import { mountComponent, unmountComponent } from '../../../tests/enzyme-helpers';

// Import your internal dependencies (for example):
import Tree from '../../components/tree';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 * This wrapping component will be similar to your wrapping component
 * you will create in the React Storybook for manual testing.
 */
const propTypes = {
    sampleProp: PropTypes.string
};

class DemoComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  // event handlers

  render () {
    return (
      <Tree />
    );
  }
});

DemoComponent.displayName = 'DemoComponent';
DemoComponent.propTypes = propTypes;
DemoComponent.defaultProps = defaultProps;

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

  describe('Assistive technology and keyboard interactions', () => {
    /* Detect if presence of accessibility features such as ARIA
     * roles and screen reader text is present in the DOM.
     * If your component has an ARIA role in application, and
     * does not use `tab-index`, test that the correct keyboard
     * navigation is present. Test event callback functions using
     * Simulate. For more information, view
     * https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/simulate.md
     */

    // String provided as first parameter names the `it` section.
    // Use short declarative sentences (sentence with "it").
    describe('onClick', () => {
      const itemClicked = sinon.spy();

      beforeEach(mountComponent(
        <DemoComponent itemClicked={itemClicked} />
      ));

      afterEach(unmountComponent);

      /* Please notice the of `function () {}` and not () => {}.
       * It allows access to the Mocha test context via `this`.
       */
      it('calls event handler', function () {
        const item = this.wrapper.find('#example-tree-1').find('.slds-tree__item');
        // If applicable, use second parameter to pass the data object

        item.simulate('click', {});
        expect(itemClicked.callCount).to.equal(1);
        // If applicable, also test callback's data object for correct contents.
      });
   });
  });
});
```
