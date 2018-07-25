# Codebase Overview

### This page will give you an overview of the library codebase organization, conventions, and implementation. Components will always be moving toward this specification, but may not comply currently.

If you want to [contribute](CONTRIBUTING.md), we hope that this overview will help you feel more comfortable.

## Top-Level folders

* `components` - React components
  * `[COMPONENT]` - components that are part of the public API
    * `__tests__` - Mocha and Jest tests
    * `__examples__` Examples used in storybook and documentation website
    * `__docs__` - storybook and documentation website imports of examples
    * `private` - components that are not a part of the public API
  * `utilities` - components that are shared between other components (not public API)
* `icons` - Inline icons \[legacy\]
* `preset` - Babel preset published to `@salesforce/babel-preset-design-system-react`
* `scripts` - Build and release tasks
* `styles` - Temporary location for styles (use sparingly)
* `utilities` - Scripts that are not React components including `checkProp` warnings, DOM, and event helpers. (not public API)

### Introduction to presentational components

If you are new to React, you may be trained to design components in a more complicated way than they need to be. Please prioritize the simple and the flexible. The gist of presentational components is to be a template that takes in data and passes out user events and related data to callback functions. One over-simplified way to approach it is to consider these components as [Handlebars templates](http://handlebarsjs.com/) with event listeners. The goal is for engineers to not have to think about markup and stylesheets.

* Take data and UI data, such as disabled buttons, from parent via props to display data and UI state correctly. Don't manipulate props with string concatenations, array pushes, and sorting within components.
* Pass mouse and keyboard events and related event data, such as the item data for the item that was clicked, up to parent state machine, so it can decide how to manipulate it's child components' props.
* Parent components should be the only components that changes data. Components should be data stateless and only reflect the data they have been given. Only UI state, such as "is this dialog open?" or "is this option active/focused" should be within components. Focus and active state should be maintained internally in order to not introduce these into your state engine store (e.g.- Redux).

### Think of others first

* <a name="not-bootstrap" href="#not-bootstrap">#</a> **Consider your audience.** This project is not Bootstrap, and we've built [frameworks on top of Bootstrap](https://github.com/ExactTarget/fuelux). The primary audience for this project is software engineers yearning to easily implement the design artifact handed to them. Yes, contributors should over-document and explain much as you need to, but you do _not_ need to have components just work when you drop them on the page. Read on for more about limiting internal component state.

* <a name="consuming-developer-mindset" href="#consuming-developer-mindset">#</a> **Put yourself in the consuming developer mindset.** "I just updated. What just broke and why?" Why does the React child component become the the DOM parent node? Write as long of a prop description comment that is needed to understand the concept. Need to sunset a prop or change the variable type accepted? Write backwards compatible code and add console warnings that will _only run in development_. See the `checkProp` paradigm. If the test can become an independent module and work in multiple components, add it to the `design-system-react/utilities` folder. Some examples include:

  * A component has children without a specified `displayName`
  * Determine if trigger can be tabbed to
  * Require one of multiple prop, but not both or only one of specified properties
  * Warnings of property deprecation, sunsetting, and future changes

* <a name="not-browser-compatible" href="#not-browser-compatible">#</a> **This library will not, and is not, intended to be run in a browser as-is.** This library is targeted at engineers that can optimize their builds for performance and target the browsers and environments they need to support with appropriate polyfills. Polyfills should be added at application build time.

* <a name="all-text-can-be-internationalized" href="#all-text-can-be-internationalized">#</a> Any text the user can read (including text for screenreaders) should be able to be set via a prop for internationalization purposes. _Within the component, do not concatenate strings._ This assumes that you know the word order of all languages. Strings should be passed into props in their entirety.

* <a name="group-assistive-text-and-labels" href="#group-assistive-text-and-labels">#</a> All assistive text for accessibility and visible text should be grouped in an object and passed in with a prop, `assistiveText` and `labels` respectively. This will allow consuming developers to easily find and map text to localize it.

* <a name="different-react-component-hierarchy" href="#different-react-component-hierarchy">#</a> React component hierarchy doesn't always mean HTML tag hierarchy. Sometimes children become the wrapping component.

* <a name="private-child-components" href="#private-child-components">#</a> Place child components not intended to be part of the public API within a folder labelled `private`. All other React components should be considered public (and considered within the scope of Semantic Versioning), and can be used by developers in their own JSX within their application.

* <a name="code-design-choices" href="#code-design-choices">#</a> **Use loose coupling and weak connascence.** The goal should be that a contributor can understand one piece of code without understanding another and be able to easily make updates in the future. You want weak connascence between components or components and the application (such as events) and not strong connascence. This makes it easier to update one component when modifying another in the future. How easy it will be to change in the future depends on which of the nine [types of connascence](<https://en.wikipedia.org/wiki/Connascence_(computer_programming)>) is being used. For instance, _Connascence of Name_ can be simply updated with Find/Replace. PropTypes and type systems help with _Connascence of Type_. _Connascence of Position_ with parameters is bad because it relies on the correct order of parameters. Objects with named keys should be used to avoid Connascence of Position.

- <a name="pre-and-post-state-change-events" href="#pre-and-post-state-change-events">#</a> **Prefix `onRequest` to pre-state-change events.** Pre-state-change events are events that _request_ a state change from the parent component. Post-state-change or post-user-action events are called after a state change or a user event and should have the normal prefix of `on`. Pre-state-change events callbacks should check for an invalid state and prevent the invalid state. For example, Pill's `onRequestRemove` would be called before the Pill is removed. A pill is requesting that itself be removed, but it hasn't been removed yet. `onRemove` would be called after the Pill is removed. Generally "native events," like `onClick`, `onKeyDown`, `onFocus` do not have the prefix `onRequest`, since the callback occurs after the specified event. `onRequestRemove` however occurs _before_ the event of removal, while `onKeyDown` (delete or backspace) on a Pill occurs after a key is pressed down.

- <a name="callback-cancelling" href="#callback-cancelling">#</a> **Callback props should not communicate with the component through return values.** To increase clarity, do use use `event.preventDefault()` or `return false` within a callback prop to communicate information back to the component. Trapping event bubbling is good, but components should only be communicated with by props cycling back through the state engine. All data needed to change the state or communicate an invalid state should be explicitly provided by a key in the data object of the event. The data object is always the second parameter of the callback.

### Limit side effects

* <a name="be-functional" href="#be-functional">#</a> **Be functional.**  `const getKittenNames = (cats) => cats.filter(isKitten).map(getName)` is a great example of how to get a list of kitten names from a `cats` collection without a `for`, `while`, or `until` loop while only modifying variables within the functional scope.

* <a name="limit-state" href="#limit-state">#</a> **Limit use of component state.** If the parent application's state engine can handle it with a `prop`, then don't use state. _New components should always start out as controlled by their parent and only be uncontrolled (that is have state) if a use case presents itself._ It's better to have a component that needs 20 props set and outputs the correct markup, than to have a component that works with no props set, yet maintains multiple internal states. We like to think of this project as design system templates with minimal logic that happen to work with the React framework. Let the library consumer create a simple _container component_ with state. Read more about [controlled components](#controlled-and-uncontrolled-components).

  * <a name="ids-should-be-controlled" href="#ids-should-be-controlled">#</a> All `id` attributes in the component HTML should be unique to the page, especially if the same component is used. They should be able to be controlled by the consuming developer (not just `shortid` generated). Most `id` attributes are used for accessbility or for React `key`.
  * <a name="stateful-stateless-components" href="#stateful-stateless-components">#</a> Know how smart/stateful React components [work together](https://gist.github.com/trevordmiller/a7791c11228b48f0366b) with [pure/dumb stateless function components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions).
  * <a name="stateful-top-level-component" href="#stateful-top-level-component">#</a> It is preferable to only have one stateful top-level class per component in this library. For these top-level components, it’s preferable to leave them stateful (that is, to use `class`). It's much easier to get the DOM node reference if you need it for such things as measurements. Then, you don't have to go through a lot of hassle to work around not having lifecycle methods. It also allows components to follow the controlled / uncontrolled pattern mentioned below. All sub-components should be stateless and manipulated with props if possible.
  * A `Tree` should have state. A `TreeNode` should not.
  * A `DataTable` should have state, a `TableColumn` should not.
  * Frequently used items such as badges, pills, buttons or icons should probably not have state.

* <a name="no-window-events" href="#no-window-events">#</a> **Encapsulate your components.** Global window events like `resize` or external DOM nodes should not be accessed from the component. `body` should be used for additional portal mounts. If a menu needs to be smaller to be responsive, consuming applications should listen for the resize event and change the correct props to make the component responsive--or a CSS solution should be found. The component should not be listening to window events directly. Global key press or mouse clicks are fine if used appropriately.

* <a name="use-dom-refs" href="#use-dom-refs">#</a> **Avoid querying the DOM for nodes you do not own.** A `ref` callback is React's [link to a DOM node](https://facebook.github.io/react/docs/refs-and-the-dom.html). It is triggered on render and allows access to the DOM node asynchronously. In most cases within a component, you only need a `ref` for setting focus, but `refs` make testing easier. If you find yourself using `querySelectorAll()` to query parts of this library within your application tests, please stop and submit a contribution that surfaces the DOM node you are needing to test. If you control the contents or children yourself, please use a `ref` bound to your own JSX DOM node to test. For an example, review the `renderDialog` method of `Popover` and its `body` ref. Once surfaced, a DOM `ref` becomes part of the public API and will be treated as such.

* <a name="breaking-changes" href="#breaking-changes">#</a> **Non-backward compatible changes to component props or a new design system version that has breaking changes within it _is_ a breaking change and this library should release a major version.** SLDS markup alignment and class changes within the current design system release cycle are _not_ considered breaking changes in this library although they may break markup queries. See [Avoid querying the DOM for nodes you do not own.](#use-dom-refs). The master branch of this library should be aligned to the code line that is open. When upgrading the design system CSS, please create a archive/stale branch labelled similar to `spring-17-2.2.x`, except use the correct Salesforce release date and SLDS version that the code was intended to support.

* <a name="approved-slds-patterns" href="#approved-slds-patterns">#</a> **Only submit approved design system patterns.** This library should include only components which have approved patterns in Salesforce's [design system](https://www.lightningdesignsystem.com/). If there is a use case from a designer that conforms to a design pattern, that component should be able to be implemented with this library. This library does NOT conform to Salesforce production per se, but is open to being customized to support patterns in production if they remain generic and flexible.

* <a name="limit-extra-div" href="#limit-extra-div">#</a> **Limit the use of grouping `div` elements.** React components can only have one HTML node / JSX / function return value. A component's render function should have one HTML node as its parent JSX element. Please limit use of extra wrapping `div` elements in order to align with SLDS markup. Other options include creating additional sub-components or passing an array of components to the parent component to render.

* <a name="avoid-mixins" href="#avoid-mixins">#</a> **Avoid implied mixins.** Instead, import and use shared code and external libraries as libraries, or use higher-order components in order to more easily trace the code execution.

* <a name="avoid-dependencies" href="#avoid-dependencies">#</a> **Avoid external dependencies.** Do not add external dependencies _to production dependencies_ list unless absolutely necessary. Always consider the "total cost of ownership" for all dependencies.

* <a name="use-is-required" href="#use-is-required">#</a> **Use isRequired as much as possible in PropTypes.** `isRequired` is explicit, determines the minimal API of each component, and simplifies a component's internal code. Similar to limiting state, this library prefers simple over flexible, so use `isRequired` as much as you can without over-burdening the consuming developer.

* <a name="avoid-css" href="#avoid-css">#</a> **Avoid inline CSS style/custom classes.** We are blessed to have a team of great CSS developers working on our design system. Use their CSS or contribute code back to them.

### Be consistent

* <a name="use-eslint" href="#use-eslint">#</a> **Use ESlint** The larger a codebase becomes and the more contributors the project has, the more organization that is needed. Please use ESlint in your editor (via `.eslinttc`) and conform to ESlint settings present in [ESlint Configuration for SLDS](https://github.com/salesforce-ux/eslint-config-slds). The team is open to contributions. If a file is touched that has outstanding ESlint errors, please fix the ESlint errors first--in a separate commit. Sometimes special cases require an `eslint-disable-line`, but please use sparingly.

* <a name="familiarize" href="#familiarize">#</a>**Do not create in a vaccuum.** Familiarize yourself with concepts used in the rest of the library.

* <a name="react-create-class" href="#react-create-class">#</a> Use `class/extend`, but only extend from `React.Component` and never another `class`. This prevents class hierarchies and tight coupling being created beyond the basic `React.Component`. This completely avoids the gorilla-banana problem (“what you wanted was a banana, what you got was a gorilla holding the banana, and the entire jungle” - Joe Armstrong).

* <a name="event-callbacks" href="#event-callbacks">#</a> **Use consistent callback parameters.** All render callbacks, that is callbacks that determine what to render, should pass a data object with named key/values as the second parameter. Event callbacks should pass in the synthetic event, then a data object with named key/values that relate to the event. If an event callback doesn't have a user event that triggered it, pass `undefined` as the event. This will look something like `this.props.onCallback(event, { extraInfo: true })`.

* <a name="use-classnames" href="#use-classnames">#</a> **Use classNames library.** This library makes extensive use of the [classnames](https://github.com/JedWatson/classnames) library for feeding conditional CSS classes into `className` attributes and allows a variety of types such as `string`, `object`, and `arrays`. Although longer, static classname strings are preferred more than dynamic classnames (dynamic object keys) due to searchability when updating markup. See [Classnames](#classnames) section for more details.

* <a name="classname-prop-consistent" href="#classname-prop-consistent">#</a> **The `className` prop should be on a consistent node.** The classes passed into `className` should be present on the `.slds-[COMPONENT]` node and not on a container node--nor on a child of `.slds-[COMPONENT]`. All other `className` props should be suffixed--such as `classNameMenu` or `classNameContainer`.

* <a name="boolean-prop-prefix" href="#boolean-prop-prefix">#</a> **Use boolean prefixes.** If a prop is a boolean, please prefix with `is` or `can` or suffix it with `-able`. Never default a prop to `true`.

* <a name="boolean-falsey-defaults" href="#boolean-falsey-defaults">#</a> **Use falsey defaults.** HTML defaults many attributes to true if no value is provided, such as `checked` instead of `checked="true"`. To maintain JSX's HTML-like syntax, please avoid asking a developer to use `propName={false}`. This may require using the opposite word, such as `isInline` instead of `isModal`.

### Use "the good parts"

* <a name="do-not-mutate-data" href="#do-not-mutate-data">#</a> **Do not mutate data.** React tries to [optimize and prevent re-rendering the DOM when possible](https://facebook.github.io/react/docs/optimizing-performance.html#the-power-of-not-mutating-data). Many times this is not what you want. Avoid solitary use of `push`, `pop`, `shift`, `unshift`, `sort`, `reverse`, `splice` and `delete` when mutating arrays. If you ever have to ask yourself, why isn't my component rendering with new props, this is likely the reason. Use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) on objects and arrays--or [`Array.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) on arrays instead of directly modifying these variables that are accessed by reference. You may consider exploring some new ES6 types such as [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) which are collections that help store unique values of any type.

* <a name="rest-operators-with-jsx" href="#rest-operators-with-jsx">#</a> Be careful with [rest operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) when passively applying unnamed and unknown props to JSX nodes. This concept allows flexibility to the consuming developer, but is difficult to track for maintainers. If rest operators should be used, be sure to deconstruct each one that is actually needed by the JSX nodes, so that the rest operator only handles "unknown props" passed in from the outside developer. In short, don't utilize any properties in the `...props` object within the component. After using `const { active, className, ...rest } = props;` do not go back to using `this.prop.*` anywhere in the render function.

* <a name="rest-operators-with-jsx-delete" href="#rest-operators-with-jsx-delete">#</a> If a rest operator is already present in your render function and you need to remove additional props so that they do not get passed to a JSX node, use the rest operator along with `// eslint-disable-line no-unused-vars` to remove the prop from `...rest`.

* <a name="props-in-get-initial-state" href="#props-in-get-initial-state">#</a> **Do not use props in initial state.** Please review [props in getInitialState is an anti-pattern.](https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html)

* <a name="jsx-gotchas" href="#jsx-gotchas">#</a> Read [JSX Gotchas](https://facebook.github.io/react/docs/jsx-gotchas.html#html-entities)

* <a name="no-default-false-values" href="#no-default-false-values">#</a> **No falsy defaults.** Do not set default prop values to `false`. If you need to detect if a variable is `false` or undefined in order to execute code, use a "double logical NOT operator". If `isOpen` gives you a "falsey" value, then `!!isOpen` will make it return the boolean value `false`. Otherwise it will return true. If you need to test if the value is not `undefined`, use `!== undefined`.

* <a name="required-callbacks" href="#required-callbacks">#</a> **External callbacks are optional.** Public callback/handler function props should always be optional and tested to see if they exist before execution. Within private child components use `.isRequired` if the callback is needed internally for the component to function.

### Advocate for accessibility

* One of the key aspects of accessibility with React components is managing a DOM node's `focus` and `blur`. This should be implemented with callback references to DOM nodes and should _not_ use `ReactDOM.findDOMNode()`. Use the the current DOM node `ref` prop to create a function that passes the DOM node to a callback that is provided by the parent which will control the focus once the DOM node has been rendered.

* If a component has a focusable element, such as a button or an input, write a callback function that will pass the `ref` back to it's parent. `buttonRef` or `inputRef` are possible prop names.

* Non-accessible component contributions are permitted but discouraged. These are labelled "prototypes" and do not follow an approved accessible user-experience pattern. Please create an additional issue to follow up with the contribution.

Unless you have an accessiblity guru in your department (knowledge of implementing accessible code and using assistive technology), you are going to have to figure out some things for yourself. A wise manager once said "real work is when you can't Google the answer." Here are some resources that have _different_ answers to your questions.

* [ARIA-1.1 Authoring Practices guide](http://w3c.github.io/aria-practices/) - Although no one actually implemented ARIA 1.0 guidelines fully, this is the bleeding edge of the W3C's re-write of the Authoring Practices, which are based on ARIA 1.1. Many now come with the W3C's own examples pages.
* [ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/) - Recommendation Candidate for the new ARIA Spec.
* [ARIA in HTML](http://w3c.github.io/html-aria/) - Super useful reference to answer the question "Should I put ARIA on this?". Often a native HTML element will have an implicit role, so it's not required, _nor recommended_ to be added.
* [HTML 5.1](https://www.w3.org/TR/html51/) - This is at the Recommendation Candidate stage, so it is very unlikely to change. Please notice the places where it informs of ARIA role for each element, the implicit roles, may not be 100% accurate. The document authors state that the ARIA in HTML spec above is the definitive source of truth for that bit and they'll fix up 5.1 when they find stuff that's not correct.
* [eBay MIND patterns](https://ebay.gitbooks.io/mindpatterns/content/) - Nice to digest content. Most up to date functional base components our team has found so far with [examples](http://ianmcburnie.github.io/mindpatterns/). This does not mean they are correct, though.

### Be kind to future contributors and write tests

* All external APIs should be tested, so that breaking changes can be detected. If a breaking change doesn't cause at least one test to fail, then add a test.
  * All `props` should be tested. It is OK to test multiple props in the same test for optmization as long as they are isolated and do not affect each other (for instance `id`, `classname`, and `style`).
  * All event callbacks should be tested along with any data object keys outside of the synthetic event to confirm the data. The data object, if present, is typically the second parameter of an event callback.
  * All mouse and keyboard interactions should be tested.
* Components should have 90%+ test coverage. Coverage can be determined by reviewing the coverage summary at the end of `npm test`. High test coverage does not imply correct logic, but low coverage implies low test quality/quantity.
* Test should run correctly in headless browsers (`npm test`) and within a "real" browser (`npm start` -> `http://localhost:8001/`)
* Components should be able to be rendered without a `DOM`. Test for the existence of `document` and `window` before using them.
* For more specifics about testing please review the [testing module walkthough](../tests/README.md).

## Notes on documentation site examples
* Documentation site code is located in a [private repository](https://github.com/salesforce-ux/design-system-react-site).
* The NPM module for this library is used for component documentation. Therefore, changes to documentation require a new version to be published.
* Documentation site examples use [CodeMirror](https://codemirror.net/) to `eval()` site examples from the NPM module. `import` and `export` statements are ignored by CodeMirror. Exports from `components/index.js` are the only variables available to code examples. Do not `import` any other variables or the site examples will not work.

## Notes on Converting SLDS to Design System React

* `variant` should be used for significant structure and markup or UX pattern changes that cannot exist at the same time. This may include examples, modifiers, but are usually labelled variants in SLDS. In order to clear, never make the presense of an event callback imply a markup change, other than the event attribute specified. Example: Do not make the addition of `onClick` turn a `span` into an `a` tag.
* `theme` should be used for a single `className` change that cannot exist at the same time as another `className`. These are typically SLDS states or themes, but could be modifiers. Examples: `warning`, `error`, `offline`, `success`.
* Modifiers and states that can exist at the same time and should be props by themselves, so that any combination of them are possible.
* `isOpen` on dialogs and menus should be able to be controlled by their parent component, but _also_ work with internal state if it is value is `undefined`
* SLDS uses styling to hide hidden elements. Please do not render these elements. Exampes: menus, dialogs, tab and accordion content panels.
* In order to promote best practices, if components are used in a wrong or suboptimal way, the component should error. For instance, if `id` is a required key in option items, then the component should error out and not fallback to an array index. Custom `checkProps` warnings are the best way to provide a clear error to consuming developers.
* `propType` comments are used in the property tables on the documentation site. Please write in markdown paragraphs.
* ESlint may find errors in SLDS markup. Feel free to ask questions to the SLDS team or core maintainers of this library, but most likely the markup is intentional and well-tested. You may need to disable the error with `eslint-disable-line` or `eslint-disable-next-line`. Consider ESlint lint there to catch the rule, but not the well thought-out exception.
* All filenames should be "kabob case," `this-is-the-file`. Spaces and camel-case should be converted to hyphens.

## Controlled and Uncontrolled Components

* All new components should be controlled at first and then uncontrolled support added later if needed.
* All Design System React components should be able to be "controlled"--that is expose a callback and expect their parent to control them with props.
* Prefix callbacks that occur before an event with `onRequest`. Prefix callbacks that occur as a result of an event with `on`. The close button in a Popover will call `onRequestClose` while the Popover will call `onClose` after the Popover has been closed. This is because closing isn't guarenteed with `onRequestClose`, since the parent component will decide.
* Please note that if controlled by its parent, a component will appear broken if just copied and pasted into an application without a parent to control its props.
* Controlled components can be stateless components, but entirely stateless components do complicate DOM selectors for the consuming applications.

A **controlled** `<input>` has a `value` prop. Rendering a controlled `<input>` will reflect the value of the `value` prop.

```javascript
  render() {
    return <input type="text" value="Hello!" />;
  }
```

User input will have no effect on the rendered element because React has declared the value to be `Hello!`. To update the value in response to user input, you could use the `onChange` event:

```javascript
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Hello!' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return <input type="text" value={this.state.value} onChange={this.handleChange} />;
  }
}
```

In this example, we are accepting the value provided by the user and updating the `value` prop of the `<input>` component. This pattern makes it easy to implement interfaces that respond to or validate user interactions. For example:

```javascript
handleChange = (event) => {
  this.setState({ value: event.target.value.substr(0, 140) });
};
```

This would accept user input and truncate the value to the first 140 characters.

A **Controlled** component does not maintain its own internal state; the component renders purely based on props.

_from [Controlled Components](https://facebook.github.io/react/docs/forms.html#controlled-components) in the React documentation._

* If a component needs the ability to also manage its own state (that is to be an "uncontrolled" component) in particular situations the parent should still be able to take over and make it controlled simply by passing in a value for the prop. For instance, an `onModalClose` callback could change `isModalOpen` to `false` when it is ready to close the modal.
* For more detail and examples of this pattern, visit [DIMOC: Do It Myself or Callback](https://gist.github.com/jamesgpearce/53a6fc57677870f93248).

## Component Organization

* `extends React.Component`
  * display name
  * prop types
  * defaults props
  * initial state within `constructor`
  * life cycle methods
  * sub-render methods (keep to a minimum, only use to stay "DRY")
  * component render

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import checkProps from './check-props';
import { EXTERNAL_CONSTANT } from '../../utilities/constants';

const propTypes = {
  /**
   * The description of this prop (will appear in the documentation site).
   */
  title: PropTypes.string.isRequired
};

// These values will also be visible in the documentation site.
const defaultProps = {};

/**
 * The description of this component (will appear in the documentation site).
 */
class DemoComponent extends React.Component {
  static displayName = EXTERNAL_CONSTANT_NAME;
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    // useful for unique DOM IDs
    this.generatedId = this.props.id || shortid.generate();

    // initial state
    this.state = {};
  }

  componentWillMount() {
    // Not required. This function issues console warnings to developers about props and is helpful in upgrading. All breaking changes to props must have a warning for developers when they upgrade.
    checkProps(EXTERNAL_CONSTANT, this.props);
  }

  // Class property bound to instance. Class methods that are not React lifecycle methods should use "fat-arrow" syntax if `this` binding is needed.
  toggleOpen = (event, { eventDataKey }) => {
    // you can use `this` here
  };

  // Minimize use of multiple renders. More HTML-like JSX is preferred with ternary statements
  renderSubComponent = () => null;

  // Render should be last
  render() {
    return null;
  }
}

export default DemoComponent;
```

## Formatting Props

Wrap props on newlines for exactly 2 or more. Always list alphabetically.

```html
// bad
<Person
 firstName="Michael" />

// good
<Person firstName="Michael" />
```

```html
// bad
<Person firstName="Michael" lastName="Chan" occupation="Designer" favoriteFood="Drunken Noodles" />

// good
<Person
 favoriteFood="Drunken Noodles"
 firstName="Michael"
 lastName="Chan"
 occupation="Designer"
/>
```

## Component composition with prop spread

Some props accept an existing Design System React component such as the `dropdown` prop of `DataTableRowActions`. _Component composition with prop spread_ is a similar pattern to [render prop](https://reactjs.org/docs/render-props.html) composition in that it fully exposes the functionality of sub-components. The difference is that a shallow prop/object merge is assumed with the prop component overriding any props from its parent.

In a way, this is "grandparent control" in that it surfaces the internal API of sub-components to the consuming developer in a way that the parent of the parent can control it. The parent component (such as `DataTableRowActions`) shallow merges the props from itself with the component props provided from the developer. The developers or the "grandparent" takes precedence and merges in last.

This pattern creates a separation of concern and a more declarative approach that relies on child components with their own props instead of additional props on the parent component such as `<Button iconClassName />`. Passing in `<Dropdown options={} />` to a `dropdown` prop limits the aliasing of props for child components that already exist and reduces duplication of `PropType` documentation and increases library maintainability. 

## Prefer Ternary to Sub-render

Keep login inside the `render`.

```javascript
// bad
renderSmilingStatement () {
  return <div>{this.props.name}{(this.state.isSmiling) ? <span> is smiling</span> : ""}</div>;
},

render () {
  return <div>{this.props.name}{this.renderSmilingStatement()}</div>;
}
```

```javascript
// good
render () {
  return (
    <div>
      {this.props.name}
      {this.state.isSmiling
        ? <span> is smiling</span>
        : null
      }
    </div>
  );
}
```

## Preferred ways to render

Once your data is in a correct structure, your rendering should just respond to changes in your data. Here is list of ways to render:

1. Inline ternary operator
   * Preferred more than a simple if-else statement
   * It is more concise than if-else and can be used within JSX since it’s an expression
1. Logical `&&` operator
   * Alternative to ternary. Use when one side of the ternary operation would return null
   * Be careful that you don’t run into bugs when using multiple conditions (truthy/falsey values, especially array length of zero)
1. Inline Enum objects
   * Great to map different states
   * Great to map nested conditions ({prop1: { }}[prop1][prop2])
1. Higher Order Components or Sub-components
   * Create another stateless component and use it to shield away complex conditional rendering
   * Components can focus on their main purpose
   * This is an abstraction and can only return one node (in React 15)
1. Switch case
   * Verbose (break!)
   * Can only be JSX-inlined with self invoking function
   * Avoid it, enums are preferred
1. If-else
   * Is the most basic conditional rendering
   * Beginner friendly
   * Cannot be inlined in JSX (needs variables)
1. Multi-level/nested conditional renderings
   * Avoid them for the sake of readability
   * Split up components into stateless components with their own simple conditional rendering
   * Use HOCs instead
1. External templating components
   * Avoid them and be comfortable with JSX and JavaScript

## Naming DOM `ref` callbacks

Do not name a DOM callback prop of a library component `ref`. `ref` is a reserved prop name. This will return the component React object, _not_ the DOM node. It is best practice to create an object called `refs` with keys that are semantic names of DOM nodes: `refs: { triggerButton: ()=>{}, triggerInput: ()=>{} }`. If you use a `refs` object, you may need shallow merge the object with default props. For more information, please review [Exposing DOM Refs to Parent Components](https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components).

```javascript
// bad
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.ref} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return <CustomTextInput ref={(el) => (this.inputElement = el)} />;
  }
}
```

```javascript
// good
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.refs.input} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        refs={{
          input: (el) => {
            this.inputElement = el;
          }
        }}
      />
    );
  }
}
```

## Naming Handler Methods

Name the handler methods after their triggering event.

```javascript
// bad
punchABadger () { /*...*/ },

render () {
  return <div onClick={this.punchABadger} />;
}
```

```javascript
// good
handleClick () { /*...*/ },

render () {
  return <div onClick={this.handleClick} />;
}
```

Handler names should:

* begin with `handle`
* end with the name of the event they handle (eg, `Click`, `Change`)
* be present-tense

If you need to disambiguate handlers, add additional information between
`handle` and the event name. For example, you can distinguish between `onChange`
handlers: `handleNameChange` and `handleAgeChange`. When you do this, ask
yourself if you should be creating a new component.

## Classnames

Use [classNames](https://www.npmjs.com/package/classnames) to manage conditional classes.

```javascript
// bad
get classes () {
  let classes = ['MyComponent'];

  if (this.state.active) {
    classes.push('MyComponent--active');
  }

  return classes.join(' ');
}

render () {
  return <div className={this.classes} />;
}
```

```javascript
// better
render () {
  return (
    <div className={classnames('MyComponent',
      `MyComponent--${this.props.active}`,
      `MyComponent--${this.props.variant}`,
    )} />
  );
}
```

The best solution allows you to search the source code for the entire class name in order to update it. Dynamic classnames are more difficult to locate.

```javascript
// best
render () {
  return (
    <div className={classnames('MyComponent', {
      'MyComponent--active': this.props.active,
      'MyComponent--link': this.props.variant === 'link',
   })} />
}
```

Read: [Class Name Manipulation](https://github.com/JedWatson/classnames/blob/master/README.md)

Read: [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

Some syntax samples are from the [Planning Center](https://github.com/planningcenter/react-patterns)

# Babel Preset

`/preset` folder contains a Babel 6 preset that makes Design System React compatible with Salesforce’s supported browsers. This is a temporary location until a repository is created.

This preset enables a module bundler, such as Webpack, to transpile Design System React. Using this will make it easier to upgrade in the future without having to manually reconfigure your Babel settings to be compatible with new language features Design System React may use.

# Open source benefits
* More efficient and effective development
  * Faster Time-to-Market
  * Reduced development costs
* Overcoming organizational unit boundaries
  * Cost and risk sharing among organizational units
  * Collaboration across organizational unit boundaries
  * Program-wide information exchange
* More successful reuse
  * Use of competences missing at component providers
  * Independence between re-users and providers
  * Relief of component providers
* Better software product
  * Increased code quality
  * More innovative development
* More flexible utilization of developers
  * Simplified developer deployment
  * Collaboration of detached developers
* Enhanced knowledge management
  * Community-based learning
  * Openness and availability of knowledge
* Higher employee motivation
  * Shareable work
		* Opportuntity to lead engineering community
